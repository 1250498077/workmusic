<template>
  <div class="class_order">
    <div class="localtitle">
      <p class="start">您的位置：</p>
      <p class="local">首页 / 订单中心</p>
    </div>
    <div class="titleg">
      <div class="wodeqianbaod">我的订单</div>
    </div>
    <div class="xuanze">
      <div class="selectz selectd" @click="select($event, 'ALL')">全部</div>
      <div class="selectz selecta" @click="select($event, item.id)" v-for="(item, key) in list" :key="key">{{item.name}}</div>
    </div>
    <div class="list_container">
      <v-order_detail class="order_detail" v-for="(item, key) in data" :datad="item" :key="key" v-on:wait_pay_jump="wait_pay_jump"
                      v-on:quxiao="quxiao" v-on:dingdan_xiangqing="dingdan_xiangqing" v-on:pingjia="pingjia"></v-order_detail>
    </div>
    <div class="dianjiliebiaod">
      <div class="liebiao">
        <p>1-{{data.length}}条，共{{totalSize}}条</p>
        <p class="green" @click="select($event, 'next')">下一页></p>
        <p class="green" @click="select($event, 'end')">尾页>></p>
      </div>
    </div>
    <div class="mengban" v-show="mangban_show" @click="mengban_methods"></div>
    <div class="pingjia" v-show="pingjia_show">
      <div class="guanbi icon-close" @click="close()"></div>
      <div class="container">
        <div class="titlee">
          评论
        </div>
        <div class="content">
          <div class="img">
            <img :src="product_data.pic" alt="">
          </div>
          <div class="text">
            <div class="titleq">{{product_data.goodsName}}</div>
            <div class="type">黑色</div>
          </div>
        </div>
        <div class="text_input">
          <textarea type="text" placeholder="添加评论" v-model="pinglun"></textarea>
          <div class="button" @click="fabu">
            发布
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import order_detail from 'components/order_detail/order_detail'
import {loadFromlLocal} from '../../common/js/store'
export default {
  data() {
    return {
      data: [],
      token:  loadFromlLocal('token'),
      phone: loadFromlLocal('phone'),
      list: [],
      mangban_show: false,
      pingjia_show: false,
      pinglun: '',
      product_data: {},
      totalSize: 0,
      save_status: 'ALL',
      page: 1,
      contentId: 0,
      datad: '',
      order_type_pay: ''
    }
  },
  store,
  components: {
    'v-order_detail': order_detail
  },
  methods: {
    mengban_methods() {
      this.mangban_show = false
      this.pingjia_show = false
    },
    fabu() {
      this.pingjia_post()
    },
    close() {
      this.mangban_show = false
      this.pingjia_show = false
    },
    pingjia: function(datad) {
      console.log('评论')
      console.log(datad)
      this.product_data = datad
      console.log(this.product_data)
      this.mangban_show = true
      this.pingjia_show = true
      this.post_detail(datad)
    },
    post_detail(datad) {

      this.axios({
        method: 'get',
        url: this.url() + '/front/order/detail?id=' + datad.id,
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        console.log('订单详情返回的东西')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.datad = res.data
          this.contentId = res.data.objectId
        }
      })
    },
    pingjia_post() {
      let model = {
        contentId: this.contentId,
        note: this.pinglun,
        type: this.datad.type
      }
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
        }
        console.log(res)
      })
    },
    dingdan_xiangqing: function(data) {
      console.log('广播')
      console.log(data)
      this.$store.commit('dingdan_xiangqing_id_edit', data.id)
      if (data.type === 'COURSE') {
        this.$router.push({
          path: '/class_pay_success'
        })
      } else if (data.type === 'PRODUCT') {
        this.$router.push({
          path: '/product_pay_success'
        })
      } else if (data.type === 'ACTIVITY') {

      }
    },
    quxiao: function(id) {
      this.quxiaodingdan(id)
    },
    quxiaodingdan(id) {
      console.log('quxiaodingdan')
      //this.url() +  /front/order/cancel/apply?id=1
      this.axios({
        method:"get",
        url:this.url() + '/front/order/cancel/apply?id=' + id,
        headers: {
          userToken: this.token
        },
      }).then((res) => {
        console.log(res)
        this.yujiazai()
      })
    },
    wait_pay_jump: function(id, type) {
      console.log(this.product_data)
      console.log('wait_pay_jumpwait_pay_jumpwait_pay_jump')
      console.log(id)
      console.log(type)
      if(type === 'PRODUCT') {
        this.$store.commit('dingdan_xiangqing_id_edit', id)
        this.$router.push({
          path: '/product_pay_wait'
        })
        console.log('asdasd')
      } else if (type === 'COURSE') {
        this.$store.commit('dingdan_xiangqing_id_edit', id)
        this.$router.push({
          path: '/class_pay_wait'
        })
      }
    },
    select(e, index) {
      // 点击next或者end
      if (index === 'next') {
        this.url_handle(index)
        return false
      } else if (index === 'end') {
        this.url_handle(index)
        return false
      }
      let selectz = document.getElementsByClassName('selectz')
      for (let i = 0; i < selectz.length; i++) {
        console.log('asdadasd')
        selectz[i].style.backgroundColor = 'white'
        selectz[i].style.color = '#C0C0C0'
      }
      e.target.style.backgroundColor = '#2EB7C6'
      e.target.style.color = 'white'
      // 点击header
      if (index !== 'ALL') {
        this.url_handle(index)
      } else {
        this.url_handle(index)
      }
    },
    url_handle(index) {
      let url = '/front/order/list?'
      if (index === 'next') {
        this.page++
        if (this.save_status === 'ALL') {
          url = url + 'page=' + this.page + '&size=5'
        } else {
          url = url + 'type=' + this.save_status + '&page=' + this.page + '&size=5'
        }
      } else if (index === 'end') {
        this.page = Math.ceil(this.totalSize/5)
        if (this.save_status === 'ALL') {
          url = url + 'page=' + this.page + '&size=5'
        } else {
          url = url + 'type=' + this.save_status + '&page=' + this.page + '&size=5'
        }
      } else if (index === 'ALL') {
        this.page = 1
        this.save_status = index
        url = url + 'page=' + this.page + '&size=5'
      } else {
        this.page = 1
        this.save_status = index
        url = url + 'type=' + this.save_status + '&page=' + this.page + '&size=5'
      }
      this.post(url)
    },
    post(url) {
      // /front/order/list?type='+ type +'&page=1&size=5
      console.log(url)
      this.axios({
        method:"get",
        url:this.url() + url,
        headers: {
          userToken: this.token
        },
      }).then((res) => {
        console.log('订单中心返回')
        console.log(res)
        res = res.data
        this.totalSize = res.totalSize
        if (res.code === 200) {
          this.data = res.data
          console.log(this.data)
        }
      })
    },
    yujiazai() {
      this.axios({
        method:"get",
        url:this.url() + '/front/order/list/pre',
        headers: {
          userToken: this.token
        },
      }).then((res) => {
//        console.log('订单头部')
//        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.list = res.values.status.list
//          console.log(res.values.status)
          if (this.order_type_pay === 'product') {
            this.order_pay_in_here()
            this.post('/front/order/list?type=UNDELIVERY&page=1&size=5')
          } else if(this.order_type_pay === 'one') {
            this.order_pay_in_here_one()
            //
            this.post('/front/order/list?type=UNPAY&page=1&size=5')
          }else {
            this.post('/front/order/list?&page=1&size=5')
          }
        }
      })
    },
    order_pay_in_here_one() {
//      console.log('没问哈')
      let selectz = document.getElementsByClassName('selectz')
      console.log(selectz)
      for (let i = 0; i < selectz.length; i++) {
//        console.log('asdadasd')
//        console.log(selectz[i])
        selectz[i].style.backgroundColor = 'white'
        selectz[i].style.color = '#C0C0C0'
      }
      selectz[1].style.backgroundColor = '#2EB7C6'
      selectz[1].style.color = 'white'
    },
    order_pay_in_here() {
//      console.log('没问哈')
      let selectz = document.getElementsByClassName('selectz')
//      console.log(selectz)
      for (let i = 0; i < selectz.length; i++) {
//        console.log('asdadasd')
//        console.log(selectz[i])
        selectz[i].style.backgroundColor = 'white'
        selectz[i].style.color = '#C0C0C0'
      }
      selectz[2].style.backgroundColor = '#2EB7C6'
      selectz[2].style.color = 'white'
    }
  },
  created: function () {
    this.yujiazai()


  },
  mounted() {
    this.order_type_pay = this.$route.query.order_type
    this.yujiazai()
  },
  watch: {
    mangban_show(neww) {
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
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.class_order
  width: 1280px
  min-height: 1000px
  margin: 0 auto
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
  .mengban
    position: fixed
    width: 100%
    height: 100%
    background-color: black
    z-index: 2
    top: 0
    left: 0
    opacity: 0.5
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
  .titleg
    font: 14px
    width: 1200px
    margin: 0 auto
    font-weight: 500
    margin-top: 30px
    .wodeqianbaod
      height: 26px
  .xuanze
    display: flex
    width: 1200px
    height: 43px
    border-top: 1px solid #DBDBDB
    border-bottom: 1px solid #DBDBDB
    margin: 0 auto
    margin-top: 10px
    color: #C0C0C0
    justify-content: flex-start
    :first-child
      background-color: #2EB7C6
      color: white
    .selectz
      width: 56px
      height: 28px
      cursor: pointer
      margin-top: 7px
      border-radius:3px
      margin-right: 92px
      text-align: center
      line-height: 28px
  .list_container
    width: 1200px
    margin: 0 auto
    .order_detail
      margin-top: 20px
  .dianjiliebiaod
    width: 1200px
    height: 100px
    margin: 0 auto
    display: flex
    align-items: center
    position: relative
    .liebiao
      position: absolute
      display: flex
      right: 0
      p
        font-size: 12px
      .green
        color: #2EB7C6
        font-weight: 500
        cursor: pointer
        margin-left: 12px
  .mengban
    position: fixed
    width: 100%
    height: 100%
    background-color: black
    z-index: 2
    top: 0
    left: 0
    opacity: 0.5
</style>
