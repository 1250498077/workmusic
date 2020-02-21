<template>
  <div class="class_order_pay">
    <div class="mengban" v-show="mengban"></div>
    <div class="header_shadow"></div>
    <div class="tips">
      <div class="img">
        <img src="./tips.png" alt="">
      </div>
      <p>购买后不支持退款、转让，请确认有效期后再提交订单。</p>
    </div>
    <div class="moneyq">
      <p class="titled">实付金额：</p>
      <p class="moneyd">￥{{data.price || data.actualPay || data.prive}}</p>
    </div>
    <div class="order">
      <div class="order_a">订单信息</div>
    </div>
    <div class="order_number">
      <p class="order_number_titled">订单编号：</p>
      <p class="order_number_moneyd">21142018062418459</p>
    </div>
    <!--课程-->
    <div class="order_list" v-show="typed === 1">
      <div class="a product">
        <div class="titlea">商品</div>
        <div class="container">
          <div class="img">
            <img :src="data.pic" alt="">
          </div>
          <div class="text">
            <p class="titled">{{data.name}}</p>
            <p class="people">{{data.orderType}}</p>
          </div>
        </div>
      </div>
      <div class="a term">
        <div class="titlea">{{type}}</div>
        <div class="line">{{type_t}}</div>
      </div>
      <div class="a total_price">
        <div class="titlea">总价</div>
        <div class="line">￥{{data.price || data.actualPay || data.prive}}</div>
      </div>
    </div>
    <!--商品-->
    <div class="order_list" v-show="typed === 2">
      <div class="a product">
        <div class="titlea">商品</div>
        <div class="container">
          <div class="img">
            <img :src="product_order.pic" alt="">
          </div>
          <div class="text">
            <p class="titled">{{product_order.name}}</p>
            <p class="people">单独购买</p>
          </div>
        </div>
      </div>
      <div class="a term">
        <div class="titlea">运输方式</div>
        <div class="line">{{type_t}}</div>
      </div>
      <div class="a total_price">
        <div class="titlea">总价</div>
        <div class="line">￥{{data.price || data.actualPay || data.prive}}</div>
      </div>
    </div>
    <!--活动-->
    <div class="order_list" v-show="typed === 3">
      <div class="a product">
        <div class="titlea">商品</div>
        <div class="container">
          <div class="img">
            <img :src="product_order.pic" alt="">
          </div>
          <div class="text">
            <p class="titled">{{data.name}}</p>
          </div>
        </div>
      </div>
      <div class="a term">
        <div class="titlea">活动日期</div>
        <div class="line">{{data.endTime}}</div>
      </div>
      <div class="a total_price">
        <div class="titlea">总价</div>
        <div class="line">￥{{data.price || data.prive}}</div>
      </div>
    </div>
    <div class="pay_type">
      <p>支付方式</p>
      <div class="type">
        <div class="typedt typedd" @click="pay_type($event, 1)">
          <div class="imgw img">
            <img src="./weixin.png" alt="">
          </div>
        </div>
        <div class="typedt" @click="pay_type($event, 2)">
          <div class="imgz img">
            <img src="./zhifubao.png" alt="">
          </div>
        </div>
        <div class="typedt" @click="pay_type($event, 3)">
          <div class="imgy img">
            <img src="./yinlian.png" alt="">
          </div>
        </div>
        <div class="typedt" @click="pay_type($event, 4)">
          <div class="imgp img">
            <img src="./paypal.png" alt="">
          </div>
        </div>
        <div class="typedt" @click="pay_type($event, 5)">
          <div class="imgq img">
            <img src="./qianbao.png" alt="">
          </div>
          <div class="pay_moneyt">
            钱包支付
          </div>
          <div class="yue">
            余额：{{wallet_data.allAmount}}
          </div>
        </div>
      </div>
    </div>
    <div class="all_money">
      <p class="all">总金额：</p>
      <p class="money">￥{{data.price || data.actualPay || data.prive}}</p>
    </div>
    <div class="click">
      <div class="money_button" @click="lijizhifu">立即支付</div>
    </div>
    <!--支付密码弹出框-->
    <div class="zhifumima" v-show="zhifutanchu">
      <i class="el-icon-close" @click="zhifuclose"></i>
      <div class="xiugaicontainer">
        <p>支付密码</p>
        <div class="money">
          <p class="titledd">支付金额：</p>
          <p class="moneyd">￥{{data.price || data.actualPay || data.prive}}</p>
        </div>
        <div class="xinshoujihao">
          <p>输入支付密码</p>
          <input type="password" placeholder="" v-model="zhifu_password">
        </div>
        <div class="button" @click="confirm_pay_password">确认支付密码</div>
      </div>
    </div>
    <!--微信二维码弹出框-->
    <div class="erweima" v-show="erweima_show" style="display: flex;flex-direction: column">
      <!--<i class="el-icon-close" @click="erweima_close"></i>-->
      <div class="erweima_money" style="display: flex;width: 400px;justify-content: space-between">
        <div class="erweima_money_container" style="display: flex;align-items: flex-end;margin-bottom: 20px">
          <div class="erweima_money_title" style="color: black;font-size: 20px;font-weight: 600">
            支付方式：
          </div>
          <div class="erweima_money_p" style="color: green;font-weight: 500">
            微信支付
          </div>
        </div>
        <div class="erweima_money_container" style="display: flex;align-items: flex-end;margin-bottom: 20px">
          <div class="erweima_money_title" style="color: black;font-size: 20px;font-weight: 600">
            支付金额：
          </div>
          <div class="erweima_money_p" style="color:orange;font-weight: 500">
            ￥{{data.price || data.actualPay || data.prive}}
          </div>
        </div>
      </div>
      <div id="qrcode"></div>
      <div class="button_container" style="display: flex;width: 400px;justify-content: space-between;margin-top: 10px">
        <div class="btn"
             style="width: 80px;height: 30px;text-align: center;line-height: 30px;background-color: green;border-radius: 10px;color: white"
             @click="wait_zhifu">稍后支付
        </div>
        <div class="btn"
             style="width: 80px;height: 30px;text-align: center;line-height: 30px;background-color: #FFA100;color:white;border-radius: 10px"
             @click="payed">已支付
        </div>
      </div>
    </div>

    <div class="yinlian" v-html="yinglian_html" style="z-index: -10"></div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import store from '../../store/index.js'
  import {loadFromlLocal} from '../../common/js/store'
  import QRCode from 'qrcodejs2'

  export default {
    data() {
      return {
        yinglian_html: '',
        erweima_show: false,
        id: '',
        token: (() => {
          return loadFromlLocal('token')
        })(),
        selectd: {
          a1: false,
          a2: false,
          a3: false,
          a4: false,
          a5: false
        },
        order: {
          id: 0,
          parentId: 0,
          refereeId: 0,
          typeId: 0
        },
        orde_pay: {
          addressId: 0,
          amount: 0,
          collageId: 0,
          contact: '',
          entrancee: '',
          goodsName: '',
          id: 0,
          name: '',
          orderId: 0,
          orderType: '',
          parentId: 0,
          prive: 0,
          refereeId: 0,
          sign: '',
          specificationId: 0,
          time: 0,
          type: 'COURSE'
        },
        data: {},
        type: '',
        type_t: '',
        phone: '',
        paypal_url: '',
        typed: '',
        pk_id: '',
        danke_pintuan: '',
        type_index: 1,
        yanzhengmima: '',
        orderId: '',
        addressId: '',
        comefrom: '',
        order_id: '',
        product_order: {},
        class_order: '',
        people_num: 0,
        mengban: false,
        zhifutanchu: false,
        zhifu_password: '',
        wallet_data: '',
        luyou_laiyuan: ''
      }
    },
    store,
    methods: {
      lijizhifu() {
        if (this.type_index === 1) {
          // 微信
          this.mengban = true
          this.erweima_show = true
          this.pay_model()
        } else if (this.type_index === 2) {
          // 支付宝
          this.pay_model()
        } else if (this.type_index === 3) {
          // 银联支付
          this.pay_model()
        } else if(this.type_index === 4) {
          this.pay_model()
        }else {
          this.mengban = true
          this.zhifutanchu = true
        }
      },
      confirm_pay_password() {
        let date = new Date()
        let time = date.getTime()
        let newPayPassword = this.encodePassword(this.zhifu_password, "payPassword")
        let keyt = this.encode("payPassword=" + newPayPassword, time.toString())
        let data = {
          password: newPayPassword,
          time: time,
          keyt: keyt
        }
        this.axios({
          method: "post",
          url: this.url() + '/front/user/validate/password/pay',
          headers: {
            userToken: this.token
          },
          data: data
        }).then((res) => {
          console.log('验证支付密码返回的东西')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.pay_model()
            this.mengban = false
            this.zhifutanchu = false
//            this.data = res.data
          } else {
            this.$message.error('支付密码错误');
          }
        })
      },
      payed() {
        if (this.typed === 2) {
          this.$router.push({
            path: '/order_center',
            query: {
              order_type: 'product'
            }
          })
        }
      },
      wait_zhifu() {
        if (this.typed === 1) {
          this.$router.push({
            path: '/order_center',
            query: {
              order_type: 'one'
            }
          })
        } else if (this.typed === 2) {
          this.$router.push({
            path: '/order_center',
            query: {
              order_type: 'one'
            }
          })
        } else if (this.typed === 3) {
//        this.$router.push({
//          path:'/product_pay_wait',
//          query: {
//            id: this.datad.id
//          }
//        })
        }
      },
      wallet() {
        this.axios({
          method: "get",
          url: this.url() + "/front/pay/mine/wallet",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('加载钱包')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.wallet_data = res.values
          }
        })
      },
      erweima_close() {
        this.mengban = false
        this.erweima_show = false
      },
      qrcode(text) {
        this.erweima_show = true
        let qrcode = new QRCode('qrcode', {
          width: 300,
          height: 300, // 高度
          text: text // 二维码内容
        })
//      qrcode = null
        console.log(qrcode)
      },
      zhifuclose() {
        this.mengban = false
        this.zhifutanchu = false
      },
      dankebuy() {
        this.mengban = false
        this.zhifutanchu = false
        let date = new Date()
        let time = date.getTime()
        let password = this.yanzhengmima
        let newPayPassword = this.encodePassword(password, "payPassword")
        let keyt = this.encode("payPassword=" + newPayPassword, time.toString())
        let order = {
          keyt: keyt,
          orderId: this.orderId,
          password: newPayPassword,
          time: time
        }
        console.log(order)
        this.axios({
          method: "post",
          url: this.url() + '/front/pay/balance/pay',
          headers: {
            userToken: this.token
          },
          data: order
        }).then((res) => {
          console.log('postpostpost')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.data = res.data
          }
        })
      },
      pay_type(e, type_index) {
        console.log(e.target)
        this.type_index = type_index
        let typed = document.getElementsByClassName('typedt')
        for (let i = 0; i < typed.length; i++) {
          typed[i].classList.remove('typedd')
        }
        e.currentTarget.classList.add('typedd')
      },
      model() {
        this.order = {
          id: this.id
        }
        this.post()
      },
      post() {
        this.axios({
          method: "post",
          url: this.url() + '/front/order/confirm/course/info',
          headers: {
            userToken: this.token
          },
          data: this.order
        }).then((res) => {
          console.log('postpostpost')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.data = res.data
          }
        })
      },
      productmodel() {
        console.log('根据商品id获取订单信息赋值给data')
        this.order = {
          id: this.id
        }
        this.productpost()
      },
      pay_model() {
        let date = new Date()
        let time = date.getTime()
        if (this.typed === 1) {
          let rukou = 0
          let orderId = ''
          if (this.comefrom === 2) {
            console.log('222222222222222222222')
            rukou = 1
            orderId = this.data.id
            this.id = this.data.objectId
          }
          // 判断购买什么，商品还是课程还是活动
          if (this.danke_pintuan === '2') {
            console.log('拼团')
            console.log(this.data.name)
            // 拼团
            let data = "type=" + 'COURSE'
              + ",id=" + this.id
              + ",orderType=" + 'COLLAGE'
              + ",addressId=" + 'null'
              + ",name=" + ''
              + ",contact=" + ''
              + ",amount=" + '1'
              + ",collageId=" + this.pk_id
              + ",parentId=" + 'null'
              + ",refereeId=" + 'null'
            console.log(data)
            let keyt = this.$options.methods.encode(data, time.toString())
            console.log(this.id)
            this.orde_pay = {
              addressId: '',
              amount: 1,
              collageId: this.pk_id,
              contact: '',
              entrancee: rukou,
              goodsName: this.data.name,
              id: this.id,
              name: '',
              orderId: orderId,
              orderType: 'COLLAGE',
              parentId: '',
              prive: this.data.price,
              refereeId: '',
              sign: keyt,
              specificationId: '',
              time: time,
              type: 'COURSE'
            }
            if (this.type_index === 1) {
              this.wechat()
            } else if (this.type_index === 2) {
              this.zhifubao()
            } else if (this.type_index === 3) {
              this.yinglian()
            } else if (this.type_index === 4) {
              console.log('paypal')
              this.paypal()
            } else if (this.type_index === 5) {
              console.log('yue')
              this.yu_e()
            }
          } else {
            // 个人购买
            console.log('不拼团')
            console.log(this.data.name)
            let data = "type=" + 'COURSE'
              + ",id=" + this.id
              + ",orderType=" + 'NORMAL'
              + ",addressId=" + 'null'
              + ",name=" + ''
              + ",contact=" + ''
              + ",amount=" + '1'
              + ",collageId=" + 'null'
              + ",parentId=" + 'null'
              + ",refereeId=" + 'null'
            let keyt = this.$options.methods.encode(data, time.toString())
            console.log(this.id)
            this.orde_pay = {
              addressId: '',
              amount: 1,
              collageId: '',
              contact: '',
              entrancee: rukou,
              goodsName: '',
              id: this.id,
              name: '',
              orderId: orderId,
              orderType: 'NORMAL',
              parentId: '',
              prive: this.data.price,
              refereeId: '',
              sign: keyt,
              specificationId: '',
              time: time,
              type: 'COURSE'
            }
            console.log(this.type_index)
            if (this.type_index === 1) {
              console.log('进来1')
              this.wechat()
            } else if (this.type_index === 2) {
              this.zhifubao()
            } else if (this.type_index === 3) {
              this.yinglian()
            } else if (this.type_index === 4) {
              console.log('paypal')
              this.paypal()
            } else if (this.type_index === 5) {
              console.log('yue')
              this.yu_e()
            }
          }
        } else if (this.typed === 2) {
          console.log('商品')
          let rukou = 0
          let orderId = ''
          if (this.comefrom === 2) {
            console.log('222222222222222222222')
            rukou = 1
            orderId = this.product_order.id
            this.id = this.product_order.objectId
            console.log(this.product_order)
          }
          let data = "type=" + 'PRODUCT'
            + ",id=" + this.id
            + ",orderType=" + 'NORMAL'
            + ",addressId=" + this.addressId
            + ",name=" + ''
            + ",contact=" + ''
            + ",amount=" + '0'
            + ",collageId=" + 'null'
            + ",parentId=" + 'null'
            + ",refereeId=" + 'null'
          console.log(data)
          let keyt = this.$options.methods.encode(data, time.toString())
          console.log(this.id)
          this.orde_pay = {
            addressId: this.addressId,
            amount: 0,
            collageId: '',
            contact: '',
            entrancee: rukou,
            goodsName: this.data.name,
            id: this.id,
            name: '',
            orderId: orderId,
            orderType: 'NORMAL',
            parentId: '',
            prive: this.data.price,
            refereeId: '',
            sign: keyt,
            specificationId: this.$store.state.product_type,
            time: time,
            type: 'PRODUCT'
          }
          console.log('orde_payorde_payorde_pay')
          console.log(this.orde_pay)
          if (this.type_index === 1) {
            this.wechat()
          } else if (this.type_index === 2) {
            this.zhifubao()
          } else if (this.type_index === 3) {
            this.yinglian()
          } else if (this.type_index === 4) {
            console.log('paypal')
            this.paypal()
          } else if (this.type_index === 5) {
            console.log('yue')
            this.yu_e()
          }
        }
        else if (this.typed === 3) {
          console.log('活动')
          let rukou = 0
          let orderId = ''
          if (this.comefrom === 2) {
            console.log('222222222222222222222')
            rukou = 1
            orderId = this.product_order.id
            this.id = this.product_order.objectId
          }
          let data = "type=" + 'ACTIVITY'
            + ",id=" + this.id
            + ",orderType=" + 'NORMAL'
            + ",addressId=" + 'null'
            + ",name=" + this.name
            + ",contact=" + this.phone
            + ",amount=" + this.people_num
            + ",collageId=" + 'null'
            + ",parentId=" + 'null'
            + ",refereeId=" + 'null'
          console.log(data)
          let keyt = this.$options.methods.encode(data, time.toString())
          console.log(this.id)
          this.orde_pay = {
            addressId: '',
            amount: this.people_num,
            collageId: '',
            contact: this.phone,
            entrancee: rukou,
            goodsName: '',
            id: this.id,
            name: this.name,
            orderId: orderId,
            orderType: 'NORMAL',
            parentId: '',
            prive: this.data.price,
            refereeId: '',
            sign: keyt,
            specificationId: '',
            time: time,
            type: 'ACTIVITY'
          }
          console.log('orde_payorde_payorde_pay')
          console.log(this.orde_pay)
          if (this.type_index === 1) {
            this.wechat()
          } else if (this.type_index === 2) {
            this.zhifubao()
          } else if (this.type_index === 3) {
            this.yinglian()
          } else if (this.type_index === 4) {
            console.log('paypal')
            this.paypal()
          } else if (this.type_index === 5) {
            console.log('yue')
            this.yu_e()
          }
        }
      },
      zhifubao() {
        console.log('zhifubao')
        console.log(this.orde_pay)
        let data = this.orde_pay
        data.from = 'WEB'
        this.axios({
          method: "post",
          url: this.url() + '/front/pay/alipay',
          headers: {
            userToken: this.token
          },
          data: this.orde_pay
        }).then((res) => {
          console.log('支付宝支付返回的东西')
          console.log(res)
          console.log(res.data.data)
          window.open(res.data.data)
          window.location.href = res.data.data
        })
      },
      wechat() {
        console.log('wechat')
        console.log(this.orde_pay)
        let data = this.orde_pay
        data.from = 'WEB'
        this.axios({
          method: "post",
          url: this.url() + '/front/pay/wepay',
          headers: {
            userToken: this.token
          },
          data: this.orde_pay
        }).then((res) => {
          console.log('微信支付返回的东西')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.qrcode(res.data.url)
          }
        })
      },
      paypal() {
        console.log('paypal')
        console.log(this.orde_pay)
        this.axios({
          method: "post",
          url: this.url() + '/front/pay/paypal',
          headers: {
            userToken: this.token
          },
          data: this.orde_pay
        }).then((res) => {
          res = res.data
          if (res.code === 200) {
            this.paypal_url = res.data
            window.open(this.paypal_url)
          } else if(res.code === 401) {
            this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        })
      },
      yinglian() {
        console.log('yinglian')
        console.log(this.orde_pay)
        this.axios({
          method: "post",
          url: this.url() + '/front/pay/unionpay',
          headers: {
            userToken: this.token
          },
          data: this.orde_pay
        }).then((res) => {
          console.log(res)
          res = res.data
          if (res.code === 200) {
            console.log(res)
            this.orderId = res.values.orderId
            this._yinglian(this.orderId)
          }
        })
      },
      _yinglian(orderId) {
        this.axios({
          method: "get",
          url: this.url() + '/front/union/jump?orderId=' + orderId,
          headers: {
            userToken: this.token
          },
          data: {
            orderId: orderId
          }
        }).then((res) => {
          console.log('jump')
          console.log(res)
          let html = res.data
          console.log('============================')
          let pattern = /<form.*<\/form>/
          console.log(pattern.exec(html))
          this.yinglian_html = pattern.exec(html)[0]
          window.setTimeout(() => {
            console.log('执行提交')
            document.all.pay_form.submit()
          }, 1000)
        })
      },
      yu_e() {
        console.log('进入余额支付方法，下面是用于发请求的数据')
        console.log(this.orde_pay)
        // ====================================
        this.axios({
          method: "post",
          url: this.url() + '/front/pay/balance',
          headers: {
            userToken: this.token
          },
          data: this.orde_pay
        }).then((res) => {
          // ==================================
          console.log(res)
          res = res.data
          if (res.code === 200) {
            console.log('购买成功后返回的东西')
            console.log(res)
            this.orderId = res.values.orderId
            this._yu_e()
          }
        })
      },
      _yu_e() {
        console.log('最后一步')
        let date = new Date()
        let time = date.getTime()
        let newPayPassword = this.encodePassword(this.zhifu_password, "payPassword")
        let keyt = this.encode("payPassword=" + newPayPassword, time.toString())
        let data = {
          keyt: keyt,
          orderId: this.orderId,
          password: newPayPassword,
          time: time
        }
        this.axios({
          method: "post",
          url: this.url() + '/front/pay/balance/pay',
          headers: {
            userToken: this.token
          },
          data: data
        }).then((res) => {
          console.log(res)
          res = res.data
          if (res.code === 200) {
            console.log('购买成功后返回的东西mwh')
            this.$router.push({
              // class_pay_success
//              this.luyou_laiyuan
              path: this.luyou_laiyuan,
              query: {
                id: res.values.orderId
              }
            })
          } else if (res.code === 2004) {
            this.$message.error('余额不足')
          }
        })
      },
      paypal_url_post() {
        this.axios({
          method: "post",
          url: this.paypal_url,
          headers: {
            userToken: this.token
          },
          data: this.orde_pay
        }).then((res) => {
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.data = res.data
          }
        })
      },
      productpost() {
        this.axios({
          method: "post",
          url: this.url() + '/front/order/confirm/product/info',
          headers: {
            userToken: this.token
          },
          data: this.order
        }).then((res) => {
          console.log('postpostpost')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.data = res.data
          }
        })
      },
      encode(data, time) {
        let reg1 = new RegExp('[0-4]', "g")
        let reg2 = new RegExp('[5-9]', "g")
        let Base64 = require('js-base64').Base64
        return Base64.encode(time.replace(reg1, '') + "k1#" + md5(data) + '#k2' + time.replace(reg2, ''))
      },
      encodePassword(data, key) {
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&77')
        let reg1 = new RegExp('[0-4]', "g")
        let reg2 = new RegExp('[5-9]', "g")
        let Base64 = require('js-base64').Base64
        return Base64.encode(key.replace(reg1, '') + "k1#" + md5(data) + '#k2' + key.replace(reg2, ''))
      },
      pinke_model() {
        let model = {
          id: this.id,
          typeId: this.pk_id
        }
        this.pkpost(model)
      },
      pkpost(model) {
        console.log('申请评课')
        console.log(model)
        this.axios({
          method: "post",
          url: this.url() + '/front/order/confirm/course/info',
          headers: {
            userToken: this.token
          },
          data: model
        }).then((res) => {
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.data = res.data
          } else if (res.code === 401) {
          }
        })
      }
    },
    mounted() {
      this.wallet()
      this.phone = this.$store.state.phone
      // typed字段是用来判断是 课程 还是 实物商品
      this.typed = this.$route.query.order_type
      this.order_id = this.$store.state.order_id
      if (this.typed === 1) {
        this.luyou_laiyuan = 'class_pay_success'
        console.log('订单支付进入课程')
        this.type = '有效期'
        this.type_t = '365天'
        this.pk_id = this.$route.query.pk_id
        this.danke_pintuan = this.$route.query.danke_pintuan
        this.id = this.$route.query.id
        this.comefrom = this.$route.query.comefrom
        this.data = this.$route.query.data
        console.log(this.data)
        if (this.danke_pintuan === '2') {
          this.pinke_model()
        } else {
          this.model()
        }
      } else if (this.typed === 2) {
        this.luyou_laiyuan = 'product_pay_success'
        console.log('订单支付进入商品')
        this.type = '运输方式'
        this.type_t = '申通快递'
        this.id = this.$route.query.id
        this.addressId = this.$route.query.addressId
        // 判断是来自于商品详情页还是订单中心
        this.comefrom = this.$route.query.comefrom
        this.product_order = this.$route.query.data
        this.data = this.$route.query.data
        console.log(this.data)
      } else if (this.typed === 3) {
        this.luyou_laiyuan = 'activity_pay_success'
        console.log('订单支付进入活动')
        console.log(this.$route.query)
        this.comefrom = this.$route.query.comefrom
        this.data = this.$route.query.data
        this.id = this.data.id
        this.people_num = this.$route.query.people_num
        this.phone = this.$route.query.phone
        this.name = this.$route.query.name
      }
    },
    watch: {
      mengban(neww) {
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .class_order_pay
    width: 1280px
    min-height: 800px
    margin: 0 auto
    p
      margin: 0
    .tips
      display: flex
      font-size: 14px
      margin: 0 auto
      width: 1200px
      margin-top: 20px
      color: #888888
      .img
        width: 12px
        height: 12px
        img
          width: 100%
          height: 100%
      p
        margin-left: 10px
        color: #888888
    .moneyq
      width: 1200px
      margin: 0 auto
      display: flex
      align-items: flex-end
      margin-top: 18px
      .titled
        color: black
        font-size: 14px
      .moneyd
        color: #F06074
        font-weight: 500
        font-size: 18px
    .order
      width: 1200px
      margin: 0 auto
      margin-top: 28px
      font-size: 16px
      height: 26px
      border-bottom: 2px solid #DBDBDB
      .order_a
        height: 26px
        width: 65px
        border-bottom: 2px solid #2BB7C7
    .order_number
      width: 1200px
      margin: 0 auto
      margin-top: 20px
      display: flex
      color: #888888
      font-size: 14px
    .order_list
      width: 1200px
      margin: 0 auto
      margin-top: 21px
      display: flex
      border: 1px solid #DADADA
      .a
        width: 437px
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
            .people
              margin-top: 29px
              font-size: 14px
              color: #C0C0C0
            .titled
              font-weight: 500
              font-size: 14px
    .pay_type
      width: 1200px
      margin: 0 auto
      margin-top: 30px
      .type
        display: flex
        margin-top: 16px
        justify-content: flex-start
        .typedt
          width: 185px
          height: 68px
          cursor: pointer
          margin-right: 10px
          position: relative
          background-color: #F3F5F7
          &.typedd
            background-image: url("./select.png")
          .imgw
            margin-top: 13px
            margin-left: 60px
          .imgz
            margin-top: 23px
            margin-left: 55px
          .imgy
            margin-top: 22px
            margin-left: 47px
          .imgp
            margin-top: 19px
            margin-left: 40px
          .imgq
            width: 29px
            height: 28px
            margin-left: 36px
            margin-top: 12px
            img
              width: 100%
              height: 100%
          .pay_moneyt
            position: absolute
            font-size: 16px
            top: 18px
            left: 78px
          .yue
            position: absolute
            font-size: 12px
            color: #888888
            top: 47px
            left: 58px
    .all_money
      width: 1200px
      height: 50px
      display: flex
      margin: 0 auto
      margin-top: 30px
      border-top: 1px solid #DBDBDB
      justify-content: flex-end
      .money
        color: #F06074
        font-size: 18px
        font-weight: 600
        margin-top: 20px
      .all
        font-size: 14px
        margin-top: 23px
    .click
      width: 1200px
      margin: 0 auto
      display: flex
      margin-top: 30px
      justify-content: flex-end
      .money_button
        width: 142px
        cursor: pointer
        height: 50px
        text-align: center
        color: white
        line-height: 50px
        background-color: #2EB7C6
    .zhifumima
      width: 480px
      background-color: white
      border-radius: 12px
      display: flex
      flex-direction: column
      z-index: 3
      left: 50%
      top: 50%
      margin-left: -240px
      margin-top: -300px
      position: fixed
      color: rgba(192, 192, 192, 1)
      overflow: hidden
      padding-bottom: 30px
      p
        color: black
        font-size: 16px
        font-weight: 400
      .el-icon-close
        position: absolute
        top: 20px
        right: 20px
        font-size: 24px
      .xiugaicontainer
        width: 400px
        position: relative
        margin-left: 30px
        margin-top: 30px
        .xinshoujihao
          margin-top: 30px
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            background-color: #F3F5F6
            border: none
            border: 1px solid #DBDBDB
            margin-top: 10px
            padding-left: 15px
            color: black
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            font-weight: 400
            font-size: 14px
            color: rgba(136, 136, 136, 1)
          .warning
            position: absolute
            margin-top: 5px
            color: #ff7800
        .money
          display: flex
          margin-top: 30px
          align-items: flex-end
          .titledd
            color: #888
            line-height: 15px
            font-size: 14px
          .moneyd
            font-size: 16px
        .button
          width: 140px
          height: 40px
          cursor: pointer
          border-radius: 20px
          background-color: #2EB7C6
          text-align: center
          line-height: 40px
          color: white
          margin-top: 46px
          margin-left: 140px
          margin-bottom: 54px
    .erweima
      width: 480px
      height: 480px
      display flex
      justify-content center
      align-items center
      background-color: white
      border-radius: 12px
      z-index: 3
      left: 50%
      top: 50%
      margin-left: -240px
      margin-top: -300px
      position: fixed
      color: rgba(192, 192, 192, 1)
      overflow: hidden
      .el-icon-close
        position: absolute
        top: 20px
        right: 20px
        font-size: 24px
    .yinlian
      width: 480px
      height: 480px
      display flex
      justify-content center
      align-items center
      background-color: white
      border-radius: 12px
      z-index: 3
      left: 50%
      top: 50%
      margin-left: -240px
      margin-top: -300px
      position: fixed
      color: rgba(192, 192, 192, 1)
      overflow: hidden
</style>
