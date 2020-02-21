<template>
  <div class="wait_pay">
    <div class="mengban" v-show="show"></div>
    <div class="pay_type" v-show="show">
      <div class="guanbi icon-close" @click="close()"></div>
      <div class="container">
        <div class="py1">立即支付</div>
        <div class="py2">
          <div class="imgz">
            <img src="./tips.png" alt="">
          </div>
          <p>请选择支付方式</p>
        </div>
        <div class="py3">
          <div class="type">
            <div class="typedy typedv" @click="pay_type($event)">
              <div class="imgw img">
                <img src="./weixin.png" alt="">
              </div>
            </div>
            <div class="typedy" @click="pay_type($event)">
              <div class="imgz img">
                <img src="./zhifubao.png" alt="">
              </div>
            </div>
            <div class="typedy" @click="pay_type($event)">
              <div class="imgy img">
                <img src="./yinlian.png" alt="">
              </div>
            </div>
            <div class="typedy" @click="pay_type($event)">
              <div class="imgp img">
                <img src="./paypal.png" alt="">
              </div>
            </div>
            <div class="typedy" @click="pay_type($event)">
              <div class="imgq img">
                <img src="./qianbao.png" alt="">
              </div>
              <div class="pay_moneyt">
                钱包支付
              </div>
              <div class="yue">
                余额：2400.00
              </div>
            </div>
          </div>
        </div>
        <div class="py4">
          <div class="number">
            <p class="num">实付金额：</p>
            <p class="money">￥{{datad.actualPay}}</p>
          </div>
          <div class="button_type" @click="queren()">确认支付</div>
        </div>
      </div>
    </div>
    <div class="localtitle">
      <p class="start">您的位置：</p>
      <p class="local">首页 / 我的订单 / 等待付款</p>
    </div>
    <div class="wait">
      拼课中
    </div>
    <div class="titleg">
      <div class="my_collectiond">订单信息</div>
    </div>
    <div class="cantuan">
      <div class="cantuan_container">
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
            <p>订单类型：</p>
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
            <img src="./a1.png" alt="">
          </div>
        </div>
        <v-class_order_one :data="datad" class="class_order_one"></v-class_order_one>
        <div class="button" @click="tijiao">退款</div>
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

  export default {
    data() {
      return {
        data: {},
        datad: {},
        id: '',
        token: '',
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
          type: 'COURSE',
          pk_id: ''
        },
        pk_id: ''
      }
    },
    components: {
      'v-kecheng_detail': kechengdetaild,
      'v-rexiao': rexiao,
      'v-class_order_one': class_order_one
    },
    store,
    methods: {
      close() {
        this.show = !this.show
      },
      tijiao() {
        this.show = !this.show
      },
      queren() {
        this.show = !this.show
        this.pay_model()
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
      pay_model() {
        let date = new Date()
        let time = date.getTime()
        let data = "type=" + 'COURSE'
          + ",id=" + this.id
          + ",orderType=" + 'NORMAL'
          + ",addressId=" + ''
          + ",name=" + ''
          + ",contact=" + ''
          + ",amount=" + '1'
          + ",collageId=" + this.phone
          + ",parentId=" + ''
          + ",refereeId=" + ''
        console.log('最后最后最后最后最后最后最后最后最后')
        console.log(this.id)
        let keyt = this.$options.methods.encode(data, time.toString())
        this.orde_pay = {
          addressId: '',
          amount: 1,
          collageId: '',
          contact: '',
          entrancee: 1,
          goodsName: '',
          id: this.objectId,
          name: '',
          orderId: this.id,
          orderType: 'NORMAL',
          parentId: 0,
          prive: this.data.price,
          refereeId: '',
          sign: keyt,
          specificationId: '',
          time: time,
          type: 'COURSE',
          keyt: keyt
        }
        this.paypal()
      },
      paypal() {
        this.axios({
          method:"post",
          url:this.url() + '/front/pay/paypal',
          headers: {
            userToken: this.token
          },
          data: this.orde_pay
        }).then((res) => {
          console.log('postpostpost')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            // 获取一个url
            this.paypal_url = res.data
          }
        })
      },
      pay_type(e) {
        let typed = document.getElementsByClassName('typedy')
        for (let i = 0; i < typed.length; i++) {
          typed[i].classList.remove('typedv')
        }
        e.currentTarget.classList.add('typedv')
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
      },
      order_number_post() {
        this.axios({
          method: 'get',
          url: this.url() + '/front/order/detail?id=' + this.id,
          headers: {
            userToken: this.token
          }
        }).then((res)=>{
          console.log(res)
          this.objectId = res.data.data.objectId
          this.datad = res.data.data
        })
      },
      pinke_model() {
        let model = {
          id: this.id,
          typeId: this.pk_id
        }
        this.post(model)
      },
      post(model) {
        console.log('申请评课')
        this.axios({
          method:"post",
          url:this.url() + '/front/order/confirm/course/info',
          headers: {
            userToken: this.token
          },
          data: model
        }).then((res) => {
          console.log('postpostpost')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.data = res.data
          } else if (res.code === 401) {
          }
        })
      }
    },
    created () {
      this.token = this.$store.state.token
      this.id = this.$store.state.class_id
      this.pk_id = this.$store.state.pinke_id
      console.log('wait_piad_created')
      console.log(this.id)
      // this.normal()
      // this.order_number_post()
      // this.post()
      this.pinke_model()
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
    .wait
      width: 1200px
      height: 68px
      font-size: 18px
      padding-left: 19px
      line-height: 68px
      font-weight:400
      color: #007885
      background-color: RGBA(43, 183, 199, 0.18)
      border: 1px solid #2EB7C6
    .titleg
      font: 14px
      margin-top: 30px
      width: 1200px
      border-bottom: 2px solid #DBDBDB
      .my_collectiond
        height: 26px
    .cantuan
      width: 1200px
      height: 315px
      margin-top: 20px
      border: 1px solid #DBDBDB
      .cantuan_container
        width: 1160px
        position: relative
        margin: 0 auto
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
        .button
          width:64px
          height:26px
          position: absolute
          right: 0
          bottom: -40px
          border-radius:13px
          font-size:14px
          text-align: center
          line-height: 26px
          border: 1px solid RGBA(197, 197, 197, 1)
        .order_information
          display: flex
          margin-top: 25px
          margin-left: 20px
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
