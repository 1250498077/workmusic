import {loadFromlLocal} from "../js/store";
import {public_data, encode} from './public'
import axios from 'axios'

const token = (() => {
  return loadFromlLocal('token')
})()


export function common_collect(data) {
  let url = '/front/common/collect'
  return axios({
    method: "post",
    url: public_data.url + "/front/user/address/update",
    headers: {
      userToken: token
    },
    data: data
  }).then((res)=>{
    return Promise.resolve(res)
  })
}
// 首页预加载接口
export function common_index() {
  let url = '/front/common/index'
  return axios({
    method: "get",
    url: public_data.url + url,
    headers: {
      userToken: token
    }
  }).then((res)=>{
    return Promise.resolve(res)
  })
}

export function aaa() {
  let url = '/front/common/index'
  return axios({
    method: "get",
    url: public_data.url + url,
    headers: {
      userToken: token
    }
  }).then((res)=>{
    return Promise.resolve(res)
  })
}
