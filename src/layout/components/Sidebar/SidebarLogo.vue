<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <!-- 侧边栏折叠的情况下,collapse为true -->
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <!-- 如果有logo,则优先展示logo;没有logo则展示title -->
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <!-- 侧边栏展开的情况下,collapse为false -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- 有logo则展示logo,title始终展示 -->
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Vue Admin Template',
      logo:
        'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #ff9f1c;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
    }

    & .sidebar-title {
      font-size: 14px;
    }
  }
  // 侧边栏折叠情况下，该样式生效
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
