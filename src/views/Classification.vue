<template>
  <div class="box">
    <div class="containner" v-for="(items,index) in carteList" :key="index">
      <h3>{{items.name}}</h3>
      <ul>
        <li v-for="item in items.categorySampleVOList">
          <router-link :to="{path:'/Search',query:{key:item.name}}">
            <img :src="item.picture">
            <p class="goods_name">{{item.name}}</p>
          </router-link>
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
    methods: {
      // 查询分类数据
      getCateList () {
        this.$http.get('/goods/cateList').then(res => {
          this.carteList = res.data.data
        })
      }
    },
    mounted () {
      this.getCateList()
    }
  }
</script>

<style lang="less" scoped>
  .box {
    .containner {
      padding-top: 10px;
      margin-bottom: 10px;
      background-color: #ffffff;
      h3 {
        padding-left: 10px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        li {
          width: 25%;
          img {
            max-width: 100%;
            height: auto;
          }
          .goods_name {
            text-align: center;
            font-size: 12px;
            color: #000000;
          }
        }
      }
    }
  }
</style>
