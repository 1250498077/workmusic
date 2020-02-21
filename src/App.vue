<template>
  <!--wangjimimasecond-->
  <div id="app">
    <div class="header_waiceng">
      <div class="header">
        <div class="logoo" style="display: flex;align-items: center">
          <img src="./common/img/logo.png" alt="">
        </div>
        <div class="right">
          <div class="nav">
            <div class="nav_a">
              <router-link to='/shouye' class="a">首页</router-link>
            </div>
            <div class="nav_a">
              <router-link to='/kecheng' class="a">课程</router-link>
            </div>
            <div class="nav_a">
              <router-link to='/shangcheng' class="a">商城</router-link>
            </div>
            <div class="nav_a">
              <router-link to='/huodong' class="a">活动</router-link>
            </div>
            <div class="nav_a">
              <router-link to='/zixun' class="a">资讯</router-link>
            </div>
            <div class="nav_a">
              <router-link to='/guanyu' class="a">关于我们</router-link>
            </div>
          </div>
          <div class="xiala xialad">
            <div class="btn">
              <div class="li" v-for="(item, key) in sousuo_list" :key="key" @click="xiala(key)"
                   @mouseenter="xialashow()" @mouseleave="xialashow_d()" :class="{'li1':key===0}">{{item}}
              </div>
            </div>
            <div class="xialaright">
              <input type="text" placeholder="搜索" v-model="keyword" @keyup.enter="sousuo">
            </div>
            <div class="button" @click="sousuo">
              <router-link to='/header_sousuo' class="a">
                <img src="./common/img/yuan.png" alt="">
              </router-link>
            </div>
          </div>
          <div class="end">
            <div class="endright">
              <div class="img">
                <img src="./common/img/kecheng.png">
              </div>
              <p class="wodekecheng" @click="my_class(3)" style="font-size: 18px">我的课程</p>
              <p class="xiazai" style="font-size: 16px">下载APP</p>
            </div>
            <div class="line"></div>
            <!--未登录时显示-->
            <div class="endleft" v-show="!denglushow">
              <p class="denglu" @click="head_denglu()" style="font-size: 18px">登录</p>
              <p>/</p>
              <p class="zhuce" @click="head_zhuce()" style="font-size: 18px">注册</p>
              <div class="img">
                <img src="./common/img/user.png" alt="">
              </div>
            </div>
            <!--登录时显示-->
            <div class="already_login" @mouseenter="enter()" @mouseleave="leaved()" v-show="denglushow">
              <div class="name" style="font-size: 18px">{{data.nickname}}</div>
              <div class="imgz">
                <router-link to='/gerenzhongxin'>
                  <img :src="data.avatar" alt="" @click="my_class(1)">
                </router-link>
              </div>
            </div>
            <div class="geren" v-show="gerenshow||gerenshowd" @mouseenter="enterd()" @mouseleave="leaved()">
              <div class="touxiang" @click="my_class(1)">
                <div class="img">
                  <img :src="data.avatar" alt="">
                </div>
                <div class="gerenxinxi">
                  <div class="name">{{data.nickname}}</div>
                  <div class="dengji">
                    V5
                  </div>
                </div>
              </div>
              <div class="gerendianji">
                <div class="a a1">
                  <div class="imgg">
                    <img src="./common/img/class.png" alt="">
                  </div>
                  <router-link to='/gerenzhongxin' class="ap"><p @click="my_class(3)">我的课程</p></router-link>
                </div>
                <div class="a a2">
                  <div class="imgg">
                    <img src="./common/img/dingdan.png" alt="">
                  </div>
                  <router-link to='/order_center' class="ap"><p>订单中心</p></router-link>
                </div>
                <div class="a">
                  <div class="imgg">
                    <img src="./common/img/money.png" alt="">
                  </div>
                  <router-link to='/gerenzhongxin' class="ap"><p @click="my_class(1)">我的钱包</p></router-link>
                </div>
                <div class="a a4">
                  <div class="imgg">
                    <img src="./common/img/shezhi.png" alt="">
                  </div>
                  <router-link to='/gerenshezhi' class="ap"><p>个人设置</p></router-link>
                </div>
              </div>
              <p class="tuichu" @click="safe_tuichu">安全退出</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="public_number" style="z-index: 1" ref="lachu">
      <div class="tui_img" style="position: absolute;top: 188px;left: -20px;background-color: white;width: 30px;height: 50px;display: flex;align-items: center;border-radius: 5px" @click="lachu_methods">
        <img src="./common/img/dayu.png" alt="" style="width: 30px;" v-show="!lachu_show">
        <img src="./common/img/xiaoyu.png" alt="" style="width: 30px;"  v-show="lachu_show">
      </div>
      <div class="top">
        <div class="download_app">
          <div class="img">
            <img src="./common/img/phone.png">
          </div>
          <div class="text">下载APP</div>
        </div>
        <div class="wechat_public_address" @mouseenter="erweima_methods" @mouseleave="erweima_methods_leave">
          <div class="img">
            <img src="./common/img/wechat.png">
          </div>
          <div class="text">&nbsp;微信</br>公众号</div>
        </div>
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=437081083&site=qq&menu=yes" style="text-decoration:none;color: black">
          <div class="qq_chat" style="display: flex;flex-direction: column;align-items: center;margin-top: 20px">
            <div class="img" style="width: 35px;height: 30px;">
              <img src="./common/img/qq.png" style="width: 100%;">
            </div>
            <div class="text" style="margin-top: 15px;">QQ</div>
          </div>
        </a>
      </div>
      <div class="bottom">
        <div class="back_top" @click="back_top">
          <div class="img">
            <img src="./common/img/rocket.png">
          </div>
          <div class="text">
            返回顶部
          </div>
        </div>
      </div>
      <div class="erweima_img" style="position: absolute" v-show="erweima_show">
        <img src="./common/img/erweima.jpg" alt="">
      </div>
    </div>
    <router-view :key="activeDate" v-on:avatar="avatar_change" :mwhtoken="mwhtoken"></router-view>
    <div class="mengban" v-show="dengluzhuce" @click="mengban_close"></div>
    <div class="denglu_zhuce" v-show="dengluzhuce">
      <div class="denglu_zhuce_header">
        <div class="header_denglu lol  lold" @click="kuai($event, 1)" :class="{'click': kuaishow===false}">登 录</div>
        <div class="header_zhuce lol lolz" @click="kuai($event, 2)" :class="{'click': kuaishow===true}">注 册</div>
      </div>
      <!-- 登录界面 -->
      <div class="denglukuai" v-show="!kuaishow">
        <div class="denglu" v-show="!wangji&&wangjimimad===0">
          <div class="denglu_container">
            <div class="username">
              <p class="usernametitle">账号</p>
              <input type="text" v-model="dengluphone">
            </div>
            <div class="password">
              <p class="passwordtitle">密码</p>
              <input type="password" v-model="denglupassword">
            </div>
            <div class="wangji" @click="wangjimima">
              <p>忘记密码</p>
            </div>
            <div class="button" @click="denglu">
              确认
            </div>
          </div>
        </div>
        <!--getFullYear-->
        <div class="wangji" v-show="wangjimimad>0">
          <div class="wangji_header">
            <p>找回密码</p>
            <div class="imgwaiceng">
              <div class="img" :class="{'now':wangjimimad===1,'nulld':wangjimimad!==1}">验证手机</div>
              <div class="img" :class="{'now':wangjimimad===2,'nulld':wangjimimad!==2}">手机确认</div>
              <div class="img" :class="{'now':wangjimimad===3,'nulld':wangjimimad!==3}">重置密码</div>
            </div>
          </div>
          <!--忘记密码第一步-->
          <div class="wangjimimafirst" v-show="wangjimimad===1">
            <div class="input firstinput">
              <p>仅限注册过喜星音乐账户的手机号</p>
              <input type="text" v-model="zhaohuimimaphone">
            </div>
            <div class="firstinputbutton" @click="wangjimima">下一步</div>
          </div>
          <!--忘记密码第二步-->
          <div class="wangjimimasecond" v-show="wangjimimad===2">
            <p>{{zhaohuimimaphone}}</p>
            <div class="input secondinput">
              <input type="text" v-model="zhaohuicode">
              <!--获取验证码按钮-->
              <div class="get" @click="yanzhengma(3)">{{zhaohuimima_second}}</div>
            </div>
            <div class="secondinputbutton" @click="wangjimima(3)">下一步</div>
          </div>
          <!--忘记密码第三步-->
          <div class="wangjimimathild" v-show="wangjimimad===3">
            <div class="container">
              <div class="ximima">
                <p>输入新密码</p>
                <input type="text" v-model="two_comfirm.password1">
              </div>
              <div class="querenmima">
                <p>再次输入新密码</p>
                <input type="text" v-model="two_comfirm.password2">
              </div>
            </div>
            <div class="secondinputbutton" @click="zhaohuimima">重新登录</div>
          </div>
        </div>
      </div>
      <!--注册界面-->
      <div class="zhucekuai" v-show="kuaishow">
        <!-- 注册界面：昵称，密码，城市  -->
        <div class="zhuce" v-show="zhuce_first">
          <div class="nicheng_input">
            <p>昵称</p>
            <input type="text" v-model='nickName' placeholder="请输入昵称">
          </div>
          <div class="mima_input">
            <p>密码</p>
            <input type="password" v-model="loginPassword" placeholder="请输入6-16位数字或英文字母密码，不含特殊符号">
          </div>
          <div class="suozai">
            <p>所在城市</p>
            <div class="linkage">
              <i class="el-icon-caret-bottom left"></i>
              <i class="el-icon-caret-bottom right"></i>
              <el-select
                v-model="provinceCode"
                @change="choseProvince"
                placeholder="省级地区">
                <el-option
                  v-for="item in newprovince"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select
                v-model="cityCode"
                @change="choseCity"
                placeholder="市级地区">
                <el-option
                  v-for="item in newcity"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="chusheng">
            <p>出生日期</p>
            <div class="block">
              <el-date-picker
                v-model="birthYear"
                type="year"
                placeholder="选择年份">
              </el-date-picker>
            </div>
          </div>
          <div class="xingbie">
            <p>性别：</p>
            <el-radio v-model="sex" label="MALE">男</el-radio>
            <el-radio v-model="sex" label="FEMALE">女</el-radio>
          </div>
          <div class="input_button" @click="zhuce_first_to_second">下一步</div>
        </div>
        <!-- 注册界面：支付密码 -->
        <div class="shurumima" v-show="zhuce_second">
          <div class="zhifumima">
            <p class="one">支付密码</p>
            <input type="password" placeholder="请输6位数字支付密码" v-model="payPassword1">
          </div>
          <div class="querenmima">
            <p class="second">确认密码</p>
            <input type="password" placeholder="请重复输入6位数字支付密码" v-model="payPassword2">
          </div>
          <div class="input_button3" @click="zhuce_second_to_third">下一步</div>
        </div>
        <!-- 注册界面：验证手机号  -->
        <div class="yanzheng" v-show="zhuce_third">
          <div class="phone">
            <p class="phoned">验证手机号</p>
            <input type="text" placeholder="请输有效手机号以作为喜星国际登录账号" v-model="phone">
          </div>
          <div class="yanzhengma">
            <p class="yanzhengmad">验证码</p>
            <div class="phone">
              <input type="text" placeholder="请输入手机验证码" v-model="code">
              <div class="get" @click="yanzhengma(1)">获取验证码</div>
            </div>
            <div class="input_button2" @click="zhuce_thirt">登录此帐号</div>
          </div>
        </div>
      </div>
      <!--  title -->
      <div class="guanbi icon-close" @click="close()"></div>
    </div>
    <div class="gongshang">
      <div class="imgleft" style="display: flex">
        <img src="./common/img/logo.png" alt="" style="height: 70px">
        <img src="./common/img/mingpian.png" alt="" style="height: 70px">
      </div>
      <div class="middle">
        <div class="list">
          <div class="listd">
            <router-link to='/kecheng' class="a" style="color: #8b8b8b;text-decoration:none">课程</router-link>
          </div>
          <div class="listd">
            <router-link to='/shangcheng' class="a" style="color: #8b8b8b;text-decoration:none">商城</router-link>
          </div>
          <div class="listd">
            <router-link to='/huodong' class="a" style="color: #8b8b8b;text-decoration:none">活动</router-link>
          </div>
          <div class="listd">
            <router-link to='/zixun' class="a" style="color: #8b8b8b;text-decoration:none">咨讯</router-link>
          </div>
          <div class="listd">
            <router-link to='/guanyu' class="a" style="color: #8b8b8b;text-decoration:none">关于我们</router-link>
          </div>
        </div>
        <p>广州市大福文化艺术传播有限公司( 粤ICP备18078999 )版权所有</p>
      </div>
      <div class="imgright">
        <img src="./common/img/bottom_right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  // let Base64 = require('js-base64').Base64  this.post
  import md5 from 'js-md5'
  import store from './store/index.js'
  import Vue from 'vue'
  import {savaToLocal, loadFromlLocal} from './common/js/store'
  export default {
    name: 'App',
    store,
    data() {
      return {
        lachu_show: false,
        erweima_show: false,
        activeDate: '',
        keyy: '',
        sousuoo: '',
        keyword: '',
        dengluzhuce: false,
        kuaishow: false,
        zhuce_first: true,
        zhuce_second: false,
        zhuce_third: false,
        wangji: false,
        wangjimimad: 0,
        gerenshow: false,
        gerenshowd: false,
        shifoudenglu: false,
        // ===================城市选择变量开始
        mapJson: '../music/static/json/map.json',
        province: '',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city: '',
        block: '',
        allprocitydata: {},
        // ===================城市选择变量结束
        // ====================注册start
        birthYear: '',
        cityCode: null,
        code: '',
        keyt: '',
        loginPassword: '',
        nickName: '',
        payPassword1: '',
        payPassword2: '',
        phone: '',
        provinceCode: '',
        sex: '',
        container: {},
        time: '',
        // ====================注册start
        // ====================获取验证码start
        yanzhengkeyt: '',
        yanzhengType: 1,
        yanzhengTime: null,
        yanzhengContainer: {},
        // ====================获取验证码end
        // ====================登录start
        dengluphone: '',
        denglupassword: '',
        denglucontainer: '',
        // ====================登录end
        // ======================找回密码start
        zhaohuimimapassword: '',
        two_comfirm: {
          password1: '',
          password2: ''
        },
        zhaohuimimaphone: '',
        zhaohuimimacontainer: {},
        zhaohuicode: '',
        // ======================找回密码end,
        data: {},
        token: loadFromlLocal('token'),
        sousuo_list: ['课程', '商品', '活动', '资讯'],
        sousuo_list_show: false,
        isRouterAlive: true,
        denglushow: false,
        zhaohuimima_second: '获取验证码',
        mwhtoken: '',
        newprovince: [],
        newcity: [],
        newprovinceid: '',
        newcityid: ''
      }
    },
    methods: {
      lachu_methods() {
        this.lachu_show = !this.lachu_show
        let a = this.$refs.lachu
        if (this.lachu_show) {
          a.style.transform = `translate3d(50px, 0, 0)`
        } else {
          a.style.transform = `translate3d(0, 0, 0)`
        }
      },
      mengban_close() {
        console.log(this.birthYear.getFullYear())
        this.dengluzhuce = false
      },
      erweima_methods_leave() {
        this.erweima_show = false
      },
      erweima_methods() {
        this.erweima_show = true
      },
      safe_tuichu() {
        savaToLocal('token', '')
        this.$message({
          message: '退出成功',
          type: 'success'
        });
        this.denglushow = false
      },
      avatar_change(data) {
        this.data.avatar = data.avatar
      },
      back_top() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      my_class(id) {
        console.log(loadFromlLocal('token'))
        if (loadFromlLocal('token') == 'null') {
          this.$message({
            message: '请登录后操作',
            type: 'warning'
          })
        } else {
          this.$store.commit('own_center_edit', id)
          this.$router.push({
            path: '/gerenzhongxin',
          })
        }
      },
      sousuo() {
        console.log('sousuo')
        this.keyy = this.keyword
        this.sousuoo = this.sousuo_list[0]
        console.log(this.keyy)
        this.activeDate = new Date()
        console.log(this.sousuoo)
        this.$store.commit('keyword_edit', this.keyword)
        this.$store.commit('header_sousuo_edit', this.sousuo_list[0])
//      /header_sousuo
        this.$router.push({
          path: '/header_sousuo'
        })
      },
      xialashow() {
        this.$store.commit('daohang_lunbotu_control_edit', true)
        let xiala = document.getElementsByClassName('xiala')
        this.sousuo_list_show = true
        // 不截断
        xiala[0].classList.remove('xialad')
      },
      xialashow_d() {
        this.$store.commit('daohang_lunbotu_control_edit', false)
        let xiala = document.getElementsByClassName('xiala')
        this.sousuo_list_show = false
        // 截断
        xiala[0].classList.add('xialad')
      },
      xiala(key) {
        console.log(key)
        let tmp = this.sousuo_list[0]
        Vue.set(this.sousuo_list, 0, this.sousuo_list[key])
        Vue.set(this.sousuo_list, key, tmp)
        console.log(this.sousuo_list)
        this.sousuo_list_show = false
      },
      zhaohuimima() {
        if (this.two_comfirm.password2 !== this.two_comfirm.password1) {
          console.log('两次密码输入一致')
          this.$message.error('两次密码输入一致')
          return false
        }
        let date = new Date()
        let time = date.getTime()
        let password = this.$options.methods.encodePassword(this.two_comfirm.password2, 'loginPassword')
        var phone = this.zhaohuimimaphone
        console.log('phone')
        console.log(phone)
        let keyt = this.$options.methods.encode('phone=' + phone + ',newPassword=' + password, time.toString())
        this.zhaohuimimacontainer = {
          phone: phone,
          password: password,
          time: time,
          keyt: keyt
        }
        this.zhaohuimimapost()
      },
      zhaohuimimapost() {
        this.axios({
          method: "post",
          url: this.mwhurl() + "/front/user/reset/password/login",
          data: this.zhaohuimimacontainer
        }).then((res) => {
          res = res.data
          console.log(res.data)
          if (res.code === 200) {
            console.log('修改密码成功')
            this.dengluphone = this.zhaohuimimaphone
            this.denglupassword = this.two_comfirm.password1
            this.denglu()
          }
        })
      },
      denglu() {
        let date = new Date()
        let time = date.getTime()
        let phone = this.dengluphone
        let password = this.$options.methods.encodePassword(this.denglupassword, 'loginPassword')
        let keyt = this.$options.methods.encode('phone=' + phone + ',password=' + password, time.toString())
        console.log(this.denglupassword)
        this.denglucontainer = {
          keyt: keyt,
          password: password,
          phone: phone,
          time: time
        }
        console.log('忘记密码后重新登陆')
        console.log(this.denglucontainer)
        this.dengluzhuce = false
        this.denglupost()
      },
      // 登录
      denglupost() {
        this.axios({
          method: "post",
          url: this.mwhurl() + "/front/user/login",
          data: this.denglucontainer
        }).then((res) => {
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.token = res.values.token
            this.mwhtoken = this.token
            this.denglushow = true
            this.$store.commit('player_id_edit', this.token)
            savaToLocal('token', this.token)
            this.getuser_information(this.token)
            this.$router.go(0)
          } else {
            this.$message.error('密码错误,无法登陆')
            this.denglushow = false
          }
        })
      },
      getuser_information(token) {
        this.axios({
          method: "get",
          url: this.mwhurl() + "/front/user/information/pre",
          headers: {
            userToken: token
          }
        }).then((res) => {
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.denglushow = true
            this.data = res.data
            savaToLocal('phone', this.data.phone)
          } else {
            this.denglushow = false
            savaToLocal('token', this.token)
          }
        })
      },
      // 头部个人简约信息的显示隐藏
      enter() {
        this.gerenshow = true
        this.gerenshowd = true
      },
      leave() {
        this.gerenshow = false
      },
      enterd() {
        this.gerenshowd = true
      },
      leaved() {
        this.gerenshow = false
        this.gerenshowd = false
      },
      // 登录和注册页面的预先显示
      head_denglu() {
        console.log(this.dengluzhuce)
        this.dengluzhuce = true
        this.kuaishow = false
      },
      head_zhuce() {
        console.log(this.dengluzhuce)
        this.dengluzhuce = true
        this.kuaishow = true
      },
      // 关闭登录注册界面
      close() {
        this.kuaishow = false
        this.zhuce_first = true
        this.zhuce_second = false
        this.zhuce_third = false
        this.wangji = false
        this.dengluzhuce = false
        this.wangjimimad = 0
        let typed = document.getElementsByClassName('lold')
        let typez = document.getElementsByClassName('lolz')
        typed[0].classList.add('click')
        typez[0].classList.remove('click')
      },
      // 控制显示弹出界面的显示和隐藏
      kuai(e, index) {
        if (index === 1) {
          this.kuaishow = false
        } else {
          this.kuaishow = true
        }
        let typed = document.getElementsByClassName('lol')
        for (let i = 0; i < typed.length; i++) {
          typed[i].classList.remove('click')
        }
        e.target.classList.add('click')
      },
      // 注册一步一步跳转的控制
      zhuce_first_to_second() {
        this.zhuce_first = false
        this.zhuce_second = true
        this.zhuce_third = false
        let birthYear = this.birthYear
      },
      zhuce_second_to_third() {
        if (this.payPassword1 === this.payPassword2) {
          this.zhuce_first = false
          this.zhuce_second = false
          this.zhuce_third = true
        } else {
          this.$message.error('密码不一致')
        }
      },
      // 验证码的请求
      yanzhengma(type) {
        let date = new Date()
        let time = date.getTime()
        let phone = this.phone
        let that = this
        if (type === 3) {
          this.zhaohuimima_second = '60秒后重新获取'
          let timed = 60
          let y = setInterval(function () {
            let b = '秒后重新获取'
            timed = timed - 1
            let timee = timed
            b = new String(timee) + b
            that.zhaohuimima_second = b
            console.log('this.zhaohuimima_second' + this.zhaohuimima_second)
            if (timed <= 0) {
              that.zhaohuimima_second = '获取验证码'
              clearTimeout(y)
            }
          }, 1000)
          phone = this.zhaohuimimaphone
        }
        let keyt = this.$options.methods.encode('type=' + type + ',phone=' + phone, time.toString())
        this.yanzhengContainer = {
          keyt: keyt,
          phone: phone,
          time: time,
          type: type
        }
        this.yanzhengmapost()
      },
      yanzhengyanzhengma(type) {
        let phone = ''
        let code
        let date = new Date()
        let time = date.getTime()
        if (type === 3) {
          phone = this.zhaohuimimaphone
          code = this.zhaohuicode
        }
        let keyt = this.$options.methods.encode("type=" + type + ",code=" + code + ",phone=" + phone, time.toString())
        this.yanzhengContainer = {
          type: type,
          code: code,
          phone: phone,
          time: time,
          keyt: keyt
        }
        console.log(this.yanzhengContainer)
        this.yanzhengyanzhengmapost()
      },
      zhuce_thirt() {
        let date = new Date()
        let time = date.getTime()
        this.loginPassword = this.$options.methods.encodePassword(this.loginPassword, 'loginPassword')
        this.payPassword = this.$options.methods.encodePassword(this.payPassword1, 'payPassword')//
        // 将data和时间戳合并成为一个整
        let data = "nickName=" + this.nickName
          + ",loginPassword=" + this.loginPassword
          + ",payPassword=" + this.payPassword
          + ",provinceCode=" + this.newprovinceid
          + ",cityCode=" + this.newcityid
          + ",birthYear=" + this.birthYear.getFullYear()
          + ",sex=" + this.sex
          + ",phone=" + this.phone
          + ",code=" + this.code
        console.log('=========')
        console.log(data)
        console.log('=========')
        this.keyt = this.$options.methods.encode(data, time.toString())
        this.container = {
          nickName: this.nickName,
          loginPassword: this.loginPassword,
          payPassword: this.payPassword,
          provinceCode: this.provinceCode,
          cityCode: this.cityCode,
          birthYear: this.birthYear.getFullYear(),
          sex: this.sex,
          phone: this.phone,
          code: this.code,
          keyt: this.keyt,
          time: time.toString()
        }
        console.log(this.container)
        // 发出post请求
        this.zhucepost(this.container)
      },
      wangjimima(type) {
        if (this.wangjimimad <= 1) {
          this.wangjimimad = this.wangjimimad + 1
        }

        if (type === 3) {
          this.yanzhengyanzhengma(type)
        }
        console.log(this.wangjimimad)
      },
      encode(data, time) {
        let str = '123456789js';
        let reg1 = new RegExp('[0-4]', "g")
        let reg2 = new RegExp('[5-9]', "g")
        let Base64 = require('js-base64').Base64
        return Base64.encode(time.replace(reg1, '') + "k1#" + md5(data) + '#k2' + time.replace(reg2, ''))
      },
      encodePassword(data, key) {
        let reg1 = new RegExp('[0-4]', "g")
        let reg2 = new RegExp('[5-9]', "g")
        let Base64 = require('js-base64').Base64
        return Base64.encode(key.replace(reg1, '') + "k1#" + md5(data) + '#k2' + key.replace(reg2, ''))
      },
      // =============================城市选择代码开始
      getCityData: function () {
        this.axios({
          method: "get",
          url: this.url() + "/front/common/province?type=1",
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('获取省信息')
          console.log(res)
          this.newprovince = res.data.data
        })
      },
      // 选中省之后出发的方法
      choseProvince: function (e) {
        this.newprovinceid = e
        this.newcityid = ''
        // 选好省就获取对应市的数据的请求
        this.axios({
          method: "get",
          url: this.url() + "/front/common/province?type=2&parentCode=" + e,
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('发出请求市级单位请求')
          console.log(res)
          this.newcity = res.data.data
        })
      },
      choseCity: function (e) {
        this.newcityid = e
      },
      // ==============================城市选择代码结束
      // 发出请求-获取所在地
      dizhixinxihuoqu() {
        var that = this
        this.axios.get(this.mwhurl() + '/front/common/province?type=1', {}).then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
        this.axios.get(this.mwhurl() + '/front/common/province?type=2', {}).then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 注册post
      zhucepost() {
        this.axios({
          method: "post",
          url: this.mwhurl() + "/front/user/register",
          data: this.container
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.dengluphone = this.phone
            this.denglupassword = this.loginPassword
            this.denglu()
          }
        })
      },
      // 获取验证码post
      yanzhengmapost() {
        this.axios({
          method: "post",
          url: this.mwhurl() + "/front/common/sms",
          data: this.yanzhengContainer
        }).then((res) => {
          console.log('请求验证码返回的接口')
          console.log(res.data)
          if (res.code === 200) {

          } else {
            console.log(res.message)
            this.$message(res.data.message)
          }
        })
      },
      // 验证验证码post
      yanzhengyanzhengmapost() {
        this.axios({
          method: "post",
          url: this.mwhurl() + "/front/common/validate/sms/code",
          data: this.yanzhengContainer
        }).then((res) => {
          res = res.data
          if (res.code === 200) {
            this.wangjimimad = this.wangjimimad + 1
            console.log(res.data)
          } else {
            console.log('验证码错误')
          }
        })
      },
    },
    created: function () {
      this.getCityData()
      console.log('createdcreatedcreatedcreated')
      console.log(this.token)
      this.getuser_information(this.token)
      // if (this.token) {
      //   this.denglushow = true
      // }
      // this.denglu()
      this.$store.commit('usertoken', this.token)
      this.getuser_information(this.token)
    },
    watch: {
      $route() {
        this.back_top()
      },
      dengluzhuce(neww) {
        console.log('mwh' + neww)
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
  @import "./common/stylus/mixin.styl"
  .header_waiceng
    border-bottom: 2px solid #2EB7C6
    margin: 0 auto
    width: 1280px
    p
      margin: 0
    .header
      width: 1200px
      height: 72px
      display: flex
      margin: 0 auto
      text-decoration: none
      justify-content: flex-start
      align-items: center
      background-color: white
      text-align: center
      z-index: 20
      .logoo
        width: 140px
        height: 70px
        cursor: pointer
        img
          height: 100%
      .right
        display: flex
        align-items: center
        position: relative
        margin-left: 144px
        .nav
          height: 70px
          width: 335px
          display: flex
          text-decoration: none
          font-size: 18px
          align-items: center
          font-family: PingFangSC-Regular
          justify-content: space-between
          font-weight: 400
          color: black
          margin-top: 13px
          .nav_a
            height: 25px
            .a
              display: block
              height: 25px
              color: black
              text-decoration: none
              &.router-link-active
                border-bottom: 2px solid #2eb7c6
        .xiala
          width: 190px
          left: 358px
          top: 23px
          display: flex
          position: absolute
          &.xialad
            height: 38px
            overflow: hidden
          .btn
            width: 47px
            font-size: 16px
            background-color: white
            color: rgba(136, 136, 136, 1)
            text-align: center
            display: flex
            flex-direction: column
            text-decoration: none
            border: 1px solid rgba(219, 219, 219, 1)
            z-index: 1
            .li
              font-size: 14px
              text-align: center
              line-height: 38px
              width: 47px
              height: 40px
              cursor: pointer
          .xialaright
            width: 130px
            input
              border: none
              border-bottom: 1px solid #DBDBDB
              border-top: 1px solid #DBDBDB
              display: block
              padding-left: 20px
              outline: none
              width: 77px
              height: 34px
              top: 0
              left: -2px
            input:
            :-webkit-input-placeholder
              color: #C0C0C0
            p
              color: rgba(136, 136, 136, 1);
              margin: 10px 0 5px 0
          .button
            width: 58px
            height: 38px
            cursor: pointer
            background: rgba(46, 183, 198, 1)
            img
              margin-top: 8px
              width: 20px
              height: 20px
        .end
          display: flex
          font-size: 14px
          justify-content: flex-start
          font-family: PingFangSC-Regular
          font-weight: 400
          margin-left: 236px
          color: rgba(85, 84, 84, 1)
          align-items: center
          .endright
            display: flex
            font-size: 14px
            align-items: center
            a
              text-decoration: none
            .img
              width: 20px
              height: 16px
              img
                width: 100%
                height: 100%
            p
              text-decoration: none
              color: black
              cursor: pointer
              margin-left: 10px
          .line
            width: 1px
            height: 16px
            margin-left: 20px
            background: rgba(42, 126, 185, 1)
          .endleft
            display: flex
            width: 128px
            justify-content: space-between
            margin-left: 20px
            align-items: center
            a
              text-decoration: none
            .denglu
              cursor: pointer
            .zhuce
              cursor: pointer
          .already_login
            display: flex
            height: 72px
            align-items: center
            width: 128px
            margin-left: 20px
            justify-content: flex-end
            .name
              margin-right: 20px
            .imgz
              width: 24px
              height: 24px
              border-radius: 50%
              overflow: hidden
              img
                width: 100%
                height: 100%
          .geren
            width: 306px
            height: 243px
            display: flex
            background-color: white
            flex-direction: column
            position: absolute
            border-radius: 12px
            top: 80px
            right: -2px
            z-index: 5
            a
              text-decoration: none
              color: rgba(136, 136, 136, 1)
            .touxiang
              width: 255px
              height: 68px
              display: flex
              margin-top: 24px
              margin-left: 30px
              .img
                width: 68px
                height: 68px
                overflow: hidden
                border-radius: 50%
                img
                  width: 100%
                  height: 100%
              .gerenxinxi
                margin-left: 15px
                .name
                  font-size: 16px
                  margin-top: 15px
                  color: rgba(58, 58, 58, 1)
                .dengji
                  width: 34px
                  height: 18px
                  font-size: 14px
                  color: white
                  text-align: center
                  line-height: 18px
                  margin-top: 5px
                  border-radius: 6px
                  background-color: #F06074
            .gerendianji
              width: 245px
              display: flex
              flex-direction: row
              flex-wrap: wrap
              margin-left: 30px
              margin-top: 20px
              color: rgba(136, 136, 136, 1)
              .a
                width: 122px
                height: 36px
                background-color: #F3F5F6
                display: flex
                text-align: center
                font-size: 12px
                .imgg
                  margin-top: 10px
                  margin-left: 16px
                  width: 16px
                  height: 16px
                  img
                    height: 100%
                    width: 100%
                    margin: auto
                a
                  margin-top: 12px
                p
                  margin-left: 9px
              .a1
                border-bottom: 1px solid white
                border-right: 1px solid white
              .a2
                border-bottom: 1px solid white
              .a4
                border-left: 1px solid white
            .tuichu
              margin-top: 20px
              cursor: pointer
              margin-right: 200px
              font-size: 12px

  .public_number
    width: 64px
    height: 400px
    color: black
    right: 0
    font-size: 12px
    top: 50%
    margin-left: -168px
    margin-top: -150px
    position: fixed
    background: white
    .erweima_img
      position absolute
      top: 100px
      left -200px
      width: 200px
      img
        width: 100%
    .top
      height: 305px
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      .download_app
        height: 105px
        width: 42px
        display: flex
        margin-left: 11px
        flex-direction: column
        align-items: center
        border-bottom: 1px solid #DBDBDB
        .img
          width: 22px
          height: 36px
          margin-top: 16px
          img
            height: 100%
        .text
          margin-top: 8px
          line-height: 19px
          width: 24px
      .wechat_public_address
        height: 105px
        display: flex
        flex-direction: column
        align-items: center
        border-bottom: 1px solid rgba(0, 0, 0, 0.1)
        .img
          width: 30px
          height: 25px
          margin-top: 16px
          img
            height: 100%
        .text
          margin-top: 8px
          line-height: 19px
          width: 36px
    .bottom
      height: 210px
      .back_top
        height: 105px
        display: flex
        flex-direction: column
        align-items: center
        .img
          width: 25px
          height: 25px
          margin-top: 16px
          img
            height: 100%
        .text
          margin-top: 8px
          line-height: 19px
          width: 24px

  .yinying
    width: 1280px
    margin: 0 auto
    height: 15px
    opacity: 0.1
    background-color: black
    background: -webkit-linear-gradient(bottom, #000, #fffbfb); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(top, #000, #fffbfb); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(top, #000, #fffbfb); /* Firefox 3.6 - 15 */
    background: linear-gradient(top, #000, #fffbfb);

  /* 标准的语法（必须放在最后） */
  .mengban
    position: fixed
    width: 100%
    height: 100%
    background-color: black
    z-index: 2
    top: 0
    left: 0
    opacity: 0.5

  .denglu_zhuce
    display: flex
    flex-direction: column
    z-index: 3
    width: 480px
    background-color: white
    left: 50%
    top: 50%
    margin-left: -240px
    margin-top: -300px
    position: fixed
    border-radius: 10px
    color: rgba(192, 192, 192, 1)
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
    .denglu_zhuce_header
      display: flex
      width: 420px
      height: 15px
      position: absolute
      top: 30px
      left: 30px
      padding-bottom: 10px
      justify-content: end
      border-bottom: 1px solid #DBDBDB
      color: rgba(136, 136, 136, 1)
      .header_denglu
        color: #888888
        text-align: center
        width: 70px
        height: 25px
        &.click
          color: black
          border-bottom: 2px solid #2EB7C6
      .header_zhuce
        color: #888888
        text-align: center
        width: 70px
        height: 25px
        &.click
          color: black
          border-bottom: 2px solid #2EB7C6
    .denglukuai
      margin-top: 20px
      .denglu
        width: 480px
        .denglu_container
          width: 420px
          .username
            width: 385px
            height: 95px
            margin-top: 30px
            input
              width: 405px
              height: 54px
              font-size: 16px
              border-radius: 12px
              padding-left: 10px
              background-color: #F3F5F6
              border: none
              border: 1px solid #DBDBDB
              margin-top: 10px
            input:
            :-webkit-input-placeholder
              color: #C0C0C0
            p
              color: rgba(136, 136, 136, 1);
              margin: 10px 0 5px 0
          .password
            width: 385px
            height: 95px
            margin-top: 20px
            input
              width: 405px
              height: 54px
              font-size: 16px
              border-radius: 12px
              padding-left: 10px
              background-color: #F3F5F6
              border: none
              border: 1px solid #DBDBDB
              margin-top: 10px
            input:
            :-webkit-input-placeholder
              color: #C0C0C0
            p
              color: rgba(136, 136, 136, 1);
              margin: 10px 0 5px 0
          .wangji
            p
              color: #888888
              margin: 0
              margin-left: 350px
          .button
            width: 140px
            height: 40px
            text-align: center
            line-height: 40px
            border-radius: 20px
            cursor: pointer
            margin: 0 auto
            margin-top: 63px
            background-color: #2EB7C6
            color: white
            font-weight: 600
        .header_denglu
          left: 10px
        .header_zhuce
          left: 10px
          margin-left: 20px
      .wangji
        display: flex
        flex-direction: column
        .wangji_header
          width: 420px
          margin: 0 auto
          display: flex
          flex-direction: column
          margin-top: 30px
          p
            color: #000000
            font-size: 16px
          .imgwaiceng
            display: flex
            justify-content: space-between
            .img
              width: 129px
              height: 33px
              line-height: 33px
              text-align: center
            .now
              color: #2BB7C7
              background: url("./common/img/now.fw.png") no-repeat
            .nulld
              color: #C6C6C6
              background: url("./common/img/old.fw.png") no-repeat
        .wangjimimafirst
          width: 420px
          margin: 0 auto
          margin-top: 30px
          font-size: 14px
          p
            color: #888888
            margin: 0
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            padding-left: 10px
            background-color: #F3F5F6
            margin-top: 10px
            border: none
            border: 1px solid #DBDBDB
            margin-top: 10px
          .firstinputbutton
            width: 140px
            height: 40px
            cursor: pointer
            background-color: #2EB7C6
            line-height: 40px
            text-align: center
            color: white
            margin: 0 auto
            margin-top: 20px
            margin-bottom: 20px
            border-radius: 20px
        .wangjimimasecond
          p
            margin: 0
            margin-left: 30px
            margin-top: 20px
          .secondinput
            width: 420px
            display: flex
            justify-content: space-between
            align-items: center
            margin: 0 auto
            margin-top: 10px
            input
              width: 252px
              height: 54px
              font-size: 16px
              border-radius: 12px
              padding-left: 10px
              background-color: white
              border: none
              border: 1px solid #DBDBDB
            .get
              width: 148px
              height: 54px
              cursor: pointer
              color: #C6C6C6
              border: 1px solid #D7D7D7
              background-color: #F3F3F3
              border-radius: 27px
              text-align: center
              line-height: 54px
              font-weight: 500
              font-size: 16px
          .secondinputbutton
            width: 140px
            height: 40px
            cursor: pointer
            background-color: #2EB7C6
            line-height: 40px
            text-align: center
            color: white
            margin: 0 auto
            margin-top: 20px
            margin-bottom: 20px
            border-radius: 20px
        .wangjimimathild
          .container
            margin-left: 30px
            input
              width: 405px
              height: 54px
              font-size: 16px
              border-radius: 12px
              padding-left: 10px
              background-color: #F3F5F6
              border: none
              border: 1px solid #DBDBDB
              margin-top: 10px
            input:
            :-webkit-input-placeholder
              color: #C0C0C0
            p
              font-size: 14px
              margin: 0
              margin-top: 20px
              color: rgba(136, 136, 136, 1)
          .secondinputbutton
            width: 140px
            height: 40px
            cursor: pointer
            background-color: #2EB7C6
            line-height: 40px
            text-align: center
            color: white
            margin: 0 auto
            margin-top: 20px
            margin-bottom: 20px
            border-radius: 20px
    .zhucekuai
      margin-top: 20px
      .zhuce
        width: 420px
        font-size: 14px
        margin-top: 60px
        margin-left: 30px
        p
          color: #888888
        .nicheng_input
          width: 400px
          height: 95px
          margin-top: 30px
          input
            width: 400px
            height: 54px
            font-size: 16px
            border-radius: 15px
            padding-left: 20px
            background-color: #F3F5F6
            border: none
            border: 1px solid #DBDBDB
            margin-top: 10px
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            margin: 20px 0 5px 0
        .mima_input
          width: 400px
          height: 95px
          margin-top: 20px
          input
            width: 400px
            height: 54px
            font-size: 16px
            border-radius: 12px
            padding-left: 20px
            background-color: #F3F5F6
            border: none
            border: 1px solid #DBDBDB
            margin-top: 10px
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            margin: 10px 0 5px 0
        .suozai
          width: 420px
          height: 95px
          margin-top: 20px
          .linkage
            display: flex
            position: relative
            justify-content: space-between
            .el-icon-caret-bottom
              position: absolute
              z-index: 30
              font-size: 26px
              top: 13px
            .left
              left: 165px
            .right
              right: 10px
            .el-select
              overflow: hidden
              border: 1px solid #DBDBDB
              border-radius: 12px
              .el-input
                border: none
                input
                  border: none
                  width: 200px
                  height: 54px
                  background-color: #F3F5F6
                input:
                :-webkit-input-placeholder
                  color: #C0C0C0
                .el-input__suffix
                  display: none
        .chusheng
          width: 420px
          height: 54px
          margin-top: 20px
          .block
            .el-date-editor
              width: 420px
              height: 54px
              input
                height: 54px
                background-color: #F3F5F6
              input:
              :-webkit-input-placeholder
                color: #C0C0C0
              .el-input__prefix
                display: none
        .xingbie
          width: 420px
          height: 54px
          display: flex
          font-size: 14px
          position: relative
          top: 50px
          input
            margin-left: 20px
            margin-top: 20px
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            margin: 0
        .input_button
          width: 140px
          height: 40px
          cursor: pointer
          background-color: #2EB7C6
          color: white
          font-weight: 600
          text-align: center
          line-height: 40px
          border-radius: 50px
          margin-left: 126px
          margin-top: 50px
      .yanzheng
        margin-top: 80px
        margin-left: 30px
        font-size: 14px
        width: 420px
        .phone
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            padding-left: 10px
            background-color: #F3F5F6
            border: none
            border: 1px solid #DBDBDB
            margin-top: 10px
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            color: rgba(136, 136, 136, 1);
            margin: 10px 0 5px 0
        .yanzhengma
          margin-top: 20px
          .yanzhengmad
            color: #888888 tt
            margin: 10px 0 5px 0
          .phone
            display: flex
            justify-content: space-between
            input
              color: #C0C0C0
              background-color: #F3F5F6
              width: 252px
              padding-left: 10px
              margin-top: 10px
            input:
            :-webkit-input-placeholder
              color: #C0C0C0
            .get
              width: 148px
              height: 54px
              border: 1px solid #DBDBDB
              border-radius: 27px
              text-align: center
              line-height: 54px
              font-weight: 500
              font-size: 16px
              margin-top: 10px
          .input_button2
            width: 140px
            height: 40px
            cursor: pointer
            background-color: #2EB7C6
            color: white
            font-weight: 600
            text-align: center
            line-height: 40px
            border-radius: 50px
            margin-left: 126px
            margin-top: 50px
            margin-bottom: 30px
      .shurumima
        margin-top: 80px
        margin-left: 30px
        font-size: 14px
        width: 420px
        .zhifumima
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            padding-left: 10px
            background-color: #F3F5F6
            border: none
            border: 1px solid #DBDBDB
            color: #C0C0C0
            margin-top: 10px
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            color: rgba(136, 136, 136, 1);
            margin: 10px 0 5px 0
        .querenmima
          margin-top: 20px
          input
            width: 405px
            height: 54px
            font-size: 16px
            border-radius: 12px
            padding-left: 10px
            background-color: #F3F5F6
            border: none
            border: 1px solid #DBDBDB
            margin-top: 10px
          input:
          :-webkit-input-placeholder
            color: #C0C0C0
          p
            color: rgba(136, 136, 136, 1);
            margin: 10px 0 5px 0
        .input_button3
          width: 140px
          height: 40px
          cursor: pointer
          background-color: #2EB7C6
          color: white
          font-weight: 600
          text-align: center
          line-height: 40px
          border-radius: 50px
          margin-left: 126px
          margin-top: 50px
          margin-bottom: 30px
    .denglu
      width: 400px
      height: 400px
      font-size: 14px
      margin-left: 30px
      margin-top: 60px

  .zhaohuimima
    display: flex
    display: none
    flex-direction: column
    z-index: 3
    width: 480px
    background-color: white
    left: 50%
    top: 50%
    margin-left: -240px
    margin-top: -500px
    position: fixed
    border-radius: 10px
    color: rgba(192, 192, 192, 1)
    .guanbi
      position: absolute
      width: 54px
      height: 54px
      right: 10px
      top: 15px
      text-align: center
      line-height: 54px
      font-size: 26px
    .zhaohuiheader
      margin-top: 30px
      margin-left: 30px
      width: 420px
      height: 100px
      p
        margin: 10px 0 5px 0
      .list_img
        width: 420px
        display: flex
        font-size: 14px
        justify-content: space-between
        .img1
          width: 120px
          height: 78px
          line-height: 60px
          padding-left: 30px
          background: url("./common/img/zhaohuimima.png") no-repeat
        .img2
          width: 120px
          height: 78px
          line-height: 53px
          margin-top: 2px
          padding-left: 30px
          background: url("./common/img/zhaohuimima2.png") no-repeat
        .img3
          width: 120px
          height: 78px
          line-height: 53px
          padding-left: 30px
          background: url("./common/img/zhaohuimima2.png") no-repeat
    .zhaohuibody
      width: 420px
      margin-left: 30px
      .phone
        margin-top: 20px
        input
          width: 405px
          height: 54px
          font-size: 16px
          border-radius: 12px
          padding-left: 10px
          background-color: #F3F5F6
          border: none
          border: 1px solid #DBDBDB
          margin-top: 10px
        input:
        :-webkit-input-placeholder
          color: #C0C0C0
        p
          color: rgba(136, 136, 136, 1);
          margin: 10px 0 5px 0
      .zhaohuibutton
        width: 140px
        height: 40px
        background-color: #2EB7C6
        color: white
        font-weight: 600
        text-align: center
        line-height: 40px
        border-radius: 50px
        margin-left: 126px
        margin-top: 50px
        margin-bottom: 30px
  .gongshang
    width: 1280px
    height: 128px
    margin: 0 auto
    display: flex
    align-items: center
    justify-content: space-between
    background-color: #3A3A3A
    .imgleft
      width: 200px
      height: 70px
      position: relative
      margin-left: 60px
    .middle
      width: 460px
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
          border: none
      p
        color: #8B8B8B
    .imgright
      width: 36px
      margin-right: 72px
      position: relative
      img
        position: absolute
        top: 0
        bottom: 0
        width: 100%
        margin: auto
      p
        font-size: 12px
</style>
