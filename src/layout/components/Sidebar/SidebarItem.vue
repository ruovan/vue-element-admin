<template>
  <div class="sidebar-item-container" v-if="!item.hidden">
    <!-- 判断是否只有一个子菜单项 -->
    <!--
        当
          hasOneShowingChild 只有一个子项或没有子项
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) 子项没有子项或者子项没有显示的子项
          !item.alwaysShow 判断该菜单项没有设置始终显示
        时，通过
    -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <el-menu-item
        :index="resolvePath(onlyOneChild.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <i :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"></i>
        <span slot="title">{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </template>
    <!-- 有多个子级菜单项 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <!-- 先显示标题 -->
      <template slot="title">
        <i :class="item.meta && item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <!-- 再对自身进行sidebar-item处理，即子项菜单的嵌套处理 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
export default {
  name: 'SidebarItem',
  props: {
    // 路由对象
    item: {
      type: Object,
      required: true
    },
    // 是否嵌套
    isNest: {
      type: Boolean,
      default: false
    },
    // 基准地址
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // 对每一菜单项进行过滤，返回一个新数组
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          // 如果子菜单项设置为隐藏的，则跳过
          return false
        } else {
          // 将该菜单项的子项赋值给onlyOneChild
          this.onlyOneChild = item
          return true
        }
      })

      // 如果showingChildren长度为1，则表示只有一个子项
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有子级路由，则显示父级路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    // 处理路径。判断是否是外链
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style scoped lang="scss"></style>
