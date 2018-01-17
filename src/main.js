// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import Home from './views/Home'
import Classification from './views/Classification'
import Find from './views/Find'
import Cart from './views/Cart'
import Mine from './views/Mine'
import Login from './views/Login'

Vue.use(VueRouter)

Vue.prototype.$http = axios

const routes = [{
  path: '/',
  redirect: '/Home'
}, {
  path: '/Home',
  component: Home
}, {
  path: '/Classification',
  component: Classification
}, {
  path: '/Find',
  component: Find
}, {
  path: '/Cart',
  component: Cart
}, {
  path: '/Mine',
  component: Mine
}, {
  path: '/login',
  component: Login
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
