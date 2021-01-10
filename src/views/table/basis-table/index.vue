<template>
  <el-card class="table-container">
    <el-alert
      show-icon
      type="info"
      title="表格数据的获取与显示，排序只能对当前页的数据进行排序;通过定时器模仿了请求数据时的加载过程"
      style="margin-bottom:20px;"
    />
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      >
      <!-- 排序必要属性：prop -->
      <!-- 对id序号进行sort-orders排序,传入数组参数，里面是顺序 -->
      <!-- 参数可为： ['ascending', 'descending', null]-->
      <el-table-column
        align="center"
        label="序号"
        width="95"
        prop="id"
        sortable
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <!-- 对pageview使用sort-method进行排序 -->
      <el-table-column
        label="浏览量"
        width="110"
        align="center"
        sortable
        :sort-method="sortByPageview"
        prop="pageview"
      >
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag effect="dark" :type="scope.row.status | statusTypeFilter">{{
            scope.row.status | statusTextFilter
          }}</el-tag>
        </template>
      </el-table-column>
      <!-- 使用 sort-by 对时间进行排序，传入时间参数 -->
      <!-- 这里的时间不能使用sort-orders进行排序 -->
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
        sortable
        :sort-by="display_time"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </el-card>
</template>

<script>
// 导入分页组件
import Pagination from '@/components/Pagination'
// 导入请求方法
import { fetchTableList } from '@/api/table'
export default {
  name: 'BasisTable',
  components: {
    Pagination
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      this.listLoading = true
      fetchTableList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // 模仿请求等待过程，1.5s 后加载进度标识结束
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 对 pageviews 的另一种排序处理
    sortByPageview(obj1, obj2) {
      const pageview1 = obj1.pageviews
      const pageview2 = obj2.pageviews
      return pageview1 - pageview2
    }
  },
  filters: {
    statusTypeFilter(status) {
      const statusMap = {
        approval: 'success',
        unApproval: 'danger',
        toBeApproval: 'info'
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      const statusMap = {
        approval: '已审核',
        unApproval: '未审核',
        toBeApproval: '审核中'
      }
      return statusMap[status]
    }
  }
}
</script>

<style scoped lang="scss"></style>
