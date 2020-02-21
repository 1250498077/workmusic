// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import md5 from 'js-md5'
import vuex from 'vuex'
// import VueResource from 'vue-resource'

import guanyu from 'components/guanyu/guanyu'
import shouye from 'components/shouye/shouye'
import kecheng from 'components/kecheng/kecheng'
import huodong from 'components/huodong/huodong'
import zixun from 'components/zixun/zixun'
import shangcheng from 'components/shangcheng/shangcheng'
import gerenshezhi from 'components/gerenshezhi/gerenshezhi'
import gerenzhongxin from 'components/gerenzhongxin/gerenzhongxin'
import class_detail from 'components/class_detail/class_detail'
import commodity_detail from 'components/commodity_detail/commodity_detail'
import class_order from 'components/class_order/class_order'
import class_order_pay from 'components/class_order_pay/class_order_pay'
import player from 'components/player/player'
import order_center from 'components/order_center/order_center'
import wait_pay from 'components/wait_pay/wait_pay'
import product_order from 'components/product_order/product_order'
import pinke_zhong from 'components/pinke_zhong/pinke_zhong'
import header_sousuo from 'components/header_sousuo/header_sousuo'
import class_pay_success from 'components/class_pay_success/class_pay_success'
import zixun_detail from 'components/zixun_detail/zixun_detail'
import product_pay_wait from 'components/product_pay_wait/product_pay_wait'
import huodong_detail from 'components/huodong_detail/huodong_detail'
import huodong_order from 'components/huodong_order/huodong_order'
import class_pay_wait from 'components/class_pay_wait/class_pay_wait'
import product_pay_success from 'components/product_pay_success/product_pay_success'
import activity_pay_success from 'components/activity_pay_success/activity_pay_success'
import activity_pay_wait from 'components/activity_pay_wait/activity_pay_wait'
import base from './base'

Vue.use(base)

import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './common/stylus/index.styl'

require('js-base64').Base64

import {HappyScroll} from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
import VideoPlayer from 'vue-video-player'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(vuex)
Vue.prototype.$md5 = md5

const routes = [
  {
    path: '/guanyu',
    component: guanyu,
    meta: {
      keepAlive: true
    }
  },
  {path: '/zixun', component: zixun},
  {path: '/huodong', component: huodong},
  {path: '/shangcheng', component: shangcheng},
  {
    path: '/shouye',
    component: shouye,
    meta: {
      keepAlive: true
    }
  },
  {path: '/kecheng', component: kecheng},
  {path: '/gerenzhongxin', component: gerenzhongxin},
  {path: '/gerenshezhi', component: gerenshezhi},
  {path: '/class_detail', component: class_detail},
  {path: '/commodity_detail', component: commodity_detail},
  {path: '/class_order', component: class_order},
  {path: '/class_order_pay', component: class_order_pay},
  {path: '/player', component: player},
  {path: '/order_center', component: order_center},
  {path: '/wait_pay', component: wait_pay},
  {path: '/product_order', component: product_order},
  {path: '/pinke_zhong', component: pinke_zhong},
  {path: '/header_sousuo', component: header_sousuo},
  {path: '/class_pay_success', component: class_pay_success},
  {path: '/zixun_detail', component: zixun_detail},
  {path: '/product_pay_wait', component: product_pay_wait},
  {path: '/huodong_detail', component: huodong_detail},
  {path: '/huodong_order', component: huodong_order},
  {path: '/class_pay_wait', component: class_pay_wait},
  {path: '/product_pay_success', component: product_pay_success},
  {path: '/activity_pay_success', component: activity_pay_success},
  {path: '/activity_pay_wait', component: activity_pay_wait},
  {
    path: '*', redirect: '/shouye', meta: {
    keepAlive: true
  }
  }
]

var store = new vuex.Store({
  state: {
    show: false
  }
})

const router = new VueRouter({
  mode: 'history',
  base: '/music/',
  routes
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
