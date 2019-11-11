<template>
  <view class="item-container">
    <img
      src="https://img30.360buyimg.com/jdcms/s300x300_jfs/t1/18256/13/13656/95361/5ca1d0c5Efcb1005c/d6f50495b3c4baa8.jpg.webp"
    />
    <view class="item-right-container">
      <view class="right-title">【3.84元限时抢，抢完恢复79.9元】返季清仓</view>
      <view class="right-sales">销量10万+件</view>
      <view>
        <text class="right-coupon coupon-cash">2元券</text>
        <text class="right-return-cash coupon-cash">返现5%</text>
      </view>
      <view class="right-bottom-container">
        <view class="post-coupon">
          <text>券后</text>
          <text>¥</text>
          <text>17.89</text>
        </view>
        <view class="save-money">
          <text class="iconfont iconfenxiang"></text>
          <text>省</text>
          <text>¥</text>
          <text>1.89</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'indexList',
  props: {}
}
</script>
<style lang="scss">
.item-container {
  display: flex;
  padding: 16rpx;
  height: 240rpx;
  image {
    width: 240rpx;
    height: 100%;
    border-radius: 10rpx;
  }
  .item-right-container {
    display: flex;
    margin-left: 13rpx;
    font-size: 21rpx;
    flex: 1;
    flex-direction: column;
    .right-title {
      margin-top: 10rpx;
      font-size: 27rpx;
    }
    .right-sales {
      margin: 10rpx 0 24rpx;
      font-size: 23rpx;
      color: #9d9d9d;
    }
    .right-coupon {
      color: #ee4000;
      background: #fcf3f4;
    }
    .right-return-cash {
      margin-left: 10rpx;
      color: #eead0e;
      background: #fdf1f9;
    }
    .coupon-cash {
      padding: 3rpx;
      border-radius: 5rpx;
    }
    .right-bottom-container {
      display: flex;
      margin-top: 8rpx;
      justify-content: space-between;
      height: 60rpx;
      line-height: 60rpx;
      .post-coupon {
        color: #cd4939;
        font-size: 27rpx;
        font-weight: bold;
        :nth-child(2) {
          margin: 0 2rpx;
        }
        :nth-child(3) {
          font-size: 33rpx;
        }
      }
      .save-money {
        background: #cd4939;
        width: 35%;
        font-size: 29rpx;
        color: #fff;
        text-align: center;
        border-radius: 8rpx;
        :nth-child(3) {
          margin: 0 5rpx;
          font-size: 23rpx;
        }
        :nth-child(3) {
          font-weight: bold;
        }
      }
      .iconfenxiang {
        margin-right: 6rpx;
        font-size: 26rpx;
      }
    }
  }
}
</style>