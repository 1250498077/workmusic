<template>
  <div class="title">
    <div class="img">
      <img src="./right.png" alt="">
    </div>
    <div class="text">
      <p>{{a1}}</p>
      <p class="xie">/</p>
      <p>{{a2}}</p>
      <p class="xie">/</p>
      <p>{{a3}}</p>
      <p class="xie">/</p>
      <p>{{a4}}</p>
    </div>
    <div class="img">
      <img src="./left.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '优,质,课,程'
    }
  },
  data() {
    return {
      a1: '',
      a2: '',
      a3: '',
      a4: ''
    }
  },
  created: function () {
    let str = this.title.split(',')
    this.a1 = str[0]
    this.a2 = str[1]
    this.a3 = str[2]
    this.a4 = str[3]
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.title
  display: flex
  width: 300px
  margin: 0 auto
  justify-content: center
  align-items: center
  font-size: 20px
  p
    margin: 0
  .img
    width: 44px
    height: 24px
    img
      width: 100%
      height: 100%
  .text
    display: flex
    margin-top: 14px
    margin: 0 20px
    .xie
      padding: 0 10px
</style>
