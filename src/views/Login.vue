<template>
  <div class="box">
    <x-header>登录</x-header>

    <group class="inputPhone">
      <x-input title="手机号码" type="number" :max="11" placeholder="请输入手机号码" is-type="china-mobile" required></x-input>
      <x-input title="验证码" placeholder="请输入短信验证码" required>
        <x-button slot="right" mini class="sendCode">发送验证码</x-button>
      </x-input>

      <check-icon class="agree" :value.sync="agreeIf" @click="checkAgree">登录即同意<span class="protocol">《民盈购平台服务协议》</span></check-icon>

      <div class="loginButtonBox">
        <x-button type="primary" class="loginButton" action-type="submit">登录</x-button>
      </div>
    </group>

  </div>
</template>

<script>
  import {XHeader, XInput, Group, Cell, XButton, CheckIcon} from 'vux'

  export default {
    components: {
      XHeader,
      XInput,
      Group,
      Cell,
      XButton,
      CheckIcon
    },
    data () {
      return {
        agreeIf: true
      }
    },
    methods: {
      checkAgree () {
        console.log(1)
        this.agreeIf = !this.agreeIf
      }
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
      .weui-cells {
        margin-top: 0;
        font-size: 14px;
      }
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
