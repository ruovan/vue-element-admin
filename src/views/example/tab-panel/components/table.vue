<template>
  <el-table :data="list" border fit class="tab-panel">
    <el-table-column align="center" label="序号" type="index" width="65">
    </el-table-column>
    <!-- 标题 -->
    <el-table-column label="标题">
      <template slot-scope="{ row }">
        <span>{{ row.title }}</span>
      </template>
    </el-table-column>
    <!-- 日期 -->
    <el-table-column align="center" label="日期">
      <template slot-scope="{ row }">
        <span>{{ row.display_time }}</span>
      </template>
    </el-table-column>
    <!-- 类型 -->
    <el-table-column align="center" label="类型" width="95">
      <template slot-scope="{ row }">
        <span>{{ row.type }}</span>
      </template>
    </el-table-column>
    <!-- 阅读量 -->
    <el-table-column align="center" label="阅读量" width="95">
      <template slot-scope="{ row }">
        <span>{{ row.pageviews }}</span>
      </template>
    </el-table-column>
    <!-- 作者 -->
    <el-table-column width="110px" align="center" label="作者">
      <template slot-scope="{ row }">
        <span>{{ row.author }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchTableList } from '@/api/table'

export default {
  props: {
    type: {
      type: String,
      default: 'JavaScript'
    }
  },
  data() {
    return {
      // 存储数据
      list: null,
      // 查询参数
      listQuery: {
        page: 1,
        limit: 6,
        type: this.type,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取表格数据
    async getList() {
      // 发起请求
      const { data } = await fetchTableList(this.listQuery)
      this.list = data.items
    }
  }
}
</script>
