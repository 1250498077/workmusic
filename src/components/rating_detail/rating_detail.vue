<template>
  <div class="ratings">
    <div class="img_name">
      <div class="img">
        <img :src="data.pic||pict">
      </div>
      <div class="name">{{data.username}}</div>
      <div class="grande"></div>
    </div>
    <div class="time">
      {{data.createTime}}
    </div>
    <div class="rating">
      {{data.note}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      pic: ''
    }
  },
  data() {
    return {
      pict: ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratings
  display: flex
  height: 82px
  flex-direction: column
  .img_name
    height: 30px
    display: flex
    .img
      width: 30px
      height: 30px
      border-radius: 50%
      overflow: hidden
      img
        width: 100%
    .name
      font-size: 18px
      line-height: 30px
      margin-left: 8px
      color: #3A3A3A
  .time
    color: #C0C0C0
    margin-top: 10px
    font-size:14px
  .rating
    font-size: 14px
    margin-top: 10px
    line-height:19px
    color: #3A3A3A
</style>
