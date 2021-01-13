<template>
  <el-card>
    <el-tabs v-model="activeName" type="border-card" class="tab-container">
      <el-tab-pane
        v-for="item in tabMapOptions"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
        <keep-alive>
          <tab-pane v-if="activeName == item.key" :type="item.key" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import TabPane from './components/table'
export default {
  name: 'Tab',
  components: { TabPane },
  data() {
    return {
      // tab栏数据：文章分类
      tabMapOptions: [
        { label: 'JavaScript', key: 'JavaScript' },
        { label: 'JAVA', key: 'JAVA' },
        { label: 'Python', key: 'Python' },
        { label: 'C语言', key: 'C语言' }
      ],
      activeName: 'JavaScript'
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {}
}
</script>
