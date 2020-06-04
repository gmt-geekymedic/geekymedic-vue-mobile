import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ossUrl:
      "https://geeky-test-oss-1.oss-cn-shenzhen.aliyuncs.com/officewebsiteh5",
    headerVisible: true
  },
  mutations: {
    showHeader(state) {
      state.headerVisible = true;
    },
    hideHeader(state) {
      state.headerVisible = false;
    }
  },
  actions: {},
  modules: {}
});
