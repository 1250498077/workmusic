exports.install = function (Vue, options) {
  Vue.prototype.url = function (){
    return 'http://120.78.191.119:8080';
  },
  Vue.prototype.mwhurl = function (){
    return 'http://120.78.191.119:8080';
  }
}
