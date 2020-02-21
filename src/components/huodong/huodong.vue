<template>
  <div class="huodongg">
    <div class="huodong_header">
      <div class="img">
        <img src="./huodong.png" alt="">
      </div>
      <p class="titlew">活动</p>
    </div>
    <div class="container">
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="page_count"
          :current-page="current_page"
          v-on:current-change="current_change"
          v-on:prev-click="prev_click"
          v-on:next-click="next_click">
        </el-pagination>
      </div>
      <div class="huodong_list">
        <div class="list"  v-for="(item, key) in data" :key="key" @click="jump(item.id, item.signUpTime)">
          <div class="img">
            <img :src="item.pic" alt="">
          </div>
          <div class="titledd">
            {{item.name}}
          </div>
          <div class="huodongdetail">
            <p class="baoming">报名截止: {{item.signUpTime}}</p>
            <p class="minge">名额: {{item.amount}}</p>
          </div>
          <p class="huodongmoney">￥{{item.price}}</p>
        </div>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="page_count"
          :current-page="current_page"
          v-on:current-change="current_change"
          v-on:prev-click="prev_click"
          v-on:next-click="next_click">
        </el-pagination>
      </div>
    </div>
    <!--title-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      current_page: 1,
      url: '',
      none: false,
      page_count: 0
    }
  },
  methods: {
    jump(id, time) {

      console.log(time)

      let date = time
      date = date.substring(0,19)
      date = date.replace(/-/g,'/')
      let timestamp = new Date(date).getTime()

      var timesnow = Date.parse(new Date())

      if (timestamp< timesnow) {
        console.log('活动已过期')
        this.$message({
          message: '活动已过期',
          type: 'warning'
        })
        return false
      }


      console.log(timestamp)
      this.$router.push({
        path: '/huodong_detail',
        query: {
          id: id
        }
      })
    },
    chaifenurl(url, page) {
      page = page|| 1
      console.log('chaifenurl')
      let arr1 = url.split('?')
      console.log(url)
      let index = arr1[1].indexOf('&')
      let replacestr = arr1[1].substring(0,index)
      console.log(replacestr)
      let arr = arr1[1].replace(replacestr, 'page='+ page)
      this.url = 'http://120.78.191.119:8080/front/activity/list?' + arr
      console.log('=========================')
    },
    urlchulipost() {
      this.axios.get(this.url, {
      }).then((response) => {
        response = response.data
        if (response.code === 200) {
          this.data = response.data
          this.page_count = Math.ceil(response.totalSize/6)
          if (this.data.length === 0) {
            this.none = true
          } else {
            this.none = false
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    next_click: function(e) {
      this.chaifenurl(this.url, e)
      this.urlchulipost()
    },
    prev_click: function(e) {
      this.chaifenurl(this.url, e)
      this.urlchulipost()
    },
    current_change: function(e) {
      this.current_page = e
      this.chaifenurl(this.url, e)
      this.urlchulipost()
    }
  },
  created: function () {
    console.log('资讯信息获取')
    // 一定要保存this变量
    this.url = 'http://120.78.191.119:8080/front/activity/list?page=1&size=6'
    this.axios.get('http://120.78.191.119:8080/front/activity/list?page=1&size=6', {
    }).then((response) => {
      response = response.data
      if (response.code === 200) {
        this.data = response.data
        this.page_count = Math.ceil(response.totalSize/6)
        console.log(this.data)
      }
    }).catch((error) => {
      console.log(error)
    })
    console.log('==================')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.huodongg
  min-height: 1000px
  .huodong_header
    width: 1200px
    height: 62px
    margin: 0 auto
    display: flex
    align-items: center
    p
      margin: 0
    .titlew
      font-size: 24px
      margin-left: 9px
    .img
      width: 38px
      height: 38px
      img
        width: 100%
        height: 100%
  .container
    width: 100%
    margin: 0 auto
    background-color: #F3F5F6
    .xiayiye
      width: 1200px
      margin: 0 auto
      margin-top: 20px
      .xiayiyed
        display: flex
        justify-content: flex-end
        .shang
          width: 68px
          height: 30px
          margin-top: 25px
          border-radius:15px
        .middle
          display: flex
          margin-top: 20px
          margin-left: 15px
          .ooo
            background-color: white
            border-radius: 50px
            text-align: center
            line-height: 30px
            min-width: 30px
            height: 30px
        .xia
          width: 68px
          height: 30px
          margin-top: 25px
          margin-left: 25px
          border-radius:15px
    .huodong_list
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      width: 1200px
      margin: 0 auto
      .list
        width: 380px
        height: 300px
        margin-bottom: 44px
        .img
          width: 380px
          height: 151px
          border-radius:12px
          overflow: hidden
          cursor: pointer
          background-color: yellowgreen
          img
            width: 100%
            height: 100%
        .titledd
          width: 321px
          height: 44px
          font-size:18px
          font-weight:500
          margin-top: 20px
          cursor: pointer
          margin-left: 30px
          color:rgba(58, 58, 58, 1)
        .huodongdetail
          width: 380px
          margin: 0 auto
          margin-top: 14px
          margin-left: 30px
          display: flex
          p
            margin: 0
          .baoming
            font-size: 14px
            color: #888888
          .minge
            font-size: 14px
            color: #888888
            margin-left: 20px
        .huodongmoney
          margin: 0
          margin-top: 14px
          margin-left: 30px
          font-weight: 600
    .page
      width: 1200px
      height: 50px
      padding-top: 20px
      display: flex
      margin: 0 auto
      justify-content: flex-end
      .el-pagination
        ul
          li
            width: 30px
            height: 30px
            line-height: 30px
            background-color: white
            border: 1px solid #DBDBDB
            border-radius: 50%
            color: #888888
          .active
            color: white
            background-color: #2EB7C6
</style>
