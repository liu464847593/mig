<template>
  <div class="box">
    <!--搜索框-->


    <div style="position: fixed; width: 100%;height: 80px">
    <!--<sticky>-->
      <search :placeholder="this.key" @on-submit="showGoods()" v-model="key" @on-change="search" :results="results"
              @on-result-click="changeKey" ref="search" style="position: absolute">
        <x-icon slot="left" type="ios-arrow-left" size="30" @click="goBack()"></x-icon>
      </search>

      <!--查询条件-->
      <flexbox class="filter-box">
        <flexbox-item>
          <div class="filter-conditions">综合</div>
        </flexbox-item>
        <flexbox-item>
          <div class="filter-conditions">销量</div>
        </flexbox-item>
        <flexbox-item>
          <div class="filter-conditions">价格</div>
        </flexbox-item>
        <flexbox-item>
          <div class="filter-conditions">新品</div>
        </flexbox-item>
        <flexbox-item>
          <div class="filter-conditions">筛选</div>
        </flexbox-item>
      </flexbox>
    <!--</sticky>-->
    </div>

    <flexbox wrap="wrap" :gutter="0" v-if="haveGoods" class="goodsWrapper">
      <flexbox-item v-for="(item,index) in goodsList" :key="index" :span="1/2">
        <div class="goodsBox">
          <router-link :to="{path:'/productDetail',query:{goodsId:item.goodsId}}">
            <img :src="item.goodsImageList[0].imageUrl" v-if="item.goodsImageList">
            <div class="description">
              <div class="title">{{item.title}}</div>
              <div class="price">
                <span class="actualCurrentPrice" v-if="item.skuList">￥{{item.skuList[0].currentPrice}}</span>
                <span class="marketPrice" v-if="item.skuList">￥{{item.skuList[0].marketPrice}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </flexbox-item>
    </flexbox>


    <!--购物车为空-->
    <div class="empty" v-show="!haveGoods">
      <img src="../assets/empty.png">
      <div>抱歉，没有找到与 "{{this.key}}" 相关的商品</div>
      <div>您可以换个词再试试</div>
    </div>

  </div>
</template>

<script>
  import {Sticky, Search, Flexbox, FlexboxItem, Spinner} from 'vux'

  export default {
    components: {
      Sticky,
      Search,
      Flexbox,
      FlexboxItem,
      Spinner
    },
    data () {
      return {
        key: this.$route.query.key, // 路由传递的参数
        goodsList: [], // 查询到的商品数组
        haveGoods: false, // 无商品数据
        results: [], // 关键字
        busy: false,
        loading: true
      }
    },
    methods: {
      // 查询数据
      showGoods () {
        this.$refs.search.setBlur()
        this.results = null
        // 查询参数
        let param = {
          title: this.key,
          sort: 1,
          page: 1,
          pageSize: 9,
          priceLevel: 'all'
        }
        this.$http.get('/goods/goodsList', {params: param}).then(res => {
          if (res.data.result.count !== 0) {
            this.haveGoods = true
            this.goodsList = res.data.result.list
          } else {
            this.haveGoods = false
          }
        })
      },
      // 返回
      goBack () {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      // 关键字查询
      search () {
        this.changeK = true
        this.$http.get('/keySearch', {params: {key: this.key}}).then(res => {
          let arr = res.data.body.keywords
          this.results = []
          for (let i in arr) {
            this.results.push({
              title: arr[i].levelOneKeyWords,
              other: i
            })
          }
        })
      },
      // 关键字结果点击
      changeKey (i) {
        this.key = i.title
        this.$router.push({path: 'Search', query: {key: i.title}})
        this.showGoods()
      },
      loadMore () {
        // this.busy = true
        setTimeout(() => {
          this.page++
          this.busy = false
          console.log(1)
        }, 500)
      }
    },
    mounted () {
      this.showGoods()
    }
  }
</script>

<style lang="less" scoped>
  .box {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .filter-box {
    position: absolute;
    top: 46px;
    left: 0;
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff;
    .filter-conditions {
      padding: 5px;
      text-align: center;
      font-size: 14px;
    }
  }

  .slotList {
    li {
      padding: 10px;
      border-bottom: 1px solid #cccccc;
    }
  }

  .empty {
    position: absolute;
    width: 100%;
    top: 50%;
    margin: -80px 0 0 0;
    text-align: center;
    font-size: 14px;
    z-index: -1;
    img {
      width: 101px;
      height: 101px;
    }
  }

  .goodsWrapper {
    padding-top: 80px;
    .goodsBox {
      margin-bottom: 20px;
      img {
        display: block;
        height: auto;
        max-width: 100%;
      }
      .description {
        font-size: 14px;
        padding: 0 5px;
        .title {
          height: 44px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          color: #000000;
        }
        .price {
          .actualCurrentPrice {
            color: #e31436;
          }
          .marketPrice {
            color: #999999;
            text-decoration: line-through;
          }
        }
      }
    }
  }
</style>

