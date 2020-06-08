import Vue, { DirectiveOptions } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vConsole from "vconsole";
import * as directives from "@/directives";

import "animate.css";
import "@/styles.less"; // global css
import "@/permission"; // permission control

import {
  Dialog,
  Lazyload,
  Image as VanImage,
  Toast,
  Button,
  Cell,
  CellGroup,
  Icon
} from "vant";
// 全局注册
Vue.use(Button)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(VanImage)
  .use(Dialog)
  .use(Toast)
  .use(Lazyload);
// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});

if (process.env.NODE_ENV !== "production" || process.env.VUE_APP_VCONSOLE) {
  new vConsole();
}
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
