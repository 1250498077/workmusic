<template>
<div class="zixuncontainer">
  <div class="zixun">
    <div class="zixunheader">
      <div class="imgq">
        <img src="./title.png" alt="">
      </div>
      <p>资讯</p>
    </div>
    <div class="localtitle">
      <p class="start">您的位置：</p>
      <p class="local">首页 / 资讯 / 资讯详情</p>
    </div>
    <div class="zixundetail">
        <div class="left">
          <div class="dianji" v-show="!wenzhangshow">
            <div class="list" v-for="(item, key) in zixunall" :key="key">
              <div class="container">
                <div class="img">
                  <img :src="item.pic">
                </div>
                <div class="listdetail">
                  <div class="titlee" @click="selectwenzhang(item.id)">{{item.name}}</div>
                  <div class="contentd">{{item.summary}}</div>
                  <div class="timeandwho">
                    <p class="time">{{item.createTime}}</p>
                    <p class="who">喜星音乐</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="jiazai">加载更多</div>
          </div>
          <div class="zixundetail" v-show="wenzhangshow">
            <div class="zuxundetaild" >
              <div class="title_header">
                <p class="title">{{rawTitle}}</p>
                <div class="time_local">
                  <p class="localtion">{{rawTime}}</p>
                  <p class="time">{{rawLocal}}</p>
                </div>
              </div>
              <div class="neibu" v-html="rawHtml"></div>
            </div>
          </div>
        </div>
        <div class="right">
          <v-huodongdetail></v-huodongdetail>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import huodongdetail from 'components/huodongdetail/huodongdetail'
import imgtitle from 'components/img_title/img_title'
import store from '../../store/index.js'
export default {
  components: {
    'v-huodongdetail': huodongdetail,
    'v-img_title': imgtitle
  },
  store,
  data () {
    return {
      index: 0,
      wenzhangshow: false,
      zixun: [1, 2, 3, 4],
      zixunall: [],
      datail: [],
      rawHtml: '',
      rawTitle: '',
      rawTime: '',
      rawLocal: ''
    }
  },
  created: function () {
    console.log(this.zixunall)
    console.log('资讯信息获取')
    // 一定要保存this变量
    let that = this
    this.axios.get(this.url() + '/front/information/list?page=1&size=10', {
    }).then(function (response) {
      console.log(response.errno)
      that.zixunall = response.data.data
      console.log(that.zixunall)
    }).catch(function (error) {
      console.log(error)
    })
    console.log('==================')
  },
  methods: {
    selectwenzhang (id) {
      this.$store.commit('zixun_id_edit', id)
      this.$router.push({
        path: '/zixun_detail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.zixuncontainer
  width: 100%
  height: 100%
  .zixun
    width: 1200px
    margin: 0 auto
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
    .localtitle
      width: 1280px
      height: 76px
      display: flex
      margin: 0 auto
      p
        margin: 0
        margin-top: 24px
        font-size: 14px
      .local
        color: #2EB7C6
    .zixundetail
      width: 1280px
      margin: 0 auto
      display: flex
      .left
        width: 826px
        min-height: 1000px
        p
          display: inline-block
          margin: 0 auto
        .dianji
          .list
            width: 826px
            height: 200px
            margin-top: 30px
            border-bottom: 1px solid #DBDBDB
            .container
              display: flex
              width: 826px
              height: 162px
              .img
                width: 216px
                border-radius: 12px
                height: 162px
                cursor: pointer
                background-color: yellowgreen
                overflow: hidden
                img
                  width: 100%
                  height: 100%
              .listdetail
                width: 582px
                margin-left: 20px
                p
                  margin: 0
                .titlee
                  height: 66px
                  width: 574px
                  cursor: pointer
                  margin: 0
                  overflow: hidden
                  font-size: 24px
                  line-height:36px
                  display: -webkit-box
                  -webkit-box-orient: vertical
                  -webkit-line-clamp: 2
                .contentd
                  height: 64px
                  margin-top: 8px
                  font-weight:400
                  font-size: 16px
                  color:#888888
                  line-height:24px
                .timeandwho
                  margin-top: 14px
                  display: flex
                  color:rgba(192,192,192,1)
                  .who
                    margin-left: 15px
            :last-child
              border: none
          .jiazai
            width: 826px
            height: 95px
            margin: 0 auto
            text-align: center
            line-height: 95px
        .zixundetail
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
