<template>
  <div class="drag-dialog-container">
    <el-button type="primary" @click="dialogTableVisible = true">
      打开拖拽对话框
    </el-button>
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogTableVisible"
      :show-close="false"
      center
      title="拖拽对话框"
    >
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" />
        <el-table-column property="name" label="姓名" />
        <el-table-column property="address" label="地址" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 拖拽指令
import elDragDialog from '@/directive/el-drag-dialog'

export default {
  name: 'DragDialogDemo',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      value: '',
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
