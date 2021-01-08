<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <!-- model:用于绑定表单数据对象 -->
    <!-- rules：表单验证规则对象，具体规则，通过表单项的prop属性接收 -->
    <!-- ref: 用获取该表单实例对象-->
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginFormRules"
      ref="loginFormRef"
      label-position="left"
    >
      <!-- 标题 -->
      <h3 class="title">vue-element-admin</h3>
      <!-- 用户名表单项 -->
      <el-form-item prop="username">
        <!-- tabindex键盘tab键光标移动顺序，从小到大 -->
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          tabindex="1"
        />
      </el-form-item>
      <!-- 密码表单项 -->
      <el-form-item prop="password">
        <el-input
          name="password"
          type="password"
          @keyup.enter.native="onLogin"
          v-model="loginForm.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          tabindex="2"
          show-password
        />
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;"
          :loading="loading"
          @click.native="onLogin"
        >
          登录
        </el-button>
      </el-form-item>
      <!-- 提示信息 -->
      <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span> 密码: admin</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 表单绑定数据
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '用户名长度至少为3', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '密码长度至少为5', trigger: 'blur' }
        ]
      },
      // 控制加载进度显示
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 登录事件
    onLogin() {
      // 进行表单验证
      this.$refs.loginFormRef.validate(valid => {
        // 表单验证通过，valid为true，验证不通过为false
        if (valid) {
          this.loading = true
          // 发送请求以登录
          // 调用vuex中的异步函数Login，用于登录
          // 需要传入当前表单数据
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(async () => {
              // 登录成功
              this.loading = false
              await this.$router.push({ path: this.redirect || '/' })
              this.$notify.success({
                title: '登录成功',
                message: '当前账户：' + this.$store.getters.name,
                position: 'top-left'
              })
            })
            .catch(() => {
              // 登录失败
              this.loading = false
            })
        } else {
          // 表单验证失败
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 背景渐变颜色
$color: rgba(6, 214, 160, 0.5) 25%, rgba(0, 126, 167, 0.5) 25%,
  rgba(0, 126, 167, 0.5) 50%, rgba(6, 214, 160, 0.5) 50%,
  rgba(6, 214, 160, 0.5) 75%, rgba(0, 126, 167, 0.5) 70%,
  rgba(0, 126, 167, 0.5) 100%;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: -webkit-linear-gradient(45deg, $color),
    -webkit-linear-gradient(-45deg, $color);
  background-size: 66px 66px;
  .login-form {
    width: 520px;
    padding: 35px;
    border-radius: 12px;
    color: rgb(61, 49, 91);
    background-color: rgba(61, 49, 91, 0.8);
    transition: display 0.5s;
  }
  .tips {
    text-align: center;
    font-size: 14px;
    color: #fff;
    margin: 10px 0;
    span {
      &:first-of-type {
        padding-right: 25px;
      }
    }
  }
  .title {
    font-size: 26px;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
