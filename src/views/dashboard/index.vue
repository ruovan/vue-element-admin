<template>
  <div class="dashboard-container">
    <div class="left-box">
      <!-- 问候语 -->
      <div class="roles-panel">
        <i class="el-icon-user" />
        <span>您好！{{ roles == 'admin' ? '管理员' : '访问者' }}</span>
        <span>
          ，今天也是元气满满的一天，请开始你的工作！
        </span>
      </div>
      <!-- TODO -->
    </div>
    <div class="right-box">
      <!-- 地点 -->
      <div class="card-panel location">
        <i class="el-icon-location"></i>
        <span>{{ city }}</span>
      </div>
      <!-- 时间 -->
      <div class="card-panel time">
        <div>
          <i class="el-icon-timer"></i>
        </div>
        <div>
          <div>{{ weatherData.date }}</div>
          <div>{{ weatherData.week }}</div>
        </div>
      </div>
      <!-- 天气 -->
      <div class="card-panel weather">
        <i class="el-icon-cloudy"></i>
        <div>{{ weatherData.wea }}，{{ weatherData.tem }}</div>
      </div>
      <!-- 一句话 -->
      <div class="card-panel hitokoto-panel">
        <span>{{ hitokoto }}</span>
      </div>
    </div>
    <!-- 路由+小组间 -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Dashboard',
  data() {
    return {
      // 当前城市
      city: '',
      // 天气信息
      weatherData: {},
      // 一句话
      hitokoto: ''
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  created() {
    this.getWeather()
    this.getMessage()
  },
  methods: {
    // 获取天气信息
    getWeather() {
      axios
        .get(
          'https://tianqiapi.com/api?version=v1&appid=41741935&appsecret=1WCZkBa7'
        )
        .then(({ data }) => {
          this.city = data.city
          this.weatherData = data.data[0]
          // console.log(this.weatherData)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取一句话
    getMessage() {
      axios
        .get('https://v1.hitokoto.cn')
        .then(({ data }) => {
          this.hitokoto = data.hitokoto
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    roles() {
      // 从vuex中获取roles
      return this.$store.getters.roles[0]
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 10px 20px 20px;
  border-radius: 8px;
  background-color: #e4e8ea;
  .left-box {
    width: 78%;
    padding: 15px;
    background-color: #fff;
    .roles-panel {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      height: 100px;
      font-size: 20px;
      color: white;
      border-radius: 8px;
      background-color: rgb(27, 199, 113);
      i {
        font-size: 50px;
        margin: 10px;
      }
    }
    .todo-panel {
      padding: 30px 0;
      background-color: #ccc;
      border-radius: 12px;
    }
  }
  .right-box {
    width: 20%;
    background-color: #fff;
    .card-panel {
      display: flex;
      // justify-content: center;
      align-items: center;
      margin: 15px;
      height: 100px;
      font-size: 20px;
      color: white;
      border-radius: 8px;
      i {
        font-size: 50px;
        margin: 10px;
      }
    }
    .location {
      background-color: rgb(39, 164, 180);
    }
    .time {
      background-color: rgba(163, 97, 11, 0.74);
    }
    .weather {
      background-color: rgb(40, 81, 143);
    }
    .hitokoto-panel {
      padding: 10px;
      font-size: 18px;
      line-height: 1.5;
      background-color: rgb(108, 187, 35);
    }
  }
}
</style>
