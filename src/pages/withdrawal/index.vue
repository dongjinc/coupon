<template>
  <view style="margin:0 32rpx;">
    <view
      style="display:flex;justify-content:space-between;padding:35rpx;box-sizing:border-box;height:210rpx;border-radius:15rpx;background:linear-gradient(90deg, #EE799F, #F08080 );margin-top:30rpx;color:#fff;box-shadow:0 20rpx 60rpx #FFC0CB"
    >
      <view style="display:flex;flex-direction:column;flex: 1;">
        <text style="font-size:28rpx;">当前余额(元)</text>
        <view>
          <text>¥</text>
          <text style="font-size:56rpx;line-height:95rpx;">{{memberMoney.money}}</text>
        </view>
      </view>
      <view
        style="width:130rpx;height:40rpx;border-radius:25rpx;border:1px solid #fff;padding:8rpx;font-size:26rpx;line-height:40rpx;text-align:center"
      >余额明细</view>
    </view>
    <view style="display:flex;justify-content:space-between;padding: 16rpx 0;">
      <view>提现方式</view>
      <view>红包</view>
    </view>
  </view>
</template>
<script>
import { get } from '@/utils/http'
export default {
  name: 'withdrawal',
  data() {
    return {
      memberMoney: {}
    }
  },
  onShow() {
    this.getMemberMoney()
  },
  methods: {
    async getMemberMoney() {
      try {
        const result = await get('api/v1/member/memberMoney')
        this.memberMoney = result
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>