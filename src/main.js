import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import './plugins/element.js'

import Login from './components/user/Login.vue'
import Registration from './components/user/Registration.vue'
import NewSite from './components/site/NewSite'
import Collaboration from './components/collaboration/Collaboration'

Vue.config.productionTip = false
Vue.use(Router)

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/user/registration', name: 'registration', component: Registration },
  { path: '/site/new', name: 'NewSite', component: NewSite },
  { path: '/collaboration', name: 'Collaboration', component: Collaboration }
]

const router = new Router({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
