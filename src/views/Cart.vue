<template>
  <div class="box">
    <x-header :left-options="{showBack: false}">
      <span>购物车（{{this.$store.state.cartCount}}）</span>
      <x-icon slot="right" type="ios-home-outline" size="20" @click="goHome()" class="filter-icon"></x-icon>
    </x-header>

    <div class="empty" v-if="cartList.length === 0">
      <img src="../assets/empty_car.png">
      <p>购物车空空如也，赶紧去逛逛吧！</p>
      <x-button type="warn" link="/Home">去逛逛</x-button>
    </div>

    <div class="goods-box" v-for="(item,index) in cartList" :key="index" v-if="cartList.length !== 0">
      <div class="goods-checked" @click="editCart('checked',item)"><i class="check-img"
                                                                      :class="{'checked':item.checked === '1'}"></i>
      </div>
      <div class="goods-img"><img :src="item.productImage"></div>
      <div class="goods-des">
        <span class="goods-name">{{item.productName}}</span>
        <div class="count">
          <div class="minus" @click="editCart('minu',item)">-</div>
          <div class="number">{{item.productNum}}</div>
          <div class="plus" @click="editCart('add',item)">+</div>
        </div>
        <div class="price">￥{{item.salePrice}}</div>
        <div class="delete" @click="delCart(item)">
          <x-icon type="ios-trash-outline"></x-icon>
        </div>
      </div>
    </div>

    <div class="pay">
      <div class="checkAll" @click="toggleCheckAll"><i class="check-img"
                                                       :class="{'checked':checkAllFlag}"></i></div>
      <div class="payNum">总价：{{totalPrice}}</div>
      <div class="payButton" :class="{'red':checkedCount !== 0}">结算</div>
    </div>

  </div>
</template>

<script>
  import {XButton, XHeader} from 'vux'

  export default {
    components: {
      XButton,
      XHeader
    },
    data () {
      return {
        cartList: []
      }
    },
    computed: {
      // 检查是否全选
      checkAllFlag () {
        return this.checkedCount === this.cartList.length && this.checkedCount !== 0
      },
      // 勾选数量
      checkedCount () {
        let i = 0
        this.cartList.forEach((item) => {
          if (item.checked === '1') i++
        })
        return i
      },
      totalPrice () {
        let money = 0
        this.cartList.forEach((item) => {
          if (item.checked === '1') {
            money += parseFloat(item.salePrice) * parseInt(item.productNum)
          }
        })
        return money.toFixed(2)
      }
    },
    methods: {
      // 返回首页
      goHome () {
        this.$router.push('/')
      },
      getCarList () {
        this.$http.get('/users/cartList').then((res) => {
          this.cartList = res.data.result
        })
      },
      // 编辑购物车
      editCart (flag, item) {
        if (flag === 'add') {
          item.productNum++
        } else if (flag === 'minu') {
          if (item.productNum <= 1) {
            return
          }
          item.productNum--
        } else {
          item.checked = item.checked === '1' ? '0' : '1'
        }
        this.$http.post('/users/cartEdit', {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.$store.commit('updateCartCount', flag === 'add' ? 1 : -1)
          }
        })
      },
      // 全选
      toggleCheckAll () {
        let flag = !this.checkAllFlag
        this.cartList.forEach((item) => {
          item.checked = flag ? '1' : '0'
        })
        this.$http.post('/users/editCheckAll', {
          checkAll: flag
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('update suc')
          }
        })
      },
      // 删除购物车
      delCart (item) {
        this.$http.post('/users/cartDel', {
          productId: item.productId
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            // this.modalConfirm = false;
            let delCount = item.productNum
            this.$store.commit('updateCartCount', -delCount)
            this.getCarList()
          }
        })
      }
    },
    mounted () {
      this.getCarList()
    }
  }
</script>

