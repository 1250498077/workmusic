<template>
  <div class="huodongq">
    <div class="newsright_image" @click="jump">
      <img :src="data.pic" alt="">
    </div>
    <div class="newsrightdetail">
      <div class="line"></div>
      <div class="newstitle" @click="jump">{{data.name}}</div>
      <div class="time">
        <div class="img">
          <img src="./time.png" alt="">
        </div>
        <p class="timeg">{{time}}</p>
      </div>
      <div class="contentd">{{data.summary}}</div>
    </div>
    <div class="newsbutton" @click="jump">立即参加</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      time: ''
    }
  },
  methods: {
    jump() {
      this.$router.push({
        path: '/huodong_detail',
        query: {
          id: this.id
        }
      })
    },
    post() {
      let id = 0
      this.axios({
        method:"get",
        url:this.url() + '/front/activity/list?page=1&size=1',
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        console.log('活动单页')
        console.log(res)
        id = res.data.data[0].id
        console.log(id)
        this._huodongdetail(id)
      })
    },
    _huodongdetail(id) {
      this.axios({
        method:"get",
        url:this.url() + '/front/activity/detail?id='+ id,
        headers: {
          userToken: this.token
        }
      }).then((res) => {
        this.data = res.data.data
        this._timehandle(this.data.startTime, this.data.endTime)
        console.log(this.data)
      })
    },
    _timehandle(start, end) {
      this.time= start.substr(5, 5).replace("-", "月").replace('0', '') + '-' + end.substr(5, 5).replace("-", "月").replace('0', '')
    }
  },
  created: function () {
    this.post()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.huodongq
  p
    margin: 0
  .newsright_image
    width: 354px
    height: 141px
    border-radius: 15px
    overflow: hidden
    cursor pointer
    background-color: yellowgreen
  .newsrightdetail
    width: 335px
    height: 133px
    overflow: hidden
    color: rgba(58,58,58,1)
    position: relative
    margin-top: 20px
    .line
      position: absolute
      height: 20px
      width: 3px
      top: -2px
      background-color: #2EB7C6
    .newstitle
      margin-left: 20px
      height: 44px
      line-height: 24px
      overflow: hidden
      font-size: 18px
      cursor: pointer
      font-weight: 400
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
    .time
      height: 20px
      display: flex
      margin-top: 14px
      cursor: pointer
      align-items: center
      .img
        width: 14px
        height: 14px
        img
          width: 100%
          height: 100%
      .timeg
        color: #666666
        margin-left: 5px
        font-size: 14px
    .contentd
      line-height: 20px
      margin: 0
      margin-top: 17px
      font-family: PingFangSC-Regular
      height: 40px
      width: 335px
      font-weight: 400
      overflow: hidden
      font-size: 14px
      color: rgba(102,102,102,1)
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
  .newsbutton
    width: 160px
    height: 45px
    background: -webkit-linear-gradient(left, #2EB7C6 , #43D6C0); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #2EB7C6, #43D6C0); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #2EB7C6, #43D6C0); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #2EB7C6 , #43D6C0); /* 标准的语法（必须放在最后） */
    cursor: pointer
    text-align: center
    font-size:16px
    font-family:PingFangSC-Medium
    color: white
    font-weight: 600
    line-height: 45px
    border-radius: 25px
    margin-top: 27px
    margin-left: 105px
</style>
