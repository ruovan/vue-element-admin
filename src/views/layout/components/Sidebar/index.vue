<template>
  <!-- sidebar-container -->
  <div>
    <!-- 侧边栏导航 -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="false"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.subMenuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <!-- 菜单项组件 -->
      <sidebar-item
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  computed: {
    // TODO:注意，这里在进行权限设置后，要从permission_routes中获取路由，而不是routes了
    ...mapGetters(['permission_routes', 'sidebar']),
    // 进行权限控制后，该属性可取消
    // routes() {
    //   return this.$router.options.routes
    // },
    // 当前激活菜单项
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    // 判断侧边栏是否折叠
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped lang="scss"></style>
