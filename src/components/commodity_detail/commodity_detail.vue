<template>
  <div class="commodlity_detail">
    <div class="localtitle">
      <p class="start">您的位置：</p>
      <p class="local">首页 / 商城 / 搜索结果</p>
    </div>
    <div class="commodlity_detail_container">
      <div class="basic_information">
        <div class="basic_information_top">
          <v-shoucangtubiao class="shoucangtubiao" v-on:shoucang="shoucang" :no_yes="data.isCollection === 'YES'"></v-shoucangtubiao>
          <div class="img">
            <img :src="data.pics[index]" alt="">
          </div>
          <div class="text">
            <div class="money_discount">
              <p class="money">￥{{data.discountPrice}}{{data.isCollection}}</p>
              <p class="discount">￥{{data.price}}</p>
            </div>
            <div class="titleq">
              {{data.name}}
            </div>
            <div class="specifications">
              <div class="specifications_container">
                <p class="titled">规格</p>
                <div class="selectd">
                  <div class="selectd_button_dom" v-for="(item, key) in product_type.goodsSpecificationList" :key="key" @click="selectd_button_dom($event, item.id)" :class="{'selected': key===0}">{{item.name}}</div>
                </div>
              </div>
            </div>
            <div class="button" @click="commodlityjump">立即购买</div>
          </div>
        </div>
        <div class="basic_information_bottom">
          <div class="btn btn_left" @click="leftg">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class="btn btn_right" @click="rightg">
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="basic_information_bottom_container">
            <div class="basic_information_bottom_con" ref="bottom_img">
              <div class="list_item" v-for="(item, key) in data.pics" :key="key" @click="img_select(key)">
                <img :src="item" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detaile_information">
        <div class="left">
          <div class="header">
            <div class="left_button_dom">商品介绍</div>
          </div>
          <div class="content" v-html="description">
          </div>
        </div>
        <div class="right">
          <div class="ratingg">
            <div class="header">
              评价 （）
            </div>
            <div class="content">
              <v-rating_detail class="rating_detail" v-for="(item, key) in ratinglist" :key="key"></v-rating_detail>
            </div>
            <div class="chakangenduo" @click="chakanmore">
              查看更多
            </div>
          </div>
          <div class="activity">
            <div class="bottom">
              <v-huodongdetail></v-huodongdetail>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ratings_tanchu" :class="{'ovhi':!ratings_tanchushow}">
      <div class="title">
        全部评价
      </div>
      <div class="container">
        <happy-scroll color="#31B8C7" size="5" class="aa" :scroll-top="top" resize>
          <div class="player_con">
            <v-rating_detail class="rating_detaild" v-for="(item, key) in ratinglist" :key="key"></v-rating_detail>
          </div>
        </happy-scroll>
      </div>
      <div class="left_right_button">
        <div class="img" @click="jump_button(1)">
          <img src="./left.png" alt="">
        </div>
        <div class="num" v-for="(item, index) in list_lenght_button" :key="index" @click="num_button(index+1)">{{index+1}}</div>
        <div class="img" @click="jump_button(2)">
          <img src="./right.png" alt="">
        </div>
      </div>
      <div class="guanbi icon-close" @click="close()"></div>
    </div>
    <div class="mengban" v-show="mengbanshow"></div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import huodongdetail from 'components/huodongdetail/huodongdetail'
