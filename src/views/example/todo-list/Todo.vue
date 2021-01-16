<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <!-- 复选框 -->
      <input
        :checked="todo.done"
        class="toggle"
        type="checkbox"
        @change="toggleTodo(todo)"
      />
      <!-- 双击 当前数据 进入编辑状态， -->
      <label @dblclick="editing = true" v-text="todo.text" />
      <!-- 删除按钮 -->
      <button class="destroy" @click="deleteTodo(todo)" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script>
export default {
  name: 'Todo',
  directives: {
    // 自定义 聚焦 指令
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      // 编辑状态
      editing: false
    }
  },
  methods: {
    // $emit() 调用父组件中的方法
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    },
    editTodo({ todo, value }) {
      this.$emit('editTodo', { todo, value })
    },
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
    },
    // 完成编辑
    doneEdit(e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        // 如果没有填入内容，则删除当前项
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        // 调用方法完成添加
        this.editTodo({
          todo,
          value
        })
        // 退出编辑
        this.editing = false
      }
    },
    // 取消编辑
    cancelEdit(e) {
      // 恢复原值
      e.target.value = this.todo.text
      // 退出编辑
      this.editing = false
    }
  }
}
</script>
