<template>
  <div class="app-footer">
    <van-divider class="footer-divider" :hairline="false"></van-divider>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="产品">
        <van-cell-group :border="false">
          <van-cell title="药道云sass" to="product" :border="false" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="公司">
        <van-cell-group :border="false">
          <van-cell title="关于我们" to="about" :border="false" />
          <van-cell title="加入我们" to="join" :border="false" />
          <van-cell title="联系我们" to="contact" :border="false" />
        </van-cell-group>
      </van-collapse-item>
      <van-collapse-item title="联系我们">
        <van-cell-group :border="false">
          <van-cell title="电话：0755-26412925" url="tel:0755-26412925" :border="false" />
          <van-cell title="邮箱：gmt@geekymedic.cn" :border="false" />
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <div class="copyright">
      <div class="logo">
        <img class="pic-logo" :src="$store.state.ossUrl+'/common/logo2.png'" alt="logo" />
      </div>
      <div class="code">
        <img class="footer-code" :src="$store.state.ossUrl+'/common/footer_code.png'" alt="logo" />
      </div>
      <div class="info">
        <div class="about">关注我们</div>
        <div class="company">深圳市药极客科技有限公司</div>
        <div class="desc">扫码了解更多产品和合作信息</div>
        <div class="code">
          <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备19038620号-1</a>
        </div>
        <div class="line">互联网药品信息服务资格证书 (粤)—经营性—2019—0135</div>
        <div class="line">网上有害信息举报专区 不良信息举报电话：0755-26412925</div>
      </div>
      <div class="privacy-link-group">
        <router-link to="privacy">隐私条款</router-link>
        <router-link to="terms">服务条款</router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Collapse, CollapseItem, Cell, CellGroup, Divider } from "vant";
@Component({
  name: "LayoutFooter",
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Divider.name]: Divider
  }
})
export default class extends Vue {
  activeNames = "";
}
</script>
<style lang="less" scoped>
.app-footer {
  margin: 74px 0 29px;
  .footer-divider {
    height: 3px;
    background: rgba(127, 181, 252, 1);
    border-radius: 2px;
    margin: 16px 16px 47px;
    &::before {
      display: none;
    }
  }
  .van-collapse {
    .van-cell {
      color: #9b9b9b;
    }
  }
  .copyright {
    padding-top: 36px;
    text-align: center;
    .pic-logo {
      width: 105px;
      height: 19px;
      margin-bottom: 2px;
    }
    .footer-code {
      width: 76px;
      height: 76px;
    }
    .info {
      font-size: 12px;
      font-weight: 400;
      color: #9b9b9b;
      .about {
        margin-bottom: 2px;
      }
      .desc {
        font-size: 9px;
        margin-top: 2px;
        margin-bottom: 23px;
      }
      .code {
        font-size: 10px;
        > a {
          color: #9b9b9b;
        }
      }
    }
    .privacy-link-group {
      margin-top: 35px;
      text-align: center;
      font-size: 12px;
      > a {
        padding: 0 6px;
        color: #9b9b9b;
      }
    }
  }
}
</style>
