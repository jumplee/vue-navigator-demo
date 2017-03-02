import App from './Home'
import Navigator from './Navigator'

window.nav = new Navigator(document.getElementById('app'))
window.nav.push(App)
