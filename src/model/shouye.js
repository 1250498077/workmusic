import { HTTP } from './http.js'

class ClassicModel extends HTTP {
  prefix = 'classic'

  constructor() {
    super()
  }

  shouye(sCallback, that) {
    this.request({
      url: '/front/common/index',
      methods: 'get',
      data: {},
      success: (res) => {
        console.log('进入模块')
        sCallback(res)
      },
      that: that
    })
  }
}

export {ClassicModel}
