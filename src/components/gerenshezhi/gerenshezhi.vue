<template>
<div class="geren_container">
  <div class="mengban" v-show="mengban" @click="mengban_show"></div>
  <div class="gerenshizhi">
    <div class="left">
      <input class="inputd" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update" style="background-color: #2bb7c7"/>
      <div class="lefttop">
        <div class="yuan">
          <div class="imgt">
            <img :src="data.avatar" alt="">
          </div>
          <div class="genggaitouxiang">
            更改头像
          </div>
        </div>
        <div class="name">{{data.nickname}}</div>
      </div>
      <div class="leftbottom">
        <div class="a" @click="selectd(1)" :class="{'clickd':gerenshow}">
          <p>个人信息</p>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="a" @click="selectd(2)" :class="{'clickd':shouhuoshow}">
          <p>收货地址</p>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="a" @click="selectd(3)" :class="{'clickd':xiugaishow}">
          <p>修改手机</p>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="a" @click="selectd(4)" :class="{'clickd':saveshow}">
          <p>安全设置</p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="gerenxinxid" v-show="gerenshow">
        <div class="gerenxinxi">
          <div class="bianji" @click="edit_own_information">
            <i class="el-icon-edit"></i>
            <p>编辑</p>
          </div>
          <div class="gerenxinxiziti">
            个人信息
          </div>
        </div>
        <div class="gerenlist">
          <div class="b nickname">
            <div class="c nicheng">昵称</div>
            <div class="content">{{data.realName}}</div>
          </div>
          <div class="b sex">
            <div class="c xingbie">性别</div>
            <div class="content">{{sex}}</div>
          </div>
          <div class="b birthday">
            <div class="d chusheng">
              <div class="div">
                出生年份
              </div>
            </div>
            <div class="content">{{birthyear}}</div>
          </div>
          <div class="b city">
            <div class="d suozai">
              <div class="div">
                所在城市
              </div>
            </div>
            <div class="content">{{data.province}} {{data.city}}</div>
          </div>
        </div>
      </div>
      <div class="shouhuodizhi" v-show="shouhuoshow">
        <div class="shouhuoxinxi">
          <div class="tianjia">
            <i class="el-icon-plus"></i>
            <p @click="tianjia">添加</p>
          </div>
          <div class="shouhuoxinxiziti">
            收货地址
          </div>
        </div>
        <div class="shouhuocontainer">
          <v-shouhuodizhi class="ccc" v-for="(item, key) in address_get" :key="key" :data="item" v-on:deleted="deleted" v-on:bianji="bianji"></v-shouhuodizhi>
        </div>
      </div>
      <div class="xiugaiphone" v-show="xiugaishow">
        <div class="xiugaishouji">
          修改手机号
        </div>
        <div class="container">
          <div class="xiugaiphoned">
            <i class="el-icon-mobile-phone"></i>
          </div>
          <div class="phone_detail">
            <p class="phone">手机: {{phone_a}}</p>
            <p class="phoneshuoming">手机号为喜星国际登陆账号，也可通过手机号找回密码</p>
          </div>
          <div class="genggaibutton" @click="genggai">
            更改
          </div>
        </div>
      </div>
      <div class="save" v-show="saveshow">
        <div class="xiugaishouji">
          安全设置
        </div>
        <div class="container">
          <div class="xiugaiphoned">
            <div class="imggz">
              <img src="./dun.png" alt="">
            </div>
          </div>
          <div class="phone_detail">
            <p class="phone">支付密码</p>
            <p class="phoneshuoming">在账户资金变动，修改账户信息时需要输入的密码</p>
          </div>
          <div class="genggaibutton" @click="pay_mima">
            更改
          </div>
        </div>
      </div>
    </div>
