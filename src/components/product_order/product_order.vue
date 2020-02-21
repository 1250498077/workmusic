<template>
  <div class="product_order">
    <div class="mengban" v-show="mengban"></div>
    <div class="product_order_container">
      <div class="product_order_header">
        <div class="shouhuo">收货地址</div>
        <div class="tainjia" @click="tianjia">+添加地址</div>
      </div>
      <div class="container_dizhi" id="mwh_container">
        <v-product_order_detail v-for="(item, key) in address_get" :key="key" :data="item" :index="key" :select="select[key]" class="dizhi"
                                v-on:deleted="deleted" v-on:selectd="selectd"></v-product_order_detail>
      </div>
      <div class="gengduodizhi" @click="more_dizhi">更多地址></div>
      <div class="product_order_header_bottom">
        <div class="shouhuo">确认订单信息</div>
      </div>
      <div class="order_list">
        <div class="a product">
          <div class="titlea">商品</div>
          <div class="container">
            <div class="img">
              <img :src="data.pic" alt="">
            </div>
            <div class="text">
              <p class="titled">{{data.name}}</p>
              <p class="people">{{data.specificationName}}</p>
            </div>
          </div>
        </div>
        <div class="a term">
          <div class="titlea">运输方式</div>
          <div class="line">{{data.deliveryType}}</div>
        </div>
        <div class="a unit_price">
          <div class="titlea">单价</div>
          <div class="line">￥{{data.price}}</div>
        </div>
        <div class="a amount">
          <div class="titlea">数量</div>
          <div class="line">{{data.amount}}</div>
        </div>
        <div class="a discount">
          <div class="titlea">优惠</div>
        </div>
        <div class="a total_price">
          <div class="titlea">总价</div>
          <div class="line">￥{{data.price}}</div>
        </div>
      </div>
      <div class="all_money">
        <p class="all">总金额：</p>
        <p class="money">￥{{data.price}}</p>
      </div>
      <div class="place_order">
        <div class="moneyy">
          <p class="titled">实付金额：</p>
          <p class="moneyd">￥{{data.price}}</p>
        </div>
        <div class="money_button" @click="product_jump">
          提交订单
        </div>
      </div>
    </div>
    <div class="tianjiad" v-show="tianjiashow">
      <i class="el-icon-close" @click="close"></i>
      <div class="tianjia_container">
        <p class="title">添加收货地址</p>
        <div class="shouhuoren">
          <p>收货人姓名</p>
          <input type="text" v-model="named">
        </div>
        <div class="shouhuophone">
          <p>收货手机号</p>
          <input type="text" v-model="tianjiaphone">
        </div>
        <div class="tianjiasuozai">
          <p>所在城市</p>
          <i class="el-icon-caret-bottom a1"></i>
          <i class="el-icon-caret-bottom a2"></i>
          <i class="el-icon-caret-bottom a3"></i>
          <div class="linkage">
            <el-select
              v-model="sheng"
              @change="choseProvince"
              placeholder="省级地区">
              <el-option
                v-for="item in newprovince"
                :key="item.id"
                :label="item.name"
                :value="item.id">{{item.name}}
              </el-option>
            </el-select>
            <el-select
              v-model="shi"
              @change="choseCity"
              placeholder="市级地区">
              <el-option
                v-for="item in newcity"
                :key="item.id"
                :label="item.name"
                :value="item.id">{{item.name}}
              </el-option>
            </el-select>
            <el-select
              v-model="qu"
              @change="choseBlock"
              placeholder="区级地区">
              <el-option
                v-for="item in newarea"
                :key="item.id"
                :label="item.name"
                :value="item.id">{{item.name}}
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="tianjiaxiangxi">
          <p>详细地址</p>
          <input type="text" v-model="xiangxidizhi">
        </div>
        <div class="button" @click="close(1)">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/index.js'
