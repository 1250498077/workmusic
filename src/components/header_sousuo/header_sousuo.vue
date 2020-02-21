<template>
  <div class="header_sousuo">
    <div class="containerg">
      <div class="localtitle" v-show="header_sousuo === '商品'">
        <p class="start">您的位置：</p>
        <p class="local">首页 / 商城 / 搜索结果</p>
      </div>
      <div class="localtitle" v-show="header_sousuo === '活动'">
        <p class="start">您的位置：</p>
        <p class="local">首页 / 活动 / 搜索结果</p>
      </div>
      <div class="localtitle" v-show="header_sousuo === '课程'">
        <p class="start">您的位置：</p>
        <p class="local">首页 / 课程 / 搜索结果</p>
      </div>
      <div class="shangchengheader" v-show="header_sousuo === '课程'">
        <div class="imgq">
          <img src="./title.png" alt="">
        </div>
        <p>课程</p>
      </div>
      <div class="shangchengheader" v-show="header_sousuo === '商品'">
        <div class="imgq">
          <img src="./shangping.png" alt="">
        </div>
        <p>商品</p>
      </div>
      <div class="shangchengheader" v-show="header_sousuo === '活动'">
        <div class="imgq">
          <img src="./huodong.png" alt="">
        </div>
        <p>活动</p>
      </div>
      <div class="containerd">
        <div class="kecheng" v-show="header_sousuo === '课程'">
          <v-kecheng_detail v-for="(item, key) in datad" :data="item" :key="key" class="kechengd" style="margin-bottom: 20px"></v-kecheng_detail>
        </div>
        <div class="huodong" v-show="header_sousuo === '活动'">
          <v-huodong_zujian v-for="(item, key) in datad" :data="item" :key="key" class="huodongd" style="margin-bottom: 20px"></v-huodong_zujian>
        </div>
        <div class="huodong" v-show="header_sousuo === '商品'">
          <v-product_detail v-for="(item, key) in datad" :data="item" :key="key" class="huodongd" style="margin-bottom: 20px"></v-product_detail>
        </div>
      </div>
      <div class="fennge">以上是搜索结果</div>
      <div class="titleg">
        <div class="my_collectiond">优质课程</div>
      </div>
      <div class="youzhikecheng">
        <v-kecheng_detail v-for="(item, key) in data.course" :data="item" :key="key"></v-kecheng_detail>
      </div>
      <div class="titleg">
        <div class="my_collectiond">精选好货</div>
      </div>
      <div class="jingxuanhaohuo">
        <div class="container">
          <v-rexiao v-for="(item, key) in data.product" :key="key" class="rexiao" :data="item"></v-rexiao>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import rexiao from 'components/rexiaodetail/rexiaodetail'
import kechengdetaild from 'components/kecheng_detail/kecheng_detail'
import huodong_zujian from 'components/huodong_zujian/huodong_zujian'
import product_detail from 'components/product_detail/product_detail'
export default {
  data() {
    return {
      data: {},
      header_sousuo: '',
      keyword: '',
      datad: []
    }
  },
  components: {
    'v-kecheng_detail': kechengdetaild,
    'v-rexiao': rexiao,
    'v-huodong_zujian': huodong_zujian,
    'v-product_detail': product_detail
  },
  store,
  methods: {
    kechengsousuo() {
      console.log('/front/course/list?page=1&size=20&keyword=' + this.keyword)
      this.axios({
        method:"get",
        url:this.url() + '/front/course/list?page=1&size=20&keyword=' + this.keyword,
      }).then((res) => {
        console.log('kechengsousuo')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.datad = res.data
        }
      })
    },
    zixunsousuo() {

    },
    huodongsousuo() {
      this.axios({
        method:"get",
        url:this.url() + '/front/activity/list?page=1&size=10&keyword=' + this.keyword,
      }).then((res) => {
        console.log('huodongsousuo')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.datad = res.data
        }
      })
    },
    shangchengsousuo() {
      console.log('/front/product/list?page=1&size=10&keyword' + this.keyword)
      this.axios({
        method:"get",
        url:this.url() + '/front/product/list?page=1&size=10&keyword=' + this.keyword,
      }).then((res) => {
        console.log('shangchengsousuo')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.datad = res.data
        }
      })
    },
    normal() {
      this.axios({
        method: 'get',
        url: this.url() + '/front/common/index',
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        console.log(res)
        this.data = res.data.data
      })
    }
  },
  created () {
    this.token = this.$store.state.token
    this.header_sousuo = this.$store.state.header_sousuo
    this.keyword = this.$store.state.keyword
    console.log('keyword')
    console.log(this.keyword)
    if(this.header_sousuo === '商品') {
      console.log('商城')
      this.shangchengsousuo()
    } else if (this.header_sousuo === '课程') {
      console.log('课程')
      this.kechengsousuo()
    }else if (this.header_sousuo === '活动') {
      console.log('活动')
      this.huodongsousuo()
    } else if (this.header_sousuo === '资讯') {
      console.log('资讯')
      this.zixunsousuo()
    }
    this.normal()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header_sousuo
  width: 1280px
  margin: 0 auto
  .containerg
    width: 1200xp
    margin-left: 40px
    .localtitle
      width: 1200px
      height: 35px
      display: flex
      align-items: center
      p
        margin: 0
        margin-top: 24px
        font-size: 14px
      .local
        color: #2EB7C6
    .shangchengheader
      width: 1200px
      height: 76px
      align-items: center
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
        img
          width: 100%
          height: 100%
    .containerd
      width: 1240px
      .kecheng
        display: flex
        flex-wrap: wrap
        .kechengd
          margin-right: 30px
      .huodong
        display: flex
        flex-wrap: wrap
        .huodongd
          margin-right: 30px
    .fennge
      width:1200px
      height:48px
      color: #5C8D92
      margin-top: 70px
      text-align: center
      line-height: 48px
      font-weight: 500
      font-size:16px
      background-color: #EDEFEF
    .titleg
      font: 14px
      margin-top: 30px
      width: 1200px
      // align
      border-bottom: 2px solid #DBDBDB
      .my_collectiond
        height: 26px
    .cantuan
      width: 1200px
      height: 315px
      margin-top: 20px
      border: 1px solid #DBDBDB
      .cantuan_container
        width: 1160px
        position: relative
        .div5
          display: flex
          position: absolute
          top: 0
          right: 0
          font-size: 14px
          color: #888888
          .phonee
            display: flex
            margin-right: 5px
          .img
            margin-right: 5px
            width: 16px
            height: 16px
        .button
          width:80px
          height:26px
          position: absolute
          right: 0
          bottom: -40px
          background-color: #FF5704
          border-radius:13px
          font-size:14px
          text-align: center
          line-height: 26px
          color: white
        .order_information
          display: flex
          margin-top: 25px
          margin-left: 20px
          font-size: 14px
          font-weight: 500
          color: #888888
          .div
            margin-top: 17px
            margin-left: 40px
            .divp
              margin-top: 20px
          .div1
            color: #3A3A3A
    .youzhikecheng
      width: 1200px
      margin-top: 20px
      display: flex
      justify-content: space-between
    .jingxuanhaohuo
      width: 1200px
      display: flex
      margin-top: 20px
      margin-bottom: 50px
      justify-content: space-between
      background-color: #F7F7F7
      height: 144px
      .container
        display: flex
        height: 90px
        margin-top: 26px
        displa: flex
        align-items: start
        justify-content: start
        :last-child
          border:none
</style>
