import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

@Module({ dynamic: true, store, name: "app", namespaced: true })
class App extends VuexModule {
  public headerVisible = true;

  @Mutation
  private SET_HEADERVISIBLE(v: boolean) {
    this.headerVisible = v;
  }
  @Action
  showHeader() {
    this.SET_HEADERVISIBLE(true);
  }
  @Action
  hideHeader() {
    this.SET_HEADERVISIBLE(false);
  }
}

export const appModule = getModule(App);
