import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getters = {
  headerVisible: state => state.app.headerVisible
};
export default new Vuex.Store({
  state: {
    ossUrl:
      "https://geeky-test-oss-1.oss-cn-shenzhen.aliyuncs.com/officewebsiteh5"
  },
  getters,
  mutations: {},
  actions: {},
  modules: {}
});
