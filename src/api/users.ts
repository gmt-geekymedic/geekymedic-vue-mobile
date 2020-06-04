import http from "@/utils/http";

class Users {
  login(req: any) {
    return http.post<any>("api/applets/v1/yjtstore/login/login", req);
  }
  sendVcode(req: any) {
    return http.post<any>(
      `api/applets/v1/yjtstore/login/send_vcode?_allow_anonymous=true`,
      req
    );
  }
}
export default new Users();
