import Home from './Home'
import Navigator from './Navigator'

window.nav = new Navigator(document.getElementById('app'))
window.nav.push(Home)

import Vue from 'vue'
import Http from './util/http'
Vue.prototype.$http = new Http('http://baike.azpdl.com')
require('./com/index')
