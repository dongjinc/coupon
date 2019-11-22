<template>
  <view class="order-container">
    <view class="order-cash">
      <text>累计已返现 0.00元</text>
      <text style="border-left:1rpx solid #eee">累计待返现 0.00元</text>
    </view>
    <van-notice-bar left-icon="volume-o" speed="30" text="本月确认收货的订单次月25日返现到账，无效订单(售后等异常行为)除外。" />
    <van-tabs swipeable animated sticky>
      <van-tab title="全部">
        <view v-for="item in 7" :key="item" class="order-list">
          <view class="order-list-top">
            <text>订单: 20193827462618276482</text>
            <text style="color: #ee7600;">复制</text>
          </view>
          <view class="order-list-center">
            <image
              src="https://t00img.yangkeduo.com/goods/images/2019-10-09/d4628d85c55539782c940e1d643f4e03.jpeg"
            />
            <view class="order-list-center-title">
              <text>超值大包装12包优惠特价买纸，淘遍全球，值得拥有</text>
              <text style="color:	#BEBEBE;font-size:24rpx">下单时间: 2019-01-29 17:28</text>
            </view>
          </view>
          <view class="order-list-down">
            <text style="background:#FFE4E1;color:#EE5C42;">订单金额 ¥ 19.8</text>
            <text style="background:#F0F8FF;color:#87CEFF;">已返现 ¥ 0.8</text>
          </view>
        </view>
      </van-tab>
      <van-tab title="待返现">内容 2</van-tab>
      <van-tab title="已返现">内容 3</van-tab>
      <van-tab title="无效订单">内容 4</van-tab>
    </van-tabs>
  </view>
</template>
<script>
export default {
  name: 'Order'
}
</script>
<style lang="scss">
page {
  background: #f6f5f4;
}
.order-container {
  // 提现
  .order-cash {
    display: flex;
    padding: 10rpx 0;
    font-size: 23rpx;
    background: #ff6461;
    color: #fff;
    text {
      flex: 1;
      text-align: center;
    }
    :first-child {
      border-right: 1rpx solid #eee;
    }
  }
  // 订单列表
  .order-list {
    display: flex;
    flex-direction: column;
    margin: 10rpx 30rpx 0 30rpx;
    padding: 20rpx 10rpx;
    font-size: 26rpx;
    background: #fff;
    border-radius: 10rpx;
    &-top {
      display: flex;
      justify-content: space-between;
      :nth-child(1) {
        color: #6e6e6e;
      }
    }
    &-center {
      display: flex;
      margin: 16rpx 0;
      image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 15rpx;
        margin-right: 20rpx;
      }
      &-title {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 70%;

        :first-child {
          color: #6e6e6e;
        }
      }
    }
    &-down {
      text-align: right;
      text {
        padding: 4rpx 8rpx;
        border-radius: 8rpx;
        margin: 0 8rpx;
      }
    }
  }
}
</style>