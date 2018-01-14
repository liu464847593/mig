<template>
  <div>
    <tabbar>
      <tabbar-item selected link="/Home">
        <img slot="icon" src="../assets/home.svg">
        <img slot="icon-active" src="../assets/home-active.svg">
        <span slot="label">首页</span>
      </tabbar-item>

      <tabbar-item link="/Classification">
        <img slot="icon" src="../assets/classification.svg">
        <img slot="icon-active" src="../assets/classification-active.svg">
        <span slot="label">分类</span>
      </tabbar-item>

      <tabbar-item link="/Find">
        <img slot="icon" src="../assets/find.svg">
        <img slot="icon-active" src="../assets/find-active.svg">
        <span slot="label">发现</span>
      </tabbar-item>

      <tabbar-item link="/Cart">
        <img slot="icon" src="../assets/cart.svg">
        <img slot="icon-active" src="../assets/cart-active.svg">
        <span slot="label">购物</span>
      </tabbar-item>

      <tabbar-item link="/Mine">
        <img slot="icon" src="../assets/mine.svg">
        <img slot="icon-active" src="../assets/mine-active.svg">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>

<style scoped>
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label span{
  color: #ea5a11!important;
}
</style>

