<template>
  <div class="player">
    <div class="container">
      <div class="left">
        <div class="left_container">
          <video-player  class="video-player vjs-custom-skin"
                         ref="videoPlayer"
                         :playsinline="true"
                         :options="playerOptions"
          ></video-player>
        </div>
      </div>
      <div class="right" @click="play">
        <div class="right_container">
          <div class="top">
            <div class="header">
              <div class="header_left" @click="her(1)" :class="{header_left_show: pinglunshow}">评价({{ratinglist.length}})</div>
              <div class="header_right" @click="her(2)" :class="{header_left_show: !pinglunshow}">课件</div>
            </div>
          </div>
          <div class="bottom" v-show="pinglunshow">
            <div class="text_input">
              <textarea type="text" placeholder="添加评论" v-model="pl_text" style="resize:none"></textarea>
              <div class="button" @click="fabu">发布</div>
            </div>
            <div class="content" style="margin-top: 30px">
              <v-rating_detail class="rating_detail" v-for="(item, key) in ratinglist" :key="key" :data="item"></v-rating_detail>
            </div>
          </div>
          <div class="bottom_right" :class="{bottom_right_c: pinglunshow}">
            <happy-scroll color="rgba(0,0,0,0.5)" size="5" class="aa" resize>
              <div class="kejian">
                <v-kejian class="kejiandetaik" v-for="(item, key) in kejiand" :data="item" :key="key"></v-kejian>
              </div>
            </happy-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../../store/index.js'
  import rating_detail from 'components/rating_detail/rating_detail'
  import kejian from 'components/kejian/kejian'
  import {loadFromlLocal} from '../../common/js/store'

  export default {
    data() {
      return {
        ratinglist: [],
        pl_text: '',
        id: '',
        token: (() => {
          return loadFromlLocal('token')
        })(),
        src: './movie.mp4',
        kejiand: [],
        pinglunshow: true,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1,],
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: "" //url地址
          }],
          poster: "", //你的封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    store,
    components: {
      'v-rating_detail': rating_detail,
      'v-kejian': kejian
    },
    methods: {
      handle() {
        console.log('handle')
        console.log(this.id)
        let url = this.url() + '/front/course/assess/list?id='+ this.class_id +'&page=1&size=200'
        this.ratings_post(url)
      },
      ratings_post(url) {
        this.axios({
          method:"get",
          url:url,
          headers: {
            userToken: this.token
          }
        }).then((res) => {
          console.log('获取评论返回的东西')
          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.ratinglist = res.data
            console.log(this.ratinglist)
//            this.description = this.data.description
          }
        })
      },
      fabu() {
        this.pingjia_post()
      },
      pingjia_post() {
        let model = {
          contentId: this.class_id,
          note: this.pl_text,
          type: 'COURSE'
        }
        console.log(model)
        this.axios({
          method:"post",
          url:this.url() + '/front/course/assess',
          headers: {
            userToken: this.token
          },
          data: model
        }).then((res) => {
          if (res.data.code === 2010) {
            this.$message({
              message: '已经评价过了',
              type: 'warning'
            })
          } else if(res.data.code === 2003) {
            this.$message({
              message: '未购买此服务，无法评价',
              type: 'warning'
            })
          } else {
            this.$message({
              message: '评价成功',
              type: 'success'
            })
          }
          console.log(res)

        })
      },
      her(index) {
        if (index === 1) {
          this.pinglunshow = true
        } else {
          this.pinglunshow = false
        }
      },
      getpost() {
//        console.log(this.id)
        this.axios({
          method: "get",
          url: this.url() + '/front/course/video/url?id= ' + this.id,
          headers: {
            userToken: this.token
          }
        }).then((res) => {
//          console.log(res)
          res = res.data
          if (res.code === 200) {
//            console.log(res.data)
            this.playerOptions.sources[0].src = res.data
            this.src = res.data
          }
        })
      },
      play() {
//        console.log('asdadadsdads')
//        console.log(this.playerOptions.sources[0].src)
        // this.playerOptions.autoplay = !this.playerOptions.autoplay
      },
      huoqupinglun() {
        this.axios({
          method: "get",
          url: this.url() + "/front/course/assess/list?id=" + this.id + "&page=1&size=10",
          headers: {
            userToken: this.token
          },
        }).then((res) => {
//          console.log(res)
        })
      },
      kejian() {
        this.axios({
          method: "get",
          url: this.url() + "/front/course/courseware?id=" + this.id,
          headers: {
            userToken: this.token
          },
        }).then((res) => {
//          console.log('获取课件')
//          console.log(res)
          res = res.data
          if (res.code === 200) {
            this.kejiand = res.data
          }
        })
      }
    },
    mounted() {
//      console.log('进入classs_detail')
      this.id = this.$route.query.id
      this.class_id = this.$route.query.class_id
      console.log('获取到的class_id')
      console.log(this.class_id)
      // 获取视频播放地址
      this.getpost()
      // 获取视频评论
      this.huoqupinglun()
      // 获取视频课件
      this.kejian()
      // 获取全部评论
      this.handle()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .player
    width: 1280px
    margin: 0 auto
    .container
      width: 1280px
      display: flex
      .left
        width: 942px
        height: 805px
        background-color: black
        .left_container
          width: 882px
          height: 600px
          margin: 0 auto
          margin-top: 30px
          padding-top: 100px
          background-color: #5E5E5E
          video
            video:
            :-webkit-media-controls
              position: relative
              video:
              :-webkit-media-controls-enclosure
                position: relative
                video:
                :-webkit-media-controls-overlay-play-button
                  position: relative
                  video:
                  :-internal-media-controls-overlay-play-button-internal
                    background-color: #2bb7c7
      .right
        background-color: #8c939d
        width: 338px
        height: 805px
        .right_container
          width: 288px
          margin-top: 30px
          margin-left: 30px
          .top
            display: flex
            flex-direction: column
            font-size: 16px
            .header
              display: flex
              height: 27px
              border-bottom: 2px solid #DBDBDB
              .header_left
                width: 77px
                height: 27px
                font-size: 16px
                cursor: pointer
                font-weight: 400
                text-align: center
                &.header_left_show
                  color: white
                  border-bottom: 2px solid #FFFFFF
              .header_right
                width: 77px
                height: 27px
                cursor: pointer
                text-align: center
                margin-left: 20px
                &.header_left_show
                  color: white
                  border-bottom: 2px solid #FFFFFF
          .bottom
            width: 280px
            height: 546px
            .text_input
              width: 280px
              height: 129px
              margin-top: 10px
              position: relative
              textarea
                width: 265px
                height: 129px
                background-color: #5E5E5E
                border: none
                border: 1px solid #DBDBDB
                padding-left: 10px
                padding-top: 10px
              .button
                width: 46px
                height: 25px
                position: absolute
                bottom: -8px
                right: 9px
                background-color: #2EB7C6
                text-align: center
                color: white
                font-size: 14px
                border-radius: 13px
                line-height: 25px
            .aa
              margin-top: 20px
              height: 518px
              .player_con
                width: 278px
                .rating_detail
                  margin-bottom: 29px
              .happy-scroll-strip--horizontal
                display: none
          .bottom_right
            width: 280px
            height: 546px
            margin-top: 10px
            align-items: center
            &.bottom_right_c
              visibility: hidden
            .aa
              height: 518px
              .player_con
                width: 278px
                .kejiandetaik
                  margin-top: 10px
                  margin-bottom: 29px
              .happy-scroll-strip--horizontal
                display: none
</style>
