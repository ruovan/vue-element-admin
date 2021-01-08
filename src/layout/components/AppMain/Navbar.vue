<template>
  <div class="navbar-container">
    <span class="hamburger-container" @click="toggleSideBar">
      <i v-if="isCollapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </span>
    <!-- 面包屑导航区域 -->
    <breadcrumb class="breadcrumb-container" />
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
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Navbar',
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
    // 退出登录
    async logout() {
      console.log(this.name)
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

<style scoped lang="scss">
.navbar-container {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px -2px #111;

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    font-size: 26px;
    padding-left: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    // 下拉菜单样式
    .avatar-container {
      margin-right: 30px;
      // 头像
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        // 图片
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        // 下拉图标
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
