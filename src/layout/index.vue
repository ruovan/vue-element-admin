<template>
  <div class="layout-container" :class="classObj">
    <!-- 当显示为mobile设备时，隐藏侧边栏处理 -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />
    <!-- 内容区域 -->
    <div class="main-container">
      <!-- 主体内容 -->
      <app-main />
    </div>
  </div>
</template>

<script>
// import { AppMain, Sidebar } from './components'
import AppMain from './components/AppMain/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar
  },
  mixins: [ResizeMixin],
  data() {
    return {}
  },
  methods: {
    // 点击外部遮罩层，隐藏侧边栏面板
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.layout-container {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
