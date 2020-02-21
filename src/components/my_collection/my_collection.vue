<template>
  <div class="class_collection">
    <div class="class_collection_container">
      <div class="img">
        <img :src="data.pic">
      </div>
      <div class="text">
        <p class="titlee">{{data.title}}</p>
        <p class="teacher">讲师：{{data.teacher}}</p>
        <p class="money">￥{{data.discountPrice}}</p>
      </div>
      <div class="button" @click="kechengxuexi(1)" v-show="type===1">开始学习</div>
      <div class="button" @click="kechengxuexi(2)" v-show="type===2">立即购买</div>
      <div class="button" @click="kechengxuexi(3)" v-show="type===3">立即参加</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {},
    type: 0
  },
  methods: {
    kechengxuexi(index) {
      if (index) {
        this.$router.push({
          path: '/class_detail',
          query: {
            id: this.data.id
          }
        })
      }
      // this.$emit('jumpclass_detail', this.data.id)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.class_collection
  width: 893px
  height: 120px
  border-bottom: 1px solid #d6d6d6
  background-color: #f7f7f7
  .class_collection_container
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
      img
        width: 100%
        height: 100%
    .text
      margin-left: 18px
      .titlee
        margin-top: 5px
      .teacher
        margin-top:15px
        font-size: 12px
        color: rgba(174,174,174,1)
      .money
        font-size: 16px
        margin-top: 16px
    .button
      position: absolute
      cursor: pointer
      width: 100px
      height: 34px
      right: 31px
      top: 32px
      background-color: white
      text-align: center
      line-height: 34px
      font-size: 14px
      color: #2EB7C6
      border: 1px solid #2EB7C6
      border-radius:17px
</style>
