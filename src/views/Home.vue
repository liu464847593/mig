<template>
  <div class="box">
    <x-header>
      <span>民盈购商城</span>
      <a slot="right" class="login" @click="goLogin" v-if="!this.$store.state.nickName">登录</a>
      <a slot="right" class="login" v-if="this.$store.state.nickName">欢迎{{this.$store.state.nickName}}</a>
      <x-icon @click="goClass" slot="overwrite-left" type="navicon" size="35"
              style="fill:#000;position:relative;top:-8px;left:-3px;"></x-icon>
    </x-header>

    <swiper :aspect-ratio="480/960" auto>
      <swiper-item class="swiper-img" v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imageUrl">
      </swiper-item>
    </swiper>

    <div class="nav">
      <a v-for="(item,index) in navList.tabVOS" :key="index" class="navBox">
        <router-link :to="{path:'/Search',query:{key:item.title}}">
          <div class="imgBox"><img :src="item.imageUrl"></div>
          <p :title="item.title">{{item.title}}</p>
        </router-link>
      </a>
    </div>


    <div class="goodsWarpper">
      <ul class="goodsBox">
        <li v-for="(item,index) in home_goods" :key="index" class="goods">
          <router-link :to="{path:'/productDetail',query:{goodsId:item.goodsId}}">
            <img v-if="item.goodsImageList"  :src="item.goodsImageList[0].imageUrl">
            <div class="description">
              <div class="title">{{item.title}}</div>
              <div class="price">
                <span class="actualCurrentPrice" v-if="item.skuList">￥{{item.skuList[0].currentPrice}}</span>
                <span class="marketPrice" v-if="item.skuList">￥{{item.skuList[0].marketPrice}}</span>
              </div>
            </div>
          </router-link>
          <button class="buy" @click="addCart(item)">加入购物车</button>
        </li>
      </ul>
      <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
           infinite-scroll-distance="20">
        <spinner tip="loading" type="bubbles" size="50px" v-show="loading"></spinner>
      </div>
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script>
  import Tabbar from '../components/Tabbar'
  import {XHeader, Tab, TabItem, Swiper, SwiperItem, Spinner} from 'vux'

  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Tabbar,
      Spinner
    },
    data () {
      return {
        bannerList: '',
        navList: '',
        home_goods: '1',
        sortFlag: true, // 排序顺序
        page: 1, // 当前页
        pageSize: 9, // 显示多少条商品
        priceChecked: 'all', // 价格区间
        title: '1',
        busy: true,
        loading: false
      }
    },
    methods: {
      goClass () {
        this.$router.push({
          path: '/Classification'
        })
      },
      goLogin () {
        this.$router.push({
          path: '/Login'
        })
      },
      // 获取商品列表
      getGoodsList (flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }
        this.loading = true
        this.$http.get('/goods/goodsList', {
          params: param
        }).then(res => {
          this.loading = false
          if (flag) {
            this.home_goods = this.home_goods.concat(res.data.result.list)
            if (res.data.result.count === 0) {
              this.busy = true
            } else {
              this.busy = false
            }
          } else {
            this.busy = false
            this.home_goods = res.data.result.list
          }
        })
      },
      // 获取banner图
      getBanner () {
        this.$http.get('/goods/bannerList').then(res => {
          this.bannerList = res.data[0].data
        })
      },
      // 获取分类
      getTopNavListNew () {
        this.$http.get('/goods/topNavListNew').then(res => {
          this.navList = res.data[0].data[0]
        })
      },
      // 添加购物车
      addCart (item) {
        if (this.$store.state.nickName !== '') {
          this.$http.post('/goods/addCart', {
            productId: (item.goodsId).toString(),
            productName: item.title,
            salePrice: item.skuList[0].currentPrice,
            productImage: item.goodsImageList[0].imageUrl,
            checked: '0',
            productNum: 1
          }).then((response) => {
            let res = response.data
            if (res.status === 0) {
              // 添加成功
              // this.mdShowCart = true
              this.$store.commit('updateCartCount', 1)
            } else {
              console.log(1)
              // this.mdShow = true
            }
          })
        } else {
          this.$router.push('/Login')
        }
      },
      loadMore () {
        this.busy = true
        setTimeout(() => {
          this.page++
          this.busy = false
          this.getGoodsList(true)
        }, 500)
      }
    },
    mounted () {
      this.getBanner()
      this.getTopNavListNew()
      this.getGoodsList()
    }
  }
</script>

<style lang="less" scoped>
  .box{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .vux-header {
      background-color: #ffffff;
      .vux-header-title {
        span {
          color: #000000;
        }
      }
      .vux-header-right {
        .login {
          color: #000000;
        }
      }
    }

    .vux-slider {
      .vux-indicator-right {
        a {
          .vux-icon-dot.active {
            background-color: #ea5a11;
          }
        }
      }
    }

    .swiper-img {
      img {
        width: 100%;
      }
    }

    .nav {
      display: flex;
      flex-wrap: wrap;
      background-color: #ffffff;
      padding: 10px 0;
      .navBox {
        width: 20%;
        .imgBox {
          padding: 0 10px;
          img {
            display: block;
            max-width: 100%;
            height: auto;
            border-radius: 50%;
          }
        }
        p {
          font-size: 12px;
          text-align: center;
          color: #000000;
        }
      }
    }

    .goodsWarpper {
      padding-bottom: 70px;
      .goodsBox {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;
        padding: 10px 10px 0 10px;
        .goods {
          width: 30%;
          margin-bottom: 5px;
          list-style: none;
          background-color: #ffffff;
          img {
            height: auto;
            max-width: 100%;
          }
          .description {
            font-size: 12px;
            padding: 0 5px;
            .title {
              height: 40px;
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
          .buy {
            display: block;
            width: 100%;
            padding: 5px 0;
            outline: none;
            border: none;
            background-color: #e31436;
            color: #ffffff;
          }
        }
      }
    }

    .view-more-normal {
      height: 50px;
      width: 100%;
      text-align: center;
    }
  }

</style>
