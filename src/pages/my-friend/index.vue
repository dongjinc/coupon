<template>
  <view>
    <view
      style="height: 300rpx;background-image: linear-gradient(90deg, #ef7a82, #d55251);border-radius: 0 0 50px 50px;padding-top:30px;"
    >
      <view style="display:flex;justify-content:space-around">
        <view style="display:flex;flex-direction:column;text-align:center;color:#B9D3EE">
          <text style="font-size:14px">我的好友</text>
          <text style="font-size: 35px;margin-top:15px;font-weight:bold">0</text>
        </view>
        <view style="display:flex;flex-direction:column;text-align:center;color:#B9D3EE">
          <text style="font-size:14px">我的直推的合伙人</text>
          <text style="font-size: 35px;margin-top:15px;font-weight:bold">0</text>
        </view>
      </view>
      <view style="width:100%;height:100rpx;position:absolute;top:280rpx;">
        <view
          style="width:93%;height:120rpx;background:#fff;margin:0 auto;border-radius:50rpx;box-shadow:0 10px 9px #eee"
        >
          <view></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'myFriend'
}
</script>
<style lang="scss">
page {
  background: #f6f5f4;
}
</style>