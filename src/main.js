// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import router from './router/index'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(infiniteScroll)

const store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    // 更新用户信息
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    }
  }
})

Vue.prototype.$http = axios // axios 挂在Vue上
FastClick.attach(document.body) // 消除点击延时提高程序的运行效率
Vue.config.productionTip = false // 关闭vue 在启动时生成生产提示。

/* eslint-disable no-new */
new Vue({
  router,
  store,
  mounted () {
    this.checkLogin()
    this.getCartCount()
  },
  methods: {
    checkLogin () {
      this.$http.get('users/checkLogin').then(response => {
        let res = response.data
        if (res.status === '0') {
          this.$store.commit('updateUserInfo', res.result)
        } else {
          if (this.$route.path !== '/Home') {
            this.$router.push('/Home')
          }
        }
      })
    },
    getCartCount () {
      this.$http.get('users/getCartCount').then(response => {
        let res = response.data
        if (res.status === '0') {
          this.$store.commit('updateCartCount', res.result)
        }
      })
    }
  },
  render: h => h(App)
}).$mount('#app-box')
