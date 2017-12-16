import Home from './Home'
import Navigator from './Navigator'

// 解决一下触发延迟的问题
require('./util/hammer-time.min.js')

window.nav = new Navigator(document.getElementById('app'), {
  swipeBack: true
})
window.nav.push(Home)

import Vue from 'vue'
import Http from './util/http'
Vue.prototype.$http = new Http('http://baike.azpdl.com')
require('./com/index')
