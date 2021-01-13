<template>
  <div>
    <!-- 拖拽对话框 -->
    <el-card class="drag-dialog-container" style="text-align:center;">
      <el-button type="primary" @click="dialogTableVisible = true">
        打开拖拽对话框
      </el-button>
      <el-dialog
        v-el-drag-dialog
        :visible.sync="dialogTableVisible"
        :show-close="false"
        :lock-scroll="false"
        center
        title="对话框可拖拽"
      >
        <el-table :data="gridData">
          <!-- 标题 -->
          <el-table-column min-width="300px" label="标题">
            <template slot-scope="{ row }">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <!-- 日期 -->
          <el-table-column width="180px" align="center" label="日期">
            <template slot-scope="{ row }">
              <span>{{ row.display_time }}</span>
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
              <i
                v-for="n in +row.importance"
                :key="n"
                class="el-icon-star-on"
              ></i>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>

    <!-- 拖拽列表 -->
    <el-card class="dnd-list-container">
      <div class="editor-container">
        <dnd-list
          :list1="list1"
          :list2="list2"
          list1-title="List"
          list2-title="Article pool"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
// 拖拽指令
import elDragDialog from '@/directive/el-drag-dialog'
// drag and drop List 组件
import DndList from '@/components/DndList'
import { fetchList } from '@/api/article'

export default {
  name: 'DndListDemo',
  components: { DndList },
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      value: '',
      // 存储对话框数据
      gridData: [],
      // 左列表数据
      list1: [],
      // 右列表数据
      list2: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list1 = response.data.items.splice(0, 5)
        this.list2 = response.data.items
        this.gridData = response.data.items.splice(0, 7)
      })
    }
  }
}
</script>