<style lang="less" scoped>
  .box {
    position: relative;
    height: 100%;
    .vux-header {
      background-color: #ffffff;
      .vux-header-title {
        span {
          color: #000000 !important;
        }
      }
    }
    .empty {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -90px;
      margin-left: -105px;
      font-size: 14px;
      text-align: center;
      img {
        width: 100px;
        height: 100px;
      }
      p {
        padding: 10px 0;
      }
      button {
        font-size: 14px;
        width: 80%;
      }
    }
    .goods-box {
      display: flex;
      padding: 0 10px;
      margin-bottom: 10px;
      font-size: 12px;
      background-color: #ffffff;
      .goods-checked {
        display: flex;
        width: 10%;
        align-items: center;
        .check-img {
          display: block;
          height: 20px;
          width: 20px;
          background-size: cover;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUxpcZmZmZqampqampubm5qamqioqJqampqampqampqamqGhoZmZmXRqFBEAAAAMdFJOUwDwRqiAagslwtY6FiGs6jgAAADlSURBVCjPY2CAgFKLiZLN4QzIgNvzDBhM2YAQY3M8IxxUlq5qeEYkAS6oeMYIwlA+IwQTYznTBWOuOOMA1WxzFGFSzGGIAcwHFRCCTDIGYNpHHNkhhUfAcmcUkAUh3MSjKE5miBED6W5AFeQA6ueWWYAqyHVwAwPLYQY0YOPAwHkIXVBnAkONALog43GGGAN0QeajDDYB6IKshxl6FNAFmU4wzClAF2Q/ySCTgC7IdhC7IFbtWC3C6iSsjsfqTawBgjXosAYy1ujAHnFYoxhrYsCebLAmMKxJEXuixZ68sWYE9CwDAH0nU0cSKDB5AAAAAElFTkSuQmCC);
          &.checked {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEUAAADpPD3tO0HrPD7qPD7qOz7qPD3pOz7qPD3qPD3pPD7rPD/pQkLzRkbqQEDpPUH/VVXpOz3Rbw31AAAAEXRSTlMA6iuA81DZ07+rpXIjFgw7CVCvuuwAAADZSURBVDjLjdVbrsMgDATQoThAeYTO/jd7fy6ioU7wfCXKEY4lMLimlpyCSEi5VNym+civRN9UdnrhEvHnrzsclbhjdZ438Rf2efM27w9mptOkUndT/eAm/x2dbgfdOQsbijfZQ2lzwf2S8eHf+ugzAvXBvdDHc0V5ci83XgqyyTEjmRwTgskxQEyOAjE5yix9dHfvGGYzfXzUHBPysozumFG4SNWxoC4t6I4ViFepuzi22ZSqo183rutdc9LMR8F+uOzH1T4A9iPFPqTsY88+SO2j2T7szdfHHy1xS+1j0wOxAAAAAElFTkSuQmCC);
          }
        }
      }
      .goods-img {
        width: 30%;
        img {
          width: 80px;
        }
      }
      .goods-des {
        width: 70%;
        .count {
          display: flex;
          justify-content: flex-end;
          .minus {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border: 1px solid #cccccc;
          }
          .number {
            width: 20px;
            height: 20px;
            text-align: center;
            vertical-align: middle;
            line-height: 20px;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
          }
          .plus {
            width: 20px;
            height: 20px;
            text-align: center;
            vertical-align: middle;
            line-height: 20px;
            border: 1px solid #cccccc;
          }
        }
        .delete {
          text-align: right;
        }
      }
    }
    .pay {
      position: fixed;
      display: flex;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 60px;
      background-color: #ffffff;
      .checkAll {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10%;
        .check-img {
          display: block;
          height: 20px;
          width: 20px;
          background-size: cover;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUxpcZmZmZqampqampubm5qamqioqJqampqampqampqamqGhoZmZmXRqFBEAAAAMdFJOUwDwRqiAagslwtY6FiGs6jgAAADlSURBVCjPY2CAgFKLiZLN4QzIgNvzDBhM2YAQY3M8IxxUlq5qeEYkAS6oeMYIwlA+IwQTYznTBWOuOOMA1WxzFGFSzGGIAcwHFRCCTDIGYNpHHNkhhUfAcmcUkAUh3MSjKE5miBED6W5AFeQA6ueWWYAqyHVwAwPLYQY0YOPAwHkIXVBnAkONALog43GGGAN0QeajDDYB6IKshxl6FNAFmU4wzClAF2Q/ySCTgC7IdhC7IFbtWC3C6iSsjsfqTawBgjXosAYy1ujAHnFYoxhrYsCebLAmMKxJEXuixZ68sWYE9CwDAH0nU0cSKDB5AAAAAElFTkSuQmCC);
          &.checked {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEUAAADpPD3tO0HrPD7qPD7qOz7qPD3pOz7qPD3qPD3pPD7rPD/pQkLzRkbqQEDpPUH/VVXpOz3Rbw31AAAAEXRSTlMA6iuA81DZ07+rpXIjFgw7CVCvuuwAAADZSURBVDjLjdVbrsMgDATQoThAeYTO/jd7fy6ioU7wfCXKEY4lMLimlpyCSEi5VNym+civRN9UdnrhEvHnrzsclbhjdZ438Rf2efM27w9mptOkUndT/eAm/x2dbgfdOQsbijfZQ2lzwf2S8eHf+ugzAvXBvdDHc0V5ci83XgqyyTEjmRwTgskxQEyOAjE5yix9dHfvGGYzfXzUHBPysozumFG4SNWxoC4t6I4ViFepuzi22ZSqo183rutdc9LMR8F+uOzH1T4A9iPFPqTsY88+SO2j2T7szdfHHy1xS+1j0wOxAAAAAElFTkSuQmCC);
          }
        }
      }
      .payNum {
        padding-right: 10px;
        width: 70%;
        line-height: 60px;
        text-align: right;
      }
      .payButton {
        width: 20%;
        text-align: center;
        line-height: 60px;
        color: #ffffff;
        background-color: #c1c1c1;
        &.red {
          background-color: red;
        }
      }
    }
  }
</style>
