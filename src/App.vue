<template>
  <div id="app">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import Tabbar from './components/Tabbar'

  export default {
    name: 'app',
    components: {
      Tabbar
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }

  li {
    list-style: none;
  }
</style>
