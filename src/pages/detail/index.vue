<template>
    <view>
      <text class="iconfont share" style="font-size:39rpx;position:fixed;left:27px;top:33px;z-index:1" @tap="back"></text>
      <!-- 预览图 -->
      <swiper :indicator-dots="false" style="height:360px;">
        <block>
          <swiper-item>
              <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:350px" />    
          </swiper-item>
          <swiper-item>
              <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:350px" />    
          </swiper-item>
        </block>
      </swiper>
      <view style="padding:0 27rpx">
          <!-- <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:350px" /> -->
          <view style="display: flex;justify-content:space-between;">
            <view class="post-coupon">
              <text>券后</text>
              <text>¥</text>
              <text>17.89</text>
          </view>
          <view>123</view>
          </view>
          <view>
            <text>发券</text>
            <text>2元券剩余1000000张</text>
          </view>
          <view>
            <text>返现</text>
            <text>得16%预计1.29元</text>
          </view>
          
      </view>
    </view>
</template>
<script>
export default {
  name: 'detail',
  data() {
    return {}
  },
  methods: {
    back() {
      wx.navigateBack()
    }
  }
}
</script>