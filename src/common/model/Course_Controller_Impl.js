import {loadFromlLocal} from "../js/store";
import {public_data, encode} from './public'
import axios from 'axios'

const token = (() => {
  return loadFromlLocal('token')
})()

// 课程列表页预加载
export function front_course_list() {
  let url = '/front/course/list?page=1&size=8'
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

// 课程列表页字典预加载/front/course/list/pre
export function course_list_pre() {
  let url = '/front/course/list/pre'
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

// 点击下一页上一页获取课程接口
export function front_course_listd(url) {
  // let url = '/front/course/list/pre'
  console.log(url)
  return axios({
    method: "get",
    url: url,
    headers: {
      userToken: token
    }
  }).then((res)=>{
    console.log('asdasdasd')
    return Promise.resolve(res)
  })
}
