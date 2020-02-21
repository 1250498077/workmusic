<template>
  <div class="detail">
    <div class="image" @click="jump">
      <img :src="data.pic||data.img" alt="">
    </div>
    <div class="divp">
      <div class="detailtitle">
        {{data.name||data.title}}
      </div>
    </div>
    <p class="teacher">{{data.teacher}}</p>
    <div class="student">
      {{data.coursewareAmount}}课程数
    </div>
    <p class="zhekou">￥{{data.originalPrice}}</p>
    <p class="money">￥{{data.discountPrice}}</p>
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
        path: '/class_detail',
        query: {
          id: this.data.id
        }
      })
    }
  },
  created: function () {
    // console.log(data)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.detail
  width: 216px
  display: flex
  flex-direction: column
  p
    margin: 0
  .image
    width: 216px
    height: 162px
    cursor: pointer
    overflow: hidden
    border-radius: 10px
    background-color: aqua
    img
      width: 100%
      height: 100%
  .divp
    height: 46px
    margin-top: 14px
    margin-left: 10px
    .detailtitle
      line-height: 28px
      height: 58px
      overflow hidden
      font-size: 18px
      cursor: pointer
      color: #3A3A3A
  .teacher
    margin-top: 15px
    color: #AEAEAE
    font-size: 12px
    margin-left: 10px
  .student
    margin: 0
    height: 20px
    line-height: 20px
    text-align: center
    width: 80px
    font-size: 12px
    color: #C8AA70
    margin-left: 10px
    margin-top: 12px
    border:1px solid #C8AA70
    border-radius: 5px
  .zhekou
    color: #AEAEAE
    font-size: 12px
    margin-left: 10px
    margin-top: 9px
    text-decoration: line-through
  .money
    margin: 0
    font-size: 16px
    color: #3A3A3A
    margin-left: 10px
    margin-top: 5px
    font-family:PingFangSC-Medium
    font-weight: 700
</style>
