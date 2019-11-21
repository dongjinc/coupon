<template>
  <view>
    <view style="display:flex;padding:10rpx 0;font-size:23rpx;background:	#FF6461;color:#fff">
      <text style="flex:1;border-right:1rpx solid #eee;text-align:center">累计已返现 0.00元</text>
      <text style="flex:1;border-left:1rpx solid #eee;text-align:center">累计待返现 0.00元</text>
    </view>
    <van-notice-bar left-icon="volume-o" speed="30" text="本月确认收货的订单次月25日返现到账，无效订单(售后等异常行为)除外。" />
    <van-tabs swipeable animated sticky>
      <van-tab title="全部">
        <view
          v-for="item in 7"
          :key="item"
          style="display:flex;flex-direction:column;margin:10rpx 30rpx 0 30rpx;font-size:26rpx;padding:20rpx 10rpx;background:#fff;border-radius:10rpx"
        >
          <view style="display:flex;justify-content:space-between">
            <text style="color:#6E6E6E">订单: 20193827462618276482</text>
            <text style="color:	#EE7600">复制</text>
          </view>
          <view style="display:flex;margin:16rpx 0">
            <image
              style="width:180rpx;height:180rpx;border-radius:15rpx;margin-right:20rpx"
              src="https://t00img.yangkeduo.com/goods/images/2019-10-09/d4628d85c55539782c940e1d643f4e03.jpeg"
            />
            <view
              style="display:flex;justify-content:space-between;flex-direction:column;width:70%"
            >
              <text style="color:#6E6E6E">超值大包装12包优惠特价买纸，淘遍全球，值得拥有</text>
              <text style="color:	#BEBEBE;font-size:30rpx">下单时间: 2019-01-29 17:28</text>
            </view>
          </view>
          <view style="text-align:right">
            <text
              style="padding:4rpx 8rpx;background:#FFE4E1;color:#EEB422;border-radius:8rpx;margin:0 8rpx"
            >订单金额 ¥19.8</text>
            <text
              style="padding:4rpx 8rpx;background:#F0F8FF;color:	#ADD8E6;border-radius:8rpx;margin:0 8rpx"
            >已返现 ¥0.8</text>
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
</style>