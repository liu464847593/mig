<template>
  <div id="app">
    <router-view></router-view>
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
    width: 100%;
    height: 100%;
    #app{
      width: 100%;
      height: 100%;
    }
  }

  li {
    list-style: none;
  }


</style>
