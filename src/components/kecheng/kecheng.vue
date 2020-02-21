<template>
  <div class="shangcheng_container">
    <div class="shangcheng">
      <div class="shangchengheader">
        <div class="imgq">
          <img src="./title.png" alt="">
        </div>
        <p>课程</p>
      </div>
      <div class="shangchengbody">
        <div class="bodyheader">
          <div class="select type">
            <div class="t typed alltype">类型 :</div>
            <div class="a quanbulx" @click="quanbu($event,1)" ref="typed">全部</div>
            <div class="a" v-for="(item, key) in zidian.courseList" :key="key" @click="selecttype($event, item.id)" ref="type">{{item.content}}</div>
          </div>
          <div class="select teacher">
            <div class="t typed alltype">老师 :</div>
            <div class="a quanbulls" @click="quanbu($event, 2)" ref="teacherd">全部</div>
            <div class="a" v-for="(item, key) in zidian.teacherList" :key="key" @click="selectteacher($event, item.id)" ref="teacher">{{item.teacher}}</div>
          </div>
          <div class="select diffcult">
            <div class="t typed alltype">难度 :</div>
            <div class="a quanbund" @click="quanbu($event, 3)" ref="diffcultd">全部</div>
            <div class="a" v-for="(item, key) in zidian.difficultList" :key="key" @click="selectdiffcult($event, item.id)" ref="diffcult">{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="none" v-show="none">没有搜索结果</div>
      <div class="cotainer" v-show="!none">
        <!--<div class="page">-->
          <!--<el-pagination-->
            <!--background-->
            <!--layout="prev, pager, next"-->
            <!--:page-count="page_count"-->
            <!--:current-page="current_page"-->
            <!--v-on:current-change="current_change"-->
            <!--v-on:prev-click="prev_click"-->
            <!--v-on:next-click="next_click">-->
          <!--</el-pagination>-->
        <!--</div>-->
        <div class="gray_background">
          <div class="kecheng">
            <v-kecheng_detail v-for="(item, key) in data" :key="key" class="list" :data="item" style="margin: 44px 42px 0px 42px"></v-kecheng_detail>
          </div>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="page_count"
            :current-page="current_page"
            v-on:current-change="current_change"
            v-on:prev-click="prev_click"
            v-on:next-click="next_click">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kechengdetaild from 'components/kecheng_detail/kecheng_detail'
import {course_list_pre, front_course_list, front_course_listd} from '../../common/model/Course_Controller_Impl'
import store from '../../store/index.js'
export default {
  components: {
    'v-kecheng_detail': kechengdetaild
  },
  store,
  data () {
    return {
      goods: [1, 2, 3, 4, 5,6,7,8],
      page_count: 0,
      data: {},
      totalSize: 0,
      zidian: {},
      type: '-1',
      teacher: '-1',
      diff: '-1',
      keyword: '-1',
      none: false,
      current_page: 1
    }
  },
  computed: {
  },
  // 8
  methods: {
    jump: function(id) {
      this.$store.commit('class_id_edit', id)
      this.$router.push({
        path: '/class_detail',
        query: {
          id: id
        }
      })
    },
    quanbu(e, index) {
      if (index === 1) {
        this.type = '-1'
        let list = this.$refs.type
        for (let i = 0; i < list.length; i++) {
          list[i].style.backgroundColor = 'white'
          list[i].style.color = '#3A3A3A'
        }
        e.target.style.color = '#2EB7C6'
        e.target.style.backgroundColor = '#d0f6fa'
      } else if (index === 2) {
        this.teacher = '-1'
        let list = this.$refs.teacher
        for (let i = 0; i < list.length; i++) {
          list[i].style.backgroundColor = 'white'
          list[i].style.color = '#3A3A3A'
        }
        e.target.style.color = '#2EB7C6'
        e.target.style.backgroundColor = '#d0f6fa'
      } else {
        let list = this.$refs.diffcult
        for (let i = 0; i < list.length; i++) {
          list[i].style.backgroundColor = 'white'
          list[i].style.color = '#3A3A3A'
        }
        e.target.style.color = '#2EB7C6'
        e.target.style.backgroundColor = '#d0f6fa'
        this.diff = '-1'
      }
      this.urlchuli()
    },
    urlchuli() {
      console.log('urlchuli')
      let urlheader = this.mwhurl()+'/front/course/list?page=1&size=8'
      if (this.type !== '-1') {
        urlheader = urlheader + '&style=' + this.type
      }
      if (this.teacher !== '-1') {
        urlheader = urlheader + '&teacher=' + this.teacher
      }
      if (this.diff !== '-1') {
        urlheader = urlheader + '&difficulty=' + this.diff
      }
      if (this.keyword !== '-1') {
        urlheader = urlheader + '&keyword=' + this.keyword
      }
      this.url = urlheader
      // http:/   /120.  78.19   1.119  :8080   /fron   t/cou  rse/l   ist?p   age=1   &size    =8
      urlheader = this.mwhurl()+'/front/course/list?page=1&size=8'
      this.urlchulipost()
    },
    urlchulipost() {

      front_course_listd(this.url).then((res) => {
        res = res.data
        // this.data = res.data.data
        if (res.code === 200) {
          console.log('200')
          this.data = res.data
          this.page_count = Math.ceil(res.totalSize/8)
          console.log(this.data)
          console.log(this.data.length)
          if (this.data.length === 0) {
            this.none = true
          } else {
            this.none = false
          }
        }
      })
    },
    selectdiffcult(e, id) {
      let list = this.$refs.diffcult
      this.$refs.diffcultd.style.backgroundColor = 'white'
      this.$refs.diffcultd.style.color = '#3A3A3A'
      for (let i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = 'white'
        list[i].style.color = '#3A3A3A'
      }
      e.target.style.backgroundColor = '#d0f6fa'
      e.target.style.color = '#2EB7C6'
      this.diff = id
      this.urlchuli()
    },
    selectteacher(e, id) {
      let list = this.$refs.teacher
      this.$refs.teacherd.style.backgroundColor = 'white'
      this.$refs.teacherd.style.color = '#3A3A3A'
      for (let i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = 'white'
        list[i].style.color = '#3A3A3A'
      }
      e.target.style.backgroundColor = '#d0f6fa'
      e.target.style.color = '#2EB7C6'
      this.teacher = id
      this.urlchuli()
    },
    selecttype(e, id) {
      let list = this.$refs.type
      this.$refs.typed.style.backgroundColor = 'white'
      this.$refs.typed.style.color = '#3A3A3A'
      for (let i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = 'white'
        list[i].style.color = '#3A3A3A'
      }
      e.target.style.backgroundColor = '#d0f6fa'
      e.target.style.color = '#2EB7C6'
      this.type = id
      this.urlchuli()
    },
    chaifenurl(url, page) {
      if (page === undefined) {
        page = 1
      }
      let arr1 = url.split('?')
      let index = arr1[1].indexOf('&')
      let replacestr = arr1[1].substring(0,index)
      let arr = arr1[1].replace(replacestr, 'page='+ page)
      this.url = this.mwhurl()+'/front/course/list?' + arr
    },
    next_click: function(e) {
      this.chaifenurl(this.url, e)
      this.urlchulipost()
    },
    prev_click: function(e) {
      this.chaifenurl(this.url, e)
      this.urlchulipost()
    },
    current_change: function(e) {
      this.current_page = e
      this.chaifenurl(this.url, e)
      this.urlchulipost()
    },
    // 点击page触发获取
    huoqu(e) {
      this.axios.get(this.mwhurl()+'/front/course/list?page='+ e +'&size=8',{
      }).then((res) => {
        res = res.data
        // this.data = res.data.data
        if (res.code === 200) {
          this.data = res.data
        }
      }).catch(function (error) {

      })
    }
  },
  created() {
    // 页面记载时请求
    front_course_list().then((res) => {
      res = res.data
      if (res.code === 200) {
        this.data = res.data
        this.page_count = Math.ceil(res.totalSize/8)
      }
    })

    // 获取数据字典
    course_list_pre().then((res) => {
      res = res.data
      console.log(res)
      if (res.code === 200) {
        this.zidian = res.values
      }
    })
    this.urlchuli()
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shangcheng_container
    width: 100%
    min-height: 860px
    .shangcheng
      margin: 0 auto
      .shangchengheader
        width: 1200px
        height: 76px
        margin: 0 auto
        display: flex
        p
          margin: 0
          margin-left: 10px
          font-size:24px
          line-height: 58px
          color:rgba(58,58,58,1)
        .imgq
          width: 38px
          height: 38px
          margin-top: 10px
          img
            width: 100%
            height: 100%
      .shangchengbody
        width: 1200px
        height: 210px
        margin: 0 auto
        .bodyheader
          width: 1200px
          margin: 0 auto
          display: flex
          flex-direction: column
          .select
            width: 1200px
            height: 68px
            display: flex
            border-top: 1px solid #C0C0C0
            .t
              height: 28px
              padding: 0 10px
              line-height: 28px
              text-align: center
              font-size: 14px
              margin-right: 16px
              margin-top: 20px
            .a
              height: 28px
              padding: 0 10px
              line-height: 28px
              text-align: center
              font-size: 14px
              margin-right: 25px
              margin-top: 20px
              cursor: pointer
              border-radius: 2px
      .none
        width: 1200px
        height: 100px
        line-height: 100px
        margin: 0 auto
        display: flex
        justify-content: start
        font-size: 24px
      .cotainer
        width: 100%
        min-height: 930px
        background-color: #f5f5f5
        .page
          width: 1200px
          height: 50px
          padding-top: 20px
          display: flex
          margin: 0 auto
          justify-content: flex-end
          .el-pagination
            ul
              li
                width: 30px
                height: 30px
                line-height: 30px
                border-radius: 50%
              .active
                background-color: #2EB7C6
        .gray_background
          width: 100%
          .kecheng
            width: 1200px
            margin: 0 auto
            display: flex
            flex-wrap: wrap
</style>
