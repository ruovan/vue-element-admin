<template>
  <div class="fillcontain">
    <div class="contain" ref="contain">
      <div class="errPage-container cflex wflex">
        <img class="errorImg" :src="errorImg" />
        <div>
          <p class="errorTitle">401</p>
          <p class="errorTro">抱歉,您没有权限访问该页面。</p>
          <router-link :to="{ path: '/' }">
            <el-button type="primary">返回首页</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorImg from '@/assets/error_images/401.png'

export default {
  name: 'page401',
  data() {
    return {
      errorImg: errorImg
    }
  }
}
</script>
<style lang="scss" scoped>
.contain {
  height: calc(100vh - 100px);
  .errPage-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      line-height: 50px;
    }
    .errorImg {
      width: 286px;
      height: 325px;
      margin-bottom: 10px;
    }
    .errorTitle {
      color: rgba(0, 0, 0, 0.85);
      font-size: 48px;
    }
    .errorTro {
      color: rgba(0, 0, 0, 0.45);
      font-size: 24px;
    }

    .router-link-active:hover {
      color: #a9d86e;
      text-decoration: underline;
    }
  }
}
</style>
