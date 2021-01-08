<template>
  <div class="sidebar-container">
    <!-- 侧边栏Logo -->
    <sidebar-logo :collapse="isCollapse"></sidebar-logo>
    <!-- 侧边栏导航 -->
    <el-menu
      router
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <!-- 菜单项组件 -->
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
export default {
  name: 'Sidebar',
  components: {
    SidebarLogo,
    SidebarItem
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {
    routes() {
      return this.$router.options.routes
    },
    // 判断侧边栏是否折叠
    isCollapse() {
      return false
    }
  }
}
</script>

<style scoped lang="less"></style>
