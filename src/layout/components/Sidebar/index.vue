<template>
  <div class="sidebar">
    <!-- 侧边栏Logo -->
    <sidebar-logo :collapse="isCollapse"></sidebar-logo>
    <!-- 侧边栏导航 -->
    <el-menu
      router
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
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
import { mapGetters } from 'vuex'
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
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
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
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
    // 是否显示logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // 样式变量
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
