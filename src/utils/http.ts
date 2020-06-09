import { Rxios } from "./Rxios";
import { Toast } from "vant";
import { getTrace, getSequence, getTime } from "./util";
import router from "../router";

// axios全局设置
const http = new Rxios({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20 * 1000,
  responseType: "json"
});
// axios.defaults.timeout = 30000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 此处为捕获到的异常，可以将此异常提交给Vuex的Store或者使用微信组件弹出
 * @param error
 */
function sendError(error: any) {
  let msg = "发生错误";
  if (error.data) {
    msg = error.data.Message;
  } else if (error.response.data) {
    msg = error.response.data.message;
  } else {
    msg = error.message;
  }
  // 1。store.dispatch('error/appendError', errorData)
  // 2。弹出
  Toast(msg);
}
// axios请求拦截
http.interceptors.request.use(
  config => {
    const loading = (config as any).showLoading;
    if (loading) {
      Toast.loading({
        message: "拼命加载中...",
        forbidClick: true,
        duration: 0
      });
    }
    if (!config.url?.endsWith("login")) {
      config.params = {
        ...config.params,
        _platform: "MobileWeb",
        _version: "1.0.0",
        _net: "",
        _os: "",
        _device: "",
        _describe: "",
        _trace: getTrace(),
        _sequence: getSequence(),
        _time: getTime()
      };
      const token = localStorage.getItem("token");
      if (token) {
        config.params._token = token;
      }
      const uid = localStorage.getItem("uid");
      if (uid) {
        config.params._uid = uid;
      }
    }
    if (config.params) {
      const params = Object.keys(config.params)
        .reduce((prev: string[], item) => {
          prev.push(`${item}=${config.params[item]}`);
          return prev;
        }, [])
        .join("&");
      config.url = config.url?.includes("?")
        ? `${config.url}&${params}`
        : `${config.url}?${params}`;
    }
    return config;
  },
  error => {
    sendError(error);
    return Promise.reject(error.data);
  }
);

// axios 响应拦截，对响应的状态处理
http.interceptors.response.use(
  response => {
    Toast.clear();
    const res = response.data;
    if (res.hasOwnProperty("Code")) {
      if (res.Code === 1005) {
        const url = location.pathname + location.search;
        const redirectUrl = encodeURIComponent(url);
        router.push("/passport/login?redirect=" + redirectUrl);
      } else if (res.Code !== 0) {
        // 100003:自提人不存在 （不提示）
        if (res.Code !== 100003) {
          sendError(response);
        }
        return Promise.reject(res);
      }
      response.data = res.Data;
    }
    return response;
  },
  error => {
    sendError(error);
    return Promise.reject(error);
  }
);

export default http;
