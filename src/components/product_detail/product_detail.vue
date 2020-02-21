<template>
  <div>
    <div class="product_detail">
      <div class="img" @click="jump">
        <img :src="data.pic||data.pics" alt="">
      </div>
      <div class="product_detail_title">
        {{data.name}}
      </div>
      <p class="zhekou">￥{{data.price}}</p>
      <div class="product_detail_bottom">
        <p class="left">
          ￥{{data.discountPrice}}
        </p>
        <p class="right">
          销量: {{data.sales}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    jump() {
      // this.$emit('jump', this.data.id)
      this.$router.push({
        path: '/commodity_detail',
        query: {
          id: this.data.id
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.product_detail
  display: flex
  flex-direction: column
  p
    margin: 0
  .img
    width: 216px
    height: 216px
    border-radius:12px
    overflow: hidden
    background-color: white
    cursor: pointer
    border: 1px solid #DBDBDB
    img
      width: 100%
      height: 100%
  .product_detail_title
    width:195px
    height: 45px
    font-weight: 500
    margin-left: 12px
    margin-top: 14px
    line-height:24px
    overflow: hidden
    display: -webkit-box
    cursor: pointer
    -webkit-box-orient: vertical
    -webkit-line-clamp: 2
  .zhekou
    font-size:12px
    margin-left: 12px
    color:rgba(198,198,198,1)
    line-height:19px
    margin-top: 12px
  .product_detail_bottom
    width: 183px
    display: flex
    margin-top: 5px
    margin-left: 12px
    justify-content: space-between
    .left
      font-weight: 600
      font-size:16px
      line-height:19px
    .right
      font-size:12px
      color:rgba(174,174,174,1)
      line-height:12px
</style>