import rating_detail from 'components/rating_detail/rating_detail'
import shoucangtubiao from 'components/shoucangtubiao/shoucangtubiao.vue'
import {loadFromlLocal} from '../../common/js/store'
export default {
  props: {
    mwhtoken: ''
  },
  data() {
    return {
      data: {},
      description: '',
      token:  (() => {
        return loadFromlLocal('token')
      })(),
      phone: '',
      id: '',
      ratinglist: [],
      ratings_tanchushow: true,
      mengbanshow: false,
      top: 20,
      list_lenght: 0,
      list_lenght_button: [],
      pkshow: false,
      product_type: {},
      x: 0,
      length: 0,
      index: 0,
      typeId: ''
    }
  },
  store,
  components: {
    'v-rating_detail': rating_detail,
    'v-huodongdetail': huodongdetail,
    'v-shoucangtubiao': shoucangtubiao
  },
  methods: {
    model() {
      this.order = {
        id: this.id,
        typeId: this.typeId
      }
      this.postk()
    },
    postk() {
      console.log('预加载商品订单')
      console.log(this.order)
      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/product/info',
        headers: {
          userToken: this.token
        },
        data: this.order
      }).then((res) => {
        console.log('/front/order/confirm/product/info')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
        } else if (res.code === 401) {
          console.log('该商品已经下订单，请取消订单后再次购买')
        }
      })
    },
    img_select(index) {
      this.index = index
    },
    leftg() {
      console.log('leftg')
      // 向右移动，判断
      if (this.x !== 0&&this.length>4) {
        let a = this.$refs.bottom_img
        this.x = this.x + 78
        a.style.transform = `translate3d(${this.x}px, 0, 0)`
        a.style.webkitTransform = `translate3d(${this.x}px, 0, 0)`
      }
    },
    // 向左移动，判断
    rightg() {
      console.log('rightg')
      console.log(this.x)
      console.log(this.length)
      if (-this.x < (this.length-4)*78&&this.length>4) {
        let a = this.$refs.bottom_img
        this.x = this.x - 78
        a.style.transform = `translate3d(${this.x}px, 0, 0)`
        a.style.webkitTransform = `translate3d(${this.x}px, 0, 0)`
      }
    },
    selectd_button_dom(e, id) {
      this.typeId = id
      let typed = document.getElementsByClassName('selectd_button_dom')
      for (let i = 0; i < typed.length; i++) {
        typed[i].classList.remove('selected')
      }
      e.currentTarget.classList.add('selected')
    },
    // 商品的类型
    product_guimo() {
      // /front/product/goodsspecification
      this.axios({
        method:"get",
        url:this.url() + "/front/product/goodsspecification?id=" + this.id,
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        res = res.data
        if (res.code === 200) {
          this.product_type = res.data
          this.$store.commit('product_type_edit', this.product_type.goodsSpecificationList[0].id)
          this.typeId = this.product_type.goodsSpecificationList[0].id
        }
        console.log(res)
      })
    },
    shoucang: function(no_yes) {
      if (no_yes === false) {
        this.axios({
          method:"post",
          url:this.url() + '/front/common/collect',
          headers: {
            userToken: this.token
          },
          data: {
            id: this.id,
            type: 'PRODUCT'
          }
        }).then((res) => {
          this.post(this.id)
        })
      } else {
        this.axios({
          method:"post",
          url:this.url() + '/front/common/collect/cancel',
          headers: {
            userToken: this.token
          },
          data: {
            id: this.id,
            type: 'PRODUCT'
          }
        }).then((res) => {
          this.post(this.id)
        })
      }
      console.log(this.token)
    },
    fenxiang: function() {

    },
    num_button(num) {
      this.top = num*(500)
    },
    jump_button(index) {
      console.log(index)
      if(index === 1) {
        this.top = this.top - 500
      } else if (index === 2) {
        this.top = this.top + 500
      }
      console.log(this.top)
    },
    close() {
      this.ratings_tanchushow = false
      this.mengbanshow = false
    },
    chakanmore() {
      this.list_lenght_button = []
      this.ratings_tanchushow = true
      this.mengbanshow = true
      this.list_lenght = Math.ceil(this.ratinglist.length/6)
      for (let i = 0; i < this.list_lenght; i++) {
        this.list_lenght_button.push('1')
      }
    },
    commodlityjump() {
      // this.$store.commit('product_id_edit', this.id)
//      this.model()
      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/product/info',
        headers: {
          userToken: this.token
        },
        data: {
          id: this.id,
          typeId: this.typeId
        }
      }).then((res) => {
        console.log('/front/order/confirm/product/info')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
          this.$router.push({
            path: '/product_order',
            query: {
              id: this.id,
              typeId: this.typeId
            }
          })
        } else if (res.code === 401) {
          console.log('该商品已经下订单，请取消订单后再次购买')
        } else {
          this.$message({
            message: '请登录后操作',
            type: 'warning'
          });
        }
      })
    },
    post(id) {
      this.axios({
        method:"get",
        url:this.url() + "/front/product/detail?id=" + id,
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('postpostpostpostpostpostpostpost')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
          this.length = this.data.pics.length
          this.description = this.data.description
          this.id = this.data.id
        } else {
          this.$message({
            message: '请登录后操作',
            type: 'warning'
          });
        }
      })
    },
    handle() {
      console.log('handle')
      console.log(this.id)
      let url = this.url() + '/front/product/assess/list?id='+ this.id +'&page=1&size=10'
      this.ratings_post(url)
    },
    ratings_post(url) {
      this.axios({
        method:"get",
        url:url,
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('ratings_post')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.data = res.data
          this.description = this.data.description
        }
      })
    }
  },
  watch: {
    mwhtoken: function (newtoken) {
      console.log(newtoken)
      this.token = newtoken
    },
    mengbanshow(neww) {
      console.log(neww)
      if (!neww) {
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
      } else {
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      }
    }
  },
  mounted:function(){//常用，
    this.id= this.$route.query.id
    this.$nextTick(function () {
      this.ratings_tanchushow = false
    })
    this.post(this.id)
    this.handle()
    this.product_guimo()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.commodlity_detail
  min-height: 1000px
  p
    margin: 0
  .localtitle
    width: 1200px
    height: 76px
    display: flex
    margin: 0 auto
    p
      margin: 0
      margin-top: 24px
      font-size: 14px
    .local
      color: #2EB7C6
  .commodlity_detail_container
    min-height: 1000px
    width: 1200px
    position: relative
    margin: 0 auto
    .basic_information
      width: 1200px
      .basic_information_top
        display: flex
        .shoucangtubiao
          position: absolute
          right: 32px
        .img
          width: 360px
          height: 360px
          background-color: #8c939d
          img
            width: 100%
            height: 100%
        .text
          margin-left: 30px
          .money_discount
            display: flex
            overflow: hidden
            height: 30px
            .money
              font-size:30px
              font-family:PingFangSC-Medium
              font-weight:500
              color: #F06074
            .discount
              margin-left: 9px
              font-size:14px
              font-family:PingFangSC-Regular
              font-weight:400
              text-decoration:line-through
              color:rgba(198,198,198,1)
              line-height: 40px
          .titleq
            height: 60px
            width: 634px
            margin: 16px 0 0 0
            font-size: 24px
            font-weight:500
            color: rgba(58,58,58,1)
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
          .specifications
            width: 769px
            height: 104px
            border:1px solid rgba(219,219,219,1)
            .specifications_container
              height: 60px
              margin-top: 20px
              margin-left: 20px
              .titled
                font-size: 16px
                color: #888888
              .selectd
                display: flex
                margin-top: 14px
                .selectd_button_dom
                  width: 80px
                  height: 30px
                  cursor: pointer
                  line-height: 30px
                  text-align: center
                  &.selected
                    color: white
                    background-color: #2EB7C6
          .button
            margin-top: 20px
            width: 130px
            height: 36px
            text-align: center
            line-height: 36px
            font-size: 16px
            cursor: pointer
            color: white
            border-radius:18px
            background-color: #2EB7C6
      .basic_information_bottom
        width: 360px
        height: 68px
        margin-top: 10px
        position: relative
        .btn
          position: absolute
          width: 16px
          height: 30px
          background-color: #8c939d
          line-height: 30px
          text-align: center
          color: white
          margin-top: 19px
          z-index: 20
          &.btn_left
            left: 0
          &.btn_right
            right: 0
        .basic_information_bottom_container
          width: 308px
          height: 68px
          margin: 0 auto
          overflow: hidden
          position: relative
          .basic_information_bottom_con
            position: absolute
            top: 0
            left: 0
            display: flex
            z-index: 10
            justify-content: flex-start
            :last-child
              margin-right: 0
            .list_item
              width: 68px
              height: 68px
              margin-right: 10px
              background-color: #8c939d
              img
                width: 100%
                height: 100%
    .detaile_information
      width: 1200px
      min-height: 1000px
      margin: 0 auto
      margin-top: 30px
      margin-bottom: 50px
      display: flex
      justify-content: space-between
      .left
        width: 826px
        border-radius:12px
        border: 1px solid #DBDBDB
        .header
          width: 826px
          height: 47px
          display: flex
          border-bottom: 1px solid #DBDBDB
          .left_button_dom
            width:75px
            height:28px
            text-align: center
            line-height: 28px
            margin-left: 30px
            margin-top: 10px
            border-radius: 1px
            color: white
            font-family:PingFangSC-Medium
            font-size: 16px
            background-color: #2EB7C6
          .right_button_dom
            width:75px
            height:28px
            text-align: center
            line-height: 28px
            margin-left: 41px
            margin-top: 10px
            background-color: white
            color: #C0C0C0
            border-radius: 1px
            &.click
              color: white
              background-color: #2EB7C6
            &.noclick
              color: #888888
              background-color: white
        .content
          width: 764px
          margin: 0 auto
          margin-top: 30px
          p
            margin-bottom: 30px
      .right
        width: 354px
        .ratingg
          width: 354px
          height: 710px
          border-radius:12px
          border: 1px solid #DBDBDB
          .header
            width: 334px
            height: 47px
            line-height: 47px
            padding-left: 20px
            border-bottom: 1px solid #DBDBDB
          .content
            height: 545px
            overflow: hidden
            .rating_detail
              width: 314px
              margin: 0 auto
              margin-top: 30px
          .chakangenduo
            width: 314px
            height: 48px
            margin: 0 auto
            text-align: center
            font-size: 14px
            margin-top: 39px
            background-color: #F7F7F7
            line-height: 48px
        .activity
          margin-top: 30px
  .ratings_tanchu
    display: flex
    flex-direction: column
    z-index: 3
    width: 800px
    height: 670px
    background-color: white
    left:50%
    top:50%
    margin-left:-400px
    margin-top:-340px
    position:fixed
    border-radius: 10px
    z-index 999
    color:rgba(192,192,192,1)
    &.ovhi
      visibility: hidden
    .container
      width: 735px
      height: 465px
      margin-top: 30px
      margin-left: 30px
      .aa
        height: 465px
        .player_con
          width: 730px
          .rating_detaild
            margin-bottom: 20px
        .happy-scroll-strip--horizontal
          display: none
    .title
      font-size: 16px
      margin-top: 30px
      margin-left: 30px
      color: #000000
    .guanbi
      position: absolute
      width: 54px
      height: 54px
      right: 10px
      top: 15px
      text-align: center
      line-height: 54px
      font-size: 26px
    .left_right_button
      display: flex
      justify-content: flex-end
      align-items: center
      margin-top: 40px
      margin-right: 30px
      .num
        width: 50px
        height: 44px
        margin-bottom: 10px
        text-align: center
        line-height: 50px
  .mengban
    position: fixed
    width: 100%
    height: 100%
    background-color: black
    z-index: 888
    top: 0
    left: 0
    opacity: 0.5
</style>
