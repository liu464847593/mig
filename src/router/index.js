import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home'
import Classification from '../views/Classification'
import Find from '../views/Find'
import Cart from '../views/Cart'
import Mine from '../views/Mine'
import Login from '../views/Login'
import Search from '../views/Search'
import ProductDetail from '../views/ProductDetail'
import NotFind from '../views/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
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
    path: '/Login',
    component: Login
  }, {
    path: '/Search',
    component: Search
  }, {
    path: '/ProductDetail',
    component: ProductDetail
  }, {
    path: '*',
    component: NotFind
  }]
})
