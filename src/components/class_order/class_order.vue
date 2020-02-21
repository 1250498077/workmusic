<template>
  <div class="class_order">
    <div class="header_shadow"></div>
    <div class="header">
      <p class="aa">购买账号: </p>
      <p class="phone">{{phone}}</p>
      <p class="aa b"> 更换账号></p>
    </div>
    <div class="tips">
      <div class="img">
        <img src="./tips.png" alt="">
      </div>
      <p>购买后不支持退款、转让，请确认有效期后再提交订单。</p>
    </div>
    <div class="order">
      <div class="">确认订单信息</div>
    </div>
    <div class="order_list">
      <div class="a product">
        <div class="titlea">商品</div>
        <div class="container">
          <div class="img">
            <img :src="data.pic" alt="">
          </div>
          <div class="text">
            <p class="titled">{{data.name}}</p>
            <p class="people">{{data.orderType}}</p>
          </div>
        </div>
      </div>
      <div class="a term">
        <div class="titlea">有效期</div>
        <div class="line">365天</div>
      </div>
      <div class="a unit_price">
        <div class="titlea">单价</div>
        <div class="line">￥{{data.price}}</div>
      </div>
      <div class="a amount">
        <div class="titlea">数量</div>
        <div class="line">{{data.amount}}</div>
      </div>
      <div class="a discount">
        <div class="titlea">优惠</div>
      </div>
      <div class="a total_price">
        <div class="titlea">总价</div>
        <div class="line">￥{{data.price}}</div>
      </div>
    </div>
    <div class="all_money">
      <p class="all">总金额：</p>
      <p class="money">￥{{data.price}}</p>
    </div>
    <div class="place_order">
      <div class="moneyy">
        <p class="titled">实付金额：</p>
        <p class="moneyd">￥{{data.price}}</p>
      </div>
      <div class="money_button" @click="class_jump">
        提交订单
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import {loadFromlLocal} from '../../common/js/store'
export default {
  data() {
    return {
      id: '',
      token:
        (() => {
          return loadFromlLocal('token')
        })(),
      order: {
        id: 0,
        parentId: 0,
        refereeId: 0,
        typeId: 0
      },
      data: {},
      phone: '',
      danke_pintuan: '',
      pk_id: ''
    }
  },
  store,
  methods: {
    class_jump: function() {
      this.$store.commit('order_type_edit', 1)
      this.$router.push({
        path: '/class_order_pay',
        query: {
          id: this.id,
          data: this.data,
          comefrom: 1,
          danke_pintuan: this.danke_pintuan,
          pk_id: this.pk_id,
          order_type: 1
        }
      })
    },
    model() {
      this.order = {
        id: this.id
      }
      this.post()
    },
    post() {
      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/course/info',
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
        } else if (res.code === 401) {
        }
      })
    },
    pinke_model() {
      let model = {
        id: this.id,
        typeId: this.pk_id
      }
      this.pkpost(model)
    },
    pkpost(model) {
      console.log('申请拼课')
      console.log(model)
      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/course/info',
        headers: {
          userToken: this.token
        },
        data: model
      }).then((res) => {
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
        } else if (res.code === 401) {
        }
      })
    },
    own_information_post() {
      this.axios({
        method:"get",
        url:this.url() + '/front/user/information/pre',
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('找到url')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.phone = res.data.phone
        }
      })
    }
  },
  created: function () {},
  mounted() {
    this.id = this.$route.query.id
    this.own_information_post()
    this.danke_pintuan = this.$route.query.danke_pintuan
    console.log('mounted')
    if (this.danke_pintuan === '2') {
      console.log('进入拼团')
      this.pk_id = this.$route.query.pk_id
      this.pinke_model()
    } else {
      this.model()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.class_order
  width: 1280px
  min-height: 1000px
  margin: 0 auto
  p
    margin: 0
  .header_shadow
    margin: 0 auto
    width: 1280px
    height: 15px
  .header
    display: flex
    margin: 0 auto
    margin-top: 25px
    width: 1200px
    align-items: flex-end
    .aa
      font-size: 14px
    .b
      color: #2BB7C7
    .phone
      font-size: 18px
    p
      margin: 0
      margin-left: 5px
  .tips
    display: flex
    font-size: 14px
    margin: 0 auto
    width: 1200px
    margin-top: 20px
    color: #888888
    .img
      width: 12px
      height: 12px
      img
        width: 100%
        height: 100%
    p
      margin-left: 10px
      color: #888888
  .order
    width: 1200px
    margin: 0 auto
    margin-top: 28px
    font-size:16px
    height: 26px
    border-bottom: 1px solid #DBDBDB
  .order_list
    margin: 0 auto
    width: 1200px
    height: 147px
    display: flex
    margin-top: 20px
    border: 1px solid #DADADA
    .a
      height: 147px
      border-right: 2px solid #f7f7f7
      .titlea
        text-align: center
        height: 38px
        line-height: 38px
        font-size: 14px
        color: black
        font-weight: 500
        background-color: #F7F7F7
      .line
        text-align: center
        line-height: 110px
        color: #888888
    .product
      width: 394px
      .container
        display: flex
        .img
          width: 70px
          height: 68px
          margin-top: 20px
          margin-left: 20px
          background-color: #F7F7F7
          img
            width: 100%
            height: 100%
        .text
          margin-left: 21px
          margin-top: 20px
          font-size: 14px
          font-weight: 400
          .people
            color: #C0C0C0
            margin-top: 29px
    .term
      width: 107px
    .unit_price
      width: 125px
    .amount
      width: 67px
    .discount
      width: 174px
    .total_price
      border: none
      width: 328px
  .all_money
    width: 1200px
    height: 50px
    display: flex
    margin: 0 auto
    margin-top: 30px
    justify-content: flex-end
    .money
      font-size: 18px
      font-weight: 600
    .all
      margin-top: 3px
      font-size: 14px
  .place_order
    width: 1200px
    height: 100px
    display: flex
    margin: 0 auto
    justify-content: flex-end
    background-color: #F7F7F7
    .moneyy
      display: flex
      align-items: flex-end
      margin-bottom: 42px
      margin-right: 20px
      .titled
        color: #3A3A3A
        font-size: 14px
      .moneyd
        color: #F06074
        font-size: 18px
    .money_button
      width: 142px
      height: 50px
      margin-top: 24px
      margin-right: 24px
      cursor: pointer
      text-align: center
      color: white
      line-height: 50px
      background-color: #2EB7C6
</style>
