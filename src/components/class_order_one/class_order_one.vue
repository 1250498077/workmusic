<template>
  <div class="order_list">
    <div class="a product">
      <div class="titlea">商品</div>
      <div class="container">
        <div class="img">
          <img :src="data.pic" alt="">
        </div>
        <div class="text">
          <p class="titled">{{data.goodsName}}</p>
          <p class="people"></p>
        </div>
      </div>
    </div>
    <div class="a term">
      <div class="titlea">{{text}}</div>
      <div class="line">{{title.stuts}}</div>
    </div>
    <div class="a unit_price">
      <div class="titlea">单价</div>
      <div class="line">￥{{data.price||data.actualPay}}</div>
    </div>
    <div class="a amount">
      <div class="titlea">数量</div>
      <div class="line">1</div>
    </div>
    <div class="a discount">
      <div class="titlea">优惠</div>
    </div>
    <div class="a total_price">
      <div class="titlea">总价</div>
      <div class="line">￥{{data.actualPay}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {},
    pk_no: {
      default: false
    },
    type: ''
  },
  data() {
    return {
      text: '有效期',
      title: {
        stuts: 365
      }
    }
  },
  methods: {

  },
  created: function () {
    if (this.pk_no === true) {
      this.text = '状态'
    }
    if (this.type === 'product') {
      console.log('带发货')
      this.title.stuts = '待发货'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.order_list
  margin: 0 auto
  width: 1160px
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
  .total_price
    border: none
  .product
    width: 381px
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
    width: 328px
</style>
