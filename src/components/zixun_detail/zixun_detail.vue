<template>
  <div class="zixun_detail">
    <div class="zixunheader">
      <div class="imgq">
        <img src="./title.png" alt="">
      </div>
      <p>资讯</p>
    </div>
    <div class="cont">
      <div class="left">
        <div class="zuxundetaild" >
          <div class="title_header">
            <p class="title">{{data.name}}</p>
            <div class="time_local">
              <p class="localtion">{{data.summary}}</p>
              <p class="time">{{data.createTime}}</p>
            </div>
          </div>
          <div class="neibu" v-html="data.content"></div>
        </div>
      </div>
      <div class="right">
        <v-huodongdetail></v-huodongdetail>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import huodongdetail from 'components/huodongdetail/huodongdetail'
export default {
  components: {
    'v-huodongdetail': huodongdetail
  },
  data() {
    return {
      data: {}
    }
  },
  store,
  methods: {
    post(id) {
      this.axios({
        method:"get",
        url: this.url() + '/front/information/detail?id=' + id,
      }).then((res) => {
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
        }
      })
    }
  },
  mounted() {
    let id = this.$route.query.id
    this.post(id)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.zixun_detail
  width: 1280px
  margin: 0 auto
  display: flex
  min-height: 1000px
  flex-direction: column
  .zixunheader
    width: 1200px
    height: 60px
    margin: 0 auto
    display: flex
    p
      margin: 0
      margin-left: 10px
      font-size:24px
      line-height: 58px
      color:rgba(58,58,58,1)
    .imgq
      width: 38px
      height: 38px
      margin-top: 10px
      img
        width: 100%
        height: 100%
  .cont
    width: 1200px
    margin: 0 auto
    display: flex
    .left
      .zuxundetaild
        .title_header
          display: flex
          flex-direction: column
          .title
            margin: 0
            margin-left: 10px
            margin-bottom: 20px
            width: 800px
            font-size:30px
            font-family:PingFangSC-Regular
            color:rgba(58,58,58,1)
            line-height:36px
          .time_local
            display: flex
            color:rgba(192,192,192,1)
            .localtion
              margin-left: 12px
            .time
              margin-left: 10px
        .neibu
          width: 800px
          display: flex
          flex-direction: column
          align-items: center
          p
            margin-top: 10px
    .right
      width: 357px
      margin-left: 20px
      position: relative
      .huodongg
        position: absolute
        top: 19px
</style>
