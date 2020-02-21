<template>
  <div class="headcontent" :class="{'controller':this.$store.state.daohang_lunbotu_control}">
    <div class="background"></div>
    <div class="lunbo">
      <div class="lunbo_left">
        <div class="left_b">
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">英皇考级</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">英皇乐理</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">视奏听力</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">钢琴系列</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">其他西乐</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">中国乐</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">基础训练</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">音乐与历史</p>
            <p class="dayu">></p>
          </div>
          <div class="lista" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">作曲编曲</p>
            <p class="dayu">></p>
          </div>
          <div class="lista  end" @click="lunno_jump" style="cursor: pointer">
            <p class="tit">其他课程</p>
            <p class="dayu">></p>
          </div>
        </div>
      </div>
      <div class="lunbo_right">
        <div class="block">
          <el-carousel trigger="click" height="383px">
            <el-carousel-item v-for="(item,key) in data.advertisement" :key="key">
              <div class="img">
                <img :src="item.img" alt="" @click="lunbo(item.id, item)"/>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <v-title class="tt_zujian1"></v-title>
    <div class="youzhikecheng">
      <v-kecheng_detail v-for="(item, key) in data.course" :data="item" :key="key"></v-kecheng_detail>
    </div>
    <v-title title="精,选,好,货" class="tt_zujian2" v-show="datad.length !== 0"></v-title>
    <div class="jingxuanhaohuo" v-show="datad.length !== 0">
      <div class="div"></div>
      <div class="container container_rexiao" ref="container">
        <v-rexiao v-for="(item, key) in datad" :key="key" class="rexiao" :data="item" :class="{'rexiaod':item===2}" @jumpp="jumpp"></v-rexiao>
      </div>
      <div class="jingxuanhaohuo_left" @click="left">
        <img src="./leftt.png" alt="">
      </div>
      <div class="jingxuanhaohuo_right" @click="right">
        <img src="./rightt.png" alt="">
      </div>
    </div>
    <div class="news">
      <div class="newsleft">
        <div class="newsleftleft">
          <div class="yinyue">
            <div class="img">
              <img src="./right.png" alt="">
            </div>
            <p>音乐漫谈</p>
          </div>
          <div class="newsimage" @click="zixun_jump(last_information.id)">
            <img :src="this.last_information.img" alt="">
          </div>
          <div class="newsdetail">
            <div class="bao">
              <div class="line"></div>
              <div class="newstitle" @click="zixun_jump(last_information.id)">{{last_information.title}}</div>
              <div class="newscontent">{{last_information.title}}</div>
            </div>
          </div>
        </div>
        <div class="newsleftright">
          <p class="chakanxiangqing">查看详情 ></p>
          <div class="newsdetail" v-for="(item, key) in data.information" :key="key" v-show="key <= 2">
            <div class="bao">
              <div class="line"></div>
              <div class="newstitle" @click="zixun_jump(item.id)">{{item.title}}</div>
              <div class="newscontent">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="newsright">
        <div class="top">
          <div class="xianxia">
            <div class="img">
              <img src="./right.png" alt="">
            </div>
            <p>线下活动</p>
          </div>
          <p class="chakan">查看更多 ></p>
        </div>
        <v-huodongdetail class="huodongdetail"></v-huodongdetail>
      </div>
    </div>
    <div class="headbottom">
      <!--<v-title title="喜,星,名,师" class="tt_zujian3"></v-title>-->
      <!--<div class="container">-->
        <!--<v-mingren v-for="(item, key) in renwu" :key="key"></v-mingren>-->
      <!--</div>-->
      <img src="./shouye_bottom.png" alt="">
    </div>
  </div>
</template>

<script>
import title from 'components/title/title'
import kechengdetaild from 'components/kecheng_detail/kecheng_detail'
import rexiao from 'components/rexiaodetail/rexiaodetail'
import mingren from 'components/mingren/mingren'
import huodongdetail from 'components/huodongdetail/huodongdetail'
import store from '../../store/index.js'
import {ClassicModel} from '../../model/shouye.js'
import {common_index} from '../../common/model/Common_Controller_Impl'
const x = 240
const classicModel = new ClassicModel()

