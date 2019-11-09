<template>
    <view>
      <text class="iconfont share" style="font-size:39rpx;position:fixed;left:27px;top:33px;z-index:1" @tap="back"></text>
      <!-- 预览图 -->
      <swiper :indicator-dots="false" style="height:360px;">
        <block>
          <swiper-item>
              <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:360px" />    
          </swiper-item>
          <swiper-item>
              <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:360px" />    
          </swiper-item>
        </block>
      </swiper>
      <view style="padding:10rpx 27rpx 0 27rpx;background:#fff">
          <!-- <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:350px" /> -->
          <view style="display: flex;justify-content:space-between;align-items:center">
            <view style="color:#cd4939;font-size:27rpx;">
              <text>券后</text>
              <text style="margin:0 7rpx;font-weight:bold">¥</text>
              <text style="font-size:50rpx;margin-right:12rpx;font-weight:bold">17.89</text>
              <text style="color:#808281;font-size:27rpx;text-decoration:line-through">¥19.89</text>
          </view>
          <view style="font-size:25rpx;color:#808281;">已拼10万+件</view>
          </view>
          <view style="font-size:23rpx;margin:20rpx 0">
            <text style="background:#be5041;padding:4rpx 8rpx;border-radius:5rpx;color:#fff">发券</text>
            <text style="border:3rpx solid #be5041;padding:2rpx 8rpx;border-radius:5rpx;margin-left:8rpx;color:#be5041">2元券剩余1000000张</text>
          </view>
          <view style="font-size:23rpx;display:flex;align-items:center">
            <text style="background:#be5041;padding:5rpx 8rpx;border-radius:5rpx;color:#fff">返现</text>
            <text style="margin-left:8rpx;color:#91918f">得16%预计<text style="color:#be5041">1.29元</text>，晋升到中级预计赚2.66元</text>
            <text style="margin-left:auto;color:#91918f">></text>
          </view>
          <text style="margin-top:15rpx;display:flex;border-bottom:2rpx solid #eee;padding-bottom:16rpx">
            富贵秋冬女加绒羽绒服上衣粉红色少女长低领针毛绒
          </text>
          <view style="display:flex;color:#91918f;font-size:25rpx;padding:18rpx 0;align-items:center">
            <text>退货包运费 · 极速退款 · 极速退款 · 极速退款</text>
            <text style="margin-left:auto">></text>
          </view>
      </view>
       <view style="margin-top:15rpx;background:#fff;padding:0 27rpx">
         <view style="display:flex;justify-content:space-between;font-size:27rpx;padding:15rpx 0;border-bottom:2rpx solid #eee">
          <view>相似商品</view>
          <view style="color:#91918f">
            <text>查看全部</text>
            <text style="margin-left:9rpx">></text>
          </view>
        </view>
        <!-- 更多商品 -->
        <view style="margin-top:15rpx;display:flex;overflow-y:auto;-webkit-overflow-scrolling: touch;">
          <view v-for="item in 7" :key="item" style="display:flex;flex-direction:column;align-items:center;height:180rpx;width:150rpx;margin-right:10rpx;flex-shrink:0">
            <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:150rpx" />
            <view style="font-size:18rpx;font-weight:bold;color:#be5041">
              <text>券后</text>
              <text>¥</text>
              <text style="font-size:25rpx">17.89</text>
            </view>
          </view>
        </view>
        <!-- 详情 -->
        <view style="padding-bottom:100rpx">
          <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:600rpx" />
        </view>
       </view>
       <!-- 分享以及立刻购买 -->
       <view style="position:fixed;display:flex;height:100rpx;background:red;bottom:0;width:100%;font-size:25rpx;color:white">
         <view style="background:#eaa59e;flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column">
           <view style="font-size:31rpx">分享商品</view>
           <view><text class="iconfont share" style="font-size:25rpx"></text>拿奖励</view>
         </view>
         <view style="background:#d44f38;flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column">
           <view style="font-size:31rpx">立即购买</view>
           <view>省3.26元</view>
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
<style lang="scss">
  page{
    background:#f6f5f4;
  }
</style>