<template>
  <div>
    <div class="shouhudizhi">
      <i class="el-icon-close" @click="deleted"></i>
      <div class="bianji" @click="edit">编辑</div>
      <div class="container">
        <p>收件人: {{data.name}}</p>
        <p>电话: {{phone}}</p>
        <p>收货地址: {{address}}</p>
      </div>
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
      phone: '',
      address: ''
    }
  },
  methods: {
    deleted() {
      console.log(this.data.id)
      this.$emit('deleted', this.data.id)
    },
    edit() {
      this.$emit('bianji', this.data.id)
    }
  },
  created: function () {
    let phoned = this.data.phone
    let phone_front = phoned.substring(0,3)
    let phone_behind = phoned.substring(7,11)
    let a = '****'
    this.phone = phone_front +  a + phone_behind
    this.address = this.data.province + this.data.city + this.data.area + this.data.fullAddress
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shouhudizhi
  width: 940px
  height: 104px
  border: 1px solid #E3E3E3
  font-size: 14px
  position: relative
  .el-icon-close
    position: absolute
    cursor: pointer
    top: 13px
    right: 13px
  .bianji
    position: absolute
    cursor: pointer
    right: 20px
    bottom: 20px
    color: #2BB7C7
  .container
    display: flex
    margin-left: 21px
    margin-top: 22px
    flex-direction: column
    width: 600px
    p
      margin: 0
      margin-bottom: 10px
</style>
