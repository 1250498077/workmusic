<template>
  <div class="order_detail">
    <div class="ao order_summary">
      <div class="header">
        <div class="leftt" @click="quxiao">
          <p class="titled">订单编号:</p>
          <p class="data">{{datad.orderNo}}</p>
        </div>
        <div class="rightt">
          <div class="img">
            <img src="./phone.png" alt="">
          </div>
          <div class="phone">
            <p class="data">客服电话</p>
            <p class="data">020-81709897</p>
          </div>
        </div>
      </div>
      <div class="contentd content">
        <div class="img">
          <img :src="datad.pic" alt="">
        </div>
        <div class="text">
          <div class="titleddd">
            {{datad.goodsName}}
          </div>
          <p>
            {{datad.goodsSpecification}}
          </p>
        </div>
        <p class="zhuantai">{{datad.status}}</p>
      </div>
    </div>
    <div class="ao who">
      <div class="header"></div>
      <div class="content">
        <p class="shouhuoren">
          收货人
        </p>
        <p class="name">
          张晓玲
        </p>
      </div>
    </div>
    <div class="ao money">
      <div class="header"></div>
      <div class="content">
        <div class="content_d">
          <div class="zonge">
            <p>总额:</p>
            <P class="zonge_m">￥{{datad.actualPay}}</P>
          </div>
          <div class="pay_type">
            <p>微信支付</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ao detail">
      <div class="header"></div>
      <div class="content">
        <p class="xiangq" @click="dingdan_xiangqing">订单详情</p>
        <!--<div class="button" v-if="datad.status === '待支付'">-->
          <!--立即支付-->
        <!--</div>-->
        <div class="button_old" v-if="datad.status === '已完成'" @click="pingjia">
          评价
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datad: {}
  },
  data() {
    return {
      id: '',
      picId: ''
    }
  },
  methods: {
    pingjia() {
      this.$emit('pingjia', this.datad)
    },
    quxiao() {
      this.$emit('quxiao', this.datad.id)
    },
    jump() {
      console.log('order_detail')
      console.log(this.datad.id)
      this.$emit('wait_pay_jump', this.datad.id, this.datad.type, this.datad)
    },
    dingdan_xiangqing() {
//      this.$emit('dingdan_xiangqing', this.datad)
      console.log('跳转')
      console.log(this.datad.type)
      console.log(this.datad.status)
      if (this.datad.type === 'COURSE'&&this.datad.status === '待支付') {
        console.log('课程待支付')
        this.$router.push({
          path:'/class_pay_wait',
          query: {
            id: this.datad.id
          }
        })
      } else if (this.datad.type === 'COURSE'&&this.datad.status === '已完成') {
        console.log('课程已完成')
        console.log(this.datad.id)
        this.$router.push({
          path:'/class_pay_success',
          query: {
            id: this.datad.id
          }
        })
      }
      else if (this.datad.type === 'PRODUCT'&&this.datad.status === '待发货') {
        console.log('商品代发货')
        this.$router.push({
          path:'/product_pay_success',
          query: {
            id: this.datad.id
          }
        })
      } else if (this.datad.type === 'PRODUCT'&&this.datad.status === '待支付') {
        console.log('商品待支付')
        this.$router.push({
          path:'/product_pay_wait',
          query: {
            id: this.datad.id
          }
        })
      }else if (this.datad.type === 'ACTIVITY'&&this.datad.status === '已完成') {
        console.log('活动已完成')
        this.$router.push({
          path:'/activity_pay_success',
          query: {
            id: this.datad.id
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.order_detail
  width: 1200px
  height: 147px
  display: flex
  border: 1px solid #DBDBDB
  p
    font-size: 14px
    margin: 0
  .data
    color:#888888
  .order_summary
    width: 778px
    align-items: center
  .who
    width: 145px
    .content
      display: flex
      flex-direction: column
      align-items: center
      color: #C0C0C0
      .shouhuoren
        margin-top: 20px
      .name
        color: black
        margin-top: 19px
    p
      font-weight: 400
      font-size: 14px
      cursor: pointer
  .money
    width: 170px
    .content
      .content_d
        display: flex
        flex-direction: column
        align-items: center
        width: 148px
        .zonge
          height: 43px
          line-height: 43px
          justify-content: center
          display: flex
          color: #C0C0C0
          border-bottom: 1px solid #DADADA
          .zonge_m
            color: #3A3A3A
        .pay_type
          color: #C0C0C0
          margin-top: 10px
  .detail
    width: 109px
    .content
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      p
        cursor: pointer
        font-size: 14px
        text-decoration: underline
      .button
        width:80px
        height:26px
        cursor: pointer
        background-color: #FF5704
        border-radius:13px
        font-size:14px
        text-align: center
        line-height: 26px
        color: white
        margin-top: 20px
      .button_old
        width: 64px
        height: 26px
        cursor: pointer
        margin-top: 20px
        line-height: 26px
        font-size: 14px
        text-align: center
        border: 1px solid #DBDBDB
        border-radius: 13px
  .ao
    height: 147px
    overflow: hidden
    .content
      height: 107px
      border-right: 1px solid #C0C0C0
    .header
      display: flex
      height: 38px
      margin: 0
      font-weight: 400
      color: #C0C0C0
      align-items: center
      position: relative
      background-color: #F7F7F7
      .leftt
        margin-left: 18px
        display: flex
        .titled
          color: #C0C0C0
        .data
          margin-left: 10px
      .time
        margin-left: 20px
        font-size: 14px
      .rightt
        display: flex
        position: absolute
        left: 570px
        align-items: center
        .img
          margin-right: 10px
          width: 16px
          height: 16px
          img
            width: 100%
            height: 100%
        .phone
          margin-right: 10px
          display: flex
        .qqimg
          width: 77px
          height: 22px
          img
            width: 100%
            height: 100%
    .contentd
      display: flex
      position: relative
      .img
        width: 68px
        height: 68px
        margin-top: 20px
        margin-left: 20px
        background-color: #8c939d
        img
          width: 100%
          height: 100%
      .text
        margin-left: 20px
        .titleddd
          width: 253px
          height: 34px
          margin-top: 20px
        p
          margin-top: 9px
          color: #C0C0C0
      .zhuantai
        position: absolute
        top: 24px
        font-weight: 500
        color: #888888
        right: 20px
  :last-child
    border-right: none
    :last-child
      border-right: none
</style>
