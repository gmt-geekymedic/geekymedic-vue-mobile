<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <van-button type="primary" to="permission">权限测试</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
  name: "Home",
  components: {
    HelloWorld
  }
})
export default class extends Vue {}
</script>
