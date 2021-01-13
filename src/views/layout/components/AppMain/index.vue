<template>
  <div>
    <div class="app-navbar">
      <!-- 导航栏 -->
      <span class="hamburger-container" @click="toggleSideBar">
        <i v-if="isCollapse()" class="el-icon-s-unfold"></i>
        <i v-else class="el-icon-s-fold"></i>
      </span>
      <!-- 面包屑导航区域 -->
      <breadcrumb class="breadcrumb-container" />
    </div>
    <!-- 动画切换 -->
    <transition name="fade-transform" mode="out-in">
      <!-- 路由出口 -->
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  data() {
    return {}
  },
  methods: {
    // 切换侧边栏状态
    toggleSideBar() {
      // 点击切换侧边栏折叠、展开
      this.$store.dispatch('app/toggleSideBar')
    },
    // 判断侧边栏是否折叠
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    key() {
      return this.$route.path
    }
  }
}
</script>
<style scoped lang="scss"></style>
