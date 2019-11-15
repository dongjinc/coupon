<template>
  <view>
    <view
      v-for="item in 3"
      :key="item"
      style="display:flex;flex-direction:column;border-bottom:2rpx solid #eee;padding:16rpx 16rpx 0"
    >
      <view style="font-size:27rpx;display:flex;align-items:center;">
        <image
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573834603444&di=6f0b79cf28303fb69de7d3afc3c4f84e&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2Fac18b792ly1ftczwflpczj20dm0dmgq2.jpg"
          style="width:35rpx;height:35rpx"
        />
        <text style="margin:0 15rpx 0 10rpx">订单:</text>
        <text>7827381920382837462613</text>
      </view>
      <view style="display:flex;justify-content:space-between;margin:20rpx 0">
        <view style="display:flex;align-items:center">
          <image
            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573316656&di=e6346dfae80b451c19ccf8e6253ae28a&src=http://downhdlogo.yy.com/hdlogo/640640/630/630/71/1000710067/u1000710067JGb2l8C.png"
            style="width:80rpx;height:80rpx;border-radius:50%"
          />
          <view style="display:flex;flex-direction:column;margin-left:25rpx">
            <text style="font-size:35rpx">老实巴交</text>
            <text style="font-size:23rpx;color:#333">2019-11-15 10:30</text>
          </view>
        </view>
        <view>
          <view style="display:flex;flex-direction:column;">
            <text style="font-size:27rpx;color:#333">预计收益</text>
            <text style="font-size:38rpx;color:#e56e86;font-weight:bold;text-align:right">0.25</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'Income'
}
</script>