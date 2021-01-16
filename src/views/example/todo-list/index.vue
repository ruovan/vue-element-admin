<template>
  <el-card>
    <section class="todoapp">
      <!-- 添加框 -->
      <header class="header">
        <input
          class="new-todo"
          autocomplete="off"
          placeholder="请输入"
          @keyup.enter="addTodo"
        />
      </header>
      <!-- 内容显示区域 -->
      <section v-show="todos.length" class="main">
        <input
          id="toggle-all"
          :checked="allChecked"
          class="toggle-all"
          type="checkbox"
          @change="toggleAll({ done: !allChecked })"
        />
        <label for="toggle-all" />
        <ul class="todo-list">
          <todo
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @editTodo="editTodo"
            @deleteTodo="deleteTodo"
          />
        </ul>
      </section>
      <!-- footer -->
      <footer v-show="todos.length" class="footer">
        <span class="todo-count">
          剩余
          <strong>{{ remaining }}</strong>
          项未完成
        </span>
        <ul class="filters">
          <li v-for="(val, key) in filters" :key="key">
            <a
              :class="{ selected: visibility === key }"
              @click.prevent="visibility = key"
              >{{ key | textFilter }}</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="todos.length > remaining"
          @click="clearCompleted"
        >
          清除已完成
        </button>
      </footer>
    </section>
  </el-card>
</template>

<script>
import Todo from './Todo.vue'
import Mock from 'mockjs'
// 存储到本地的变量名
const STORAGE_KEY = 'todos'
// 定义一个过滤对象
const filters = {
  // 全部todo数据
  all: todos => todos,
  // 未完成
  active: todos => todos.filter(todo => !todo.done),
  // 已完成
  completed: todos => todos.filter(todo => todo.done)
}
// 默认列表数据
const { defalutList } = Mock.mock({
  'defalutList|6-12': [
    {
      text: '@cword(6,12)',
      'done|1': true
    }
  ]
})
export default {
  components: { Todo },
  filters: {
    textFilter(key) {
      const Maps = { all: '全部数据', active: '未完成', completed: '已完成' }
      return Maps[key]
    }
  },
  data() {
    return {
      // 当前可见的todo数据
      visibility: 'all',
      filters,
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      todos: defalutList
    }
  },
  computed: {
    // 已经完成的
    allChecked() {
      // 遍历数组，返回 done==true 的数据
      return this.todos.every(todo => todo.done)
    },
    // 通过this.visibility 过滤出当前要展示的数据，
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    // 数组长度
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    // 存储数据
    setLocalStorage() {
      // 存储数据到本地存储，注意存储时，要转为字符串形式 JSON.stringify ，在读取时要 JSON.parase
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    // 添加todo数据
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        // 将新增的数据插入数组末尾
        this.todos.push({
          text,
          done: false
        })
        // 存储数据
        this.setLocalStorage()
      }
      // 清空输入框
      e.target.value = ''
    },
    // 切换todo数据列表
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorage()
    },
    // 删除todo数据
    deleteTodo(todo) {
      // 查找到当前点击项
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorage()
    },
    // 编辑todo数据
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
    },
    // 全部完成
    clearCompleted() {
      // 返回未完成的 数据
      this.todos = this.todos.filter(todo => !todo.done)
      // 将未完成的都存储在完成列表中
      this.setLocalStorage()
    },
    // 切换全部
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorage()
      })
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
