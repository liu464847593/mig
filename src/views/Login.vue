<template>
  <div class="box">
    <x-header>登录</x-header>

    <group>
      <x-input title="手机号码" type="number" v-model="maskValue" :max="11" placeholder="请输入手机号码"
               is-type="china-mobile"></x-input>
      <x-input title="验证码" placeholder="请输入短信验证码">
        <x-button slot="right" mini class="sendCode">发送验证码</x-button>
      </x-input>
    </group>

    <p class="agree">登录即同意<span>《民盈购平台服务协议》</span></p>
    <div class="loginButtonBox">
      <x-button type="primary" class="loginButton">登录</x-button>
    </div>



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
    .weui-cells {
      font-size: 14px;
    }
    .sendCode{
      color: #ffffff;
      background-color: #ea5a11;
    }
    .agree{
      padding: 10px 0 0 15px;
      font-size: 14px;
      color: #999999;
      span{
        color: #ea5a11;
      }
    }
    .loginButtonBox{
      margin-top: 50px;
      padding: 0 15px;
      .loginButton{
        color: #ffffff;
        background-color: #ea5a11;
      }
    }
  }

</style>
