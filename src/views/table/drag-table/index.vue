<template>
  <el-card class="drag-table-container">
    <el-alert
      show-icon
      type="info"
      title="可拖拽行以改变表格排序"
      style="margin-bottom:20px;"
    />
    <!-- 注意：为了获得正确的行顺序，row-key是必需的 -->
    <el-table
      ref="dragTableRef"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- 序号，拖拽后，序号排序会变 -->
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <!-- 日期 -->
      <el-table-column width="180px" align="center" label="日期">
        <template slot-scope="{ row }">
          <span>{{ row.display_time }}</span>
        </template>
      </el-table-column>
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
      <!-- 重要程度 -->
      <el-table-column width="100px" label="指数" align="center">
        <template slot-scope="{ row }">
          <i v-for="n in +row.importance" :key="n" class="el-icon-star-on"></i>
        </template>
      </el-table-column>
      <!-- 阅读量 -->
      <el-table-column align="center" label="阅读量" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.pageviews }}</span>
        </template>
      </el-table-column>
      <!-- 可拖拽 -->
      <el-table-column align="center" label="拖拽" width="80">
        <template slot-scope="{}">
          <i class="el-icon-rank drag-icon"></i>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// TODO:
import { fetchTableList } from '@/api/table'
// 引入用于排序的模块
import Sortable from 'sortablejs'

export default {
  name: 'DragTable',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      // 查询参数
      listQuery: {
        page: 2,
        limit: 7
      },
      sortable: null
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
      const { data } = await fetchTableList(this.listQuery)
      this.list = data.items
      this.total = data.total

      this.listLoading = false
      // 数据改变后执行
      this.$nextTick(() => {
        this.setSort()
      })
    },
    // TODO:
    // 拖拽事件
    setSort() {
      // 获取 tbody 元素中的 每一行
      const el = this.$refs.dragTableRef.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      console.log(el)
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        dragClass: 'sortable-drag',
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        // 结束拖拽
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }
}
</script>

<style>
/* 被拖拽的行的样式 */
.sortable-ghost {
  color: #fff !important;
  background: #2985ee !important;
}
.sortable-drag {
  /* 隐藏被鼠标拾起的拖拽项 */
  opacity: 0;
}
</style>

<style scoped>
.drag-table-container {
  cursor: pointer;
  user-select: none;
}
.drag-icon {
  font-size: 30px;
  cursor: pointer;
}
</style>
