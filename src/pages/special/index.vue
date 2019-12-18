<template>
  <view style="padding: 20rpx 16rpx">
    <view style="display:flex;font-size:28rpx;">
      <view style="width:10rpx;height:44rpx;background:#39b54a;margin-right:8rpx;"></view>
      <text>推荐专题</text>
    </view>
    <view
      style="height:550rpx;border:1rpx solid #eee;border-radius:10rpx;overflow:hidden;margin-top:10rpx"
    >
      <image
        style="width:100%;height:57%"
        src="http://t16img.yangkeduo.com/pdd_oms/2019-12-12/e94bc17cd9416e4c9f557ad3ee69bd36.png"
      />
      <view
        style="display:flex;justify-content:space-between;padding:0 15rpx;margin: 15rpx 0 20rpx"
      >
        <view v-for="item in 6" :key="item" style="width:15%;background:#eee;height:100rpx;">1</view>
      </view>
      <view style="display:flex;justify-content:space-between;padding:0 15rpx;line-height:80rpx;">
        <text>12.12</text>
        <view
          style="height:80rpx;background:#39b54a;width:150rpx;text-align:center;font-size:28rpx;border-radius:5rpx;color:#fff"
        >分享专题</view>
      </view>
    </view>
  </view>
</template>
<script>
import { get } from '@/utils/http'
export default {
  name: 'special',
  onLoad() {
    console.log(1)
    this.getSpecialList()
  },
  methods: {
    async getSpecialList() {
      const result = await get('api/v1/goods/themeListItems')
      console.log(result)
    }
  }
}
</script>