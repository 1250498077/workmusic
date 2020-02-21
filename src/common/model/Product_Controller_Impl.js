import {loadFromlLocal} from "../js/store";
import {public_data, encode} from './public'
import axios from 'axios'

const token = (() => {
  return loadFromlLocal('token')
})()

// 课程列表页预加载
export function front_course_list() {
  let url = '/front/course/list?page=1&size=10'
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
