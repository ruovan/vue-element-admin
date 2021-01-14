<template>
  <el-card class="permission-container">
    <span>权限切换：</span>
    <el-switch
      v-model="permission"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="admin"
      inactive-text="editor"
      @change="changePermission"
    >
    </el-switch>
  </el-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Permission',
  data() {
    return {
      permission: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    changePermission(value) {
      // value: true:admin | false:editor
      console.log(value)
      if (value) {
        console.log(this.$store)
        this.$store.commit('user/SET_ROLES', 'editor')
      }
    }
  },
  computed: {
    ...mapMutations(['SET_ROLES'])
  }
}
</script>

<style scoped lang="scss">
.permission-container {
  font-size: 20px;
}
</style>
