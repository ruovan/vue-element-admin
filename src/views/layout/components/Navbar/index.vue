<template>
  <div class="navbar-container">
    <!-- 左侧logo -->
    <navbar-logo :collapse="isCollapse()" />
    <!-- 右侧信息栏 -->
    <div class="right-menu">
      <!-- 头像下拉菜单 -->
      <el-dropdown class="avatar-container" trigger="click">
        <!-- 头像 -->
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <!-- 下拉菜单项 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <a href="javascript:;">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a href="javascript:;">
            <el-dropdown-item>文档</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarLogo from './NavbarLogo.vue'
export default {
  name: 'Navbar',
  components: {
    NavbarLogo
  },
  data() {
    return {}
  },
  methods: {
    // 退出登录
    async logout() {
      // 发起退出登录请求
      this.$notify.success({
        title: '退出成功',
        message: '注销账户:' + this.name,
        position: 'top-left'
      })
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 判断侧边栏是否折叠
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name'])
  }
}
</script>

<style scoped lang="scss"></style>