import product_order_detail from 'components/product_order_detail/product_order_detail'
import {loadFromlLocal} from '../../common/js/store'
export default {
  store,
  components: {
    'v-product_order_detail': product_order_detail
  },
  data() {
    return {
      address_get: [],
      token:  (() => {
        return loadFromlLocal('token')
      })(),
      id: '',
      phone: '',
      tianjiashow: false,
      name: '',
      tianjiaphone: '',
      sheng: '',
      shi: '',
      qu: '',
      newprovinceid: '',
      newprovince: '',
      newcityid: '',
      newareaid: '',
      newcity: '',
      newarea: '',
      mengban: false,
      xiangxidizhi: '',
      named: '',
      data: '',
      select: [],
      index: '',
      product_type: '',
      typeId: '',
      addressId: ''
    }
  },
  methods: {
    more_dizhi() {
      console.log('更多地址')
      if (this.address_get.length > 4) {
        let dom = document.getElementById('mwh_container')
        console.log(dom)
        dom.style.height = '360px'
      }
    },
    product_jump: function() {
      if (this.address_get.length === 0) {
        this.$message({
          message: '您还没有创建地址，清先到个人设置创建您的收货地址',
          type: 'warning'
        })
        return false
      }
      this.$store.commit('order_type_edit', 2)
      this.$store.commit('product_order_edit', this.data)
      this.$router.push({
        path: '/class_order_pay',
        query: {
          // 商品id
          id: this.id,
          // 商品确认订单后返回的数据传到支付页面
          data: this.data,
          // 确认是商品还是课程还是活动
          order_type: 2,
          // 地址id
          addressId: this.addressId,
          // 来自于哪里
          comefrom: 1
        }
      })
    },
    selectd: function(key, id) {
      this.addressId = id
      this.select = []
      for (let i = 0; i < this.address_get.length; i++) {
        this.select.push(false)
      }
      this.$set(this.select, key, true)
    },
    deleted: function (id) {
      console.log('adadadsdas')
      this.axios({
        method:"post",
        url:this.url() + "/front/user/address/remove",
        headers: {
          userToken: this.token
        },
        data: {
          id: id
        }
      }).then((res)=>{
        this.getaddress()
      })
    },
    tianjia() {
      this.mengban = true
      this.tianjiashow = true
    },
    close(a) {
      this.mengban = false
      this.tianjiashow = false
      if (a === 1) {
        this.newaddress = {
          area: this.newareaid,
          city: this.newcityid,
          fullAddress: this.xiangxidizhi,
          id: 0,
          isDefault: 'NO',
          name: this.named,
          phone: this.tianjiaphone,
          province: this.newprovinceid
        }
        this.closepost()
      }
    },
    closepost() {
      this.axios({
        method:"post",
        url:this.url() + "/front/user/address/add",
        headers: {
          userToken: this.token
        },
        data: this.newaddress
      }).then((res)=>{
        console.log(res)
        res = res.data
        console.log('添加地址')
        this.getaddress()
      })
    },
    // 获取省
    getCityData:function(){
      this.axios({
        method:"get",
        url:this.url() + "/front/common/province?type=1",
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        this.newprovince = res.data.data
      })
    },
    // 选省
    choseProvince:function(e) {
      console.log('选省')
      console.log(e)
      this.newprovinceid = e
      this.newcityid = ''
      this.newareaid = ''
      this.shi = ''
      this.qu = ''
      console.log()
      // 选好省就获取对应市的数据的请求
      this.axios({
        method:"get",
        url:this.url() + "/front/common/province?type=2&parentCode=" + e,
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        this.newcity = res.data.data
      })
    },
    // 选市
    choseCity:function(e) {
      console.log('选省')
      console.log(e)
      this.newcityid = e
      this.newareaid = ''
      this.qu = ''
      // 选好市就获取对应区的数据的请求
      this.axios({
        method:"get",
        url:this.url() + "/front/common/province?type=3&parentCode=" + e,
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        this.newarea = res.data.data
      })
    },
    // 选区
    choseBlock:function(e) {
      this.newareaid=e
    },
    model() {
      this.order = {
        id: this.id,
        typeId: this.typeId
      }
      this.post()
    },
    post() {
      this.axios({
        method:"post",
        url:this.url() + '/front/order/confirm/product/info',
        headers: {
          userToken: this.token
        },
        data: this.order
      }).then((res) => {
        res = res.data
        if (res.code === 200) {
          this.data = res.data
        } else if (res.code === 401) {
          this.$message({
            message: '该商品已经下订单，请取消订单后再次购买',
            type: 'warning'
          })
        }
      })
    },
    getaddress() {
      // 获取用户之前设置的地址信息pic
      console.log('请求地址')
      this.select = []
      this.address_get = []
      this.axios({
        method:"get",
        url:this.url() + "/front/user/address/list?page=1&size=10",
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        res = res.data
        if (res.code === 200) {
          res = res.data
          this.address_get = res
          for (let i = 0;i < this.address_get.length; i++) {
            if (i === 0) {
              this.select.push(true)
            } else {
              this.select.push(false)
            }
          }
          // 设置默认地址
          this.addressId = this.address_get[0].id
          // this.$store.commit('addressId_edit', this.address_get[0].id)
        }
      })
    }
  },
  created: function () {
    this.getaddress()
    this.getCityData()
  },
  mounted() {
    this.id = this.$route.query.id
    this.typeId =  this.$route.query.typeId
    // 订单控制器/front/order/confirm/product/info
    this.model()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.product_order
  width: 1280px
  min-height: 1000px
  margin: 0 auto
  p
    margin: 0
  .product_order_container
    width: 1200px
    margin: 0 auto
    margin-top: 25px
    .product_order_header
      width: 1200px
      height: 41px
      display: flex
      align-items: center
      justify-content: space-between
      border-bottom: 2px solid #DBDBDB
      .shouhuo
        height: 28px
        margin-top: 15px
        font-size: 16
        border-bottom: 2px solid #2EB7C6
      .tainjia
        height: 26px
        margin-top: 15px
        font-size: 14px
        color: #2EB7C6
    .container_dizhi
      display: flex
      flex-wrap: wrap
      width: 1230px
      height: 170px
      overflow hidden
      margin-top: 20px
      justify-content: flex-start
      .dizhi
        cursor: pointer
        margin-right: 20px
    .gengduodizhi
      margin-top: 24px
      font-size: 14px
      color: #2EB7C6
    .product_order_header_bottom
      width: 1200px
      height: 41px
      display: flex
      margin-top: 39px
      align-items: center
      justify-content: space-between
      border-bottom: 2px solid #DBDBDB
      .shouhuo
        height: 28px
        margin-top: 15px
        font-size: 16
        border-bottom: 2px solid #2EB7C6
    .order_list
      margin: 0 auto
      width: 1200px
      height: 147px
      display: flex
      margin-top: 20px
      border: 1px solid #DADADA
      .a
        height: 147px
        border-right: 2px solid #f7f7f7
        .titlea
          text-align: center
          height: 38px
          line-height: 38px
          font-size: 14px
          color: black
          font-weight: 500
          background-color: #F7F7F7
        .line
          text-align: center
          line-height: 110px
          color: #888888
      .product
        width: 394px
        .container
          display: flex
          .img
            width: 70px
            height: 68px
            margin-top: 20px
            margin-left: 20px
            background-color: #F7F7F7
            img
              width: 100%
              height: 100%
          .text
            margin-left: 21px
            margin-top: 20px
            .titled
              width: 262px
            .people
              margin-top: 29px
      .term
        width: 107px
      .unit_price
        width: 125px
      .amount
        width: 67px
      .discount
        width: 174px
      .total_price
        border-right: none
        width: 328px
    .all_money
      width: 1200px
      height: 50px
      display: flex
      margin: 0 auto
      margin-top: 30px
      justify-content: flex-end
      .money
        font-size: 18px
        font-weight: 600
      .all
        margin-top: 3px
        font-size: 14px
    .place_order
      width: 1200px
      height: 100px
      display: flex
      margin: 0 auto
      justify-content: flex-end
      background-color: #F7F7F7
      .moneyy
        display: flex
        align-items: flex-end
        margin-bottom: 42px
        margin-right: 20px
        .titled
          color: #3A3A3A
          font-size: 14px
        .moneyd
          color: #F06074
          font-size: 18px
      .money_button
        width: 142px
        height: 50px
        cursor: pointer
        margin-top: 24px
        margin-right: 24px
        text-align: center
        color: white
        line-height: 50px
        background-color: #2EB7C6
  .tianjiad
    width: 480px
    height: 628px
    background-color: white
    border-radius: 12px
    display: flex
    flex-direction: column
    z-index: 3
    left:50%
    top:50%
    margin-left:-240px
    margin-top:-300px
    position:fixed
    color:rgba(192,192,192,1)
    overflow: hidden
    padding-bottom: 30px
    .el-icon-close
      position: absolute
      top: 20px
      right: 20px
      font-size: 24px
    .tianjia_container
      width: 421px
      margin-left: 30px
      margin-top: 30px
      .title
        width: 100px
        font-size: 16px
        color: black
      .shouhuoren
        margin-top: 40px
        input
          width: 405px
          height: 54px
          font-size: 16px
          border-radius: 12px
          background-color: #F3F5F6
          padding-left: 15px
          border: none
          border: 1px solid #DBDBDB
          color: #C0C0C0
        input::-webkit-input-placeholder
                color: #C0C0C0
        p
          color:rgba(136,136,136,1)
          font-size: 14px
          margin: 10px 0 10px 0
      .shouhuophone
        margin-top: 30px
        input
          width: 405px
          height: 54px
          font-size: 16px
          border-radius: 12px
          background-color: #F3F5F6
          border: none
          border: 1px solid #DBDBDB
          padding-left: 15px
          color: #C0C0C0
        input::-webkit-input-placeholder
                color: #C0C0C0
        p
          color:rgba(136,136,136,1)
          font-size: 14px
          margin: 10px 0 10px 0
      .tianjiasuozai
        margin-top: 30px
        position: relative
        .el-icon-caret-bottom
          position: absolute
          font-size: 30px
          top: 34px
          z-index: 50
          &.a1
            left: 88px
          &.a2
            left: 233px
          &.a3
            left: 380px
        .linkage
          display: flex
          justify-content: space-between
          .el-select
            width: 130px
            color: #3A3A3A
            .el-input
              input
                width: 127px
                height: 54px
                border-radius:12px
                background-color: #F3F5F6
              .el-input__suffix
                display: none
        p
          color:rgba(136,136,136,1)
          font-size: 14px
          margin: 10px 0 10px 0
      .tianjiaxiangxi
        margin-top: 30px
        p
          color:rgba(136,136,136,1)
          margin: 10px 0 5px 0
        input
          width: 405px
          height: 54px
          font-size: 16px
          border-radius: 12px
          background-color: #F3F5F6
          border: none
          border: 1px solid #DBDBDB
          padding-left: 15px
          color: #C0C0C0
        input::-webkit-input-placeholder
                color: #C0C0C0
      .button
        width:140px
        height:40px
        border-radius:20px
        background-color: #2EB7C6
        text-align: center
        line-height: 40px
        color: white
        margin-top: 46px
        margin-left: 140px
        margin-bottom: 54px
</style>
