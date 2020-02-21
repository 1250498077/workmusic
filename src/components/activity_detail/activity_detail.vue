<template>
  <div class="activity_detail">
    <div class="activity_detail_container">
      <div class="img">
        <img src="" alt="">
      </div>
      <div class="text">
        <p class="title">零基础流行钢琴入门（民谣篇）</p>
        <p class="teacher">讲师：张天瑞</p>
        <p class="money">￥279.00</p>
      </div>
    </div>
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
.activity_detail
  width: 893px
  height: 120px
  border-bottom: 1px solid #d6d6d6
  background-color: #f7f7f7
  .activity_detail_container
    display: flex
    height: 90px
    position: relative
    margin-left: 19px
    margin-top: 13px
    .img
      width: 120px
      height: 90px
      border-radius:12px
      background-color: yellow
    .text
      margin-left: 18px
      .title
        margin-top: 5px
      .teacher
        margin-top:15px
        font-size: 12px
        color: rgba(174,174,174,1)
      .money
        font-size: 16px
        margin-top: 16px
</style>
