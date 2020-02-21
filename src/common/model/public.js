import md5 from 'js-md5'

export const public_data = {
  url: 'http://120.78.191.119:8080'
}

export function encode (data, time) {
  let reg1 = new RegExp( '[0-4]' , "g" )
  let reg2 = new RegExp( '[5-9]' , "g" )
  let Base64 = require('js-base64').Base64
  return Base64.encode(time.replace( reg1, '') + "k1#" + md5(data) + '#k2' + time.replace( reg2, ''))
}

export function encodePassword (data, key) {
  let reg1 = new RegExp( '[0-4]' , "g" )
  let reg2 = new RegExp( '[5-9]' , "g" )
  let Base64 = require('js-base64').Base64
  return Base64.encode(key.replace( reg1, '' ) + "k1#" + md5(data) + '#k2' + key.replace( reg2, '' ))
}
