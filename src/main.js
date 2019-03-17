import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import './plugins/element.js'

import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'

Vue.config.productionTip = false
Vue.use(Router)

const routes = [
  { path: '/', name: 'home', component: HelloWorld },
  { path: '/login', name: 'login', component: Login }
]

const router = new Router({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
