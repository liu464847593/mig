<template>
  <div>
    <x-header>
      <span>商城</span>
      <a slot="right" class="login" @click="goLogin">登录</a>
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
        <div class="imgBox"><img :src="item.imageUrl"></div>
        <p>{{item.title}}</p>
      </a>
    </div>

    <div class="goodsWarpper">
      <ul class="goodsBox">
        <li v-for="(item,index) in home_goods.showGoodsList" :key="index" class="goods">
          <img :src="item.goods.imageUrl">
          <div class="description">
            <div class="title">{{item.goods.title}}</div>
            <div class="price">
              <span class="actualCurrentPrice">￥{{item.goods.actualCurrentPrice}}</span>
              <span class="marketPrice">￥{{item.goods.marketPrice}}</span>
            </div>
            <button class="buy">立即购买</button>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import {XHeader, Tab, TabItem, Swiper, SwiperItem} from 'vux'

  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        bannerList: '',
        navList: '',
        home_goods: ''
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
      }
    },
    mounted () {
      let _this = this
      this.$http.get('/api/banner').then(res => {
        _this.bannerList = res.data.data
      })
      this.$http.get('/api/navList').then(res => {
        _this.navList = res.data.data
      })
      this.$http.get('/api/home_goods').then(res => {
        _this.home_goods = res.data.zone_data[0]
      })
    }
  }
</script>

<style lang="less" scoped>
  .vux-header{
    background-color: #ffffff;
    .vux-header-title{
      span{
        color: #000000;
      }
    }
    .vux-header-right{
      .login{
        color: #000000;
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
    .goodsBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      padding: 10px 10px 70px 10px;
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
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
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
  }
</style>