</div>
  <!--收货地址弹出框-->
  <div class="tianjiad" v-show="tianjiashow">
    <i class="el-icon-close" @click="close(3)"></i>
    <div class="tianjia_container">
      <p class="titleg">{{shouhuo_title}}</p>
      <div class="shouhuoren">
        <p>收货人姓名</p>
        <input type="text" v-model="name">
      </div>
      <div class="shouhuophone">
        <p>收货手机号</p>
        <input type="text" v-model="tianjiaphone">
      </div>
      <div class="tianjiasuozai">
        <p>所在城市</p>
        <v-input_xiala_icon class="input_left"></v-input_xiala_icon>
        <v-input_xiala_icon class="input_middle">></v-input_xiala_icon>
        <v-input_xiala_icon class="input_right">></v-input_xiala_icon>
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
        <input type="text" v-model="xiangxidizhi" placeholder="详细地址信息（街道、楼、门牌号等）">
      </div>
      <div class="button" @click="close()">保存</div>
    </div>
  </div>
  <!--修改手机弹出框-->
  <div class="xiugaishoujihao" v-show="bangdingshow">
    <i class="el-icon-close" @click="xiugaiclose"></i>
    <div class="xiugaicontainer">
      <p>绑定新手机号</p>
      <div class="xinshoujihao">
        <p>新手机号</p>
        <input type="text" v-model="xinshoujihao" placeholder="输入新手机号">
      </div>
      <div class="yanzhnegma">
        <p>验证码</p>
        <div class="yanzheng">
          <input type="text"  placeholder="输入验证码">
          <div class="getyanzheng" @click="yanzhengma(4)" v-model="yanzheng_number">{{zhaohuimima_second}}</div>
        </div>
      </div>
      <div class="button" @click="xiugaishouji_save">保存</div>
    </div>
  </div>
  <!--编辑个人信息弹出框-->
  <div class="edit_own_information" v-show="edit_own_information_show">
    <i class="el-icon-close" @click="edit_own_information_close"></i>
    <div class="container">
      <p class="titleg">编辑个人信息</p>
      <div class="nickname">
        <p>昵称</p>
        <input type="text" v-model="edit_own_inform.nickname">
      </div>
      <div class="locate_city">
        <p>所在城市</p>
        <div class="locate_city_a">
          <v-input_xiala_icon class="input_left"></v-input_xiala_icon>
          <v-input_xiala_icon class="input_right">></v-input_xiala_icon>
          <el-select
            v-model="edit_own_inform.provinceCode"
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
            v-model="edit_own_inform.cityCode"
            @change="choseCity"
            placeholder="市级地区">
            <el-option
              v-for="item in newcity"
              :key="item.id"
              :label="item.name"
              :value="item.id">{{item.name}}
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="birthday">
        <p>出生年份</p>
        <div class="block">
          <v-input_xiala_icon class="input_right">></v-input_xiala_icon>
          <el-date-picker
            v-model="mwhyear"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <!--<div class="block">-->
          <!--<span class="demonstration">年</span>-->
          <!--<el-date-picker-->
            <!--v-model="value5"-->
            <!--type="year"-->
            <!--placeholder="选择年">-->
          <!--</el-date-picker>-->
        <!--</div>-->
      </div>
      <div class="sex">
        <p>性别：</p>
        <el-radio v-model="edit_own_inform.sex" label="MALE" name="MALE">男</el-radio>
        <el-radio v-model="edit_own_inform.sex" label="FEMALE" name="FEMALE">女</el-radio>
      </div>
      <div class="button" @click="own_information_save">
        保存
      </div>
    </div>
  </div>
  <!--登录密码-->
  <div class="zhifumima" v-show="denglumima">
    <i class="el-icon-close" @click="denglumimaclose"></i>
    <div class="xiugaicontainer">
      <p class="titlef">修改登录密码</p>
      <div class="xinshoujihao">
        <p>旧密码</p>
        <input type="password" v-model="oldpassword_login" placeholder="输入旧密码">
        <p class="warning" v-show="wanning.a1">*请输入正确密码</p>
      </div>
      <div class="xinshoujihao">
        <p>新密码</p>
        <input type="text" v-model="newpassword_login" placeholder="输入新密码">
      </div>
      <div class="button" @click="denglu_save" >保存修改</div>
    </div>
  </div>
  <!--支付密码-->
  <div class="zhifumima" v-show="zhifumima">
    <i class="el-icon-close" @click="zhifumimaclose"></i>
    <div class="xiugaicontainer">
      <p class="titlef">修改支付密码</p>
      <div class="xinshoujihao">
        <p>旧密码</p>
        <input type="password" v-model="oldpassword" placeholder="输入旧密码">
        <p class="warning" v-show="wanning.a1">*请输入正确密码</p>
      </div>
      <div class="xinshoujihao">
        <p>新密码</p>
        <input type="text" v-model="newpassword" placeholder="输入新密码">
      </div>
      <div class="button" @click="zhifumima_save">保存修改</div>
    </div>
  </div>
