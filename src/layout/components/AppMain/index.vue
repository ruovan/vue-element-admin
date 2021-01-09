<template>
  <div class="app-main-container">
    <div :class="{ 'fixed-header': fixedHeader }">
      <navbar />
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
<style scoped lang="scss"></style>
