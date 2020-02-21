<template>
  <div class="shangcheng_container">
    <div class="shangcheng">
      <div class="shangchengheader">
        <div class="imgq">
          <img src="./title.png" alt="">
        </div>
        <p>商城</p>
      </div>
      <div class="shangchengbod">
        <div class="bodyheader">
          <div class="select type">
            <div class="t typed alltype">品牌 :</div>
            <div class="a" @click="quanbu($event,1)" ref="brandd">全部</div>
            <div class="a" v-for="(item, key) in list.brandList" :key="item.id" @click="selectbrand($event, item.id)" ref="brand">{{item.content}}</div>
          </div>
          <div class="select teacher">
            <div class="t typed alltype">类别 :</div>
            <div class="a" @click="quanbu($event, 2)" ref="leibied">全部</div>
            <div class="a" v-for="(item, key) in list.courseList" :key="item.id" @click="selecttype($event, item.id)" ref="leibie">{{item.content}}</div>
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
            <v-product_detail v-for="(item, key) in data" :key="key" class="list" :data="item" v-on:jump="jump"></v-product_detail>
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
import product_detail from 'components/product_detail/product_detail'
export default {
  components: {
    'v-product_detail': product_detail
  },
  data () {
    return {
      page_count: 0,
      data: {},
      totalSize: 0,
      zidian: {},
      brand: '-1',
      leibie: '-1',
      keyword: '-1',
      url: '',
      list: '',
      none: false,
      current_page: 1
    }
  },
  computed: {
  },
  methods: {
    jump: function(id) {
      console.log('product_id_edit')
      this.$store.commit('product_id_edit', id)
    },
    quanbu(e, index) {
      if (index === 1) {
        this.brand = '-1'
        let list = this.$refs.brand
        for (let i = 0; i < list.length; i++) {
          list[i].style.backgroundColor = 'white'
          list[i].style.color = '#3A3A3A'
        }
        e.target.style.color = '#2EB7C6'
        e.target.style.backgroundColor = '#d0f6fa'
      } else {
        this.leibie = '-1'
        let list = this.$refs.leibie
        for (let i = 0; i < list.length; i++) {
          list[i].style.backgroundColor = 'white'
          list[i].style.color = '#3A3A3A'
        }
        e.target.style.backgroundColor = '#d0f6fa'
        e.target.style.color = '#2EB7C6'
      }
      this.urlchuli()
    },
    selectbrand(e, index) {
      let list = this.$refs.brand
      // ‘全部按钮设置为white’
      this.$refs.brandd.style.backgroundColor = 'white'
      this.$refs.brandd.style.color = '#3A3A3A'
      for (let i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = 'white'
        list[i].style.color = '#3A3A3A'
      }
      e.target.style.backgroundColor = '#d0f6fa'
      e.target.style.color = '#2EB7C6'
      console.log('selectbrand')
      console.log(index)
      this.brand = index
      console.log(this.brand)
      this.urlchuli()
    },
    selecttype(e, index) {
      console.log('selecttype')
      let list = this.$refs.leibie
      this.$refs.leibied.style.backgroundColor = 'white'
      this.$refs.leibied.style.color = '#3A3A3A'
      for (let i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = 'white'
        list[i].style.color = '#3A3A3A'
      }
      e.target.style.backgroundColor = '#d0f6fa'
      e.target.style.color = '#2EB7C6'
      this.leibie = index
      this.urlchuli()
    },
    urlchuli() {
      console.log('urlchuli')
      let urlheader = this.mwhurl() + '/front/product/list?page=1&size=10'
      if (this.leibie !== '-1') {
        urlheader = urlheader + '&style=' + this.leibie
      }
      if (this.brand !== '-1') {
        urlheader = urlheader + '&brand=' + this.brand
      }
      if (this.keyword !== '-1') {
        urlheader = urlheader + '&keyword=' + this.keyword
      }
      this.url = urlheader
      urlheader = this.mwhurl() + '/front/product/list?page=1&size=10'
      this.urlchulipost()
    },
    urlchulipost() {
      console.log('this.url')
      console.log(this.url)
      this.axios.get(this.url, {
      }).then((response) => {
        response = response.data
        // this.data = response.data.data
        if (response.code === 200) {
          console.log('200')
          this.data = response.data
          this.page_count = Math.ceil(response.totalSize/10)
          console.log(this.data)
          console.log(this.data.length)
          if (this.data.length === 0) {
            this.none = true
          } else {
            this.none = false
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    chaifenurl(url, page) {
      page = page|| 1
      console.log('chaifenurl')
      let arr1 = url.split('?')
      let index = arr1[1].indexOf('&')
      let replacestr = arr1[1].substring(0,index)
      console.log(replacestr)
      let arr = arr1[1].replace(replacestr, 'page='+ page)
      this.url = this.mwhurl() + '/front/product/list?' + arr
      console.log(this.url)
      console.log('=========================')
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
    }
  },
  created() {
    this.axios.get(this.mwhurl() + '/front/product/list/pre', {
    }).then((response) => {
      console.log(response)
      if (response.status === 200) {
        console.log('21111111111111111111111111111111')
        this.list = response.data.values
        console.log(this.list)
        console.log('2000000000000000000000000000000')
      }
    }).catch(function (error) {

    })


    this.axios.get(this.mwhurl() + '/front/product/list?page=1&size=10', {
    }).then((response) => {
      response = response.data
      if (response.code === 200) {
        console.log('2000000000000000000000000000000')
        this.data = response.data
        console.log(this.data)
        this.page_count = Math.ceil(response.totalSize/10)

        console.log('==================')
      }
    }).catch(function (error) {

    })
    this.urlchuli()
  //   // 获取数据字典
  //   this.axios.get('this.mwhurl() +  /front/course/list/pre', {
  //   }).then((response) => {
  //     response = response.data
  //     console.log(response)
  //     if (response.code === 200) {
  //       this.data = response.data
  //     }
  //   }).catch(function (error) {
  //   })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shangcheng_container
  width: 100%
  height: 100%
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
    .shangchengbod
      width: 1200px
      height: 140px
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
          .a
            height: 28px
            padding: 0 10px
            line-height: 28px
            cursor: pointer
            text-align: center
            font-size: 14px
            margin-right: 25px
            margin-top: 20px
            border-radius: 2px
          .t
            height: 28px
            padding: 0 10px
            line-height: 28px
            text-align: center
            font-size: 14px
            margin-right: 16px
            margin-top: 20px
          .selectd
            background-color: #d0f6fa
            color: #2EB7C6
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
      height: 100%
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
              background-color: white
              border: 1px solid #DBDBDB
              border-radius: 50%
              color: #888888
            .active
              color: white
              background-color: #2EB7C6
      .gray_background
        width: 100%
        .kecheng
          width: 1200px
          margin: 0 auto
          display: flex
          flex-wrap: wrap
          .list
            margin: 20px 10px 20px 10px
</style>
