<template>
  <view style="padding: 20rpx 16rpx">
    <view
      style="height:360rpx;border-radius:10rpx;overflow:hidden;margin:10rpx 0 50rpx;box-shadow: 0 0 60rpx rgba(213,82,81, .5)"
    >
      <image style="width:100%;height:100%" :src="specialObj.imageUrl" />
      <view
        style="display:flex;justify-content:space-between;padding:0 15rpx;margin: 15rpx 0 20rpx"
      >
        <!-- <view
                    v-for="item in 6"
                    :key="item"
                    style="width:15%;background:#eee;height:100rpx;"
        >1</view>-->
      </view>
      <!-- <view style="display:flex;justify-content:space-between;padding:0 15rpx;line-height:60rpx;">
        <text style="font-size: 29rpx;">{{specialObj.title}}</text>
        <view
          style="height:60rpx;background:#d55251;width:150rpx;text-align:center;font-size:28rpx;border-radius:5rpx;color:#fff"
        >分享专题</view>
      </view>-->
    </view>
    <view
      v-for="(child, childIndex) in listData"
      :key="childIndex"
      @tap="moveToDetail(child)"
      style="background:#fff"
    >
      <view class="item-container">
        <image :src="child.goodsThumbnailUrl" lazy-load="true" />
        <view class="item-right-container">
          <view class="right-title">{{ child.goodsName }}</view>
          <view class="right-sales">销量{{ child.salesTip }}</view>
          <view v-if="child.couponDiscount !== '0'">
            <text class="right-coupon coupon-cash">{{ child.couponDiscount }}元券</text>
            <!-- <text class="right-return-cash coupon-cash"></text> -->
          </view>
          <view class="right-bottom-container">
            <view class="post-coupon">
              <text v-if="child.couponDiscount !== '0'">券后</text>
              <text>¥</text>
              <text class="post-coupon-price">{{ child.couponPrice }}</text>
            </view>
            <view class="save-money">
              <text class="iconfont iconfenxiang"></text>
              <text>省</text>
              <text>¥</text>
              <text>{{ child.commission }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { get } from '@/utils/http'
import { moveTo } from '@/utils/common'
export default {
  name: 'special',
  data() {
    return {
      specialObj: {},
      listData: []
    }
  },
  onLoad(query) {
    this.specialObj = {

    }
    this.listData = []
    this.getSpecialList()
  },
  methods: {
    async getSpecialList() {
      wx.showLoading({
        title: '加载中...',
        icon: 'none'
      })
      try {
        const { id, title, imageUrl } = this.$mp.query
        const result = await get('api/v1/goods/themeGoodsList', { themeId: id })
        this.listData = result.splice(0, 10)
        this.specialObj = {
          imageUrl: decodeURIComponent(imageUrl),
          title: decodeURIComponent(title)
        }
        setTimeout(() => {
          this.listData.push(...result)
        })
      } catch (e) {
        console.log(e)
      } finally {
        wx.hideLoading()
      }
    },
    // 移动详情页
    moveToDetail(item) {
      moveTo('../detail/main', { id: item.goodsId })
    }
  }
}
</script>