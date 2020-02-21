<template>
  <div class="class_order">
    <div class="order">
      <div class="order_header b">收货地址</div>
    </div>
    <div class="personal">
      <div class="namee aa">
        <p class="titlea">收件人：</p>
        <p class="content">{{name}}</p>
      </div>
      <div class="phonee aa">
        <p class="titlea">电话：</p>
        <p class="content">{{phone}}</p>
      </div>
    </div>
    <div class="order">
      <div class="order_header">确认订单信息</div>
    </div>
    <div class="order_list">
      <div class="a product">
        <div class="titlea">商品</div>
        <div class="container">
          <div class="img">
            <img :src="data.pic">
          </div>
          <div class="text">
            <p class="titled">{{data.name}}</p>
            <p class="people">人数 ×{{people_num}}</p>
          </div>
        </div>
      </div>
      <div class="a term">
        <div class="titlea">活动日期</div>
        <div class="line">{{data.endTime}}</div>
      </div>
      <div class="a unit_price">
        <div class="titlea">单价</div>
        <div class="line">￥{{data.price}}</div>
      </div>
      <div class="a amount">
        <div class="titlea">数量</div>
        <div class="line">{{people_num}}</div>
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
      <div class="money_button" @click="jump">
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
      token: loadFromlLocal('token'),
      order: {
        id: 0,
        parentId: 0,
        refereeId: 0,
        typeId: 0
      },
      data: {},
      phone: '',
      people_num: 0,
      name: ''
    }
  },
  store,
  methods: {
    jump: function() {
      this.$store.commit('activity_id_edit', this.id)
      this.$store.commit('activity_data_edit', {
        'data': this.data,
        'people_num': this.people_num
      })
      this.$store.commit('order_type_edit', 3)
      this.$router.push({
        path: '/class_order_pay',
        query: {
          data: this.data,
          order_type: 3,
          people_num: this.people_num,
          phone: this.phone,
          comefrom: 1,
          name: this.name
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
        url:this.url() + '/front/order/confirm/activity/info',
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
    }
  },
  mounted() {
    this.people_num = this.$route.query.people_num
    this.phone = this.$route.query.phone
    this.name = this.$route.query.name
    this.id= this.$route.query.id
    this.model()
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
    .order
      width: 1200px
      margin: 0 auto
      margin-top: 28px
      font-size:16px
      height: 26px
      border-bottom: 2px solid #DBDBDB
      .order_header
        height: 26px
        width: 96px
        border-bottom: 2px solid #2BB7C7
        &.b
          width: 64px
    .personal
      display: flex
      width: 1200px
      margin: 0 auto
      margin-top: 20px
      flex-direction: column
      .aa
        display: flex
        color: #3A3A3A
        margin-top: 10px
        font-weight:400
        &.namee
          font-size: 18px
        &.phonee
          font-size: 16px
          color: #888888
    .order_list
      margin: 0 auto
      width: 1200px
      height: 147px
      display: flex
      margin-top: 20px
      overflow: hidden
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
            .people
              color: #C0C0C0
              font-size: 14px
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
        font-weight: 400
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
        cursor: pointer
        margin-top: 24px
        margin-right: 24px
        text-align: center
        color: white
        line-height: 50px
        background-color: #2EB7C6
</style>
