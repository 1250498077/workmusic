<template>
  <div class="huodong_zujian">
    <div class="text" v-html="data.description" style="text-align: center"></div>
    <div class="button" @click="canjia">参加活动</div>
    <!--弹出参与活动-->
    <div class="canyu_tanchu" v-show="show">
      <i class="el-icon-close" @click="close"></i>
      <div class="xiugaicontainer">
        <p>报名确认</p>
        <div class="xinshoujihao">
          <p>姓名</p>
          <input type="text" v-model="name">
        </div>
        <div class="xinshoujihao1">
          <p>联系方式</p>
          <input type="text" v-model="phone">
        </div>
        <div class="xinshoujihao3">
          <p>报名人数</p>
          <div class="conta">
            <div class="renshu">
                <i class="el-icon-remove-outline" @click="decrease"></i>
                <div class="number">{{people_num}}</div>
                <i class="el-icon-circle-plus-outline" @click="add"></i>
            </div>
            <div class="text">当前剩余 <i>{{data.amount}}</i> 个名额</div>
          </div>
        </div>
        <div class="button" @click="jump">确认</div>
      </div>
    </div>
    <div class="mengban" v-show="show"></div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import {loadFromlLocal} from '../../common/js/store'
export default {
  props: {
    mwhtoken: ''
  },
  data() {
    return {
      lianxifangshi: '',
      name: '',
      show: false,
      id: '',
      phone: '',
      token:loadFromlLocal('token'),
      people_num: 1,
      data: {}
    }
  },
  components: {

  },
  store,
  methods: {
    decrease() {
      if (this.people_num !== 1) {
        this.people_num--
      }
    },
    add() {
      if (this.people_num < this.data.amount) {
        this.people_num++
      }
    },
    jump() {
      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/activity/info',
        headers: {
          userToken: this.token
        },
        data: {
          id: this.id
        }
      }).then((res) => {
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
          this.$router.push({
            path: '/huodong_order',
            query: {
              id: this.data.id,
              people_num: this.people_num,
              name: this.name,
              phone: this.phone
            }
          })
        } else {
          this.$message({
            message: '请登录后操作',
            type: 'warning'
          });
        }
      })
    },
    model() {
      this.order = {
        id: this.id,
        typeId: this.product_type
      }
      this.post()
    },
    post() {
      console.log('活动详情')
      console.log(this.order)
      this.axios({
        method: "post",
        url: this.url() + '/front/order/confirm/activity/info',
        headers: {
          userToken: this.token
        },
        data: this.order
      }).then((res) => {
        console.log('postpostpost')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
        }
      })
    },
    save() {
      this.show = false
    },
    close() {
      this.show = false
    },
    yujiazai(id) {
      this.axios({
        method: "get",
        url: this.url() + '/front/activity/detail?id=' + id,
      }).then((res) => {
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
        } else {
          this.$message.error('活动不存在，三秒后返回活动列表')
          window.setTimeout(() => {
            this.$router.push({
              path:'/huodong'
            })
          }, 2000)
        }
      })
    },
    canjia() {
      if (loadFromlLocal('token') ===""||loadFromlLocal('token') ==='null') {
        this.$message({
          message: '请登陆',
          type: 'warning'
        });
        return false
      }
      console.log('点击参加按钮')
      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/activity/info',
        headers: {
          userToken: this.token
        },
        data: {
          id: this.id
        }
      }).then((res) => {
        console.log('postpostpost')
        console.log(res)
        res = res.data
        let time = (new Date()).getTime();
        if (res.code === 200) {
          // 获取当前活动
          let date = new Date(res.data.endTime)
          let time3 = Date.parse(date)
          // 获取当前时间戳
          var timestamp = (new Date()).getTime()

          if (timestamp > time3) {
            this.$message({
              message: '活动已经过期',
              type: 'warning'
            });
          }

        } else {

        }
      })
      console.log(this.show)
      this.show = true
    }
  },
  watch: {
    mwhtoken: function (newtoken) {
      console.log(newtoken)
      this.token = newtoken
    },
    show(neww) {
      console.log(neww)
      if (!neww) {
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      } else {
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      }
    }
  },
  created: function () {},
  mounted() {
    this.id= this.$route.query.id
    this.yujiazai(this.id)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .huodong_zujian
    width: 1280px
    min-height: 800px
    margin 0 auto
    p
      margin: 0
    .text
      width: 1200px
      margin 0 auto
    .huodong_zujianimg
      width: 1280px
      height: 300px
      display flex
      justify-content center
      margin-top 30px
      img
        margin 0 auto
    .button
      width: 200px
      height: 100px
      font-weight 500
      font-size 25px
      text-align center
      line-height 100px
      color: white
      background-color: #2EB7C6
      border-radius 10px
      margin 0 auto
      margin-top 10px
    .canyu_tanchu
      width: 480px
      background-color: white
      border-radius: 12px
      display: flex
      flex-direction: column
      z-index: 3
      left:50%
      top:50%
      margin-left:-240px
      margin-top:-300px
      position:fixed
      color:rgba(192,192,192,1)
      overflow: hidden
      padding-bottom: 30px
      p
        color: black
        font-size: 16px
        font-weight: 400
      .el-icon-close
        position: absolute
        top: 20px
        right: 20px
        font-size: 24px
      .xiugaicontainer
        width: 421px
        margin-left: 30px
        margin-top: 30px
        .xinshoujihao
          margin-top: 40px
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            background-color: #F3F5F6
            padding-left: 15px
            margin-top: 10px
            border: none
            border: 1px solid #DBDBDB
            color: #C0C0C0
          input::-webkit-input-placeholder
                  color: #C0C0C0
          p
            font-size: 14px
            color:rgba(136,136,136,1)
        .xinshoujihao1
          margin-top: 30px
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            background-color: #F3F5F6
            padding-left: 15px
            margin-top: 10px
            border: none
            border: 1px solid #DBDBDB
            color: #C0C0C0
          input::-webkit-input-placeholder
                  color: #C0C0C0
          p
            font-size: 14px
            color:rgba(136,136,136,1)
        .xinshoujihao3
          margin-top: 30px
          p
            font-size: 14px
            color:rgba(136,136,136,1)
          .conta
            display: flex
            justify-content: space-between
            align-items: center
            margin-top: 20px
            .renshu
              width: 246px
              height: 63px
              color: #2EB7C6
              display: flex
              justify-content: space-between
              align-items: center
              .number
                width: 140px
                height: 40px
                line-height: 40px
                color: black
                text-align: center
                border: 1px solid #D7D7D7
              i
                cursor: pointer
                font-size: 30px
            .text
              height: 63px
              color: #888888
              line-height: 63px
              i
                font-size: 18px
                color: #FF5A00
                font-style: normal
        .button
          width:140px
          height:40px
          border-radius:20px
          background-color: #2EB7C6
          text-align: center
          line-height: 40px
          color: white
          cursor: pointer
          margin-top: 46px
          margin-left: 140px
          margin-bottom: 54px
</style>
