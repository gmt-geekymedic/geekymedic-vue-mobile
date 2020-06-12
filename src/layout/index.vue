<template>
  <div class="app-wrapper" :class="{ 'no-header': !headerVisible }">
    <layout-header v-if="headerVisible" />
    <router-view />
    <layout-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LayoutHeader, LayoutFooter } from "./components";

@Component({
  name: "Layout",
  components: { LayoutHeader, LayoutFooter }
})
export default class extends Vue {
  get headerVisible() {
    return this.$store.getters.headerVisible;
  }
}
</script>
<style lang="less" scoped>
.app-wrapper {
  padding-top: 54px;
  &.no-header {
    padding-top: 0;
  }
}
</style>
