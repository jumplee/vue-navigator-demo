import Home from './Home'
import Navigator from './Navigator'
import func from './util/fun'
// 解决一下触发延迟的问题
var fastClick = require('fastclick');
fastClick.attach(document.body);
require('../sass/main.scss')
window.nav = new Navigator(document.getElementById('app'), {
  swipeBack: true
})

var platform=func.platform()
if(platform.iOS){
  document.body.classList.add('x-iOS')
}else{
  document.body.classList.add('x-android')
}

window.nav.push(Home)

import Vue from 'vue'
import Http from './util/http'
Vue.prototype.$http = new Http('http://baike.azpdl.com')
require('./com/index')
