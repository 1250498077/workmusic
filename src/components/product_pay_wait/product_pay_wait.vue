<template>
  <div class="wait_pay">
    <div class="mengban" v-show="show"></div>
    <div class="localtitle">
      <p class="start">您的位置：</p>
      <p class="local">首页 / 我的订单 / 订单详情</p>
    </div>
    <div class="waitt">
      等待支付
    </div>
    <div class="titleg">
      <div class="my_collectiond">订单信息</div>
    </div>
    <div class="cantuand">
      <div class="cantuan_container">
        <div class="headerd">
          <div class="a shang">
            <p class="titled">收货地址:</p>
            <div class="contentd">{{datad.adress}}</div>
          </div>
          <div class="a xia">
            <p class="titled">运输方式:</p>
            <div class="contentd">圆通快递</div>
          </div>
        </div>
        <div class="order_information">
          <div class="div1">
            <p>订单信息</p>
          </div>
          <div class="div div2">
            <p>订单编号：{{datad.orderNo}}</p>
            <p class="divp">订单属性：{{datad.orderType}}</p>
          </div>
          <div class="div div3">
            <p>创建时间：{{datad.createTime}}</p>
            <p class="divp">付款方式：</p>
          </div>
          <div class="div div4">
            <p>订单类型：{{datad.orderType}}</p>
          </div>
        </div>
        <div class="div5">
          <div class="img">
            <img src="./phone.png" alt="">
          </div>
          <div class="phonee">
            <p class="data">客服电话</p>
            <p class="data">020-81709897</p>
          </div>
          <div class="qqimg">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=437081083&site=qq&menu=yes" style="text-decoration:none;color: black">
              <img src="./a1.png" alt="">
            </a>
          </div>
        </div>
        <v-class_order_one :data="datad" class="class_order_one" :pk_no="true"></v-class_order_one>
        <div class="buttton_container">
          <div class="buttond" @click="quxiao">
            取消订单
          </div>
          <div class="buttont" @click="tijiao">
            立即付款
          </div>
        </div>
      </div>
    </div>
    <div class="titleg">
      <div class="my_collectiond">优质课程</div>
    </div>
    <div class="youzhikecheng">
      <v-kecheng_detail v-for="(item, key) in data.course" :data="item" :key="key"></v-kecheng_detail>
    </div>
    <div class="titleg">
      <div class="my_collectiond">精选好货</div>
    </div>
    <div class="jingxuanhaohuo">
      <div class="container">
        <v-rexiao v-for="(item, key) in data.product" :key="key" class="rexiao" :data="item"></v-rexiao>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import kechengdetaild from 'components/kecheng_detail/kecheng_detail'
