import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   }
  // ]
  routes : [
    { path: '/guanyu', component: guanyu },
    { path: '/kecheng', component: kecheng },
    { path: '/zixun', component: zixun },
    { path: '/huodong', component: huodong },
    { path: '/shangcheng', component: shangcheng },
    { path: '/shouye', component: shouye },
    { path: '/zhuce', component: zhuce },
    { path: '/denglu', component: denglu },
    { path: '/gerenzhongxin', component: gerenzhongxin },
    {path: '*', redirect: '/shouye'}
  ]
})
