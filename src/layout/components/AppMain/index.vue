<template>
  <div class="app-main-container">
    <div :class="{ 'fixed-header': fixedHeader }">
      <navbar></navbar>
    </div>
    <div class="app-main">
      <!-- 动画切换 -->
      <transition name="fade-transform" mode="out-in">
        <!-- 路由出口 -->
        <router-view :key="key" />
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  name: 'AppMain',
  components: {
    Navbar
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    key() {
      return this.$route.path
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    }
  }
}
</script>
<style scoped lang="scss">
@import '@/styles/variables.scss';
.app-main-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .fixed-header + .app-main {
    min-height: calc(100vh - 50px);
    margin-top: 50px;
    padding: 15px;
  }
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
// el-dialog修正
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
