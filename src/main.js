import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import './plugins/element.js'

import Login from './components/user/Login.vue'

Vue.config.productionTip = false
Vue.use(Router)

const routes = [
  { path: '/', name: 'login', component: Login }
]

const router = new Router({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
