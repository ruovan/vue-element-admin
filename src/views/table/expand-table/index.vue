<template>
  <el-card class="expand-table-container">
    <el-alert
      show-icon
      type="info"
      title="可通过表格左侧箭头展开；也可通过单击行以展开，单击行展开具有排他性"
      style="margin-bottom:20px;"
    />
    <!-- 注意：为了获得正确的行顺序，row-key是必需的 -->
    <el-table
      ref="expandTableRef"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%"
      @row-click="rowClick"
    >
      <!-- 添加展开列 -->
      <el-table-column inline type="expand" width="50">
        <!-- 展开列里面的内容 -->
        <template slot-scope="{ row }">
          <!-- 添加栅格布局 -->
          <div v-html="row.content"></div>
          <div>
            <h3>描述内容</h3>
            <article class="expand-content">{{ row.paragraph }}</article>
          </div>
        </template>
      </el-table-column>
      <!-- 序号-->
      <el-table-column align="center" label="序号" type="index" width="65" />
      <!-- 标题 -->
      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{ row }">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <!-- 作者 -->
      <el-table-column width="110px" align="center" label="作者">
        <template slot-scope="{ row }">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <!-- 阅读量 -->
      <el-table-column align="center" label="阅读量" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'ExpandTable',
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      // 查询参数
      listQuery: {
        page: 2,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取表格数据
    async getList() {
      this.listLoading = true
      // 发起请求
      const { data } = await fetchList(this.listQuery)
      this.list = data.items
      this.total = data.total

      this.listLoading = false
    },
    // table的点击事件，通过点击行以展开
    rowClick(row, index, e) {
      const $table = this.$refs.expandTableRef
      // 排他，关闭非当前点击行的展开项
      this.list.map(item => {
        if (row.id !== item.id) {
          $table.toggleRowExpansion(item, false)
        }
      })
      // 当前点击行展开
      $table.toggleRowExpansion(row)
    }
  }
}
</script>

<style scoped>
.expand-table-container {
  cursor: pointer;
  user-select: none;
}
.expand-content {
  line-height: 20px;
  letter-spacing: 2px;
  font-family: cursive;
  font-size: 16px;
}
</style>
