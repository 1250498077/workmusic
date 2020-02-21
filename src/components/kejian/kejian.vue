<template>
  <div class="kejian">
    <div class="shang">
      <div class="img">
        <img :src="data" alt="">
      </div>
    </div>
    <div class="bottomm" style="cursor: pointer">
      <div class="kejianimg">
        <a :href="data" download="课件">
          <img src="./xiazai.png" alt="">
        </a>
      </div>
      <p @click="xiazai">下载</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {}
  },
  data() {
    return {
      odownLoad: ''
    }
  },
  methods: {
    xiazai() {
      window.open(this.data)
//      this.odownLoad=document.getElementById("downLoad");
//      this.oDownLoad("http://10.24.10.95:4205/download/FY4A/1530086577630.jpg")
    },
    myBrowser() {
      var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      var isOpera = userAgent.indexOf("Opera") > -1;
      if (isOpera) {
        return "Opera"
      }
      ; //判断是否Opera浏览器
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
      } //判断是否Firefox浏览器
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      } //判断是否Safari浏览器
      if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
      }
      ; //判断是否IE浏览器
      if (userAgent.indexOf("Trident") > -1) {
        return "Edge";
      } //判断是否Edge浏览器
    },
    SaveAs5(imgURL) {
      var oPop = window.open(imgURL, "", "width=1, height=1, top=5000, left=5000");
      for (; oPop.document.readyState != "complete";) {
        if (oPop.document.readyState == "complete") break;
      }
      oPop.document.execCommand("SaveAs");
      oPop.close();
    },
    oDownLoad(url) {
      this.myBrowser();
      if (this.myBrowser() === "IE" || this.myBrowser() === "Edge") {
        //IE
        this.odownLoad.href = "#";
        var oImg = document.createElement("img");
        oImg.src = url;
        oImg.id = "downImg";
        var odown = document.getElementById("down");
        odown.appendChild(oImg);
        SaveAs5(document.getElementById('downImg').src)
      } else {
        //!IE
        this.odownLoad.href = url;
        this.odownLoad.download = "";
      }
    },
  },
  watch: {
    data: function (neww) {
      console.log('获取课件')
      console.log(neww)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.kejian
  width: 270px
  display: flex
  align-items: center
  flex-direction: column
  .shang
    width: 270px
    height: 270px
    display: flex
    flex-direction: column
    align-items: center
    background-color: black
    .img
      width: 208px
      height: 270px
      img
        width: 100%
        height: 100%
  .bottomm
    width: 69px
    height: 30px
    display: flex
    align-items: center
    margin-top: 10px
    justify-content: center
    border: 1px solid #DBDBDB
    border-radius:15px
    color: white
    .kejianimg
      width: 16px
      height: 14px
      img
        width: 100%
        height: 100%
</style>
