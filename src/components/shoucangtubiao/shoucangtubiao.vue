<template>
  <div class="shoucangtubiao">
    <div class="img1" @click="shoucang">
      <!--no_shoucang.png-->
      <img src="./no_shoucang.png" alt="" v-show="no_yes === false">
      <img src="./shoucang.png" alt="" v-show="no_yes === true">
      <p class="shoucangtubiaop">收藏</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    no_yes: false
  },
  methods: {
    shoucang() {
      console.log('shoucang')
      this.$emit('shoucang', this.no_yes)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shoucangtubiao
  position: absolute
  width: 100px
  height: 100px
  display: flex
  flex-direction: column
  align-items: center
  font-size: 14px
  color: #888888
  .img1
    position: relative
    display: flex
    align-items: center
    img
      width: 20px
      height: 20px
    .shoucangtubiaop
      margin-left: 7px
  .img2
    position: relative
    display: flex
    align-items: center
    margin-top: 15px
    img
      width: 20px
      height: 20px
    .shoucangtubiaop
      margin-left: 7px
  .img3
    position: relative
    margin-right: 25px
    width: 92px
    height: 26px
    img
      width: 100%
      height: 100%
</style>
