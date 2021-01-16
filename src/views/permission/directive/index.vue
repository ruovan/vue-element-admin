<template>
  <el-card class="directive-container">
    <div class="message">
      <switch-roles @change="handleRolesChange" class="roles-msg" />
      <div :key="key" class="roles-msg">
        <div>
          <span v-permission="['admin']" class="permission-alert">
            只有
            <el-tag class="permission-tag" size="small">管理员</el-tag>
            可以看到这条消息
          </span>
          <el-tag
            v-permission="['admin']"
            class="permission-sourceCode"
            type="info"
          >
            v-permission="['admin']"
          </el-tag>
        </div>

        <div>
          <span v-permission="['editor']" class="permission-alert">
            只有
            <el-tag class="permission-tag" size="small"
              >普通用户可以看到</el-tag
            >
            可以看到这条消息
          </span>
          <el-tag
            v-permission="['editor']"
            class="permission-sourceCode"
            type="info"
          >
            v-permission="['editor']"
          </el-tag>
        </div>

        <div>
          <span v-permission="['admin', 'editor']" class="permission-alert">
            <el-tag class="permission-tag" size="small">管理员</el-tag>、
            <el-tag class="permission-tag" size="small">普通用户</el-tag>
            都可以看到
          </span>
          <el-tag
            v-permission="['admin', 'editor']"
            class="permission-sourceCode"
            type="info"
          >
            v-permission="['admin','editor']"
          </el-tag>
        </div>
      </div>
    </div>
    <el-divider></el-divider>

    <div :key="'checkPermission' + key" class="footer-msg">
      <el-tabs type="border-card" style="width:600px;">
        <el-tab-pane v-if="checkPermission(['admin'])" label="管理员">
          管理员可以看到
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['editor'])" label="普通用户">
          普通用户可以看到
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['admin', 'editor'])"
          label="管理员和普通用户"
        >
          管理员和普通用户都可以看到
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
      <div class="tooltip-msg">
        在某些情况下，使用
        <el-tag>v-permission</el-tag>
        将没有效果。<br />
        例如：ElementUI的Tab组件或el-table列以及其他动态呈现dom的场景。
        你只能用v-if来做这个
      </div>
    </div>
  </el-card>
</template>

<script>
// 导入权限判断指令
import permission from '@/directive/permission/index.js'
// 导入权限判断函数
import checkPermission from '@/utils/permission'
// 切换权限组件
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'DirectivePermission',
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.directive-container {
  ::v-deep .permission-alert {
    display: inline-block;
    // width: 320px;
    font-weight: bold;
    color: #67c23a;
    padding: 8px 16px;
    margin-top: 15px;
    border-radius: 4px;
    background-color: #f2ebf9;
  }
  ::v-deep .permission-sourceCode {
    margin-left: 15px;
  }
  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
  .message {
    display: flex;
    justify-content: flex-start;
  }
  .roles-msg {
    margin-bottom: 30px;
    margin-right: 30px;
    padding: 20px;
    border-radius: 12px;
    background-color: #ffffff;
    // box-shadow: inset 0px 0px 12px -3px #333;
  }
}
.footer-msg {
  width: 800px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
  height: 200px;
  border-radius: 12px;
  background-color: #ffffff;
  // box-shadow: inset 0px 0px 12px -3px #333;
}
.tooltip-msg {
  margin-left: 15px;
  padding: 5px;
}
</style>