</div>
</template>

<script>
  // yujiazai
import {loadFromlLocal} from '../../common/js/store'
import shouhuodizhi from 'components/shouhuodizhi/shouhuodizhi'
import input_xiala_icon from 'components/input_xiala_icon/input_xiala_icon'
import store from '../../store/index.js'
import {mwh_post} from '../../common/js/post.js'
import {reset_password, validate_password, user_login, reset_password_login} from '../../common/model/User_Controller_Impl'
import md5 from 'js-md5'
export default {
  data() {
    return {
      shouhuo_title: '',
      zhaohuimima_second: '获取验证码',
      edit_own_inform: {
        avatarId: '',
        birthday: '',
        cityCode: '',
        nickname: '',
        provinceCode: '',
        sex: ''
      },
      mwhyear: '',
      birthYear: '',
      provinceCode: null,
      cityCode: null,
      edit_own_information_show: false,
      yanzheng_number: {},
      xinshoujihao: '',
      bangdingshow: false,
      bianjishow: false,
      tianjiashow: false,
      gerenshow: true,
      shouhuoshow: false,
      xiugaishow: false,
      saveshow: false,
      token:  loadFromlLocal('token'),
      phone: loadFromlLocal('phone'),
      data: {
        sex: 'MALE',
        birthday: '20156'
      },
      sexd: 'MALE',
      mengban: false,
      // 城市选择组件数据开始
      mapJson:'../../../static/json/map.json',
      province:'',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city:'',
      block:'',
      // 城市选择组件数据结束
      // 添加地址信息开始
      name: '',
      // 添加地址信息结束
      newprovince: [],
      newcity: [],
      tianjiaphone: '',
      xiangxidizhi: '',
      newaddress: {},
      newarea: [],
      newprovinceid: '',
      newcityid: '',
      newareaid: '',
      address_get: [],
      phoned: '',
      // 判断是更新地址还是添加地址
      a: 1,
      dizhi_id: 0,
      zhifumima: false,
      oldpassword: '',
      newpassword: '',
      wanning: {
        a1: false
      },
      denglumima: false,
      oldpassword_login: '',
      newpassword_login: '',
      mwh_data: ''
    }
  },
  store,
  components: {
    'v-shouhuodizhi': shouhuodizhi,
    'v-input_xiala_icon': input_xiala_icon
  },
  methods: {
    mengban_show() {
      this.mengban = false
      this.tianjiashow = false
      this.bangdingshow = false
      this.edit_own_information_show = false
      this.denglumima = false
      this.zhifumima = false
    },
    denglu_save() {
      console.log('修改登录密码')
      if (this.oldpassword_login !== this.newpassword_login) {
        this.$message({
          message: '密码不一致',
          type: 'warning'
        });
        return false
      }
      user_login({
        password: this.oldpassword_login,
        phone: this.phone
      })
        .then((res) => {
          return reset_password_login({
            password: this.newpassword_login,
            phone: this.phone
          })
        }, (res) => {
          console.log(res)
        })
        .then((res) => {
          console.log(res)
        },(res) => {
          console.log(res)
        })
    },
    denglumimaclose() {
      this.denglumima = false
      this.mengban = false
    },
    zhifumima_save() {
      if (this.oldpassword !== this.newpassword) {
        this.$message({
          message: '密码不一致',
          type: 'warning'
        });
        return false
      }
      reset_password({
        password: this.newpassword,
        phone: this.phone
      }).then(() => {
        this.zhifumima = false
        this.mengban = false
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      })
    },
    pay_mima() {
      console.log('asdadasd')
      this.zhifumima = true
      this.mengban = true
    },
    save_zhifubao() {
      this.denglumima = true
      this.mengban = true
    },
    zhifumimaclose() {
      this.zhifumima = false
      this.mengban = false
    },
    class_list(data) {
      this.class_list = data
    },
    bianji: function(id) {
      console.log(this.address_get)
      for (let i = 0; i<this.address_get.length; i++) {
        if (this.address_get[i].id === id) {
          this.name = this.address_get[i].name
          this.tianjiaphone = this.address_get[i].phone
          this.sheng = this.address_get[i].province
          this.qu= this.address_get[i].area
          this.shi = this.address_get[i].city
          this.xiangxidizhi = this.address_get[i].fullAddress
        }
      }
      this.shouhuo_title = '编辑收货地址'
      this.a = 2
      this.dizhi_id = id
      this.mengban = true
      this.tianjiashow = true
    },
    update (e) {   // 上传照片
      // 通过事件获取file
      // 创建formdata对象
      // 将file绑定到formdata的
      console.log('asdasda')
      let file = e.target.files[0]
      /* eslint-disable no-undef */
      let param = new FormData()  // 创建form对象
      param.append('multipartFile', file) // 通过append向form对象添加数据
      // param.append('chunk', '0') // 添加form表单中其他数据
      this.axios({
        method: "POST",
        url: this.url() + '/common/file/upload',
        headers: {
          'Content-Type': 'multipart/form-data',
          'userToken': this.token
        },
        data: param
      }).then((res) => {
        res = res.data
        if (res.code === 200) {
          res = res.data
          this.edit_own_inform.avatarId = res.id
          this.$emit('avatar', {
            avatar: res.id
          })
          this.own_information_save()
        }
      })
    },
    edit: function (edit_object_data) {
      this.axios({
        method:"post",
        url:this.url() + "/front/user/address/update",
        headers: {
          userToken: this.token
        },
        data: edit_object_data
      }).then((res)=>{
        this.getaddress()
      })
    },
    deleted: function (id) {
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
    // 编辑个人信息
    own_information_save() {
      this.own_information_save_post()
    },
    own_information_save_post() {
      let data = {
        avatarId: this.edit_own_inform.avatarId,
        birthday: this.mwhyear.getFullYear() + '-1-1 23:00:00',
        cityCode: this.edit_own_inform.cityCode,
        nickname: this.edit_own_inform.nickname,
        provinceCode: this.edit_own_inform.provinceCode,
        sex: this.edit_own_inform.sex,
      }
      console.log('编辑个人信息的post请求')
      console.log(data)


      this.axios({
        method:"post",
        url:this.url() + "/front/user/edit",
        headers: {
          userToken: this.token
        },
        data: data
      }).then((res)=>{
        console.log('asdadasdasdasd')
        console.log(this.edit_own_inform)  //1979
        console.log(res)
        this.edit_own_information_show = false
        this.mengban = false
        this.yujiazai()
      })
    },
    edit_own_information_close() {
      this.mengban = false
      this.edit_own_information_show = false
    },
    edit_own_information() {
      this.mengban = true
      this.edit_own_information_show = true
    },
    xiugaishouji_save() {
      let date = new Date()
      let time = date.getTime()
      let phone = ''
      phone = this.xinshoujihao
      let keyt = this.$options.methods.encode('phone=' + phone, time.toString())
      this.yanzheng_number = {
        "keyt": keyt,
        "phone": phone,
        "time": time
      }
      this.xiugaishouji_save_post()
    },
    xiugaishouji_save_post() {
      this.axios({
        method:"post",
        url:this.url() + "/front/user/validate/phone",
        data: this.yanzheng_number
      }).then((res)=>{
        res = res.data
        if (res.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.mengban = false
          this.bangdingshow = false
        }
      })
    },
    yanzhengma(type) {
      if (this.zhaohuimima_second !== '获取验证码') {
        return false
      }
      let that = this
      this.zhaohuimima_second = '60秒后重新获取'
      let timed = 60
      let y = setInterval(function() {
        let b = '秒后重新获取'
        timed = timed - 1
        let timee = timed
        b = new String(timee) + b
        that.zhaohuimima_second = b
        if (timed <= 0) {
          that.zhaohuimima_second = '获取验证码'
          clearTimeout(y)
        }
      },1000)
      let date = new Date()
      let time = date.getTime()
      let phone = ''
      phone = this.xinshoujihao
      let keyt = this.$options.methods.encode('type=' + type + ',phone=' + phone, time.toString())

      this.xiugaiphone = {
        keyt: keyt,
        phone: phone,
        time: time,
        type: type
      }
      // 发出请求手机验证码请求
      this.yanzhengmapost()
    },
    yanzhengmapost() {
      this.axios({
        method:"post",
        url:this.url() + "/front/common/sms",
        data: this.xiugaiphone
      }).then((res)=>{
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.$message({
            message: '短信已经发送',
            type: 'success'
          });
        } else {
          this.$message({
            message: '发送短信失败，请检查是否填错手机号',
            type: 'warning'
          });
        }
      })
    },
    encode (data, time) {
      let reg1 = new RegExp( '[0-4]' , "g" )
      let reg2 = new RegExp( '[5-9]' , "g" )
      let Base64 = require('js-base64').Base64
      return Base64.encode(time.replace( reg1, '') + "k1#" + md5(data) + '#k2' + time.replace( reg2, ''))
    },
    encodePassword (data, key) {
      let reg1 = new RegExp( '[0-4]' , "g" )
      let reg2 = new RegExp( '[5-9]' , "g" )
      let Base64 = require('js-base64').Base64
      return Base64.encode(key.replace( reg1, '' ) + "k1#" + md5(data) + '#k2' + key.replace( reg2, '' ))
    },
    xiugaiclose() {
      this.bangdingshow = false
      this.mengban = false
    },
    genggai() {
      this.bangdingshow = true
      this.mengban = true
    },
    // 添加个人信息
    close(num) {
      this.mengban = false
      this.tianjiashow = false
      if (num === 3) {
        return false
      }
      if (this.a === 1) {
        this.newaddress = {
          area: this.newareaid,
          city: this.newcityid,
          fullAddress: this.xiangxidizhi,
          id: 0,
          isDefault: 'NO',
          name: this.name,
          phone: this.tianjiaphone,
          province: this.newprovinceid
        }
        this.closepost()
      } else if (this.a === 2) {
        this.newaddress = {
          area: this.newareaid,
          city: this.newcityid,
          fullAddress: this.xiangxidizhi,
          id: this.dizhi_id,
          isDefault: 'NO',
          name: this.name,
          phone: this.tianjiaphone,
          province: this.newprovinceid
        }
        console.log('编辑提交的数据')
        console.log(this.newaddress)
        mwh_post.m_post_gengxindizhi(this, this.newaddress, this.token, this.getaddress)
      }
    },
    closepost() {
      this.axios({
        method: "post",
        url: this.url() + "/front/user/address/add",
        headers: {
          userToken: this.token
        },
        data: this.newaddress
      }).then((res)=>{
        res = res.data
        this.getaddress()
      })
    },
    tianjia() {
      this.shouhuo_title = '添加收货地址'
      this.a = 1
      this.mengban = true
      this.tianjiashow = true
    },
    selectd(index) {
      if (index === 1) {
        this.gerenshow = true
        this.shouhuoshow = false
        this.xiugaishow = false
        this.saveshow = false
      } else if (index === 2) {
        this.gerenshow = false
        this.shouhuoshow = true
        this.xiugaishow = false
        this.saveshow = false
      } else if (index === 3) {
        this.gerenshow = false
        this.shouhuoshow = false
        this.xiugaishow = true
        this.saveshow = false
      } else {
        this.gerenshow = false
        this.shouhuoshow = false
        this.xiugaishow = false
        this.saveshow = true
      }
    },
    // 获取省方法，此方法在一开始就加载
    getCityData:function(){
      this.axios({
        method:"get",
        url:this.url() + "/front/common/province?type=1",
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        console.log('获取省信息')
        console.log(res)
        this.newprovince = res.data.data
      })
    },
    // 选省
    choseProvince:function(e) {
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
        console.log('发出请求市级单位请求')
        console.log(res)
        this.newcity = res.data.data
        this.shi = this.newcity[0].name
        this.newcityid = this.newcity[0].id
        this.choseCity(this.newcity[0].id)
      })
    },
    // 选市
    choseCity:function(e) {
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
        console.log(res)
        this.newarea = res.data.data
        this.qu = this.newarea[0].name
        this.newareaid = this.newarea[0].id
      })
    },
    // 选区
    choseBlock:function(e) {
      this.newareaid=e
    },
    // 城市选择结束
    getaddress() {
      // 获取用户之前设置的地址信息
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
        }
      })
    },
    yujiazai() {
      this.axios({
        method:"get",
        url:this.url() + "/front/user/information/pre",
        headers: {
          userToken: this.token
        }
      }).then((res)=>{
        console.log('获取个人信息')
        console.log(res)
        res = res.data
        if (res.code === 200) {
          this.mwh_data = res.data
          this.edit_own_inform.nickname = res.data.realName
          this.edit_own_inform.provinceCode = res.data.provinceCode
          this.edit_own_inform.birthday = res.data.birthday.substring(0, 4)
          this.edit_own_inform.cityCode = res.data.cityCode
          console.log(this.edit_own_inform)
          this.data = res.data
          this.sexd = this.data.sex
          this.phoned = res.data.phone
          console.log(this.phone)
          this.choseProvince(this.edit_own_inform.provinceCode)
          this.edit_own_inform.sex = this.data.sex
          this.$emit('avatar', {
            avatar: this.data.avatar
          })
        }
      })
    }
  },
  computed: {
    sex() {
      if (this.sexd === 'MALE') {
        return '男'
      } else {
        return '女'
      }
    },
    birthyear() {
      return this.data.birthday.slice(0, 4)
    },
    phone_a() {
      let phoned = this.phoned
      let p = phoned.substring(3,7)
      let pp = phoned.replace(p, '****')
      return pp
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
  },
  created: function () {
    // this.getCityData()
    this.getCityData()
    // 修改手机号
    // let phoned = this.$store.state.phone
    // phoned = phoned.substring(3,7)
    // this.phoned = this.$store.state.phone.replace(phoned, '****')
    // 获取用户基本信息
    this.yujiazai()
    this.getaddress()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.geren_container
  width: 1280px
  margin: 0 auto
  p
    margin: 0
  .gerenshizhi
    width: 1200px
    height: 952px
    margin: 0 auto
    margin-top: 25px
    display: flex
    justify-content: space-between
    .left
      width: 240px
      height: 625px
      background-color: #F7F7F7
      display: flex
      position: relative
      flex-direction: column
      .inputd
        position: absolute
        width: 70px
        top: 110px
        left: 84px
        z-index: 100
        opacity: 0
      .lefttop
        width: 120px
        margin-top: 24px
        margin-left: 60px
        overflow: hidden
        .yuan
          width: 112px
          height: 112px
          background-color: white
          border: 4px solid #e0e0e0
          overflow: hidden
          position: relative
          display: flex
          align-items: center
          border-radius: 50%
          .imgt
            width: 112px
            height: 112px
            img
              height: 100%
              width: 100%
          .genggaitouxiang
            position: absolute
            color: white
            width: 112px
            height: 36px
            line-height: 36px
            text-align: center
            top: 76px
            font-size: 14px
            background: rgba(0, 0, 0, 0.5)
        .name
          text-align: center
          margin-top: 20px
      .leftbottom
        width: 239px
        display: flex
        margin-top: 31px
        cursor: pointer
        flex-direction: column
        overflow: hidden
        .a
          display: flex
          width: 200px
          height: 50px
          justify-content: space-between
          padding-left: 22px
          padding-right: 22px
          &.clickd
            background-color: #2BB7C7
            color: white
          p
            margin-top: 20px
          i
            margin-top: 20px
    .right
      width: 940px
      display: flex
      position: relative
      flex-direction: column
      .gerenxinxid
        position: relative
        .gerenxinxi
          width: 930px
          height: 28px
          border-bottom: 2px solid #DBDBDB
          .bianji
            position: absolute
            display: flex
            width: 50px
            cursor: pointer
            height: 25px
            top: 20px
            right: 10px
            font-size: 14px
            color: #2EB7C6
            justify-content: space-between
          .gerenxinxiziti
            margin-top: 20px
        .gerenlist
          display: flex
          flex-direction: column
          .b
            width: 930px
            height: 88px
            display: flex
            justify-content: space-between
            margin-top: 10px
            .c
              width: 88px
              height: 88px
              line-height: 88px
              text-align: center
              background-color: #F7F7F7
            .d
              width: 88px
              height: 88px
              background-color: #F7F7F7
              .div
                width: 32px
                height: 32px
                margin-top: 26px
                margin-left: 28px
                line-height:19px
            .content
              height: 88px
              width: 842px
              margin-left: 10px
              padding-left: 30px
              line-height: 88px
              border-bottom: 1px solid #DBDBDB
      .shouhuodizhi
        position: relative
        .shouhuoxinxi
          width: 940px
          height: 28px
          border-bottom: 2px solid #DBDBDB
          .tianjia
            position: absolute
            display: flex
            width: 50px
            height: 25px
            top: 20px
            right: 10px
            font-size: 14px
            color: #2EB7C6
            justify-content: space-between
          .shouhuoxinxiziti
            margin-top: 20px
        .shouhuocontainer
          .ccc
            margin-top: 20px
      .xiugaiphone
        width: 960px
        display: flex
        flex-direction: column
        .xiugaishouji
          width: 930px
          height: 28px
          margin-top: 20px
          border-bottom: 2px solid #DBDBDB
        .container
          display: flex
          width: 930px
          height: 88px
          position: relative
          align-items: center
          border-bottom: 1px solid #DBDBDB
          .titleg
            font-weight:400
            color: #000000
          .xiugaiphoned
            width: 88px
            height: 88px
            display: flex
            line-height: 88px
            text-align: center
            &.clickd
              background-color: #2BB7C7
            .el-icon-mobile-phone
              margin-left: 32px
              margin-top: 32px
              font-size: 20px
          .phone_detail
            display: flex
            flex-direction: column
            &.clickd
              background-color: #2BB7C7
            .phoneshuoming
              margin-top: 15px
          .genggaibutton
            position: absolute
            width: 50px
            height: 25px
            cursor: pointer
            top: 30px
            right: 50px
            text-align: center
            line-height: 25px
            border: 1px solid #8c939d
            font-size: 14px
            border-radius: 30px
      .save
        width: 960px
        display: flex
        flex-direction: column
        .xiugaishouji
          width: 930px
          margin-top: 20px
          height: 28px
          border-bottom: 2px solid #DBDBDB
        .container
          display: flex
          width: 930px
          height: 88px
          position: relative
          align-items: center
          border-bottom: 1px solid #DBDBDB
          .titleg
            font-weight:400
            color: #000000
          .xiugaiphoned
            width: 88px
            height: 88px
            display: flex
            line-height: 88px
            justify-content: center
            align-items: center
            text-align: center
            .imggz
              width: 30px
              height: 30px
              line-height: 0
              img
                width: 100%
            &.clickd
              background-color: #2BB7C7
            .el-icon-mobile-phone
              margin-left: 32px
              margin-top: 32px
              font-size: 20px
          .phone_detail
            display: flex
            flex-direction: column
            .phone
              font-weight: 500
              font-size: 18px
            &.clickd
              background-color: #2BB7C7
            .phoneshuoming
              color: #888
              margin-top: 15px
          .genggaibutton
            position: absolute
            width: 50px
            height: 25px
            cursor: pointer
            top: 30px
            right: 50px
            text-align: center
            line-height: 25px
            border: 1px solid #8c939d
            font-size: 14px
            border-radius: 30px
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
    p
      font-size: 14px
      color: #888888
    .el-icon-close
      position: absolute
      top: 20px
      right: 20px
      font-size: 24px
    .tianjia_container
      width: 421px
      margin-left: 30px
      margin-top: 30px
      .titleg
        font-weight: 400
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
          margin-top: 10px
          border: none
          border: 1px solid #DBDBDB
          color: #C0C0C0
        input::-webkit-input-placeholder
                color: #C0C0C0
        p
          color:rgba(136,136,136,1)
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
          margin-top: 10px
        input::-webkit-input-placeholder
                color: #C0C0C0
        p
          color:rgba(136,136,136,1)
      .tianjiasuozai
        margin-top: 30px
        position: relative
        .input_left
          top: 35px
          left: 90px
        .input_right
          top: 35px
          left: 235px
        .input_middle
          top: 35px
          left: 382px
        .linkage
          display: flex
          margin-top: 10px
          justify-content: space-between
          .el-select
            width: 127px
            .el-input
              width: 127px
              height: 54px
              input
                width: 127px
                height: 54px
                background-color: #F3F5F6
              input::-webkit-input-placeholder
                      color: #C0C0C0
              span
                display: none
        p
          color:rgba(136,136,136,1)
      .tianjiaxiangxi
        margin-top: 30px
        p
          color:rgba(136,136,136,1)
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
        cursor: pointer
        margin-top: 46px
        margin-left: 140px
        margin-bottom: 54px
  .xiugaishoujihao
    width: 480px
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
      width: 416px
      margin-left: 30px
      margin-top: 30px
      .titlef
        width: 200px
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
          color: #C0C0C0
        input::-webkit-input-placeholder
                color: #C0C0C0
        p
          font-weight:400
          font-size: 14px
          color: rgba(136,136,136,1)
      .yanzhnegma
        margin-top: 30px
        .yanzheng
          display: flex
          align-items: center
          margin-top: 10px
          justify-content: space-between
          .getyanzheng
            width: 148px
            height: 54px
            color: black
            border: 1px solid #DBDBDB
            border-radius: 27px
            text-align: center
            line-height: 54px
          input
            width: 235px
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
          font-weight: 400
          font-size: 14px
          color:rgba(136,136,136,1)
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
  .zhifumima
    width: 480px
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
    p
      color: black
      font-size: 16px
      font-weight: 400
    .el-icon-close
      position: absolute
      top: 20px
      right: 20px
      font-size: 24px
      z-index: 9999
    .xiugaicontainer
      width: 437px
      position: relative
      margin-left: 30px
      margin-top: 30px
      .titlef
        width: 200px
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
        input::-webkit-input-placeholder
          color: #C0C0C0
        p
          font-weight:400
          font-size: 14px
          color: rgba(136,136,136,1)
        .warning
          position: absolute
          margin-top: 5px
          color: #ff7800
      .yanzhnegma
        margin-top: 30px
        .yanzheng
          display: flex
          align-items: center
          margin-top: 10px
          justify-content: space-between
          .getyanzheng
            width: 148px
            height: 54px
            color: black
            border: 1px solid #DBDBDB
            border-radius: 27px
            text-align: center
            line-height: 54px
          input
            width: 235px
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
          font-weight: 400
          font-size: 14px
          color:rgba(136,136,136,1)
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
  .edit_own_information
    width: 480px
    height: 568px
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
    p
      color:rgba(136,136,136,1)
    .container
      width: 421px
      margin-left: 30px
      margin-top: 30px
      .titleg
        color: black
        font-weight: 400
      .nickname
        margin-top: 40px
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
          color: #C0C0C0
        input::-webkit-input-placeholder
                color: #C0C0C0
        p
          font-size: 14px
          color:rgba(136,136,136,1)
      .locate_city
        margin-top: 30px
        p
          font-size: 14px
        .locate_city_a
          display: flex
          margin-top: 10px
          position: relative
          justify-content: space-between
          .input_left
            top: 10px
            left: 158px
          .input_right
            top: 10px
            left: 377px
          .el-select
            width: 200px
            .el-input
              input
                height: 54px
                border-radius:12px
                background-color: #F3F5F6
              span
                display: none
              .el-input__suffix
                top: -5px
      .birthday
        margin-top: 30px
        p
          font-size: 14px
        .block
          width: 421px
          height: 54px
          position: relative
          margin-top: 10px
          .input_right
            top: 10px
            right: 16px
          .el-date-editor
            width: 421px
            input
              width: 421px
              height: 54px
              border-radius:12px
              background-color: #F3F5F6
            span
              display: none
            .el-input__prefix
              top: 8px
      .sex
        margin-top: 30px
        display: flex
        justify-content: start
        p
          margin: 0
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
