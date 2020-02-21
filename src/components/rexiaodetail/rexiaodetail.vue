<template>
  <div class="rexiao" @click="jump">
    <div class="rexiaoimage">
      <img :src="data.img" alt="">
    </div>
    <div class="rexiaodetail">
      <div class="rexiaotitle">
        {{data.title||'康拉德格拉夫（Conrad Graf） 德国钢琴 GE-3家用考级演奏'}}
      </div>
      <p class="zhekou">￥{{data.originalPrice||'17699.00'}}</p>
      <p class="money">￥{{data.discountPrice||'17699.00'}}</p>
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
      console.log('adadasd')
      this.$emit('jumpp', this.data.id)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .rexiao
    width: 239px
    display: flex
    font-family:PingFangSC-Regular
    border-right: 1px solid #DBDBDB
    .rexiaodetail
      position: relative
      .rexiaotitle
        width:100px
        height: 45px
        margin-left: 12px
        margin-top: 3px
        cursor: pointer
        line-height:24px
        overflow: hidden
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
      .zhekou
        margin: 0
        position: absolute
        left: 12px
        top: 60px
        font-size: 12px
        text-decoration:line-through
        color:rgba(198,198,198,1)
      .money
        margin: 0
        position: absolute
        left: 12px
        bottom: -5px
        font-size:16px
        font-weight: 700
        color:rgba(58,58,58,1)
    .rexiaoimage
      width: 88px
      height: 90px
      margin-left: 20px
      cursor: pointer
      margin-top: 3px
      background-color: aqua
      img
        width: 100%
        height: 100%
</style>
