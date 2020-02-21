import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/*1.state在vuex中用于存储数据*/
var state={
  token: '',
  phone: '',
  class_id: '',
  product_id: '',
  name: '',
  player_id: '',
  class_wait_pay: '',
  daohang_lunbotu_control: false,
  order_type: 1,
  pinke_id: '',
  // 控制用户购买课程的方式
  danke_pintuan: '',
  // 控制用户查询的类型（商品，课程，活动，资讯）
  header_sousuo: '',
  // 用户输入的查询商品的字段
  keyword: '',
  // 控制商品的规格：（黑色，白色，大，小）
  product_type: '',
  // 控制商品的地址
  addressId: '',
  // 进入订单详情时的id
  dingdan_xiangqing_id: '',
  // 资讯的id
  zixun_id: '',
  // 从何处进入的
  comefrom: '',
  // 商品订单数据
  product_order: {},
  touxiang_data: {},
  // 活动id
  activity_id: '',
  // 活动数据
  activity_data: {},
  // 课程id
  class_ide: '',
  // 课程数据
  class_order: '',
  // 个人中心默认页面
  own_center: ''
}
/*2.mutations里面放的是方法，方法主要用于改变state里面的数据
*/
var mutations={
  keyword_edit: function(state, keyword) {
    state.keyword = keyword
  },
  usertoken: function(state, utoken) {
    state.token = utoken
    console.log('vuexstate.token' + state.token)
  },
  userphone: function(state, uphone) {
    state.phone = uphone
    console.log('vuexstate.phone:'+ state.phone)
  },
  class_id_edit: function(state, class_id) {
    state.class_id = class_id
    console.log('vuexstate.class_id:'+ state.class_id)
  },
  product_id_edit: function(state, product_id) {
    state.product_id = product_id
    console.log('vuexstate.product_id:'+ state.product_id)
  },
  product_id_name: function(state, name) {
    state.name = name
    console.log('vuexstate.name:'+ state.name)
  },
  player_id_edit: function(state, player_id) {
    state.player_id = player_id
    console.log('vuexstate.player_id' + state.player_id)
  },
  class_wait_pay_edit: function(state, class_wait_pay) {
    state.class_wait_pay = class_wait_pay
    console.log('vuexstate.player_id' + state.class_wait_pay)
  },
  daohang_lunbotu_control_edit: function (state, daohang_lunbotu_control) {
    state.daohang_lunbotu_control = daohang_lunbotu_control
  },
  order_type_edit: function (state, order_type) {
    state.order_type = order_type
  },
  pinke_id_edit:  function (state, pinke_id) {
    state.pinke_id = pinke_id
  },
  danke_pintuan_edit: function(state, danke_pintuan) {
    state.danke_pintuan = danke_pintuan
  },
  header_sousuo_edit: function (state, header_sousuo) {
    state.header_sousuo = header_sousuo
  },
  product_type_edit: function (state, product_type) {
    state.product_type = product_type
  },
  addressId_edit: function (state, addressId) {
    state.addressId = addressId
  },
  dingdan_xiangqing_id_edit: function (state, dingdan_xiangqing_id) {
    state.dingdan_xiangqing_id = dingdan_xiangqing_id
  },
  zixun_id_edit: function (state, zixun_id) {
    state.zixun_id = zixun_id
  },
  comefrom_edit: function (state, comefrom) {
    state.comefrom = comefrom
  },
  product_order_edit: function (state, product_order) {
    state.product_order = product_order
  },
  touxiang_data_edit: function (state, touxiang_data) {
    state.touxiang_data = touxiang_data
  },
  activity_id_edit: function (state, activity_id) {
    state.activity_id = activity_id
  },
  activity_data_edit: function (state, activity_data) {
    state.activity_data = activity_data
  },
  class_order_edit: function (state, class_order) {
    state.class_order = class_order
  },
  own_center_edit: function (state, own_center) {
    state.own_center = own_center
  }
}
//vuex  实例化 Vuex.store
const store = new Vuex.Store({
  state,
  mutations
})
export default store

