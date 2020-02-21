<template>
  <div class="class_detail">
    <div class="localtitle">
      <p class="start">您的位置：</p>
      <p class="local">首页 / 课程 / 搜索结果</p>
    </div>
    <div class="container">
      <div class="basic_information">
        <div class="basic_information_container">
          <div class="img">
            <img :src="data.pic" alt="">
          </div>
          <div class="basic_information_container_text">
            <v-shoucangtubiao class="shoucangtubiao" v-on:shoucang="shoucang" :no_yes="data.isCollection === 'YES'"></v-shoucangtubiao>
            <div class="money_discount">
              <p class="money">￥{{data.discountPrice}}</p>
              <p class="discount">￥{{data.originalPrice}}</p>
            </div>
            <div class="titleq">{{data.name}}</div>
            <div class="img_name">
              <div class="img">
                <img src="./people.png" alt="">
              </div>
              <p class="name">{{data.teacher}}</p>
            </div>
            <div class="text">
              <div class="a update">已更新：<p class="data">{{data.coursewareAmount}}</p>课</div>
              <div class="a type">类别：<p class="data">{{data.type}}</p></div>
              <div class="a diffcult">难度：<p class="data">{{data.difficult}}</p></div>
            </div>
            <div class="button">
              <div class="join_button" @click="class_jump">{{class_j}}</div>
              <div class="group" @click="pk" v-show="class_i!=='课程已经购买'">{{class_i}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="detaile_information">
        <div class="left">
          <div class="header">
            <div class="left_button_dom" @click="introduce(1)" :class="{'click':!left_button_dom_show,'noclick':left_button_dom_show}">课程介绍</div>
            <div class="right_button_dom" @click="introduce(2)" :class="{'click':left_button_dom_show,'noclick':!left_button_dom_show}">课程目录</div>
          </div>
          <div class="content" v-html="description" v-show="!left_button_dom_show"></div>
          <div class="class_list" v-show="left_button_dom_show">
            <div class="item" v-for="(item, key) in data_list" :key="key">
              <div class="img">
                <img :src="item.coverUrl" alt="">
              </div>
              <div class="class_list_name">
                {{item.name}}
              </div>
              <div class="play" v-show="item.isFree === 'YES'||isBuy===true" @click="player_jump(item.id)">
                <div class="imgq">
                  <img src="./play.png" alt="">
                </div>
              </div>
              <!--不免费看，没买-->
              <div class="buy_to_play" v-show="item.isFree === 'NO'&&isBuy===false">
                需要购买观看
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="ratingg">
            <div class="header">
              评价 （{{ratinglist.length}}）
            </div>
            <div class="content">
              <v-rating_detail class="rating_detail" v-for="(item, key) in ratinglist" :key="key" :data="item"></v-rating_detail>
            </div>
            <div class="chakangenduo" @click="chakanmore">
              查看更多
            </div>
          </div>
          <div class="activity">
            <div class="bottom">
              <v-huodongdetail></v-huodongdetail>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pingtuan" v-show="pkshow">
      <div class="guanbi icon-close" @click="pkclose()"></div>
      <div class="containerd">
        <div class="pingtuan1">
          <div class="img">
            <img :src="data.pic" alt="">
          </div>
          <div class="miney">{{pk_price}}</div>
        </div>
        <div class="pingtuan2">
          <p>拼团规模</p>
          <div class="guimo">
            <div class="diva div1" @click="pinke($event, item.id)" v-for="(item, index) in ptdata" :class="{'divb': index===0}">{{item.amount}}人拼课</div>
          </div>
        </div>
        <div class="pingtuan3">拼课开始后，将在24小时后自动结束，如拼课失败，系统将自动退还款项</div>
        <div class="pingtuan4" @click="pk_jump">开始拼课</div>
      </div>
    </div>
    <div class="ratings_tanchu" :class="{'ovhi':!ratings_tanchushow}">
      <div class="titled">
        全部评价
      </div>
      <div class="containerq">
        <happy-scroll color="#31B8C7" size="5" class="aa" :scroll-top="top" resize>
          <div class="player_con">
            <v-rating_detail class="rating_detaild" v-for="(item, key) in ratinglist" :key="key" :data="item"></v-rating_detail>
          </div>
        </happy-scroll>
      </div>
      <div class="left_right_button">
        <div class="img" @click="jump_button(1)">
          <
        </div>
        <div class="num" v-for="(item, index) in list_lenght_button" :key="index" @click="num_button(index)">{{index+1}}</div>
        <div class="img" @click="jump_button(2)">
          >
        </div>
      </div>
      <div class="guanbi icon-close" @click="close()"></div>
    </div>
    <div class="mengban" v-show="mengbanshow"></div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import huodongdetail from 'components/huodongdetail/huodongdetail'
import rating_detail from 'components/rating_detail/rating_detail'
import shoucangtubiao from 'components/shoucangtubiao/shoucangtubiao.vue'
import {loadFromlLocal} from '../../common/js/store'
export default {
  props: {
    mwhtoken: ''
  },
  name: '',
  data() {
    return {
      class_i: '去拼课',
      class_j: '立即购买',
      id: '',
      data: {},
      token: (() => {
        return loadFromlLocal('token')
      })(),
      phone: '',
      description: '',
      left_button_dom_show: false,
      data_list: [],
      player_id_edit_id: '',
      pkshow: false,
      mengbanshow: false,
      top: 1,
      list_lenght: 0,
      list_lenght_button: [],
      ratings_tanchushow: false,
      ptdata: [],
      pk_id:'',
      ratinglist: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      // 查看课程是否购买相关字段
      class_pay_or_not: true,
      isBuy: true,
      pk_price: ''
    }
  },
  store,
  components: {
    'v-rating_detail': rating_detail,
    'v-huodongdetail': huodongdetail,
    'v-shoucangtubiao': shoucangtubiao
  },
  methods: {
    num_button(num) {
      this.top = num*(500)
    },
    // 评论弹出框的的左右按钮
    jump_button(index) {
      console.log(index)
      let length = this.ratinglist.length*102
      if(index === 1) {
        if (this.top>0) {
          this.top = this.top - 500
        }
      } else if (index === 2) {
        if (this.top<=length) {
          this.top = this.top + 500
        }
      }
      console.log(this.top)
    },
    // 关闭评论弹出框
    close() {
      this.ratings_tanchushow = false
      this.mengbanshow = false
    },
    // 查看评论弹出框弹出按钮（查看更多）
    chakanmore() {
      this.list_lenght_button = []
      this.ratings_tanchushow = true
      this.mengbanshow = true
      this.list_lenght = Math.ceil(this.ratinglist.length/6)
      for (let i = 0; i < this.list_lenght; i++) {
        this.list_lenght_button.push('1')
      }
    },
    // 收藏
    shoucang: function(no_yes) {
      if (no_yes === false) {
        this.axios({
          method:"post",
          url:this.url() + '/front/common/collect',
          headers: {
            userToken: this.token
          },
          data: {
            id: this.id,
            type: 'COURSE'
          }
        }).then((res) => {
          this.post(this.id)
        })
      } else {
        this.axios({
          method:"post",
          url:this.url() + '/front/common/collect/cancel',
          headers: {
            userToken: this.token
          },
          data: {
            id: this.id,
            type: 'COURSE'
          }
        }).then((res) => {
          this.post(this.id)
        })
      }
      console.log(this.token)
    },
    fenxiang: function() {

    },
    pk_jump() {
      this.$store.commit('danke_pintuan_edit', 2)
      this.$router.push({
        path: '/class_order',
        query: {
          id: this.id,
          danke_pintuan: '2',
          pk_id: this.pk_id
        }
      })
    },
    // 设置几人拼课
    pinke(e, id) {

      for (let j = 0;j<this.ptdata.length;j++) {
        if (this.ptdata[i].id === id) {
          this.pk_price = this.ptdata[i].price
        }
      }
      this.pk_id = id
      this.$store.commit('pinke_id_edit', this.pk_id)
      let typed = document.getElementsByClassName('diva')
      for (let i = 0; i < typed.length; i++) {
        typed[i].classList.remove('divb')
      }
      e.currentTarget.classList.add('divb')
    },
    pkclose() {
      this.pkshow = false
      this.mengbanshow = false
    },
    pk() {
      if (this.ptdata.length === 0) {
        this.$message({
          message: '该课程没有拼团活动',
          type: 'warning'
        });
        return false
      }
      if (this.class_i === '课程已购买') {
        this.$message({
          message: '课程已购买',
          type: 'warning'
        });
        return false
      }
      console.log('设置默认拼课id' + this.pk_id)
      this.pkshow = true
      this.mengbanshow = true
      this.pk_id = this.ptdata[0].id
      console.log(this.pk_id)
      this.$store.commit('pinke_id_edit', this.pk_id)
    },
    player_jump: function(id) {

      if (loadFromlLocal('token') === ''||loadFromlLocal('token') === 'null') {
        this.$message.error('请登录')
        return false
      }

      this.$router.push({
        path: '/player',
        query: {
          id: id,
          class_id: this.id
        }
      })
    },
    class_jump: function() {
      if (loadFromlLocal('token') === ''||loadFromlLocal('token') === 'null') {
        this.$message.error('请登录')
        return false
      }
      if (this.class_i === '课程已经购买') {
        return false
      }
      // 判断该课程是否已经购买
      if (!this.class_pay_or_not) {
        this.$message.error('您已经有该课程的待支付订单，请前往订单中心')
        return false
      }
      // 发出post请求并且跳转到订单页面
      this.axios({
        method:"get",
        url:this.url() + '/front/user/information/pre',
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('请求该课程的订单信息返回的东西')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.$store.commit('danke_pintuan_edit', '1')
          this.$router.push({
            path: '/class_order',
            query: {
              id: this.id,
              danke_pintuan: 1,
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
    introduce(type) {
      if (type === 1) {
        this.left_button_dom_show = false
      } else {
        this.left_button_dom_show = true
      }
    },
    getclasslist(id) {
      this.axios({
        method:"get",
        url:this.url() + '/front/course/video/list?id=' + id,
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('课程视频列表')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data_list = res.data
        }
      })
    },
    post(data) {
      this.axios({
        method:"get",
        url:this.url() + "/front/course/detail?id=" + data,
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('class_detail')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          console.log('课程详情')
          console.log(res)
          this.data = res.data
          this.isBuy = this.data.isBuy
          console.log(this.isBuy)
          if (this.isBuy === 'NO') {
            this.class_i = '去拼课'
            this.class_j = '立即购买'
            this.isBuy = false
          } else {
            this.class_i = '课程已经购买'
            this.class_j = '课程已经购买'
            this.isBuy = true
          }
          this.description = this.data.description
        }
      })
    },
    ptguimopost() {

      this.axios({
        method:"get",
        url:this.url() + '/front/course/courseCollage?id='+ this.id,
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('拼团规模返回')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.ptdata = res.data
          this.pk_price = this.ptdata[0].price
        }
      })
    },
    handle() {
      console.log('handle')
      console.log(this.id)
      let url = this.url() + '/front/course/assess/list?id='+ this.id +'&page=1&size=10'
      this.ratings_post(url)
    },
    ratings_post(url) {
      this.axios({
        method:"get",
        url:url,
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('ratings_post')
        console.log(res)
        res = res.data
        if (res.code === 200) {
           this.ratinglist = res.data
          this.description = this.data.description
        }
      })
    },
    // 通过访问接口判断该课程是否已经购买过
    _post(id) {

      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/course/info',
        headers: {
          userToken: this.token
        },
        data: {
          id: id
        }
      }).then((res) => {
        console.log('通过访问接口判断该课程是否已经购买过')
        console.log(res)
        res = res.data
        if (res.code === 200) {
        } else if (res.code === 401) {
          this.class_pay_or_not = false
//          this.class_j = '课程已购买'
//          this.class_i = '课程已购买'
        } else {
          this.class_pay_or_not = false
        }
      })
    }
  },
  computed: {
    usertoken() {
      return this.$store.state.token
    }
  },
  watch: {
    mwhtoken: function (newtoken) {
      this.token = newtoken
    },
    usertoken: function() {

    },
    mengbanshow(neww) {

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
  mounted() {
    console.log('进入classs_detail')
    this.id= this.$route.query.id
    console.log(this.id)
    // 课程详情页
    this.post(this.id)
    this.handle()
    // 拼团规模
    this.ptguimopost()
    // 课程视频列表
    this.getclasslist(this.id)
    //查看该课程是否已交购买
    this._post(this.id)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .class_detail
    min-height: 1000px
    p
      margin: 0
    .localtitle
      width: 1200px
      height: 76px
      display: flex
      margin: 0 auto
      p
        margin: 0
        margin-top: 24px
        font-size: 14px
      .local
        color: #2EB7C6
    .container
      min-height: 1000px
      width: 1200px
      margin: 0 auto
      .basic_information
        width: 1200px
        height: 310px
        border: 1px solid #DBDBDB
        border-radius:12px
        .basic_information_container
          height: 240px
          margin-top: 30px
          margin-left: 30px
          display: flex
          position: relative
          .img
            width: 320px
            height: 240px
            img
              width: 100%
              height: 100%
          .basic_information_container_text
            margin-left: 30px
            .shoucangtubiao
              position: absolute
              right: 30px
            .money_discount
              display: flex
              overflow: hidden
              height: 30px
              .money
                font-size:30px
                font-family:PingFangSC-Medium
                font-weight:500
                color: #F06074
              .discount
                margin-left: 9px
                font-size:14px
                font-family:PingFangSC-Regular
                font-weight:400
                text-decoration:line-through
                color:rgba(198,198,198,1)
                line-height: 40px
            .titleq
              height: 30px
              width: 580px
              margin: 16px 0 0 0
              font-size: 24px
              color: rgba(58,58,58,1)
              overflow: hidden
              font-weight:600
              text-overflow:ellipsis
              white-space: nowrap
            .img_name
              display: flex
              align-items: center
              margin-top: 17px
              .img
                width: 16px
                height: 20px
                overflow: hidden
                img
                  width: 100%
                  height: 100%
              .name
                font-size:14px
                margin-left: 5px
                color: #C6C6C6
            .text
              display: flex
              margin-top: 14px
              .a
                display: flex
                font-size: 14px
                align-items: flex-end
                color: #888888
                margin-right: 70px
                position: relative
                p
                  font-size: 18px
                  margin-right: 5px
                  color: #3A3A3A
            .button
              display: flex
              margin-top: 58px
              .join_button
                width: 130px
                height: 36px
                text-align: center
                line-height: 36px
                font-size: 16px
                color: white
                border-radius:18px
                cursor: pointer
                background-color: #2EB7C6
              .group
                width: 130px
                height: 36px
                text-align: center
                line-height: 36px
                font-size: 16px
                color: #2EB7C6
                border-radius:18px
                cursor: pointer
                border: 1px solid #2EB7C6
                background-color: white
                margin-left: 10px
      .detaile_information
        width: 1200px
        min-height: 1000px
        margin: 0 auto
        margin-top: 30px
        margin-bottom: 50px
        display: flex
        justify-content: space-between
        .left
          width: 826px
          border-radius:12px
          border: 1px solid #DBDBDB
          .header
            width: 826px
            height: 47px
            display: flex
            border-bottom: 1px solid #DBDBDB
            .left_button_dom
              width:75px
              height:28px
              cursor: pointer
              text-align: center
              line-height: 28px
              margin-left: 30px
              margin-top: 10px
              border-radius: 1px
              &.click
                color: white
                background-color: #2EB7C6
              &.noclick
                color: #888888
                background-color: white
            .right_button_dom
              width:75px
              height:28px
              cursor: pointer
              text-align: center
              line-height: 28px
              margin-left: 41px
              margin-top: 10px
              background-color: white
              color: #C0C0C0
              border-radius: 1px
              &.click
                color: white
                background-color: #2EB7C6
              &.noclick
                color: #888888
                background-color: white
          .content
            width: 764px
            margin: 0 auto
            margin-top: 30px
            p
              margin-bottom: 30px
          .class_list
            width: 764px
            margin: 0 auto
            margin-top: 30px
            .item
              height: 106px
              display: flex
              position: relative
              border-bottom: 1px solid #DBDBDB
              .img
                width: 90px
                height: 67px
                margin-top: 20px
                background-color: #8c939d
                img
                  width: 100%
                  height: 100%
              .class_list_name
                margin-top: 26px
                margin-left: 15px
                margin-top: 46px
              .play
                position: absolute
                top: 30px
                right: 0
                width: 60px
                height: 20px
                display: flex
                align-items: center
                cursor: pointer
                .imgq
                  width: 40px
                  height: 16px
                  border-radius: 4px
                  img
                    width: 100%
                p
                  margin-left: 2px
                  font-size: 14px
                  color: #8c939d
              .buy_to_play
                position: absolute
                top: 46px
                right: 0
                width: 100px
                height: 20px
                line-height: 20px
                color: #2EB7C6
                font-size: 14px
        .right
          width: 354px
          .ratingg
            width: 354px
            height: 710px
            border-radius:12px
            border: 1px solid #DBDBDB
            .header
              width: 334px
              height: 47px
              line-height: 47px
              padding-left: 20px
              border-bottom: 1px solid #DBDBDB
            .content
              height: 545px
              overflow: hidden
              .rating_detail
                width: 314px
                margin: 0 auto
                margin-top: 30px
            .chakangenduo
              width: 314px
              height: 48px
              margin: 0 auto
              text-align: center
              cursor: pointer
              font-size: 14px
              margin-top: 39px
              background-color: #F7F7F7
              line-height: 48px
          .activity
            margin-top: 30px
    .pingtuan
      display: flex
      flex-direction: column
      z-index: 3
      width:557px
      height:362px
      background:rgba(255,255,255,1)
      border-radius:12px
      background-color: white
      left:50%
      top:50%
      margin-left:-250px
      margin-top:-155px
      position:fixed
      color:rgba(192,192,192,1)
      .containerd
        margin-left: 32px
        margin-top: 30px
        display: flex
        flex-direction: column
        .pingtuan1
          height: 119px
          display: flex
          align-items: flex-end
          .img
            width: 118px
            height: 118px
            background-color: #8c939d
            img
              width: 100%
              height: 100%
          .miney
            margin-left: 23px
            font-size: 24px
            color: #EF6276
        .pingtuan2
          font-size: 14px
          margin-top: 18px
          color: #3A3A3A
          .guimo
            display: flex
            margin-top: 15px
            .diva
              width: 80px
              height: 30px
              line-height: 30px
              text-align: center
              cursor: pointer
              margin-right: 22px
              background-color: #F3F3F3
              color: #888888
              &.divb
                background-color: #D5F1F3
                color: #31B7C4
        .pingtuan3
          font-size: 14px
          margin-top: 24px
          color: #888888
        .pingtuan4
          width: 142px
          height: 50px
          cursor: pointer
          text-align: center
          line-height: 50px
          color: white
          margin-top: 18px
          background-color: #2EB7C6
      .guanbi
        position: absolute
        width: 54px
        height: 54px
        right: 10px
        top: 15px
        text-align: center
        line-height: 54px
        font-size: 26px
    .ratings_tanchu
      display: flex
      flex-direction: column
      z-index: 3
      width: 800px
      height: 670px
      background-color: white
      left:50%
      top:50%
      margin-left:-400px
      margin-top:-340px
      position:fixed
      border-radius: 10px
      color:rgba(192,192,192,1)
      &.ovhi
        visibility :hidden
      .containerq
        width: 735px
        height: 465px
        margin-top: 30px
        margin-left: 30px
        .aa
          height: 465px
          .player_con
            width: 730px
            .rating_detaild
              margin-bottom: 20px
          .happy-scroll-strip--horizontal
            display: none
      .titled
        font-size: 16px
        margin-top: 30px
        margin-left: 30px
        color: #000000
      .guanbi
        position: absolute
        width: 54px
        height: 54px
        right: 10px
        top: 15px
        text-align: center
        line-height: 54px
        font-size: 26px
      .left_right_button
        display: flex
        justify-content: flex-end
        align-items: center
        margin-top: 40px
        margin-right: 30px
        .num
          width: 50px
          height: 44px
          line-height: 45px
          text-align: center
        .img
          width: 40px
          height: 20px
          line-height: 20px
          display: flex
          color: white
          justify-content: center
          align-items: center
          background-color: #31B7C4
    .mengban
      position: fixed
      width: 100%
      height: 100%
      background-color: black
      z-index: 2
      top: 0
      left: 0
      opacity: 0.5
</style>
