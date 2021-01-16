<template>
  <div>
    <div style="margin-bottom:15px;">
      当前角色: <strong>{{ roles == 'admin' ? '管理员' : '普通用户' }}</strong>
    </div>
    切换角色：
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor">普通用户</el-radio-button>
      <el-radio-button label="admin">管理员</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      // 从vuex中获取roles
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        // 调用vuex中actions方法，切换用户
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
