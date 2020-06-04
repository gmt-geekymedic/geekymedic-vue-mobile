import { Rxios } from "./Rxios";
import { Toast } from "vant";

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
    msg = error.data.message;
  } else if (error.response) {
    msg = error.response.message;
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
    // 若是有做鉴权token , 就给头部带上token
    // let token = window.sessionStorage.getItem(__TOKEN_KEY__)
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config;
  },
  error => {
    sendError(error);
    return Promise.reject(error.data);
  }
);

// axios 响应拦截，对响应的状态处理
http.interceptors.response.use(
  //   function (response) {
  //     console.log(response.data.data) // 响应成功
  //     return response
  //   },
  //   function (error) {
  //     // console.log(error); //响应失败
  //     return Promise.reject(error)
  //   })
  response => {
    const res = response.data;
    if (res.Code !== 0) {
      sendError(new Error(res.Message));
      if (res.Code === 1005) {
        // this.injector.get(Router).navigateByUrl('/login');
      }
      return Promise.reject(res);
    } else {
      return res.Data;
    }
  },
  error => {
    sendError(error);
    return Promise.reject(error);
  }
);

export default http;
