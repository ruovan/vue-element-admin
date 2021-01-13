<template>
  <el-card class="back-to-top-container">
    <el-alert
      title="文章标题粘性定位，文章内容只显示3行，多余内容省略号，滚动一定距离后，出现返回顶部"
      type="warning"
    />
    <ol class="article-container">
      <li v-for="(item, index) in list" :key="index">
        <h2 class="article-title">{{ item.title }}</h2>
        <div class="article-info">
          作者：{{ item.author }} 时间：{{ item.display_time }}
        </div>
        <div class="article-paragraph">{{ item.paragraph }}</div>
        <div class="article-pageviews">阅读量：{{ item.pageviews }}</div>
      </li>
    </ol>
    <!-- 使用el-tooltip，设置鼠标悬浮时显示的提示文字 -->
    <el-tooltip placement="top" content="返回顶部">
      <!-- back-to-top组件，传入样式、滑动高度（显示）、返回的位置、动画效果 -->
      <back-to-top
        :custom-style="myBackToTopStyle"
        :visibility-height="800"
        :back-position="0"
        transition-name="fade"
      />
    </el-tooltip>
  </el-card>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import { fetchList } from '@/api/article'
export default {
  name: 'BackToTopDemo',
  components: { BackToTop },
  data() {
    return {
      // 自定义按钮样式
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '50px',
        'line-height': '45px', // 设置为垂直居中
        background: '#e7eaf1' // 按钮的背景颜色
      },
      // 文章数据
      list: [],
      listQuery: {
        page: 1,
        limit: 50
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
      })
    }
  }
}
</script>

<style scoped lang="scss">
.article-container {
  position: relative;
  li {
    list-style: none;
    margin-bottom: 20px;
  }
  .article-title {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    padding: 25px 10px;
    background-color: #ccc;
  }
  .article-info {
    margin: 10px 0;
  }
  .article-paragraph {
    line-height: 25px;
    overflow: hidden;
    // 设置文本的显示行数：2行
    -webkit-line-clamp: 3;
    // 将对象作为弹性伸缩盒子模型显示
    display: -webkit-box;
    // 伸缩盒对象的子元素的排列方式
    -webkit-box-orient: vertical;
    // 超出文本处理方式：省略号
    text-overflow: ellipsis;
  }
  .article-pageviews {
    // 加大距离，方便查看效果
    padding: 20px 0 200px;
    color: red;
  }
}
// body {
//   overflow: unset !important;
// }
.el-card,
.el-message {
  overflow: unset;
}
</style>
