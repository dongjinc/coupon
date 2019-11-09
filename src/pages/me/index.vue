<template>
    <view>
      <!-- 头部 -->
      <view style="height:570rpx">
        <!-- 个人 -->
        <view style="display:flex;padding:150rpx 16rpx 0 16rpx;">
          <image src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573316656&di=e6346dfae80b451c19ccf8e6253ae28a&src=http://downhdlogo.yy.com/hdlogo/640640/630/630/71/1000710067/u1000710067JGb2l8C.png" style="width:100rpx;height:100rpx;border-radius:50%" />
          <view style="display:flex;flex-direction:column;justify-content:space-between;margin-left:15rpx;font-size:26rpx;position:relative">
            <text>15275905257 ></text>
            <text style="padding:9rpx;background:#FFE4B5;position:absolute;top:24px;border-radius:25rpx;font-size:23rpx;border:2rpx solid #FFA500;color:#FFA500">金币666</text>
          </view>
        </view>
        <view style="background:#e86453;height:200rpx;border-radius:20rpx 20rpx 0 0;margin:24rpx 16rpx;padding:20rpx 15rpx 20rpx 45rpx;color:#fff;font-size:26rpx">
          <text>可提现余额</text>
          <view style="display:flex;justify-content:space-between;align-items:center">
            <text>¥<text style="font-size:50rpx;margin-left:8rpx">0.00</text></text>
            <text style="padding:12rpx;background:#fff;color:#e86453;border-radius:25rpx;font-size:24rpx">我的收入></text>
          </view>
          <view style="display:flex;justify-content:space-between;align-items:center;margin-top:50rpx">
            <text>即将到账<text style="margin-left:10rpx;">¥ 100.00</text></text>
            <text>|</text>
            <text>累计到账<text style="margin-left:10rpx;">¥ 0.00</text></text>
          </view>
        </view>
      </view>
    </view>
</template>
<script>
export default {
  name: 'Me'
}
</script>
<style lang="scss">
page{
  background:#f6f5f4;
}
</style>