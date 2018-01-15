<template>
  <div class="box">
    <div class="containner" v-for="(items,index) in carteList">
      <h3>{{items.name}}</h3>
      <ul>
        <li v-for="item in items.categorySampleVOList">
          <img :src="item.picture">
          <p class="goods_name">{{item.name}}</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        carteList: ''
      }
    },
    methods: {},
    mounted () {
      let _this = this
      this.$http.get('/api/carteList').then(res => {
        _this.carteList = res.data
      })
    }
  }
</script>

<style lang="less" scoped>
  .box{
    padding-bottom: 53px;
    .containner{
      padding-top: 10px;
      margin-bottom: 10px;
      background-color: #ffffff;
      h3{
        padding-left:10px;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        li{
          width: 25%;
          img{
            max-width: 100%;
            height:auto;
          }
          .goods_name{
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
