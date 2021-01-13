<template>
  <div class="theme-container">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card style="text-align:center;">
          <div slot="header" class="clearfix">
            <span>颜色选择</span>
          </div>
          <div
            v-for="(item, index) in sidebar"
            :key="index"
            style="margin-bottom:20px;"
            @click="getIndex(index)"
          >
            <span class="demo">{{ item }}：</span>
            <el-color-picker
              v-model="defaultColor[index].color"
              color-format="hex"
              :predefine="predefineColors"
              :show-alpha="false"
              @change="show"
              @active-change="changeColor"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import styleVariables from '@/styles/variables.js'
// import { mapState } from 'vuex'
// 解构颜色，注意顺序
const {
  menuText,
  menuActiveText,
  menuBg,
  menuHover,
  subMenuBg,
  activeBg
} = styleVariables
export default {
  name: 'Theme',
  data() {
    return {
      // 提示文字
      sidebar: [
        '侧边栏文字颜色',
        '激活项文字颜色',
        '侧边栏的背景色',
        '菜单悬浮背景色',
        '子级菜单背景色',
        '激活菜单背景色'
      ],
      color1: '#fff',
      color2: 'rgba(100,200,100,1)',
      // 默认颜色
      defaultColor: [
        {
          name: 'menuText',
          color: menuText
        },
        {
          name: 'menuActiveText',
          color: menuActiveText
        },
        {
          name: 'menuBg',
          color: menuBg
        },
        {
          name: 'menuHover',
          color: menuHover
        },
        {
          name: 'subMenuBg',
          color: subMenuBg
        },
        {
          name: 'activeBg',
          color: activeBg
        }
      ],
      // 预设颜色
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        '#c7158577'
      ],
      // 颜色序号
      colorIndex: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 获取当前点击项的数组下标，并复制给颜色序号
    getIndex(index) {
      this.colorIndex = index
    },
    show(value) {
      console.log(value)
    },
    // 颜色改变事件
    changeColor(color) {
      const newColor = this.colorRGBToHex(color)
      // console.log(newColor)
      // 获取当前点击项的名称
      const key = this.defaultColor[this.colorIndex].name
      const obj = {
        name: key,
        color: newColor
      }
      // console.log(newColor)
      // 调用vuex中函数进行改变
      this.$store.dispatch('colors/changeColor', obj)
    },
    colorRGBToHex(color) {
      const rgb = color.split(',')
      const r = parseInt(rgb[0].split('(')[1])
      const g = parseInt(rgb[1])
      const b = parseInt(rgb[2].split(')')[0])

      const hex =
        '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
      return hex
    }
  },
  computed: {
    // ...mapState(['menuText'])
    // myColors() {
    //   return this.$store.state.colors
    // }
  }
}
</script>

<style scoped lang="scss"></style>
