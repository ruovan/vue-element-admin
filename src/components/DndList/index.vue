<template>
  <div class="dndList">
    <!-- 左侧列表 -->
    <div :style="{ width: width1 }" class="dndList-list">
      <h3>{{ list1Title }}</h3>
      <draggable
        :set-data="setData"
        :list="list1"
        group="article"
        class="dragArea"
      >
        <div
          v-for="element in list1"
          :key="element.id"
          class="list-complete-item"
        >
          <!-- 文字内容 -->
          <div class="list-complete-item-handle">
            {{ element.title }}
          </div>
          <!-- 删除图标 -->
          <div style="position:absolute;right:10px;">
            <span
              style="float: right ;margin-top: -20px;margin-right:5px;"
              @click="deleteEle(element)"
            >
              <i style="color:#ff4949" class="el-icon-delete" />
            </span>
          </div>
        </div>
      </draggable>
    </div>
    <!-- 右侧列表 -->
    <div :style="{ width: width2 }" class="dndList-list">
      <h3>{{ list2Title }}</h3>
      <draggable :list="list2" group="article" class="dragArea">
        <div
          v-for="element in list2"
          :key="element.id"
          class="list-complete-item"
        >
          <div class="list-complete-item-handle2" @click="pushEle(element)">
            {{ element.title }}
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DndList',
  components: { draggable },
  props: {
    list1: {
      type: Array,
      default() {
        return []
      }
    },
    list2: {
      type: Array,
      default() {
        return []
      }
    },
    list1Title: {
      type: String,
      default: 'list1'
    },
    list2Title: {
      type: String,
      default: 'list2'
    },
    width1: {
      type: String,
      default: '48%'
    },
    width2: {
      type: String,
      default: '48%'
    }
  },
  methods: {
    isNotInList1(v) {
      return this.list1.every(k => v.id !== k.id)
    },
    isNotInList2(v) {
      return this.list2.every(k => v.id !== k.id)
    },
    // 从左侧列表删除数据，添加到右侧列表
    deleteEle(ele) {
      for (const item of this.list1) {
        // 查找到左侧列表中对应要删除的id
        if (item.id === ele.id) {
          const index = this.list1.indexOf(item)
          this.list1.splice(index, 1)
          break
        }
      }
      // 判断是否在右侧列表中，以添加该数据
      if (this.isNotInList2(ele)) {
        // 头部添加
        this.list2.unshift(ele)
      }
    },
    // 在右侧列表中点击添加数据到左侧列表
    pushEle(ele) {
      for (const item of this.list2) {
        if (item.id === ele.id) {
          const index = this.list2.indexOf(item)
          this.list2.splice(index, 1)
          break
        }
      }
      if (this.isNotInList1(ele)) {
        this.list1.push(ele)
      }
    },
    setData(dataTransfer) {
      dataTransfer.setData('Text', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.dndList {
  display: flex;
  justify-content: space-around;
  &:after {
    content: '';
    display: table;
    clear: both;
  }
  .dndList-list {
    background-color: #dae6ee;
    padding: 10px;
    h3 {
      padding-left: 30px;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  user-select: none;
  position: relative;
  font-size: 18px;
  padding: 20px;
  margin-top: 10px;
  border-radius: 12px;
  box-shadow: inset 0px 0px 7px 3px #bfcbd9;
  text-shadow: 1px 1px 1px #000;
  background-color: #f8f8f8;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
