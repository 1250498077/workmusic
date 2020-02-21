import axios from 'axios'

class HTTP {
  constructor() {
    // 获取基础url
    this.baseRestUrl = 'http://120.78.191.119:8080/'
  }
  // toLowerCase
  // http 请求类, `，不做未授权重试机制
  request(params) {
    let url = this.baseRestUrl + params.url
    axios({
      method: params.method,
      url: url,
      data: params.data
    }).then((res)=>{
      console.log('+++++++++++++++++++++++++++')
      console.log(res)
      params.success && params.success(res.data)
    })
  }
}

export {HTTP}
