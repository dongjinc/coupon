<template>
    <view class="detail-container">
      <text class="iconfont share back" @tap="back"></text>
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
      <view class="commodity-container">
          <!-- <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:350px" /> -->
          <view class="commodity-title">
            <view class="commodity-price font-27">
              <text>券后</text>
              <text>¥</text>
              <text>17.89</text>
              <text class="font-27">¥19.89</text>
            </view>
            <view class="commodity-assemble">已拼10万+件</view>
          </view>
          <view class="commodity-coupon">
            <text>发券</text>
            <text class="coupon-rest">2元券剩余1000000张</text>
          </view>
          <view class="commodity-return-cash">
            <text class="cash">返现</text>
            <text class="estimate">得16%预计<text style="color:#be5041">1.29元</text>，晋升到中级预计赚2.66元</text>
            <view class="right">></view>
          </view>
          <text class="commodity-name">
            富贵秋冬女加绒羽绒服上衣粉红色少女长低领针毛绒
          </text>
          <view class="commodity-service">
            <text>退货包运费 · 极速退款 · 极速退款 · 极速退款</text>
            <text style="margin-left:auto">></text>
          </view>
      </view>
       <view class="similar-commodity">
         <view class="similar-title">
          <view>相似商品</view>
          <view style="color:#91918f">
            <text>查看全部</text>
            <text style="margin-left:9rpx">></text>
          </view>
        </view>
        <!-- 更多商品 -->
        <view class="more-commodity">
          <view v-for="item in 7" :key="item" class="more-commodity-item">
            <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" />
            <view class="post-coupon">
              <text>券后</text>
              <text>¥</text>
              <text style="font-size:25rpx">17.89</text>
            </view>
          </view>
        </view>
       </view>
       
        <view class="similar-commodity">
         <view class="similar-title">
          <view>商品评价</view>
          <view style="color:#91918f">
            <text>查看全部</text>
            <text style="margin-left:9rpx">></text>
          </view>
        </view>
        <!-- 评论 -->
        <view class="more-commodity" style="display:flex;flex-direction:column">
          <!-- 评论标签 -->
          <view style="font-size:24rpx;display:flex;margin-bottom:10rpx">
            <view style="padding:10rpx;background:#f6e8eb;border-radius:10rpx;color:#333;margin-right:12rpx">正品(18)</view>
            <view style="padding:10rpx;background:#f6e8eb;border-radius:10rpx;color:#333;margin-right:12rpx">质量很好(10218)</view>
            <view style="padding:10rpx;background:#f6e8eb;border-radius:10rpx;color:#333;margin-right:12rpx">衣服很好(389218)</view>
          </view>
          <!-- 评论列表 -->
          <view style="display:flex;flex-direction:column;font-size:24rpx;padding:15rpx 0;border-bottom:2rpx solid #eee">
            <view style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10rpx">
              <view style="display:flex;align-items:center;">
                <image src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573316656&di=e6346dfae80b451c19ccf8e6253ae28a&src=http://downhdlogo.yy.com/hdlogo/640640/630/630/71/1000710067/u1000710067JGb2l8C.png" style="width:40rpx;height:40rpx;border-radius:50%;margin-right:10rpx" />
                <text>凌波的云</text>
              </view>
              <view style="color:#91918f">2019.10.10</view>
            </view>
            <view style="color:#696969">这件衣服很好看。。。</view>
          </view>
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
        <!-- 店铺 -->
        <view class="similar-commodity">
         <view style="display:flex;justify-content:space-between;align-items:center">
          <view style="display:flex;align-items:center">
            <image src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573316656&di=e6346dfae80b451c19ccf8e6253ae28a&src=http://downhdlogo.yy.com/hdlogo/640640/630/630/71/1000710067/u1000710067JGb2l8C.png" style="width:70rpx;height:70rpx;border-radius:10rpx;margin-right:10rpx" />
            <view style="display:flex;flex-direction:column;font-size:24rpx;margin-left:10rpx">
              <view>
                <text style="font-size:27rpx">良品店子铺</text>
                <text style="padding:2rpx;background:pink;border-radius:8rpx;font-size:21rpx;margin-left:10rpx;color:	#FF6347">全国推广1%</text>
              </view>
              <view style="margin-top:8rpx;font-size:21rpx;color:#91918f">
                <text>商品数量：9</text>
                <text style="margin-left:18rpx">已拼：10万+件</text>
              </view>
            </view>
          </view>
          <view style="padding:6rpx;border-radius:10rpx;font-size:24rpx;border:2rpx solid #eee">进入店铺</view>
        </view>
        <view style="display:flex;justify-content:space-between">
          <text>1</text>
          <text>2</text>
          <text>3</text>
        </view>
       </view>
       <!-- 详情 -->
       <view class="similar-commodity">
         <view class="similar-title">
          <view>商品详情</view>
        </view>
        <view style="margin-top:15rpx;padding-bottom:100rpx">
          <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:600rpx" />
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
  .font-27{
    font-size:27rpx;
  }
  .detail-container{
    .back{
        font-size:39rpx;
        position:fixed;
        top:33px;
        left:27px;
        z-index:1;
    }
    .commodity-container{
      padding:10rpx 27rpx 0 27rpx;
      background:#fff;
      .commodity-title{
        display: flex;
        justify-content:space-between;
        align-items:center;
        .commodity-price{
          color:#cd4939;
          :nth-child(2){
            margin:0 3rpx;
            font-weight:bold;
          }
          :nth-child(3){
            margin-right:12rpx;
            font-size:50rpx;
            font-weight:bold;
          }
          :nth-child(4){
            color:#808281;
            text-decoration:line-through
          }
        }
        .commodity-assemble{
            font-size:25rpx;
            color:#808281;
        }
      }
      .commodity-coupon{
        margin:20rpx 0;
        font-size:23rpx;
        :first-child{
          padding:4rpx 8rpx;
          background:#be5041;
          border-radius:5rpx;
          color:#fff;
        }
        .coupon-rest{
          margin-left:8rpx;
          padding:2rpx 8rpx;
          border:3rpx solid #be5041;
          border-radius:5rpx;
          color:#be5041;
        }
      }
      .commodity-return-cash{
        display:flex;
        align-items:center;
        font-size:23rpx;
        .cash{
          padding:5rpx 8rpx;
          background:#be5041;
          border-radius:5rpx;
          color:#fff;
        }
        .estimate{
          margin-left:8rpx;
          color:#91918f;
        }
        .right{
          margin-left:auto;
          color:#91918f
        }
      }
      .commodity-name{
        display:flex;
        margin-top:15rpx;
        padding-bottom:16rpx;
        border-bottom:2rpx solid #eee;
      }
      .commodity-service{
        display:flex;
        padding:18rpx 0;
        align-items:center;
        font-size:25rpx;
        color:#91918f;
      }
    }
    .similar-commodity{
        margin-top:15rpx;
        padding:0 27rpx;
        background:#fff;
          .similar-title {
            display:flex;
            padding:15rpx 0;
            justify-content:space-between;
            border-bottom:2rpx solid #eee;
            font-size:27rpx;
        }
        .more-commodity{
          display:flex;
          margin-top:15rpx;
          overflow-y:auto;
          -webkit-overflow-scrolling: touch;
          &-item {
            display:flex;
            flex-shrink:0;
            flex-direction:column;
            align-items:center;
            margin-right:10rpx;
            width:150rpx;
            height:180rpx;
            image{
              width:100%;
              height:150rpx;
            }
            .post-coupon{
              font-size:18rpx;
              font-weight:bold;
              color:#be5041;
            }
          }
        }
      }
  }
</style>