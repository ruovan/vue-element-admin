<template>
  <div class="layout-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <sidebar></sidebar>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <app-main></app-main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import { AppMain, Sidebar } from './components'
import AppMain from './components/AppMain/index.vue'
import Sidebar from './components/Sidebar/index.vue'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar
  },
  data() {
    return {}
  },
  created() {
    this.show()
  },
  mounted() {},
  methods: {
    show() {
      console.log(this.$router.options.routes)
    }
  }
}
</script>

<style scoped lang="less">
.el-side {
  // height: 100vh;
}
.el-main {
  height: 100vh;
}
</style>
