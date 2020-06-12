import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from "vuex-module-decorators";
import router, { resetRouter } from "@/router";
import { getToken, setToken, removeToken } from "@/utils/auth";
import store from "@/store";
import { permissionModule } from "./permission";

@Module({ dynamic: true, store, name: "user", namespaced: true })
class User extends VuexModule {
  public token = getToken() || "";
  public name = "";
  public avatar = "";
  public roles: string[] = [];

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles;
  }

  @Action
  public async login(userInfo: { username: string; password: string }) {
    // let { username, password } = userInfo;
    // username = username.trim();
    // const { data } = await login({ username, password });
    // setToken(data.accessToken);
    // this.SET_TOKEN(data.accessToken);
    setToken("123");
    this.SET_TOKEN("123");
  }

  @Action
  public resetToken() {
    removeToken();
    this.SET_TOKEN("");
    this.SET_ROLES([]);
  }

  @Action
  public async getUserInfo() {
    if (this.token === "") {
      throw Error("GetUserInfo: token is undefined!");
    }
    // const { data } = await getUserInfo({
    //   /* Your params here */
    // });
    // if (!data) {
    //   throw Error("Verification failed, please Login again.");
    // }
    // const { roles, name, avatar, introduction, email } = data.user;
    // // roles must be a non-empty array
    // if (!roles || roles.length <= 0) {
    //   throw Error("GetUserInfo: roles must be a non-null array!");
    // }
    // this.SET_ROLES(roles);
    // this.SET_NAME(name);
    // this.SET_AVATAR(avatar);
    this.SET_ROLES(["admin"]);
    this.SET_NAME("admin");
  }

  @Action
  public async changeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + "-token";
    this.SET_TOKEN(token);
    setToken(token);
    await this.getUserInfo();
    resetRouter();
    // Generate dynamic accessible routes based on roles
    permissionModule.generateRoutes(this.roles);
    // Add generated routes
    router.addRoutes(permissionModule.dynamicRoutes);
  }

  @Action
  public async logOut() {
    if (this.token === "") {
      throw Error("LogOut: token is undefined!");
    }
    // await logout();
    removeToken();
    resetRouter();

    this.SET_TOKEN("");
    this.SET_ROLES([]);
  }
}
export const userModule = getModule(User);
