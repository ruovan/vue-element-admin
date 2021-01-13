<template>
  <el-card class="split-pane-container">
    <split-pane split="vertical" @resize="resize">
      <template slot="paneL">
        <div class="left-container" />
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container" />
          </template>
          <template slot="paneR">
            <div class="bottom-container" />
          </template>
        </split-pane>
      </template>
    </split-pane>
  </el-card>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'SplitpaneDemo',
  components: { splitPane },
  methods: {
    // 大小改变触发事件
    resize() {}
  }
}
</script>

<style lang="scss" scoped>
.split-pane-container {
  position: relative;
  height: 88vh;
}
// scss中需要使用 ::v-deep 替换 /deep/ 或者 >>>
::v-deep .el-card__body {
  position: relative;
  height: 88vh;
}
.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
