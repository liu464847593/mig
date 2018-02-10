<template>
  <div class="myBox">
    <group class="addressBox">
      <cell :title="this.$store.state.nickName">
        <img src="../assets/vip.png" class="avatar" slot="icon">
      </cell>
    </group>

    <group>
      <cell title="我的订单" is-link>
        <x-icon type="ios-list-outline" slot="icon"></x-icon>
      </cell>
    </group>

    <group>
      <cell title="我的购物车" is-link>
        <x-icon type="ios-cart-outline" slot="icon"></x-icon>
      </cell>

      <cell title="我的拼团" is-link>
        <x-icon type="ios-people-outline" slot="icon"></x-icon>
      </cell>

      <cell title="我的钱包" is-link>
        <x-icon type="social-yen-outline" slot="icon"></x-icon>
      </cell>

      <cell title="我的优惠券" is-link>
        <x-icon type="ios-pricetags-outline" slot="icon"></x-icon>
      </cell>

      <cell title="我收藏的商品" is-link>
        <x-icon type="bag" slot="icon"></x-icon>
      </cell>
    </group>


    <group>
      <cell title="消息通知" is-link>
        <x-icon type="ios-chatboxes-outline" slot="icon"></x-icon>
      </cell>

      <cell title="客服" is-link>
        <x-icon type="ios-person-outline" slot="icon"></x-icon>
      </cell>

      <cell title="意见反馈" is-link>
        <x-icon type="ios-compose-outline" slot="icon"></x-icon>
      </cell>
    </group>

    <div class="outButtonBox">
      <x-button type="warn" class="outButtonBox" action-type="submit" @click.native="logOut">退出登录</x-button>
    </div>

  </div>
</template>

<script>
  import {Group, Cell, XButton} from 'vux'

  export default {
    components: {
      Group,
      Cell,
      XButton
    },
    data () {
      return {}
    },
    methods: {
      // 检查登陆
      checkLogin () {
        this.$http.get('/users/checkLogin').then((response) => {
          let res = response.data
          // let path = this.$route.pathname
          if (res.status === '0') {
            this.$store.commit('updateUserInfo', res.result)
            this.loginModalFlag = false
          } else {
            if (this.$route.path !== '/Login') {
              this.$router.push('/Login')
            }
          }
        })
      },
      // 退出登陆
      logOut () {
        this.$http.post('/users/loginOut').then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log(res.result)
            this.$store.commit('updateUserInfo', res.result)
            this.$router.push('/')
          }
        })
      }
    },
    mounted () {
      this.checkLogin()
    }
  }
</script>

<style lang="less">
  .myBox {
    .vux-x-icon {
      width: 24px;
      margin-right: 20px;
      vertical-align: middle;
    }
    .addressBox {
      .weui-cells {
        margin-top: 0;
      }
      .avatar {
        display: inline-block;
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 20px;
        border-radius: 50%;
      }
    }
    .vux-label {
      font-size: 14px;
    }
    .vux-label-desc {
      font-size: 12px;
    }
    .outButtonBox {
      margin: 30px 0 30px 0;
      padding: 0 15px;
      font-size: 14px;
    }
  }
</style>
