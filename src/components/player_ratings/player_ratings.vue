<template>
  <div class="player_ratings">
    <div class="img_name">
      <div class="img">
        <img src="" alt="">
      </div>
      <div class="name">Benjamin</div>
      <div class="grande"></div>
    </div>
    <div class="time">
      2018-06-04 13:36
    </div>
    <div class="rating">
      大师级就是不一样，课程非常有用，超值！
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratings
  display: flex
  flex-direction: column
  .img_name
    height: 30px
    display: flex
    .img
      width: 30px
      height: 30px
      border-radius: 50%
      background-color: yellow
    .name
      line-height: 30px
      margin-left: 8px
  .time
    color: #C0C0C0
    margin-top: 10px
    font-size:14px
  .rating
    width: 100px
    margin-top: 10px
</style>
