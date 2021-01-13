<template>
  <!-- sidebar-container -->
  <div>
    <!-- 侧边栏导航 -->
    <el-menu
      router
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
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/light.scss'
// import variables from '@/styles/dark.scss'
export default {
  name: 'Sidebar',
  components: {
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
        subMenuActiveText: '#FFD166'
      }
    }
  },
  created() {
    this.show()
  },
  methods: {
    show() {
      // console.log(variables)
    }
  },
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
