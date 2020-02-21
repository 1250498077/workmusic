<template>
  <div class="renwu">
    <div class="img">
      <img src="" alt="">
    </div>
    <div class="name">路德维希·凡·贝多芬</div>
    <div class="content">
      <p>
        德国作曲家和音乐家，维也纳古典乐派代表人物
        之一。路德维希·凡·贝多芬的代表作有交响乐
        《英雄交响曲》、《命运交响曲》、《田园交响
        曲》、《欢乐颂》，钢琴奏鸣曲《悲怆》、《月
        光》、《暴风雨》、《热情》、《幻想》、《致
        爱丽丝》，弦乐四重奏《大赋格》等。
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.renwu
  width: 262px
  height: 304px
  position: relative
  align-items: center
  display: flex
  flex-direction: column
  justify-content: center
  background-color: hotpink
  .img
    width: 122px
    height: 124px
    border-radius: 122px
    position: relative
    bottom: 50px
    background-color: yellowgreen
  .name
    position: relative
    bottom: 36px
    font-size:16px
    font-weight:600
    color:rgba(58,58,58,1)
  .content
    max-width: 204px
    position: relative
    bottom: 36px
    font-size: 12px
    height: 146px
    line-height:19px;
    overflow: hidden
</style>
