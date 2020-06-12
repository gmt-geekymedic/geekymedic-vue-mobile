<template>
  <div class="app-header van-hairline--bottom" style="max-width:750px">
    <img
      class="pic-logo"
      :src="$store.state.ossUrl + '/common/logo2.png'"
      alt="logo"
      @click="menuClick('index')"
    />
    <van-icon
      class="float-right"
      :name="menuShow ? 'cross' : 'wap-nav'"
      color="#199AEE"
      size="0.16rem"
      @click="showMenu"
    />
    <van-popup
      v-model="menuShow"
      position="top"
      transition="fade"
      overlay-class="overlay-menu"
      class="popup-menu"
      style="max-width:750px"
    >
      <van-collapse v-model="activeNames" accordion @change="menuClick">
        <van-collapse-item
          title="产品"
          class="van-collapse-item-empty"
          name="product"
          :is-link="false"
        >
          <!-- <van-cell-group>
            <van-cell title="药道云sass" to="login" />
          </van-cell-group>-->
        </van-collapse-item>
        <van-collapse-item
          title="智能硬件"
          class="van-collapse-item-empty"
          name="hardware"
          :is-link="false"
        ></van-collapse-item>
        <van-collapse-item
          title="服务"
          class="van-collapse-item-empty"
          name="perfect"
          :is-link="false"
        ></van-collapse-item>
        <van-collapse-item
          title="合作案例"
          class="van-collapse-item-empty"
          name="case"
          :is-link="false"
        ></van-collapse-item>
      </van-collapse>
      <div class="btns">
        <van-button
          class="btn-use"
          type="info"
          block
          round
          @click="menuClick('apply')"
          >免费使用</van-button
        >
        <!-- <van-button class="btn-download" type="info" block plain round>下载</van-button> -->
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Button,
  Icon,
  Popup,
  Collapse,
  CollapseItem,
  Cell,
  CellGroup
} from "vant";

@Component({
  name: "LayoutHeader",
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
})
export default class extends Vue {
  activeNames = "";
  menuShow = false;
  showMenu() {
    this.menuShow = !this.menuShow;
  }
  menuClick(evt: string) {
    if (evt !== this.$router.currentRoute.name) {
      this.$router.push(`/${evt}`);
    }
    this.menuShow = false;
  }
}
</script>
<style lang="less" scoped>
.app-header {
  position: fixed;
  top: 0;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  background: white;
  z-index: 100;
  .pic-logo {
    width: 105px;
  }
  .van-collapse-item-empty {
    ::v-deep .van-collapse-item__wrapper {
      display: none;
    }
  }
  .btns {
    margin: 22px 30px;
    .van-button + .van-button {
      margin-top: 20px;
    }
  }
  ::v-deep {
    .popup-menu,
    .overlay-menu {
      top: 46px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
