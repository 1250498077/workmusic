<template>
  <div class="gerenzhongxin">
    <div class="container">
      <div class="img">
        <img src="./header.png" alt="">
      </div>
    </div>
    <div class="gerenxinxi">
      <div class="left">
        <div class="touxiang">
          <div class="img">
            <img :src="own_information.avatar" alt="">
          </div>
          <div class="dengji"></div>
        </div>
        <div class="detail">
          <div class="name_local">
            <p class="name">{{own_information.nickname}}</p>
            <div class="img" :class="{man:own_information.sex === 'MALE'}">
              <img src="./feman.png" alt="" v-show="own_information.sex === 'FEMALE'">
              <img src="./man.png" alt="" v-show="own_information.sex === 'MALE'">
            </div>
            <p class="local1">{{own_information.province}}</p>
            <p class="local2">{{own_information.city}}</p>
          </div>
          <div class="money">
            <div class="imgg">
              <img src="./yingbi.png" alt="">
            </div>
            <p class="num">余额 {{wallet_data.allAmount}}</p>
          </div>
        </div>
      </div>
      <div class="right" @click="jump">
        <div class="imggg">
          <img src="./chilun.png" alt="">
        </div>
        <p>个人设置</p>
      </div>
    </div>
    <div class="list_container">
      <div class="left">
        <div class="lefta" @click="select(1)">
          <div class="leftb" :class="{'a1':select_type.a1}">
            <div class="img qianbao" v-show="!select_type.a1">
              <img src="./nul_shoucangjia.png" alt="">
            </div>
            <p>我的钱包</p>
          </div>
        </div>
        <div class="lefta" @click="select(2)">
          <div class="leftb" :class="{'a2':select_type.a2}">
            <div class="img shoucang" v-show="!select_type.a2">
              <img src="./nul_qizi.png" alt="">
            </div>
            <p>我的收藏</p>
          </div>
        </div>
        <div class="lefta" @click="select(3)">
          <div class="leftb" :class="{'a3':select_type.a3}">
            <div class="img kecheng" v-show="!select_type.a3">
              <img src="./nul_shuben.png" alt="">
            </div>
            <p>我的课程</p>
          </div>
        </div>
        <div class="lefta" @click="select(4)">
          <div class="leftb" :class="{'a4':select_type.a4}">
            <div class="img huodong" v-show="!select_type.a4">
              <img src="./nul_wenjianjia.png" alt="">
            </div>
            <p>我的活动</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="wodeqianbao" v-show="select_type.a1">
          <div class="titleg">
            <div class="wodeqianbaod">我的钱包</div>
          </div>
          <div class="table">
            <div class="table_container">
              <div class="allmoney">
                <p class="titleq">总金额（元）</p>
                <p class="money">￥{{wallet_data.allAmount}}</p>
              </div>
              <div class="chongzhi_fanxian">
                <div class="chongzhi">
                  <p class="titleq">充值金额（元）</p>
                  <p class="moneyy">￥{{wallet_data.rechargeAmount}}</p>
                </div>
                <div class="fanxian">
                  <p class="titleq">返现金额</p>
                  <p class="moneyy">{{wallet_data.returnAmount}}</p>
                </div>
              </div>
              <div class="buttom_two">
                <div class="top_button" @click="chongzhi">充值</div>
                <div class="bottom_button" @click="tixian">提现</div>
              </div>
            </div>
          </div>
          <div class="titleg">
            <div class="wodeqianbaod">收支明细</div>
          </div>
          <div class="xuanze">
            <div class="selects selecta" @click="money_select($event, item.id)" v-for="(item, key) in balance_header"
                 :key="key">{{item.name}}
            </div>
          </div>
          <div class="shouzhicontainer">
            <div class="list" v-for="(item, key) in list" :key="key">
              <div class="timed">{{item.createTime}}</div>
              <div class="detaild">{{item.name}}</div>
              <div class="moneyd">{{item.price}}</div>
              <div class="xiangqing" @click="xiangqing(item.id, item.type)">详情</div>
            </div>
          </div>
          <div class="dianjiliebiao">
            <div class="liebiao">
              <p>1-{{list.length}}条，共{{shouzhi_totalSize}}条</p>
              <p class="green" @click="money_select($event, 'next')">下一页></p>
              <p class="green" @click="money_select($event, 'end')">尾页>></p>
            </div>
          </div>
        </div>
        <div class="my_collection" v-show="select_type.a2">
          <div class="titleg">
            <div class="my_collectiond">我的收藏</div>
          </div>
          <div class="xuanze">
            <div class="selectx selectd" @click="collection_shoucang($event, 1)" ref="sel">全部</div>
            <div class="selectx selecta" @click="collection_shoucang($event, 2)" ref="sel">课程</div>
            <div class="selectx selecta" @click="collection_shoucang($event, 3)" ref="sel">商品</div>
            <div class="selectx selecta" @click="collection_shoucang($event, 4)" ref="sel">活动</div>
            <div class="selectx selecta" @click="collection_shoucang($event, 5)" ref="sel">资讯</div>
          </div>
          <div class="list_container">
            <v-my_collection v-for="(item, key) in datad" :key="key" :data="item" :class="{'whited':(key+1)%2!==0}"
                             :type="shoucang_id[key]"></v-my_collection>
          </div>
        </div>
        <div class="myclass" v-show="select_type.a3">
          <div class="titleg">
            <div class="myclassd">我的课程</div>
          </div>
          <div class="list_container">
            <v-my_collection v-for="(item, key) in class_list_data" :key="key" :data="item"
                             :class="{'whited':(key+1)%2!==0}" v-on:jumpclass_detail="jumpclass_detail"
                             :type="1"></v-my_collection>
          </div>
        </div>
        <div class="myactivity" v-show="select_type.a4">
          <div class="titleg">
            <div class="myactivityd">我的活动</div>
          </div>
          <div class="list_container">
            <v-activity_detail v-for="(item, key) in acrivity_list" :key="key" :data="item"></v-activity_detail>
          </div>
        </div>
      </div>
    </div>
    <!--蒙版-->
    <div class="mengband" v-show="mengban_show" @click="mengban_close"></div>
    <!--余额提现弹出框-->
    <div class="yuetixian" v-show="tixian_show">
      <div class="guanbi icon-close" @click="tixian_close"></div>
      <div class="yuetixian_neibu">
        <p class="yuetixian_title">余额提现</p>
        <div class="tixianyue">
          <p>提现余额</p>
          <input type="text" placeholder="请输入金额" v-model="tixian_yue.money">
        </div>
        <div class="qianbaoyue">
          <p class="qianbaoyue1">钱包余额：{{wallet_data.allAmount}}</p>
          <p class="qianbaoyue2">全部提现</p>
        </div>
        <div class="fangshi_guanli">
          <p class="fangshi">提现方式</p>
          <p class="guanli" @click="add_tixian" style="cursor: pointer">添加提现方式</p>
        </div>
        <div class="tixian_container" style="height:200px;overflow-y:auto">
          <div class="select1 tixianfangshi" @click="pay_type($event, 1, item.id)" v-for="(item, index) in get_pay_list"
               :key="index" style="height: 60px;display: flex;align-items: center;width: 400px;">
            <div class="img">
              <img src="./weixin.png" alt="" v-show="item.type === 'WEPAY'">
              <img src="./zhifubao.png" alt="" v-show="item.type === 'ALIPAY'">
              <img src="./yinlan.png" alt="" v-show="item.type === 'UNIONPAY'">
            </div>
            <p v-show="item.type === 'WEPAY'">微信支付</p>
            <p v-show="item.type === 'ALIPAY'">支付宝支付</p>
            <p v-show="item.type === 'UNIONPAY'">银联支付</p>
            <p style="margin-left: 20px">姓名：{{item.name}}</p>
            <!--<p class="shanchu" v-show="tixian_del_show.wshow">删除</p>-->
          </div>
        </div>
        <div class="yue_button" @click="like_chongzhi">
          立即充值
        </div>
      </div>
    </div>
    <!--加入余额提现方式彈出框-->
    <div class="yuetixian_add" v-show="yuetixian_add">
      <div class="yuetixian_neibu">
        <p class="yuetixian_title">添加提现</p>
        <div class="tixianyue">
          <p>账户</p>
          <input type="text" placeholder="请输入账户" v-model="tixian_type.account">
        </div>
        <div class="tixianyue">
          <p>姓名</p>
          <input type="text" placeholder="请输入姓名" v-model="tixian_type.name">
        </div>
        <div class="tixianyue">
          <p>类型</p>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <!--<el-input placeholder="点击出现下拉列表" v-model="value" @input="inputmethods()"></el-input>-->
              <input type="text" placeholder="点击出现下拉列表" v-model="tixian_type.type">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="WEPAY">微信</el-dropdown-item>
              <el-dropdown-item command="ALIPAY">支付宝</el-dropdown-item>
              <el-dropdown-item command="UNIONPAY">银联</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="yue_button" @click="tixian_save">
          保存
        </div>
      </div>
    </div>
    <!--收支明细弹出框-->
    <div class="shouzhimingxi" v-show="shouzhimingxi_show">
      <i class="el-icon-close" @click="shouzhi_close"></i>
      <div class="shouzhimingxi_neibu">
        <p class="shouzhimingxip">
          收支明细
        </p>
        <div class="shouzhimingxi_title">
          <div class="shouzhimingxi_p">
            {{shouzhi_content.content}}
          </div>
        </div>
        <div class="zhifu">
          <div class="zhifu_con">
            <p>支付金额</p>
            <p>{{shouzhi_content.price}}.00</p>
          </div>
        </div>
        <div class="shouzhimingxi_list">
          <div class="list_a">
            <p class="title_aa">当前状态</p>
            <p class="title_content">{{shouzhi_content.status}}</p>
          </div>
          <div class="list_a">
            <p class="title_aa">收款方</p>
            <p class="title_content">喜星音乐</p>
          </div>
          <div class="list_a">
            <p class="title_aa time">转账时间</p>
            <p class="title_content">{{shouzhi_content.time}}</p>
          </div>
          <div class="list_a">
            <p class="title_aa">支付方式</p>
            <p class="title_content">{{shouzhi_content.payType}}</p>
          </div>
          <div class="list_a">
            <p class="title_aa">转账单号</p>
            <p class="title_content">{{shouzhi_content.orderNo}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--充值弹出框-->
    <div class="chongzhia" v-show="chongzhishow">
      <div class="guanbi icon-close" @click="close()"></div>
      <div class="chongzhia_con">
        <div class="chongzhi1">余额充值</div>
        <div class="chongzhi2">
          <p class="one">充值金额</p>
          <input type="text" placeholder="请输入支付金额" v-model="chongzhi_data.price">
        </div>
        <div class="chongzhi3">
          <div class="chongzhitype">
            <div class="typedt typedd" @click="pay_typed($event, 'WEPAY')" style="cursor: pointer">
              <div class="imgw img">
                <img src="./weixin1.png" alt="">
              </div>
              <p class="ziti">微信支付</p>
            </div>
            <div class="typedt" @click="pay_typed($event, 'ALIPAY')" style="cursor: pointer">
              <div class="imgz img">
                <img src="./zhifubao1.png" alt="">
              </div>
              <p class="ziti">支付宝支付</p>
            </div>
          </div>
        </div>
        <div class="chongzhi4" @click="likechongzhi">立即充值</div>
      </div>
    </div>

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
            {{chongzhi_data.price}}元
          </div>
        </div>
      </div>
      <div id="qrcode"></div>
      <div class="button_container" style="display: flex;width: 400px;justify-content: space-between;margin-top: 10px">
        <div class="btn"
             style="width: 130px;height: 30px;text-align: center;line-height: 30px;background-color: green;border-radius: 10px;color: white;cursor: pointer"
             @click="zanbuchong">暂时不充值
        </div>
        <div class="btn"
             style="width: 80px;height: 30px;text-align: center;line-height: 30px;background-color: #FFA100;color:white;border-radius: 10px;cursor: pointer"
             @click="zanbuchong">充值完成
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import my_collection from 'components/my_collection/my_collection.vue'
  import activity_detail from 'components/activity_detail/activity_detail.vue'
  import store from '../../store/index.js'
  import {mwh_post} from '../../common/js/post.js'
  import {loadFromlLocal} from '../../common/js/store'
  import md5 from 'js-md5'
  import QRCode from 'qrcodejs2'

  export default {
    data() {
      return {
        tixian_yue: {
          money: 0,
          sign: '',
          time: 0,
          wayId: 0
        },
        pay_type_list: [],
        yuetixian_add: false,
        acrivity_list: [],
        renwu: [1, 2, 3, 4],
        list: [],
        select_type: {
          a1: false,
          a2: false,
          a3: false,
          a4: false
        },
        token: loadFromlLocal('token'),
        phone: loadFromlLocal('phone'),
        own_information: '',
        my_collect: {
          all: [],
          class: [],
          activity: [],
          product: [],
          information: []
        },
        mengban_show: false,
        tixian_show: false,
        tixian_del_show: {
          wshow: false,
          zshow: true,
          yshow: true
        },
        shouzhimingxi_show: false,
        chongzhishow: false,
        datad: [],
        geren_data: '',
        wallet_data: '',
        class_list_data: '',
        balance_header: '',
        shouzhi_totalSize: '',
        current_select: '',
        shouzhi_page: 1,
        shoucang_id: [],
        shouzhi_content: '',
        activity_list: [],
        chongzhi_data: {
          channelType: 'WEPAY',
          from: 'WEB',
          price: '',
          sign: '',
          time: ''
        },
        erweima_show: false,
        tixian_type: {
          account: '',
          name: '',
          type: ''
        }
      }
    },
    store,
    components: {
      'v-my_collection': my_collection,
      'v-activity_detail': activity_detail
    },
    methods: {
      mengban_close() {
        this.mengban_show = false
        this.tixian_show = false
        this.yuetixian_add = false
        this.shouzhimingxi_show = false
        this.chongzhishow = false
      },
      like_chongzhi() {
        let date = new Date()
        let time = date.getTime()
        this.tixian_yue.time = time
        let keyt = this.$options.methods.encode("money=" + this.tixian_yue.money + ",wayId=" + this.tixian_yue.wayId, time.toString())
        this.tixian_yue.sign = keyt
        console.log(this.tixian_yue)
        this.axios({
          method: "post",
          url: this.url() + "/front/pay/withdraw",
          headers: {
            userToken: this.token
          },
          data: this.tixian_yue
        }).then((res) => {

          console.log(res)
          if (res.code === 200) {
            console.log('充值成功')
            this.$message({
              message: '充值成功',
              type: 'success'
            })
          } else {
            console.log(res.message)
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          }
        })
      },
      get_pay_list() {
        this.axios({
          method: "get",
          url: this.url() + "/front/pay/withdraw/way/list",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('获取提现方式列表')
          console.log(res)
          this.get_pay_list = res.data.data
        })
      },
      handleCommand(value) {
        this.tixian_type.type = value
      },
      add_tixian() {
        this.yuetixian_add = true
      },
      tixian_save() {
        console.log(this.tixian_type)
        this.axios({
          method: "post",
          url: this.url() + "/front/pay/withdraw/way/add",
          headers: {
            userToken: this.token
          },
          data: this.tixian_type
        }).then((res) => {
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.yuetixian_add = false
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }
        })
      },
      zanbuchong() {
        this.erweima_show = false
        this.chongzhishow = false
        this.mengban_show = false
      },
      qrcode(text) {
        this.erweima_show = true
        let qrcode = new QRCode('qrcode', {
          width: 300,
          height: 300, // 高度
          text: text // 二维码内容
        })
        console.log(qrcode)
      },
      // acrivity_list
      encode(data, time) {
        let str = '123456789js';
        let reg1 = new RegExp('[0-4]', "g")
        let reg2 = new RegExp('[5-9]', "g")
        let Base64 = require('js-base64').Base64
        return Base64.encode(time.replace(reg1, '') + "k1#" + md5(data) + '#k2' + time.replace(reg2, ''))
      },
      likechongzhi() {
        console.log('asdads')
        let date = new Date()
        let time = date.getTime()
        let data = "price=" + this.chongzhi_data.price
          + ",channelType=" + this.chongzhi_data.channelType
          + ",from=" + 'WEB'
        console.log(data)
        let keyt = this.$options.methods.encode(data, time.toString())
        this.chongzhi_data = {
          channelType: this.chongzhi_data.channelType,
          from: 'WEB',
          price: this.chongzhi_data.price,
          sign: keyt,
          time: time
        }
        console.log('出现')
        console.log(this.chongzhi_data)

        // 发出请求
        this.axios({
          method: "post",
          url: this.url() + "/front/pay/recharge",
          headers: {
            userToken: this.token
          },
          data: this.chongzhi_data
        }).then((res) => {
          console.log('充值')
          console.log(res)
          res = res.data
          if (res.code === 200 && this.chongzhi_data.channelType === 'WEPAY') {
            this.chongzhishow = false
            this.qrcode(res.data.url)
          } else if (res.code === 200 && this.chongzhi_data.channelType === 'ALIPAY') {
            this.chongzhishow = false
            this.mengban_show = false
            window.open(res.data)
          }
        })
      },
      _order_banlance_pre_post() {
        this.axios({
          method: "get",
          url: this.url() + "/front/order/balance/pre",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('收支明细')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.balance_header = res.values.operaType.list
            console.log(this.balance_header)
          }
        })
      },
      jumpclass_detail(id) {
        this.$store.commit('class_id_edit', id)
        this.$router.push({
          path: '/class_detail'
        })
      },
      close() {
        this.chongzhishow = !this.chongzhishow
        this.mengban_show = false
      },
      chongzhi() {
        this.chongzhishow = !this.chongzhishow
        this.mengban_show = true
      },
      shouzhi_close() {
        this.shouzhimingxi_show = !this.shouzhimingxi_show
        this.mengban_show = false
      },
      xiangqing(id, type) {
        this.shouzhimingxi_show = !this.shouzhimingxi_show
        this.mengban_show = true
        this.shouzhi_detail(id, type)
      },
      shouzhi_detail(id, type) {
        // /front/order/balance/detail?id=1&type=1
        let url = '/front/order/balance/detail?id=' + id
        if (type === '提现') {
          url = url + '&type=WITHDRAW'
        }
        this.axios({
          method: "get",
          url: this.url() + url,
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('收支内容')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.shouzhi_content = res.data
          }
        })
      },
      // 提现按钮点击后其中一个高亮
      pay_typed(e, name) {
        // typedt
        console.log(name)
        console.log(e.currentTarget)
        this.chongzhi_data.channelType = name
        let typed = document.getElementsByClassName('select1')
        for (let i = 0; i < typed.length; i++) {
          typed[i].classList.remove('selected')
        }
        e.currentTarget.classList.add('selected')
        // ===================================================================
        let type = document.getElementsByClassName('typedt')
        for (let i = 0; i < type.length; i++) {
          type[i].classList.remove('typedd')
        }
        e.currentTarget.classList.add('typedd')
        for (let key in this.tixian_del_show) {
          this.tixian_del_show[key] = false
        }
      },
      pay_type(e, index, id) {
        this.tixian_yue.wayId = id
        // typedt
        console.log(e.currentTarget)
        let typed = document.getElementsByClassName('select1')
        for (let i = 0; i < typed.length; i++) {
          typed[i].classList.remove('selected')
        }
        e.currentTarget.classList.add('selected')
        // ===================================================================
        let type = document.getElementsByClassName('typedt')
        for (let i = 0; i < type.length; i++) {
          type[i].classList.remove('typedd')
        }
        e.currentTarget.classList.add('typedd')
        for (let key in this.tixian_del_show) {
          this.tixian_del_show[key] = false
        }
        if (index === 1) {
          this.tixian_del_show.wshow = false
          this.tixian_del_show.zshow = true
          this.tixian_del_show.yshow = true
        } else if (index === 2) {
          this.tixian_del_show.wshow = true
          this.tixian_del_show.zshow = false
          this.tixian_del_show.yshow = true
        } else {
          this.tixian_del_show.wshow = true
          this.tixian_del_show.zshow = true
          this.tixian_del_show.yshow = false
        }
      },
      tixian() {
        this.tixian_show = !this.tixian_show
        this.mengban_show = true
      },
      tixian_close() {
        this.tixian_show = !this.tixian_show
        this.mengban_show = false
      },
      jump() {
        this.$router.push({
          path: '/gerenshezhi'
        })
      },
      money_select(e, name) {
        if (name === 'next') {
          this.url_chuli(name)
          return false
        } else if (name === 'end') {
          this.url_chuli(name)
          return false
        }
        let selects = document.getElementsByClassName('selects')
        for (let i = 0; i < selects.length; i++) {
          selects[i].style.backgroundColor = 'white'
          selects[i].style.color = 'black'
        }
        e.target.style.backgroundColor = '#2EB7C6'
        e.target.style.color = 'white'
        this.url_chuli(name)
      },
      url_chuli(name) {
        console.log('进入url处理')
        let url = ''
        if (name === 'next') {
          // 下一页
          console.log('进入下一页')
          this.shouzhi_page++
          url = '/front/order/balance/list?page=' + this.shouzhi_page + '&size=5'
          if (this.current_select === 'ALL') {

          } else {
            url = url + '&type=' + this.current_select
          }
          this.money_select_post(url)
          return false
        } else if (name === 'end') {
          // 最后一页
          console.log('进入最后一页')
          let page = Math.ceil(this.shouzhi_totalSize / 5)
          url = '/front/order/balance/list?page=' + page + '&size=5'
          if (this.current_select === 'ALL') {

          } else {
            url = url + '&type=' + this.current_select
          }
          this.money_select_post(url)
          return false
        }
        if (name === 'ALL') {
          this.shouzhi_page = 1
          this.current_select = name
          console.log('this.current_select = ' + this.current_select)
          url = '/front/order/balance/list?page=1&size=5'
        } else {
          this.shouzhi_page = 1
          this.current_select = name
          console.log('this.current_select = ' + this.current_select)
          url = '/front/order/balance/list?page=1&size=5' + '&' + 'type=' + name
        }
        this.money_select_post(url)
      },
      money_select_post(url) {
        // http://120.78.191.119:8080/front/order/balance/list?page=1&size=10&type=asasdasd
        console.log('发出请求的url')
        console.log(url)
        this.axios({
          method: "get",
          url: this.url() + url,
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('收支内容')
          console.log(res)
          res = res.data
          this.shouzhi_totalSize = res.totalSize
          if (res.code === 200) {
            this.list = res.data
            console.log(this.list)
          }
        })
      },
      collection_shoucang(e, type) {
        let selectx = document.getElementsByClassName('selectx')
        for (let i = 0; i < selectx.length; i++) {
          selectx[i].style.backgroundColor = 'white'
          selectx[i].style.color = '#C0C0C0'
        }
        e.target.style.backgroundColor = '#2EB7C6'
        e.target.style.color = 'white'
        this.datad = []
        if (type === 1) {
          console.log('进入1')
          this.course_method_get(1)
          console.log(this.datad)
        } else if (type === 2) {
          this.course_method_get()
        } else if (type === 3) {
          this.product_method_get()
        } else if (type === 4) {
          this.activity_method_get()
        } else {
          this.information_method_get()
        }
      },
      course_method_get(ab) {
        this.axios({
          method: "get",
          url: this.url() + "/front/common/collect/list/course?page=1&size=10",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('加载课程正在测试')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.my_collect.class = res.data
            if (ab === 1) {
              console.log('1')
              this.product_method_get(1)
            } else {
              this.datad = this.my_collect.class
              this.shoucang_id = []
              for (let i = 0; i < this.my_collect.class.length; i++) {
                this.shoucang_id.push(1)
              }
            }
          }
        })
      },
      product_method_get(ab) {
        this.axios({
          method: "get",
          url: this.url() + "/front/common/collect/list/product?page=1&size=10",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('加载商品')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.my_collect.product = res.data
            if (ab === 1) {
              console.log('2')
              this.activity_method_get(1)
            } else {
              this.datad = this.my_collect.product
              this.shoucang_id = []
              for (let i = 0; i < this.my_collect.product.length; i++) {
                this.shoucang_id.push(2)
              }
            }
          }
        })
      },
      activity_method_get(ab) {
        this.axios({
          method: "get",
          url: this.url() + "/front/common/collect/list/activity?page=1&size=10",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('加载活动')
          console.log(res)
          res = res.data
          this.acrivity_list = res.data
          if (res.code === 200) {
            this.my_collect.activity = res.data
            if (ab === 1) {
              console.log('3')
              this.information_method_get(1)
            } else {
              this.datad = this.my_collect.activity
              this.shoucang_id = []
              for (let i = 0; i < this.my_collect.activity.length; i++) {
                this.shoucang_id.push(3)
              }
            }
          }
        })
      },
      information_method_get(ab) {
        this.axios({
          method: "get",
          url: this.url() + "/front/common/collect/list/information?page=1&size=10",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('加载课程')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.my_collect.information = res.data
            if (ab === 1) {
              console.log('4')
              for (let i = 0; i < this.my_collect.class.length; i++) {
                this.shoucang_id.push(1)
                this.datad.push(this.my_collect.class[i])
              }
              for (let i = 0; i < this.my_collect.product.length; i++) {
                this.shoucang_id.push(2)
                this.datad.push(this.my_collect.product[i])
              }
              for (let i = 0; i < this.my_collect.activity.length; i++) {
                this.shoucang_id.push(3)
                this.datad.push(this.my_collect.activity[i])
              }
              for (let i = 0; i < this.my_collect.information.length; i++) {
                this.shoucang_id.push(4)
                this.datad.push(this.my_collect.information[i])
              }
            } else {
              this.datad = this.my_collect.information
              this.shoucang_id = []
              for (let i = 0; i < this.my_collect.information.length; i++) {
                this.shoucang_id.push(4)
              }
            }
          }
        })
      },
      all_method_get() {
        console.log('all_method_get')
        this.course_method_get(this.product_method_get(this.activity_method_get(this.information_method_get())))
        this.my_collect.all = this.my_collect.class.concat(this.my_collect.activity, this.my_collect.product, this.my_collect.information)
      },
      select(type) {
        for (let prop in this.select_type) {
          this.select_type[prop] = false
        }
        if (type === 1) {
          this.select_type['a1'] = true
        } else if (type === 2) {
          this.select_type['a2'] = true
        } else if (type === 3) {
          this.select_type['a3'] = true
        } else {
          this.select_type['a4'] = true
        }
      },
      wallet() {
        //
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
      class_list(data) {
        this.class_list_data = data
        console.log(this.class_list_data)
      },
    },
    watch: {
      mengban_show(neww) {
        console.log(neww)
        if (!neww) {
          var mo = function (e) {
            e.preventDefault();
          };
          document.body.style.overflow = '';//出现滚动条
          document.removeEventListener("touchmove", mo, false);
        } else {
          var mo = function (e) {
            e.preventDefault();
          };
          document.body.style.overflow = 'hidden';
          document.addEventListener("touchmove", mo, false);//禁止页面滑动
        }
      }
    },
    created: function () {
      // 在本组件获取vuex的token和phone
      let select = this.$store.state.own_center
      for (let key in this.select_type) {
        this.select_type[key] = false
      }
      if (select === 1) {
        this.select_type.a1 = true
      } else if (select === 2) {
        this.select_type.a2 = true
      } else if (select === 3) {
        this.select_type.a3 = true
      } else {
        this.select_type.a4 = true
      }
      this.axios({
        method: "get",
        url: this.url() + "/front/user/information/pre",
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.own_information = res.data
        }
      })
      this.wallet()
      this.url_chuli('ALL')
      // 获取商品收支明细
      this.money_select_post('/front/order/balance/list?page=1&size=5&type=PRODUCT')
      this.course_method_get(1)
      // 获取收支明细
      this._order_banlance_pre_post()
      // 获取我的课程列表
      console.log('获取我的课程列表')
      // 获取提现方式列表
      this.get_pay_list()
      mwh_post.m_post_get_own_class(this, this.token, this.class_list)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .gerenzhongxin
    width: 1280px
    min-height: 1500px
    margin: 0 auto
    margin-top: 15px
    z-index: -1
    p
      margin: 0
    .mengband
      position: fixed
      width: 100%
      height: 100%
      background-color: #000
      z-index: 2
      top: 0
      left: 0
      opacity: 0.5
    .yuetixian
      width: 480px
      height: 571px
      position: fixed
      top: 50%
      left: 50%
      background-color: white
      margin: -285px 0 0 -240px
      z-index: 3
      .guanbi
        position: absolute
        width: 54px
        height: 54px
        right: 10px
        top: 15px
        text-align: center
        line-height: 54px
        font-size: 26px
      .yuetixian_neibu
        width: 420px
        margin-left: 30px
        margin-top: 30px
        .yuetixian_title
          font-size: 16px
          font-weight: 500
          color: #000000
        .tixianyue
          width: 421px
          margin-top: 40px
          p
            font-size: 14px
            color: rgba(136, 136, 136, 1)
          input
            width: 401px
            height: 54px
            margin-top: 10px
            color: #C0C0C0
            font-size: 16px
            border: none
            border: 1px solid #C0C0C0
            background: rgba(243, 245, 246, 1)
            padding-left: 20px
            border-radius: 12px
        .qianbaoyue
          display: flex
          font-size: 14px
          margin-top: 15px
          .qianbaoyue1
            color: rgba(136, 136, 136, 1)
          .qianbaoyue2
            margin-left: 10px
            color: #2EB7C6
        .fangshi_guanli
          display: flex
          justify-content: space-between
          margin-top: 15px
          .fangshi
            color: #888888
          .guanli
            color: #2EB7C6
        .tixian_container
          width: 421px
          flex-direction: column
          margin-top: 20px
          .tixianfangshi
            &.selected
              background: url("./input.fw.png") no-repeat
              background-size: 100% 100%;
            &.no_selected
              background-color: #F3F5F6
              border: none
        .yue_button
          background-color: #2EB7C6
          text-align: center
          width: 140px
          height: 40px
          margin: 0 auto
          margin-top: 49px
          line-height: 40px
          font-size: 16px
          border-radius: 20px
          color: white
    .yuetixian_add
      width: 480px
      height: 571px
      position: fixed
      top: 50%
      left: 50%
      background-color: white
      margin: -285px 0 0 -240px
      z-index: 3
      .yuetixian_neibu
        width: 420px
        margin-left: 30px
        margin-top: 30px
        .yuetixian_title
          font-size: 16px
          font-weight: 500
          color: #000000
        .tixianyue
          width: 421px
          margin-top: 40px
          p
            font-size: 14px
            color: rgba(136, 136, 136, 1)
          input
            width: 401px
            height: 54px
            margin-top: 10px
            color: #C0C0C0
            font-size: 16px
            border: none
            border: 1px solid #C0C0C0
            background: rgba(243, 245, 246, 1)
            padding-left: 20px
            border-radius: 12px
        .yue_button
          background-color: #2EB7C6
          text-align: center
          width: 140px
          height: 40px
          margin: 0 auto
          margin-top: 49px
          line-height: 40px
          font-size: 16px
          border-radius: 20px
          color: white
    .shouzhimingxi
      width: 480px
      height: 434px
      position: fixed
      top: 50%
      left: 50%
      background-color: white
      margin: -285px 0 0 -240px
      z-index: 3
      .el-icon-close
        position: absolute
        top: 20px
        right: 20px
        font-weight: 500
        color: #C0C0C0
        font-size: 30px
      p
        margin: 0
      .shouzhimingxi_neibu
        width: 480px
        margin-top: 30px
        .shouzhimingxip
          width: 412px
          margin: 0 auto
        .shouzhimingxi_title
          width: 480px
          height: 60px
          margin-top: 42px
          .shouzhimingxi_p
            width: 412px
            margin: 0 auto
        .zhifu
          width: 480px
          margin: 0 auto
          display: flex
          background-color: #F7F7F7
          justify-content: space-between
          .zhifu_con
            width: 412px
            height: 60px
            display: flex
            justify-content: space-between
            line-height: 60px
            margin: 0 auto
        .shouzhimingxi_list
          width: 412px
          margin: 0 auto
          display: flex
          flex-direction: column
          .list_a
            display: flex
            margin-top: 20px
            justify-content: space-between
            .title_content
              color: black
            .title_aa
              color: #888888
            .time
              width: 100px
      .shouzhimingxip
        font-size: 16px
        color: rgba(0, 0, 0, 1)
      .shouzhimingxi_title
        width: 412px
        height: 42px
        font-size: 18px
        font-weight: 500
        color: #000000
    .chongzhia
      width: 480px
      height: 440px
      position: fixed
      top: 50%
      left: 50%
      background-color: white
      margin: -285px 0 0 -240px
      z-index: 3
      border-radius: 12px
      .guanbi
        position: absolute
        width: 54px
        height: 54px
        right: 10px
        top: 15px
        text-align: center
        line-height: 54px
        font-size: 26px
      .chongzhia_con
        width: 421px
        margin: 0 auto
        .chongzhi1
          margin-top: 30px
          width: 421px
        .chongzhi2
          margin-top: 40px
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            padding-left: 10px
            margin-top: 10px
            background-color: #F3F5F6
            border: none
            border: 1px solid #DBDBDB
            color: #C0C0C0
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            color: #888888
            font-size: 14px
            margin: 10px 0 5px 0
        .chongzhi3
          width: 421px
          margin-top: 30px
          p
            color: #888888
            font-size: 14px
            margin: 10px 0 5px 0
          .chongzhitype
            display: flex
            flex-wrap: wrap
            justify-content: space-between
            margin-top: 16px
            p
              margin: 0
            .typedt
              width: 200px
              height: 54px
              margin-top: 20px
              display: flex
              justify-content: center
              align-items: center
              position: relative
              border-radius: 12px
              background-color: #F3F5F7
              &.typedd
                background: url("./click.png") no-repeat
              .imgq
                width: 50px
                height: 50px
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
            .paypal
              display: flex
              justify-content: center
              .ziti
                width: 70px
        .chongzhi4
          width: 140px
          height: 40px
          background-color: #2EB7C6
          font-size: 16px
          text-align: center
          margin: 0 auto
          line-height: 40px
          color: white
          border-radius: 20px
          margin-top: 50px
    .container
      position: relative
      width: 1200px
      margin: 0 auto
      height: 172px
      .img
        z-index: -1
        img
          position: absolute
          top: 0
          bottom: 0
          left: 0
          right: 0
          width: 100%
          margin: auto
    .gerenxinxi
      width: 1200px
      height: 100px
      margin: 0 auto
      display: flex
      justify-content: space-between
      .left
        display: flex
        .touxiang
          width: 120px
          height: 120px
          position: relative
          margin-left: 80px
          top: -29px
          overflow: hidden
          border-radius: 50%
          .img
            width: 112px
            height: 112px
            border: 4px solid #e0e0e0
            overflow: hidden
            border-radius: 50%
            display: flex
            align-items: center
            img
              width: 100%
              height: 100%
        .detail
          /*width: 100px*/
          margin-left: 20px
          .name_local
            width: 280px
            display: flex
            margin-top: 15px
            p
              margin: 0
            .img
              width: 24px
              height: 24px
              border-radius: 50%
              margin-left: 15px
              margin-top: -5px
              background-color: #EA759D
              &.man
                background-color: #00c4ff
              img
                margin-top: 4px
                margin-left: 4px
                width: 16px
                height: 16px
            .local1
              margin-left: 20px
            .local2
              margin-left: 10px
          .money
            width: 120px
            margin-top: 15px
            margin-left: 15px
            display: flex
            align-items: center
            font-size: 16px
            background-color: #F3F3F3
            border-radius: 0px 14px 14px 0px
            p
              margin: 0
              margin-left: 5px
              font-weight: 500
              font-family: Microsoft YaHei
              color: #888888
            .imgg
              width: 30px
              height: 30px
              background-color: white
              border-radius: 50%
              position: relative
              margin-left: -15px
              img
                width: 100%
                height: 100%
      .right
        width: 120px
        height: 34px
        margin-top: 28px
        margin-right: 60px
        background-color: white
        border: 1px solid #888888
        color: #888888
        cursor: pointer
        border-radius: 17px
        display: flex
        align-items: center
        .imggg
          width: 17px
          height: 17px
          margin-left: 18px
          img
            height: 100%
            width: 100%
            margin: auto
        p
          margin: 0
          margin-left: 6px
    .list_container
      width: 1040px
      padding-top: 56px
      display: flex
      margin: 0 auto
      .left
        width: 137px
        .lefta
          width: 137px
          height: 54px
          cursor: pointer
          position: relative
          display: flex
          align-items: center
          border-bottom: 1px dashed #DBDBDB
          .leftb
            width: 137px
            height: 39px
            display: flex
            align-items: center
            position: relative
            &.a1
              background: url("./shoucang.fw.png") no-repeat
              p
                color: white
            &.a2
              background: url("./qizi.fw.png") no-repeat
              p
                color: white
            &.a3
              background: url("./shuben.fw.png") no-repeat
              p
                color: white
            &.a4
              background: url("./huodong.fw.png") no-repeat
              p
                color: white
            p
              margin: 0
              position: absolute
              top: 12px
              left: 48px
              font-size: 14px
            .qianbao
              width: 20px
              height: 20px
            .shoucang
              width: 16px
              height: 22px
            .kecheng
              width: 22px
              height: 18px
            .huodong
              width: 18px
              height: 20px
            .img
              margin-left: 13px
              img
                width: 100%
                height: 100%
      .right
        width: 893px
        display: flex
        margin-left: 31px
        flex-direction: column
        .wodeshoucang
          display: none
          .titlef
            font: 14px
            border-bottom: 2px solid #DBDBDB
          .xuanze
            margin-top: 10px
            display: flex
            .select
              margin-right: 80px
              width: 56px
              height: 28px
              border-radius: 3px
              text-align: center
              line-height: 28px
              &.selectd
                color: white
                background-color: #2EB7C6
              &.selecta
                color: #C0C0C0
                background-color: white
          .containerd
            margin-top: 6px
            display: flex
            flex-direction: column
            :last-child
              border-bottom: 1px solid #E9ECF1
            .detail_waiceng
              width: 893px
              height: 120px
              display: flex
              justify-content: space-between
              border-top: 1px solid #DBDBDB
              &.detail_waiceng_gray
                background-color: #eaeaea1f
              &.detail_waiceng_white
                background-color: white
              .detail_neiceng
                width: 893px
                height: 90px
                display: flex
                .img
                  width: 120px
                  height: 90px
                  border-radius: 12px
                  margin-left: 19px
                  margin-top: 13px
                  background-color: yellowgreen
                p
                  margin: 0
                .xinxi
                  display: flex
                  flex-direction: column
                  margin-top: 23px
                  margin-left: 19px
                  border: none
                  .titled
                    font-size: 18px
                  .teacher
                    margin-top: 15px
                    font-size: 12px
                  .moneyd
                    margin-top: 16px
                    font-size: 14px
                    border: none
              .button
                width: 100px
                height: 34px
                margin-top: 43px
                background-color: white
                border: 1px solid rgba(58, 58, 58, 1)
                border-radius: 17px
                line-height: 34px
                margin-right: 31px
                text-align: center
                color: #2EB7C6
                font-size: 16px
                font-family: PingFangSC-Regular
        .wodeqianbao
          .titleg
            font: 14px
            margin-top: 30px
            border-bottom: 2px solid #DBDBDB
            .wodeqianbaod
              height: 26px
          .table
            width: 893px
            height: 210px
            background: rgba(255, 255, 255, 1)
            border: 1px solid #DBDBDB
            border-radius: 12px
            margin-top: 16px
            .table_container
              width: 893px
              height: 122px
              display: flex
              margin-top: 16px
              .allmoney
                width: 435px
                height: 122px
                border-right: 1px solid #DBDBDB
                margin-top: 35px
                margin-left: 24px
                .titleq
                  margin-top: 30px
                  font-size: 14px
                  color: #888888
                .money
                  font-weight: 600
                  margin-top: 13px
                  font-size: 24px
              .chongzhi_fanxian
                width: 298px
                height: 122px
                border-right: 1px solid #DBDBDB
                margin-top: 35px
                p
                  margin: 0
                .chongzhi
                  width: 268px
                  margin-left: 15px
                  margin-right 15px
                  border-bottom: 1px solid #DBDBDB
                  padding-bottom: 6px
                  .titleq
                    margin-top: 8px
                    font-size: 14px
                  .moneyy
                    color: #3A3A3A
                    margin-top: 12px
                    font-size: 18px
                .fanxian
                  width: 268px
                  margin-left: 15px
                  .titleq
                    margin-top: 8px
                    font-size: 14px
                  .moneyy
                    margin-top: 12px
                    color: #3A3A3A
                    font-size: 18px
              .buttom_two
                width: 157px
                height: 122px
                margin-top: 35px
                margin-left: 19px
                .top_button
                  height: 34px
                  line-height: 34px
                  background-color: #2BC7A4
                  width: 120px
                  color: white
                  cursor: pointer
                  font-size: 16px
                  text-align: center
                  border-radius: 17px
                  margin-top: 18px
                .bottom_button
                  height: 34px
                  line-height: 34px
                  background-color: #FFA035
                  width: 120px
                  color: white
                  cursor: pointer
                  font-size: 16px
                  text-align: center
                  border-radius: 17px
                  margin-top: 11px
          .xuanze
            margin-top: 10px
            display: flex
            justify-content: space-between
            .selects
              width: 56px
              height: 28px
              cursor: pointer
              border-radius: 3px
              text-align: center
              line-height: 28px
              margin: 0 20px 6px 20px
              &.selectd
                color: white
                background-color: #2EB7C6
              &.selecta
                background-color: white
          .shouzhicontainer
            width: 893px
            .list
              height: 50px
              width: 893px
              display: flex
              font-size: 14px
              border-top: 1px solid #DBDBDB
              position: relative
              .timed
                position: absolute
                width: 100px
                height: 13px
                overflow: hidden
                top: 20px
                left: 29px
              .detaild
                position: absolute
                top: 20px
                left: 150px
              .moneyd
                position: absolute
                cursor: pointer
                top: 20px
                left: 680px
              .xiangqing
                position: absolute
                cursor: pointer
                top: 20px
                left: 832px
        .my_collection
          min-height: 800px
          .titleg
            font: 14px
            margin-top: 30px
            border-bottom: 2px solid #DBDBDB
            .my_collectiond
              height: 26px
          .xuanze
            margin-top: 10px
            display: flex
            width: 500px
            justify-content: space-between
            .selectx
              width: 56px
              height: 28px
              cursor: pointer
              border-radius: 3px
              text-align: center
              line-height: 28px
              margin: 0 20px 6px 20px
              &.selectd
                color: white
                background-color: #2EB7C6
              &.selecta
                color: #C0C0C0
                background-color: white
          .list_container
            padding-top: 10px
            display: flex
            flex-direction: column
          .whited
            background-color: white
        .myclass
          min-height: 800px
          .titleg
            font: 14px
            margin-top: 30px
            border-bottom: 2px solid #DBDBDB
            .myclassd
              height: 26px
          .list_container
            padding-top: 10px
            display: flex
            flex-direction: column
          .whited
            background-color: white
        .myactivity
          min-height: 800px
          .titleg
            font: 14px
            margin-top: 30px
            border-bottom: 2px solid #DBDBDB
            .myactivityd
              height: 26px
          .list_container
            padding-top: 10px
    .dianjiliebiao
      width: 893px
      height: 206px
      position: relative
      .liebiao
        position: absolute
        display: flex
        top: 153px
        right: 0
        p
          font-size: 12px
        .green
          color: #2EB7C6
          cursor: pointer
          font-weight: 500
          margin-left: 12px
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
</style>
