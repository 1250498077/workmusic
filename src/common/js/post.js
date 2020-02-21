let mwh_post = {
  // 更新收货地址
  m_post_gengxindizhi: function (that, data, token, callback) {
    console.log('进入模块')
    let message = ''
    that.axios({
      method: "post",
      url: that.url() + "/front/user/address/update",
      headers: {
        userToken: token
      },
      data: data
    }).then((res)=>{
      console.log(res)
      res = res.data
      if (res.code === 200) {
        message = res.data
        console.log(message)
        console.log('執行callback')
        callback()
      }
    })
  },
  // 查看我的课程列表
  m_post_get_own_class: function (that, token, callback) {
    console.log('m_post_get_own_class')
    let data = ''
    that.axios({
      method: "get",
      url: that.url() + "/front/course/mine/list?page=1&size=10",
      headers: {
        userToken: token
      }
    }).then((res)=>{
      console.log(res)
      res = res.data
      if (res.code === 200) {
        data = res.data
        console.log('m_post_get_own_class')
        callback(data)
      }
    })
  }
}

export {mwh_post}
