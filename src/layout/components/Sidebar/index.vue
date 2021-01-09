<template>
  <!-- sidebar-container -->
  <div :class="{ 'has-logo': showLogo }">
    <!-- 侧边栏Logo -->
    <!-- 通过showLogo控制Logo是否展示，通过isCollapse控制logo显示（图标+标题） -->
    <sidebar-logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 侧边栏导航 -->
    <el-menu
      router
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="false"
      :background-color="colors.menuBg"
      :text-color="colors.menuText"
      :active-text-color="colors.menuActiveText"
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
export default {
  name: 'Sidebar',
  components: {
    SidebarLogo,
    SidebarItem
  },
  data() {
    return {
      // 定义 el-menu 的颜色
      colors: {
        // 菜单项背景色
        menuBg: '#2541b2',
        // 菜单项文字颜色
        menuText: '#ffffff',
        // 激活菜单项的颜色
        menuActiveText: '#FFD166'
      }
    }
  },
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
    // 判断侧边栏是否折叠
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped lang="scss"></style>
