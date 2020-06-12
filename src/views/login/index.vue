<template>
  <div class="login-container">
    <div class="banner">
      <van-image width="100%" :src="$store.state.ossUrl + '/login-bg.png'" />
      <van-image class="tui" :src="$store.state.ossUrl + '/login-tui.png'" />
    </div>
    <van-form class="login-form" label-width="0" @submit="onSubmit">
      <van-field
        v-model="tel"
        type="digit"
        maxlength="11"
        placeholder="手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1\d{10}$/,
            message: '手机号码格式不正确',
            trigger: 'onBlur'
          }
        ]"
      />
      <van-field
        v-model="vcode"
        type="digit"
        maxlength="6"
        placeholder="验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #button>
          <van-button
            class="btn-sendCode"
            size="small"
            native-type="button"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <van-button class="btn-submit" block round type="info">登录</van-button>
      <van-checkbox class="checkbox-agree" v-model="checked">
        登录即代表您已同意
        <a @click.stop="protocolClick('modal1')">《药极推服务协议》</a> 和
        <a @click.stop="protocolClick('modal2')">《药极推隐私协议》</a>
      </van-checkbox>
    </van-form>
    <van-dialog
      v-model="modalState.modal1"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <div :style="{ height: '80vh' }">
        <iframe
          src="https://www.geekymedic.cn/assets/yjt/service-agreement.html"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </div>
    </van-dialog>
    <van-dialog
      v-model="modalState.modal2"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <div :style="{ height: '80vh' }">
        <iframe
          src="https://www.geekymedic.cn/assets/yjt/service-agreement.html"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form, Field, Checkbox } from "vant";
import { userModule } from "@/store/modules";
import { Route } from "vue-router";

@Component({
  name: "Login",
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox
  }
})
export default class extends Vue {
  tel = "";
  vcode = "";
  checked = true;
  modalState = {
    modal1: false,
    modal2: false
  };
  private redirect = "";
  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query;
    if (query) {
      this.redirect = decodeURIComponent(query.redirect as string);
    }
  }
  created() {}
  sendCode() {
    if (!/^1\d{10}$/.test(this.tel)) {
      this.$toast("手机号码不能为空或格式不正确");
      return;
    }
  }
  onSubmit() {
    userModule.login({ username: this.tel, password: this.vcode });
    this.$router.push(this.redirect || "/");
  }
  protocolClick(key: string) {
    this.modalState[key] = true;
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .banner {
    position: relative;
    .tui {
      position: absolute;
      width: 60px;
      left: 50%;
      bottom: 16px;
      transform: translateX(-50%);
    }
  }
  .login-form {
    padding: 40px 0;
    .btn-sendCode {
      border: none;
      color: #4996ff;
    }
    .btn-submit {
      margin: 20px auto;
      width: 315px;
    }
    .checkbox-agree {
      padding: 0 30px;
      font-size: 12px;
      color: #9b9b9b;
      justify-content: center;
      a {
        color: #3571d5;
      }
    }
  }
}
</style>