export default {
  components: {
    'v-title': title,
    'v-kecheng_detail': kechengdetaild,
    'v-rexiao': rexiao,
    'v-mingren': mingren,
    'v-huodongdetail': huodongdetail
  },
  store,
  data () {
    return {
      goods: [1, 2, 3, 4, 5],
      renwu: [1, 2, 3, 4],
      data: {},
      datad: [{},{},{},{},{},{},{},{}],
      contoller: false,
      x: 0,
      last_information: ''
    }
  },// &
  methods: {
    lunno_jump() {
      this.$router.push({
        path:'/kecheng',
      })
    },
    zixun_jump(id) {
      this.$router.push({
        path: '/zixun_detail',
        query: {
          id: id
        }
      })
    },
    jumpp: function(id) {
      this.$router.push({
        path: '/commodity_detail',
        query: {
          id: id
        }
      })
    },
    jump: function(id) {
      this.$store.commit('class_id_edit', id)
      this.$router.push({
        path: '/class_detail',
        query: {
          id: id
        }
      })
    },
    lunbo(id, item) {
      console.log('点击轮播图')
      console.log(id)
      console.log(item)
      if (item.type === 'COURSE')  {
        this.$router.push({
          path: '/class_detail',
          query: {
            id: id
          }
        })
      } else if (item.type === 'PRODUCT') {
        this.$router.push({
          path: '/commodity_detail',
          query: {
            id: id
          }
        })
      } else if (item.type === 'ACTIVITY') {

      }
    },
    left() {
      if (this.x !== 0&&this.datad.length>5) {
        let a = this.$refs.container
        this.x = this.x + 240
        a.style.transform = `translate3d(${this.x}px, 0, 0)`
        a.style.webkitTransform = `translate3d(${this.x}px, 0, 0)`
      }
    },
    right() {
      if (-this.x < (this.datad.length-5)*240&&this.datad.length>5) {
        let a = this.$refs.container
        this.x = this.x - 240
        a.style.transform = `translate3d(${this.x}px, 0, 0)`
        a.style.webkitTransform = `translate3d(${this.x}px, 0, 0)`
      }
    }
  },
  created () {
    common_index().then((res) => {
      console.log(res)
      this.data = res.data.data
      this.datad = this.data.product
      this.last_information = this.data.information[this.data.information.length-1]
      this.data.information.reverse()
    })

    // =============================
    this.axios({
      method: "get",
      url: 'http://192.168.50.48:8103/sc/admin/getPageStrongeSaveView',
      headers: {
        'token': 1
      }
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.headcontent
  width: 1280px
  position: relative
  margin: 0 auto
  &.controller
    z-index: -5
  .background
    position: absolute
    width: 100%
    height: 939px
    z-index: -1
    left: 0
    top: -50px
    opacity: 0.15
    background: linear-gradient(180deg,rgba(46,183,198,1),rgba(111,214,198,1),rgba(255,255,255,1))
  .tt_zujian1
    margin-top: 63px
    margin-bottom: 30px
  .tt_zujian2
    margin-top: 63px
    margin-bottom: 30px
  .lunbo
    width: 1200px
    height: 383px
    margin: 0 auto
    margin-top: 50px
    display: flex
    background-color: #2B333B
    border-radius: 12px
    overflow: hidden
    .lunbo_left
      display: flex
      align-items: center
      width: 240px
      height: 383px
      color: #AAADB1
      line-height: 6px
      overflow: hidden
      border-top-left-radius:15px
      border-bottom-left-radius:15px
      background-color: #2B333B
      .left_b
        height: 370px
        display: flex
        margin-left: 22px
        flex-direction: column
        .lista
          width: 202px
          height: 37px
          overflow: hidden
          line-height: 50%
          display: flex
          align-items: center
          font-size: 14px
          justify-content: space-between
          border-bottom: 1px dashed #AAADB1
          .tit
            font-size: 14px
            cursor: pointer
            margin-left: 17px
          .dayu
            margin-right: 18px
        .end
          border-bottom :0 dashed #AAADB1
    .lunbo_right
      width: 960px
      border-top-right-radius:12px
      border-bottom-right-radius:12px
      position: relative
      .block
        .el-carousel
          .el-carousel__indicators
            display: flex
            justify-content: space-between
            .el-carousel__indicator
              width: 20px
              height: 20px
              border-radius: 50%
              .el-carousel__button
                width: 20px
                height: 20px
                border-radius: 50%
      .img
        width: 960px
        height: 383px
        img
          width: 100%
          height: 100%
  .youzhikecheng
    width: 1200px
    min-height: 325px
    margin: 0 auto
    display: flex
    position: relative
    justify-content: space-between
  .jingxuanhaohuo
    width: 1200px
    margin: 0 auto
    display: flex
    overflow: hidden
    border-radius: 12px
    justify-content: space-between
    background-color: #F7F7F7
    height: 144px
    position: relative
    .div
      width: 2px
      height: 97px
      position: absolute
      top: 24px
      right: 0px
      z-index: 150
      background-color: #f7f7f7
    .jingxuanhaohuo_left
      width: 16px
      height: 30px
      position: absolute
      top: 57px
      left: 11px
      img
        width: 100%
        height: 100%
    .jingxuanhaohuo_right
      width: 16px
      height: 30px
      position: absolute
      top: 57px
      right: 11px
      img
        width: 100%
        height: 100%
    .container
      position: absolute
      top: 0
      left: 0
      display: flex
      height: 90px
      margin-top: 26px
      displa: flex
      justify-content: space-between
      .rexiaod
        background-color: red
      :last-child
        border:none
  .news
    display: flex
    width: 1200px
    height: 431px
    margin: 0 auto
    margin-top: 80px
    margin-bottom: 70px
    .newsleft
      width: 795px
      display: flex
      border-right: 1px solid #DBDBDB
      .newsleftleft
        display: flex
        width: 330px
        margin-right: 40px
        flex-direction: column
        .yinyue
          width: 200px
          height: 40px
          align-items: center
          display: flex
          justify-content: flex-start
          font-size: 20px
          p
            margin: 0
            margin-left: 12px
          .img
            width: 44px
            height: 24px
            border-radius: 12px
            img
              width: 100%
              height: 100%
        .newsimage
          width: 330px
          height: 248px
          margin-top: 20px
          border-radius: 12px
          cursor: pointer
          background-color: hotpink
          img
            width: 100%
            height: 100%
        .newsdetail
          width: 330px
          height: 200px
          overflow:hidden
          color:rgba(58,58,58,1)
          position: relative
          margin-top: 20px
          .bao
            width: 330px
            height: 131px
            color:rgba(58,58,58,1)
            position: relative
            margin-top: 25px
            overflow: hidden
            .line
              position: absolute
              height: 20px
              width: 3px
              top: -2px
              background-color: #2EB7C6
            .newstitle
              cursor: pointer
              margin-left: 20px
              overflow: hidden
              font-size: 18px
              font-weight: 400
              color: #3A3A3A
              text-overflow:ellipsis
              white-space: nowrap
            .newscontent
              cursor: pointer
              line-height: 24px
              font-family: PingFangSC-Regular
              margin-top: 20px
              font-size: 14px
              font-weight: 400
              color: #666666
      .newsleftright
        display: flex
        width: 374px
        flex-direction: column
        .chakanxiangqing
          margin: 0
          width: 100px
          margin-top: 15px
          margin-left: 265px
          font-size: 14px
        .newsdetail
          width: 330px
          height: 131px
          border-bottom: 1px solid rgba(219,219,219,1)
          .bao
            width: 330px
            color:rgba(58,58,58,1)
            position: relative
            margin-top: 25px
            overflow: hidden
            .line
              position: absolute
              height: 20px
              width: 3px
              top: -2px
              background-color: #2EB7C6
            .newstitle
              cursor: pointer
              margin-left: 20px
              overflow: hidden
              font-size: 18px
              font-weight: 400
              text-overflow: ellipsis
              cursor: pointer
              white-space: nowrap
            .newscontent
              height: 44px
              line-height: 24px
              cursor: pointer
              overflow: hidden
              margin-bottom: 30px
              font-weight: 400
              font-family: PingFangSC-Regular
              margin-top: 20px
              font-size: 14px
              color: rgba(102,102,102,1)
        :last-child
          border:none
    .newsright
      width: 445px
      display: flex
      flex-direction: column
      p
        margin: 0
      .top
        display: flex
        justify-content: space-between
        align-items: center
        .xianxia
          width: 200px
          height: 40px
          align-items: center
          display: flex
          margin-left: 50px
          justify-content: flex-start
          font-size: 20px
          p
            margin-left: 12px
          .img
            width: 44px
            height: 24px
            img
              width: 100%
              height: 100%
        .chakan
          margin-right: 30px
          font-size: 14px
      .huodongdetail
        margin-left: 50px
        margin-top: 10px
  .headbottom
    width: 1280px
    margin: 0 auto
    img
      width: 100%
  .gongshang
    width: 1280px
    height: 128px
    margin: 0 auto
    display: flex
    align-items: center
    justify-content: space-between
    background-color: #3A3A3A
    .imgleft
      width: 78px
      height: 70px
      margin-left: 20px
    .middle
      width: 450px
      display: flex
      margin-top: 10px
      align-items: center
      flex-direction: column
      .list
        display: flex
        color: #8B8B8B
        text-align: center
        .listd
          width: 60px
          border-right: 1px solid #8B8B8B
        :last-child
          width: 80px
          border:none
      p
        color: #8B8B8B
    .imgright
      width: 78px
      height: 70px
      margin-right: 20px
</style>
