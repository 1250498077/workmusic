import {loadFromlLocal} from "../js/store";
import {public_data, encode, encodePassword} from './public'
import axios from 'axios'

const token = (() => {
  return loadFromlLocal('token')
})()

// 修改支付密码
export function reset_password(data) {
  // password phone
  let url = '/front/user/reset/password/pay'
  let date = new Date()
  let time = date.getTime()
  let password = encodePassword(data.password, 'payPassword')
  let datad = {
    phone: data.phone,
    password: password,
    time: time,
    keyt: encode('phone=' + data.phone + ',newPayPassword=' + password, time.toString())
  }
  console.log(datad)
  return axios({
    method: "post",
    url: public_data.url + url,
    headers: {
      userToken: token
    },
    data: datad
  }).then((res)=>{
    console.log(res)
    if (res.data.code === 200) {
      return Promise.resolve(res)
    }
  })
}

// 验证支付密码
export function validate_password(data) {
  let url = '/front/user/validate/password/pay'
  let date = new Date()
  let time = date.getTime()
  let password = encodePassword(data.password, 'payPassword')
  console.log(data)
  let datad = {
    keyt: encode('payPassword=' + password, time.toString()),
    password: password,
    time: time
  }
  console.log(datad)
  return axios({
    method: "post",
    url: public_data.url + url,
    headers: {
      userToken: token
    },
    data: datad
  }).then((res)=>{
    if (res.data.code === 200) {
      return Promise.resolve(res)
    } else {
      console.log('else')
      console.log(res)
      return Promise.reject(res)
    }
  })
}

// 登录
export function user_login(data) {
  let url = '/front/user/login'
  let date = new Date()
  console.log('1')
  let time = date.getTime()
  console.log('2')
  let password = encodePassword(data.password, 'loginPassword')
  console.log('3')
  let datad = {
    keyt: encode('phone=' + data.phone + ',password=' + password, time.toString()),
    password: password,
    phone: data.phone,
    time: time
  }
  console.log(datad)
  return axios({
    method: "post",
    url: public_data.url + url,
    headers: {
      userToken: token
    },
    data: datad
  }).then((res)=>{
    if (res.data.code === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  })
}

// 重设登录密码
export function reset_password_login(data) {
  console.log('他妈给我进来')
  let url = '/front/user/reset/password/login'
  let date = new Date()
  let time = date.getTime()
  let password = encodePassword(data.password, 'loginPassword')
  console.log(data)
  let datad = {
    keyt: encode('phone=' + data.phone + ',password=' + password, time.toString()),
    password: password,
    phone: data.phone,
    time: time
  }
  console.log(datad)
  return axios({
    method: "post",
    url: public_data.url + url,
    headers: {
      userToken: token
    },
    data: datad
  }).then((res)=>{
    console.log('封装')
    if (res.data.code === 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  })
}






