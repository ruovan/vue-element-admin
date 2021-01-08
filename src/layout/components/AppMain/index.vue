<template>
  <div class="appmain-container">
    <navbar></navbar>
    <!-- 动画切换 -->
    <transition name="el-fade-in-linear" mode="out-in">
      <!-- 路由出口 -->
      <router-view :key="key" />
    </transition>
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
    }
  }
}
</script>

<style scoped lang="less"></style>
