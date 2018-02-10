<template>
  <div class="box">
    <x-header>用户登录<x-icon slot="right" type="ios-home-outline" size="20" @click="goHome()" class="filter-icon"></x-icon></x-header>

    <group class="inputPhone">
      <x-input title="登录名" placeholder="请输入用户名" required v-model="userName"></x-input>
      <x-input title="密码" placeholder="请输入密码" v-model="userPwd" type="password" required></x-input>

      <div class="loginButtonBox">
        <x-button type="primary" class="loginButton" action-type="submit" @click.native="login">登录</x-button>
      </div>
    </group>

  </div>
</template>

<script>
  import {XHeader, XInput, Group, Cell, XButton} from 'vux'

  export default {
    components: {
      XHeader,
      XInput,
      Group,
      Cell,
      XButton
    },
    data () {
      return {
        userName: 'admin',
        userPwd: '123456',
        errorTip: false,
        loginModalFlag: false // 遮罩层
      }
    },
    methods: {
      // 返回首页
      goHome () {
        this.$router.push('/')
      },
      // 登陆
      login () {
        this.$http.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then(res => {
          if (res.data.result.userName) {
            console.log(this.$router)
            this.$router.go(-1)
            this.$store.commit('updateUserInfo', res.data.result.userName) // vuex获取登陆昵称
          }
        })
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  .box {
    .vux-header {
      background-color: #ffffff;
      .vux-header-title {
        color: #000000;
      }
    }
    .inputPhone {
      .sendCode {
        color: #ffffff;
        background-color: #ea5a11;
      }
      .agree {
        padding: 0 15px 0 15px;
        color: #999999;
        .protocol {
          color: #ea5a11;
        }
      }
      .loginButtonBox {
        margin-top: 50px;
        padding: 0 15px;
        .loginButton {
          color: #ffffff;
          background-color: #ea5a11;
        }
      }
    }
  }

</style>
