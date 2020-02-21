<template>
  <div class="pingjia">
    <div class="guanbi icon-close" @click="close()"></div>
    <div class="container">
      <div class="titlee">评论</div>
      <div class="content">
        <div class="img">
          <img :src="data.pic" alt="">
        </div>
        <div class="text">
          <div class="titleq">{{data.goodsName}}</div>
        </div>
      </div>
      <div class="text_input">
        <textarea type="text" placeholder="添加评论" v-model="pinglun" style="resize:none" ></textarea>
        <div class="button" @click="fabu">发布</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {loadFromlLocal} from '../../common/js/store'
export default {
  props: {
    data: {}
  },
  data() {
    return {
      pinglun: '',
      token: loadFromlLocal('token')
    }
  },
  methods: {
    fabu() {
      console.log('fafaf1')
      console.log(this.token)
      let model = {
        contentId: this.data.objectId,
        note: this.pinglun,
        type: this.data.type
      }
      console.log('发表评论请求的数据紧接着的数据')
      console.log(model)
      this.axios({
        method:"post",
        url:this.url() + '/front/course/assess',
        headers: {
          userToken: this.token
        },
        data: model
      }).then((res) => {
        if (res.data.code === 401) {
          this.$message({
            message: '请输入内容',
            type: 'warning'
          });
        } else if (res.data.code === 2010) {
          this.$message({
            message: '已经评价过了',
            type: 'warning'
          });
        } else if (res.data.code === 200) {
          this.mangban_show = false
          this.pingjia_show = false
          this.$message({
            message: '评价成功',
            type: 'success'
          });
          this.$emit('v_close')
        }

      })
    },
    close() {
      this.$emit('v_close')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pingjia
    display: flex
    flex-direction: column
    z-index: 3
    width: 655px
    height: 405px
    background-color: white
    left:50%
    top:50%
    margin-left:-325px
    margin-top:-200px
    position:fixed
    border-radius: 10px
    color:rgba(192,192,192,1)
    overflow: hidden
    padding-bottom: 30px
    .guanbi
      position: absolute
      width: 54px
      height: 54px
      right: 10px
      top: 15px
      text-align: center
      line-height: 54px
      font-size: 26px
    .container
      margin-left: 30px
      margin-top: 30px
      .titlee
        color: #000000
        font-weight: 500
        font-size: 16px
      .content
        height: 68px
        margin-top: 40px
        display: flex
        .img
          width: 68px
          height: 68px
          background-color: #8c939d
          img
            width: 100%
            height: 100%
        .text
          margin-left: 20px
          .titleq
            width: 321px
            height: 34px
            font-weight: 400
            color: #3A3A3A
            font-size: 14px
            line-height: 20px
          .type
            font-size: 14px
            color: #C0C0C0
            margin-top: 15px
      .text_input
        width: 595px
        height: 201px
        margin-top: 10px
        position: relative
        textarea
          width: 582px
          height: 201px
          border: none
          border: 1px solid #DBDBDB
          padding-left: 10px
          padding-top: 10px
        .button
          width: 64px
          height: 30px
          position: absolute
          bottom: -8px
          right: 9px
          background-color: #2EB7C6
          text-align: center
          color: white
          font-size: 14px
          border-radius:13px
          line-height: 30px
</style>
