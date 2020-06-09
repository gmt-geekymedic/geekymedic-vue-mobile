import http from "@/utils/http";

class Users {
  /**
   * 登录
   * @param code
   */
  login(code: string) {
    return http.post<any>(
      "api/applets/v1/yjtstore/login/wechat_applets_init",
      { Code: code },
      { showLoading: true }
    );
  }
}
export default new Users();
