import Vue from 'vue'

import NavBar from './NavBar'
import Back from './Back'
import Btn from './Btn'
var components = [
  NavBar,
  Back,
  Btn
]
components.map(component => {
  Vue.component(component.name, component)
})
