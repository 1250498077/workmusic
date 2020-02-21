<template>
  <div class="product_order_detail" :class="{'ck':select}" @click="click">
    <div class="conta">
      <div class="product_order_detail_name">收件人：{{data.name}}</div>
      <div class="product_order_detail_phone">电话：{{phone}}</div>
      <div class="product_order_detail_dizhi">地址：{{address}}</div>
      <div class="img" @click="deleted">
        <img src="./lajitong.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {},
    index: '',
    select: {
      default: false
    }
  },
  data() {
    return {
      phone: '',
      address: ''
    }
  },
  methods: {
    click() {
      console.log('子组件')
      this.$emit('selectd', this.index, this.data.id)
    },
    deleted() {
      console.log(this.data.id)
      this.$emit('deleted', this.data.id)
    },
    edit() {
      this.$emit('edit', {
        "accessTime": 0,
        "code": 0,
        "currentPage": 0,
        "data": {},
        "extras": {},
        "message": "string",
        "totalPage": 0,
        "totalSize": 0,
        "values": {}
      })
    }
  },
  created: function () {
    console.log('product_order_detailproduct_order_detailproduct_order_detailproduct_order_detail')
    let phoned = this.data.phone
    let phone_front = phoned.substring(0,3)
    let phone_behind = phoned.substring(7,11)
    let a = '****'
    this.phone = phone_front +  a + phone_behind
    this.address = this.data.province + this.data.city + this.data.area + this.data.fullAddress
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.product_order_detail
  width: 285px
  height: 160px
  cursor: pointer
  &.ck
    background: url("./selectg.png") no-repeat
  .conta
    display: flex
    position: relative
    margin-left: 20px
    flex-direction: column
    .img
      width: 13px
      height: 16px
      position: absolute
      top: 17px
      right: 13px
      img
        width: 100%
        height: 100%
    .product_order_detail_name
      font-size: 18px
      margin-top: 20px
      font-weight: 500
      color: #3A3A3A
    .product_order_detail_phone
      color: #888888
      margin-top: 10px
      font-size: 16px
    .product_order_detail_dizhi
      color: #888888
      width: 240px
      height: 100px
      line-height: 24px
      margin-top: 7px
      font-size: 16px
</style>
