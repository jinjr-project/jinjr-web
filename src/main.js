import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Vuex from 'vuex'
import './plugins/element.js'
import store from './store'

import Login from './components/user/Login.vue'
import Registration from './components/user/Registration.vue'
import NewSite from './components/site/NewSite'
import Collaboration from './components/collaboration/Collaboration'

import axios from "axios"
axios.defaults.baseURL = `http://${process.env.VUE_APP_API_HOST}`;

import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Vuex)
Vue.use(CKEditor)

const routes = [
  { path: '/', component: Collaboration },
  { path: '/login', name: 'login', component: Login },
  { path: '/user/registration', name: 'registration', component: Registration },
  { path: '/site/new', name: 'NewSite', component: NewSite },
  { path: '/collaboration', name: 'Collaboration', component: Collaboration }
]

const router = new Router({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