import class_order_one from 'components/class_order_one/class_order_one'
import rexiao from 'components/rexiaodetail/rexiaodetail'
import md5 from 'js-md5'
import {loadFromlLocal} from '../../common/js/store'
export default {
  data() {
    return {
      data: {},
      datad: {},
      id: '',
      token: loadFromlLocal('token'),
      show: false,
      objectId: '',
      paypal_url: '',
      orde_pay: {
        addressId: 0,
        amount: 0,
        collageId: 0,
        contact: '',
        entrancee: '',
        goodsName: '',
        id: 0,
        name: '',
        orderId: 0,
        orderType: '',
        parentId: 0,
        prive: 0,
        refereeId: 0,
        sign: '',
        specificationId: 0,
        time: 0,
        type: 'COURSE'
      }
    }
  },
  components: {
    'v-kecheng_detail': kechengdetaild,
    'v-rexiao': rexiao,
    'v-class_order_one': class_order_one
  },
  store,
  methods: {
    quxiao() {
      this.axios({
        method:"get",
        url:this.url() + '/front/order/cancel/apply?id=' + this.id,
        headers: {
          userToken: this.token
        },
      }).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$router.push({
            path: '/order_center',
          })
          this.$message({
            message: '取消订单成功',
            type: 'success'
          });
        }
      })
    },
    close() {
      this.show = !this.show
    },
    tijiao() {
//      this.show = !this.show
//      this.$store.commit('product_order_edit', this.datad)
//      // 给vuex的comefrom赋值为2，表明它来自于订单中心
//      this.$store.commit('comefrom_edit', 2)
//      this.$store.commit('order_type_edit', 2)
//      this.$router.push({
//        path: '/class_order_pay'
//      })
      this.$router.push({
        path: '/class_order_pay',
        query: {
          id: this.datad.id,
          data: this.datad,
          comefrom: 2,
          danke_pintuan: '',
          pk_id: this.pk_id,
          order_type: 2
        }
      })
    },
    queren() {
      this.show = !this.show
      this.pay_model()
    },
    post() {
      this.axios({
        method: 'get',
        url: this.url() + '/front/order/detail?id=' + this.id,
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        console.log('根据商品id请求对应的订单')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.datad = res.data
        }
      })
    },
    encode (data, time) {
      let str = '123456789js';
      let reg1 = new RegExp( '[0-4]' , "g" )
      let reg2 = new RegExp( '[5-9]' , "g" )
      let Base64 = require('js-base64').Base64
      return Base64.encode(time.replace( reg1, '') + "k1#" + md5(data) + '#k2' + time.replace( reg2, ''))
    },
    encodePassword (data, key) {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&77')
      let reg1 = new RegExp( '[0-4]' , "g" )
      let reg2 = new RegExp( '[5-9]' , "g" )
      let Base64 = require('js-base64').Base64
      return Base64.encode(key.replace( reg1, '' ) + "k1#" + md5(data) + '#k2' + key.replace( reg2, '' ))
    },
    normal() {
      this.axios({
        method: 'get',
        url: this.url() + '/front/common/index',
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        console.log(res)
        this.data = res.data.data
      })
    }
  },
  mounted() {
    console.log('=================')
    this.id= this.$route.query.id
    console.log(this.token)
    console.log(this.id)
    this.normal()
    this.post()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .wait_pay
    width: 1200px
    min-height: 1000px
    margin: 0 auto
    p
      margin: 0
    .mengban
      position: fixed
      width: 100%
      height: 100%
      background-color: black
      z-index: 2
      top: 0
      left: 0
      opacity: 0.5
    .pay_type
      display: flex
      flex-direction: column
      z-index: 3
      width: 655px
      height: 405px
      background-color: white
      left:50%
      top:50%
      margin-left:-325px
      margin-top:-300px
      position:fixed
      border-radius: 12px
      color:rgba(192,192,192,1)
      overflow: hidden
      padding-bottom: 30px
      .guanbi
        position: absolute
        width: 54px
        height: 54px
        right: 10px
        top: 15px
        text-align: center
        line-height: 54px
        font-size: 26px
      .container
        margin: 0 auto
        margin-top: 30px
        width: 600px
        display: flex
        flex-direction: column
        font-weight: 500
        .py1
          color: #000000
          font-size: 16px
        .py2
          display: flex
          margin-top: 20px
          font-size: 14px
          .imgz
            margin-right: 5px
        .py3
          width: 600px
          height: 200px
          margin-top: 20px
          border-bottom: 1px solid #DBDBDB
          .type
            display: flex
            flex-wrap: wrap
            margin-top: 16px
            justify-content: flex-start
            .typedy
              width: 185px
              height: 68px
              margin-right: 15px
              margin-bottom: 15px
              position: relative
              background-color: #F3F5F7
              &.typedv
                background-image: url("./select.png")
              .imgw
                margin-top: 13px
                margin-left: 60px
              .imgz
                margin-top: 23px
                margin-left: 55px
              .imgy
                margin-top: 22px
                margin-left: 47px
              .imgp
                margin-top: 19px
                margin-left: 40px
              .imgq
                width: 29px
                height: 28px
                margin-left: 36px
                margin-top: 12px
                img
                  width: 100%
                  height: 100%
              .pay_moneyt
                position: absolute
                font-size: 16px
                top: 18px
                left: 78px
              .yue
                position: absolute
                font-size: 12px
                color: #888888
                top: 47px
                left: 58px
        .py4
          display: flex
          margin-top: 30px
          justify-content: flex-end
          align-items: center
          .number
            display: flex
            align-items: flex-end
            margin-right: 10px
            .money
              font-size: 18px
              font-weight: 500
              color: #F06074
            .num
              font-size: 14px
          .button_type
            width: 114px
            height: 40px
            text-align: center
            line-height: 40px
            color: white
            background-color: #2EB7C6
    p
      margin: 0
    .localtitle
      width: 1280px
      height: 76px
      display: flex
      margin: 0 auto
      p
        margin: 0
        margin-top: 24px
        font-size: 14px
      .local
        color: #2EB7C6
    .waitt
      width: 1200px
      height: 68px
      font-size: 18px
      padding-left: 19px
      font-weight:400
      line-height: 68px
      color: #FF5704
      background-color: RGBA(251, 167, 68, 0.18)
      border: 1px solid #FBA744
    .titleg
      font: 14px
      margin-top: 30px
      width: 1200px
      border-bottom: 2px solid #DBDBDB
      .my_collectiond
        font-weight: 400
        height: 26px
    .cantuand
      width: 1200px
      height: 410px
      margin-top: 20px
      border: 1px solid #DBDBDB
      .cantuan_container
        width: 1160px
        position: relative
        margin: 0 auto
        font-size: 14px
        .headerd
          margin-top: 25px
          height: 43px
          flex-direction: column
          .a
            display: flex
            align-items: center
            margin-top: 15px
            .titled
              font-weight: 400
              font-size: 14px
            .contentd
              margin-left: 40px
              font-size: 14px
        .div5
          display: flex
          position: absolute
          top: 0
          right: 0
          font-size: 14px
          color: #888888
          align-items: center
          .phonee
            display: flex
            margin-right: 5px
          .img
            margin-right: 5px
            width: 16px
            height: 16px
        .buttton_container
          width: 200px
          height: 26px
          position: absolute
          right: 0
          bottom: -50px
          display: flex
          font-size:14px
          justify-content: flex-end
          .buttond
            width: 80px
            height: 26px
            cursor:pointer
            margin-right: 15px
            border: 1px solid black
            line-height: 26px
            text-align: center
            border-radius:13px
            background-color: white
          .buttont
            width: 80px
            height: 26px
            cursor:pointer
            color: white
            line-height: 26px
            text-align: center
            border-radius:13px
            background-color: #FF5704
        .order_information
          display: flex
          margin-top: 25px
          margin-left: 0
          font-size: 14px
          font-weight: 500
          color: #888888
          .div
            margin-top: 17px
            margin-left: 40px
            .divp
              margin-top: 20px
          .div1
            color: #3A3A3A
    .youzhikecheng
      width: 1200px
      margin: 0 auto
      margin-top: 20px
      display: flex
      justify-content: space-between
    .jingxuanhaohuo
      width: 1200px
      margin: 0 auto
      display: flex
      margin-top: 20px
      margin-bottom: 50px
      justify-content: space-between
      background-color: #F7F7F7
      height: 144px
      .container
        display: flex
        height: 90px
        margin-top: 26px
        displa: flex
        justify-content: space-between
        :last-child
          border:none
</style>
