<template>
    <view>
      <view class="header-container">
        <van-search background="null" :value="searchValue" placeholder="请输入搜索关键词" />
        <bannerSwiper :imgUrls="imgUrls"></bannerSwiper>
      </view>
      <view class="tabs-container">
        <van-tabs sticky :active="tabActive" swipeable animated line-height="0px" @change="onChange">
          <van-tab title="精选">
            <view style="background:#fff">
              <view class="item-container">
                <img src="https://img30.360buyimg.com/jdcms/s300x300_jfs/t1/18256/13/13656/95361/5ca1d0c5Efcb1005c/d6f50495b3c4baa8.jpg.webp">
                <view class="item-right-container">
                  <view class="right-title">【3.84元限时抢，抢完恢复79.9元】返季清仓</view>
                  <view class="right-sales">销量10万+件</view>
                  <view>
                    <text class="right-coupon coupon-cash">2元券</text>
                    <text class="right-return-cash coupon-cash" >返现5%</text>
                  </view>
                  <view class="right-bottom-container">
                    <view class="post-coupon">
                      <text>券后</text>
                      <text>¥</text>
                      <text>17.89</text>
                    </view>
                    <view class="save-money">
                      <text class="iconfont share"></text>
                      <text>省</text>
                      <text>¥</text>
                      <text>1.89</text>
                    </view>
                  </view>
                </view>
            </view>
            <view class="item-container">
                <img src="https://img12.360buyimg.com/jdcms/s300x300_jfs/t1/78355/31/14230/172321/5db82328Ee8a95eb6/97292315297e1ea7.jpg.webp">
                <view class="item-right-container">
                  <view class="right-title">【3.84元限时抢，抢完恢复79.9元】返季清仓</view>
                  <view class="right-sales">销量10万+件</view>
                  <view>
                    <text class="right-coupon coupon-cash">2元券</text>
                    <text class="right-return-cash coupon-cash" >返现5%</text>
                  </view>
                  <view class="right-bottom-container">
                    <view class="post-coupon">
                      <text>券后</text>
                      <text>¥</text>
                      <text>17.89</text>
                    </view>
                    <view class="save-money">
                      <text class="iconfont share"></text>
                      <text>省</text>
                      <text>¥</text>
                      <text>1.89</text>
                    </view>
                  </view>
                </view>
            </view>
            <view class="item-container">
                <img src="https://img30.360buyimg.com/mobilecms/s280x280_jfs/t1/40105/7/1757/102727/5cbe75d1Ea974025c/cb35e43ddd2a37de.jpg.webp">
                <view class="item-right-container">
                  <view class="right-title">【3.84元限时抢，抢完恢复79.9元】返季清仓</view>
                  <view class="right-sales">销量10万+件</view>
                  <view>
                    <text class="right-coupon coupon-cash">2元券</text>
                    <text class="right-return-cash coupon-cash" >返现5%</text>
                  </view>
                  <view class="right-bottom-container">
                    <view class="post-coupon">
                      <text>券后</text>
                      <text>¥</text>
                      <text>17.89</text>
                    </view>
                    <view class="save-money">
                      <text class="iconfont share"></text>
                      <text>省</text>
                      <text>¥</text>
                      <text>1.89</text>
                    </view>
                  </view>
                </view>
            </view>
            </view>
          </van-tab>
          <van-tab title="百货">
            <view v-for="item in 100" :key ="item">{{item}}</view>
          </van-tab>
          <van-tab title="食品">内容 3</van-tab>
          <van-tab title="内衣">内容 4</van-tab>
          <van-tab title="水果">内容 4</van-tab>
          <van-tab title="化妆">内容 4</van-tab>
        </van-tabs>
      </view>
  </view>
</template>

<script>
import bannerSwiper from '@/components/banner-swiper'
import {get} from '@/api/http'
export default {
  components: { bannerSwiper },
  data() {
    return {
      searchValue: '',
      tabActive: 0,
      imgUrls: [
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-gulaorou.png',
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-heniu.png',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572167835009&di=9a7b805520cad4b7bdbc49bb8a45066d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F037094356e1859e32f875520f774466.jpg'
      ]
    }
  },
  onReachBottom() {
  // 到这底部在这里需要做什么事情
    console.log(123)
  },
  onPullDownRefresh() {
    console.log(123)
    wx.showNavigationBarLoading()
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1500)
  },
  methods: {
    bindViewTap() {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    async detail() {
      const result = await get('url')
      console.log(result)
      console.log(1)
    },
    onChange() {}
  }
}
</script>
<style lang="scss">
page{
  background:#f6f5f4;
}
.header-container {
  background-image: linear-gradient(180deg,#eb3e47, #ffffff);
  padding-top:100rpx;
  .van-search__content {
     border-radius: 16px!important;
  }
}
.tabs-container {
  margin-top:10rpx;
  .item-container{
     display:flex;
     padding:16rpx;
     height:240rpx;
     image {
       width:240rpx;
       height:100%;
       border-radius:10rpx;
     }
     .item-right-container{
       display:flex;
       margin-left:13rpx;
       font-size:21rpx;
       flex:1;
       flex-direction:column;
       .right-title{
          margin-top:10rpx;
          font-size:27rpx;
       }
       .right-sales{
         margin:10rpx 0 24rpx;
         font-size:23rpx;
         color:#9d9d9d;
       }
       .right-coupon{
          color:#EE4000;
          background:#fcf3f4;
       }
       .right-return-cash{
          margin-left:10rpx;
          color:#EEAD0E;
          background:#fdf1f9;
       }
       .coupon-cash{
          padding:3rpx;
          border-radius: 5rpx;
       }
       .right-bottom-container{
          display:flex;
          margin-top:8rpx;
          justify-content:space-between;
          height:60rpx;
          line-height:60rpx;
          .post-coupon{
            color:#cd4939;
            font-size: 27rpx;
            font-weight:bold;
            :nth-child(2){
              margin:0 2rpx;
            }
            :nth-child(3){
              font-size: 33rpx;
            }
          }
          .save-money{
              background:#cd4939;
              width:35%;
              font-size:29rpx;
              color:#fff;
              text-align:center;
              border-radius:8rpx;
              :nth-child(3){
                margin:0 5rpx;
                font-size:23rpx;
              }
              :nth-child(3){
                font-weight: bold;
              }
          }
          .share {
              margin-right:6rpx;
              font-size:26rpx;
          }
       }
     }
  }
}

.van-tab--active{
  color: #eb3e47!important;
}
</style>