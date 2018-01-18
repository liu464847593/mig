<template>
  <div class="myBox">
    <group class="addressBox">
      <cell title="用户" is-link link="/address" inline-desc='我的收货地址'>
        <img slot="icon" width="50" style="display:block;margin-right:20px;border-radius: 50%"
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
      </cell>
    </group>

    <group>
      <cell title="我的订单" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>
    </group>

    <group>
      <cell title="我的购物车" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>

      <cell title="我的拼团" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>

      <cell title="我的钱包" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>

      <cell title="我的优惠券" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>

      <cell title="我收藏的商品" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>

      <cell title="我收藏的店铺" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>
    </group>


    <group>
      <cell title="消息通知" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>

      <cell title="客服" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>

      <cell title="意见反馈" is-link>
        <img slot="icon" style="display:block;margin-right:20px;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000"
             width="24" height="24">
      </cell>
    </group>

    <div class="outButtonBox">
      <x-button type="warn" class="outButtonBox" action-type="submit">退出登录</x-button>
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
    }
  }
</script>

<style lang="less">
  .myBox {
    padding-bottom: 60px;
    .addressBox {
      .weui-cells {
        margin-top: 0;
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
