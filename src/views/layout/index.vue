<template>
  <div class="layout-container" :class="classObj">
    <!-- 当显示为mobile设备时，隐藏侧边栏处理 -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <el-header>
      <!-- 顶部：导航区域 -->
      <navbar class="navbar-container" />
    </el-header>
    <!-- 左侧：侧边栏区域 -->
    <sidebar class="sidebar-container" />

    <!-- 右侧：内容区域 -->
    <app-main class="main-container" />
  </div>
</template>

<script>
// import { AppMain, Sidebar } from './components'
import AppMain from './components/AppMain/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Navbar
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

<style scoped lang="scss"></style>
