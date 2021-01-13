<template>
  <div class="operate-container">
    <el-card>
      <!-- 提示信息 -->
      <el-alert
        show-icon
        title="文章分类列的头部使用的是ElementUI自带的筛选，不请求数据，只对当前页显示的数据进行筛选，翻页后筛选属性依然存在;"
        type="success"
        style="margin-bottom:20px;"
      />
      <el-alert
        show-icon
        title="文章状态一列可点击文章状态以切换状态，双击文章标题可编辑"
        type="info"
        style="margin-bottom:20px;"
      />
      <!-- 搜索区域 -->
      <el-row style="margin-bottom: 20px;">
        <el-col :span="3">
          <!-- 排序 -->
          <el-select v-model="listQuery.sort" @change="handleSearch">
            <el-option
              v-for="item in sortOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-col>
        <el-col :span="3">
          <!-- 语言 -->
          <el-select v-model="listQuery.type" placeholder="语言" clearable>
            <el-option
              v-for="item in codeTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-col>
        <!-- 搜索 -->
        <el-col :span="6">
          <!-- 这里键盘抬起事件必须加.native，原因暂不清楚 -->
          <el-input
            placeholder="请输入内容"
            v-model="listQuery.title"
            clearable
            @keyup.enter.native="handleSearch"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            />
          </el-input>
        </el-col>
        <el-col :span="3" :offset="9">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate">
            添加
          </el-button>
        </el-col>
      </el-row>
      <!-- 表格数据 -->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        ref="operateTableRef"
        stripe
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <!-- id号 -->
        <el-table-column
          label="编号"
          prop="id"
          align="center"
          width="80"
          :class-name="getSortClass('id')"
        >
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <!-- 标题 : 双击标题可编辑-->
        <el-table-column label="标题" min-width="120px">
          <template slot-scope="{ row }">
            <template v-if="row.edit">
              <el-input v-model="row.title" size="mini">
                <el-button
                  slot="append"
                  icon="el-icon-check"
                  @click="confirmChangeTitle(row)"
                />
              </el-input>
            </template>
            <span v-else @dblclick="dblclickTitle(row)">{{ row.title }}</span>
          </template>
        </el-table-column>
        <!-- 作者 -->
        <el-table-column label="作者" width="80px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>

        <!-- 重要性指数 -->
        <el-table-column
          label="分类"
          width="100px"
          align="center"
          :filters="[
            { text: 'JavaScript', value: 'JavaScript' },
            { text: 'JAVA', value: 'JAVA' },
            { text: 'Python', value: 'Python' },
            { text: 'C语言', value: 'C语言' }
          ]"
          :filter-multiple="false"
          :filter-method="filterType"
          filter-placement="bottom-end"
        >
          <template slot-scope="{ row }">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>
        <!-- 阅读量 -->
        <el-table-column label="阅读量" align="center" width="95">
          <template slot-scope="{ row }">
            <span v-if="row.pageviews">{{ row.pageviews }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column
          label="状态"
          class-name="status-col"
          width="100"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-dropdown trigger="click" @command="handleStatus">
              <el-button size="mini" :type="row.status | statusTypeFilter">
                {{ row.status | statusTextFilter }}
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(status, index) in statusOptions"
                  :key="index"
                  :command="composeCommandValue(row, status)"
                  >{{ status | statusTextFilter }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          label="操作"
          align="center"
          width="280"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleUpdate(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="row.status != 'deleted'"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(row, $index)"
            >
              删除
            </el-button>
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

    <!-- 信息对话框：用于添加或者编辑 -->
    <!-- 通过 dialogStatus 判断当前对话框是 添加文章 还是 编辑文章 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataFormRef"
        :rules="tableDataFormRules"
        :model="temp"
        label-position="right"
        label-width="80px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- 选择类别 -->
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" placeholder="请选择类型">
            <el-option
              v-for="item in codeTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <!-- 日期 -->
        <el-form-item label="日期" prop="display_time">
          <el-date-picker
            v-model="temp.display_time"
            type="datetime"
            placeholder="请选择一个日期"
          />
        </el-form-item>
        <!-- 标题 -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-select v-model="temp.status" placeholder="请选择状态">
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item | statusTextFilter"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!-- 重要程度 -->
        <el-form-item label="重要程度">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <!-- 留言 -->
        <el-form-item label="评论">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入留言"
          />
        </el-form-item>
      </el-form>
      <!-- 底部按钮栏 -->
      <div slot="footer" class="dialog-footer">
        <!-- 确认按钮 -->
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
        <!-- 取消按钮 -->
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入接口文件
import {
  fetchList,
  createArticle,
  updateArticle,
  deleteArticle
} from '@/api/article'
// 引入分页组件
import Pagination from '@/components/Pagination'
// 类型参数
const codeTypeOptions = [
  { key: 'JavaScript', display_name: 'JavaScript' },
  { key: 'JAVA', display_name: 'JAVA' },
  { key: 'Python', display_name: 'Python' },
  { key: 'C语言', display_name: 'C语言' }
]

export default {
  name: 'OperateTable',
  components: { Pagination },
  // 过滤器，对状态进行过滤
  filters: {
    // 对el-tag类型
    statusTypeFilter(status) {
      const statusMap = {
        approval: 'success',
        unApproval: 'danger',
        toBeApproval: 'info'
      }
      return statusMap[status]
    },
    // 对status文字
    statusTextFilter(status) {
      const statusMap = {
        approval: '已审核',
        unApproval: '未审核',
        toBeApproval: '审核中'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 表格key值
      tableKey: 0,
      // 表格数据
      list: null,
      // 总页数
      total: 0,
      // 加载状态
      listLoading: true,
      // 查询参数
      listQuery: {
        // 页数
        page: 1,
        // 每页数量
        limit: 20,
        // 重要程度/指数
        importance: undefined,
        // 标题
        title: undefined,
        // 类型
        type: undefined,
        // 编号排序
        sort: '+id'
      },
      // 类型参数
      codeTypeOptions,
      // 排序参数
      sortOptions: [
        { label: '顺序排序', key: '+id' },
        { label: '逆序排序', key: '-id' }
      ],
      // 双击标题可编辑。使用单一标识会导致所有标题响应事件
      // articleEdit: true,
      // 状态参数
      statusOptions: ['approval', 'unApproval', 'toBeApproval'],
      // 用于弹出对话框的数据
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        // 日期，默认为当前时间
        timestamp: new Date(),
        title: '',
        type: '',
        status: ''
      },
      // 控制对话框的显示
      dialogFormVisible: false,
      // 控制对话框的状态，添加数据对话框 | 更新数据对话框
      dialogStatus: '',
      // 更具用户点击的处理函数，对 dialogStatus 进行赋值操作
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      // 验证规则
      tableDataFormRules: {
        type: [{ required: true, message: '必须选择类型', trigger: 'blur' }],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: '必须选择一个日期',
            trigger: 'blur'
          }
        ],
        title: [{ required: true, message: '必须填写标题', trigger: 'blur' }]
      }
    }
  },
  created() {
    // 页面创建即调用函数getList
    this.getList()
  },
  methods: {
    // 获取表格列表数据
    getList() {
      this.listLoading = true
      // 发起请求
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // 下面代码是为：双击文字标题进行行内编辑 服务的，为list新增一个edit属性
        this.list = response.data.items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
      })

      this.listLoading = false
    },
    // 对分类进行过滤
    filterType(value, row) {
      return row.type === value
    },
    // 搜索栏的搜索事件
    handleSearch() {
      // 搜索结果都显示在第一页，重新开始排列
      this.listQuery.page = 1
      // 根据新的查询参数，重新调用获取表格数据函数
      this.getList()
    },
    // 箭头el-table上的sort-change事件
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        // 如果对id列进行排序，则调用sortByID函数
        this.sortByID(order)
      }
    },
    // 对order列的 id 属性进行排序
    sortByID(order) {
      // 根据状态赋值查询参数的 sort属性
      if (order === 'ascending') {
        // 顺序
        this.listQuery.sort = '+id'
      } else {
        // 逆序
        this.listQuery.sort = '-id'
      }
      // 调用搜索函数
      this.handleSearch()
    },
    // 改变状态
    handleStatus({ row, status }) {
      // 解构command对象，将选择的status复制给row.status，以更新文章状态
      row.status = status
    },
    // 对el-dropdown-item的command指令添加多个参数，并返回一个对象
    composeCommandValue(row, status) {
      return {
        row,
        status
      }
    },
    // 双击标题事件
    dblclickTitle(row) {
      this.list.map(item => {
        // 关闭其它项
        this.confirmChangeTitle(item)
      })
      // 变为可编辑状态
      row.edit = true
    },
    // 确认更改标题信息
    confirmChangeTitle(row) {
      // 判断当前项是否处于编辑状态，服务于dblclickTitle的关闭其它项
      if (row.edit) {
        // 判断当前项是否有填写标题
        if (!row.title) {
          row.title = '你没有填写标题'
        }
      }
      // 退出编辑状态
      row.edit = false
    },
    // 重置对话框数据为空
    resetTemp() {
      // 将所有参数重置为初识
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: '',
        type: ''
      }
    },
    // 添加数据
    handleCreate() {
      // 添加数据前，将对话框数据重置
      this.resetTemp()
      // 添加数据将 dialogStatus 赋值为 create
      this.dialogStatus = 'create'
      // 打开对话框
      this.dialogFormVisible = true
      this.$nextTick(() => {
        // 移除表单项的校验结果
        this.$refs.dataFormRef.clearValidate()
      })
    },
    createData() {
      this.$refs.dataFormRef.validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功添加数据',
              message: '成功添加数据',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 更新数据
    handleUpdate(row) {
      // 更新数据的操作，需要将当前点击项的数据复制给 temp 对话框数据
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      // 编辑操作，将 dialogStatus 赋值为 update
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataFormRef.clearValidate()
      })
    },
    updateData() {
      this.$refs.dataFormRef.validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '更新数据成功',
              message: '更新数据成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 删除数据
    handleDelete(row, index) {
      this.$confirm('此操作将删除数据, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'error',
        showClose: false,
        cancelButtonClass: 'btn-custom-cancel'
      }).then(() => {
        // 根据id删除数据
        console.log(row.id)
        deleteArticle(row.id)
          .then(response => {
            this.$notify({
              title: '删除数据成功',
              message: '删除数据成功',
              type: 'success',
              duration: 2000
            })
            // 刷新页面，重新获取数据
            this.getList()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
<style lang="scss" scoped>
.operate-container {
  cursor: pointer;
  user-select: none;
}
</style>
