<template>
  <view class="item-container">
    <image :src="item.goodsThumbnailUrl" lazy-load="true" />
    <view class="item-right-container">
      <view class="right-title">{{ item.goodsName }}</view>
      <view class="right-sales">销量{{ item.salesTip }}</view>
      <view v-if="item.couponDiscount !== '0'">
        <text class="right-coupon coupon-cash">{{ item.couponDiscount }}元券</text>
        <!-- <text class="right-return-cash coupon-cash"></text> -->
      </view>
      <view class="right-bottom-container">
        <view class="post-coupon">
          <text v-if="item.couponDiscount !== '0'">券后</text>
          <text>¥</text>
          <text class="post-coupon-price">{{ item.couponPrice }}</text>
        </view>
        <view class="save-money">
          <text class="iconfont iconfenxiang"></text>
          <text>省</text>
          <text>¥</text>
          <text>{{ item.commission }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'indexList',
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  }
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
    justify-content: space-between;
    .right-title {
      margin-top: 10rpx;
      font-size: 27rpx;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
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
      justify-content: space-between;
      height: 60rpx;
      line-height: 60rpx;
      .post-coupon {
        // color: #ee827c;
        color: #eb6961;
        font-size: 27rpx;
        font-weight: bold;
        :nth-child(2) {
          margin: 0 2rpx;
        }
        &-price {
          font-size: 33rpx;
        }
      }
      .save-money {
        // background-image: linear-gradient(90deg, #88ada6, #8dc63f);
        background: #d55251;
        width: 38%;
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
