<template>
  <div class="huodong_zujian">
    <div class="img">
      <img :src="data.pic" alt="">
    </div>
    <div class="titlee">
      {{data.name}}
    </div>
    <div class="huodongdetail">
      <p class="baoming">报名截止: {{data.signUpTime}}</p>
      <p class="minge">名额: {{data.amount}}</p>
    </div>
    <p class="huodongmoney">￥{{data.price}}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.huodong_zujian
  width: 380px
  height: 300px
  margin-top: 30px
  margin-bottom: 44px
  .img
    width: 380px
    height: 151px
    border-radius:12px
    overflow: hidden
    background-color: yellowgreen
    img
      width: 100%
      height: 100%
  .titlee
    width: 321px
    height: 44px
    font-size:18px
    font-weight:500
    margin-top: 20px
    color:rgba(58, 58, 58, 1)
  .huodongdetail
    width: 380px
    margin: 0 auto
    margin-top: 14px
    margin-left: 30px
    display: flex
    .baoming
      font-size: 14px
      color: #888888
    .minge
      font-size: 14px
      color: #888888
      margin-left: 20px
  .huodongmoney
    margin-top: 14px
    margin-left: 30px
    font-weight: 600
</style>
