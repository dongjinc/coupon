<template>
  <view>
    <view
      style="height: 300rpx;background-image: linear-gradient(90deg, #ef7a82, #d55251);border-radius: 0 0 50px 50px;padding-top:30px;"
    >
      <view style="display:flex;justify-content:space-around">
        <view style="display:flex;flex-direction:column;text-align:center;color:#fff">
          <text style="font-size:14px">我的好友</text>
          <text style="font-size: 35px;margin-top:15px;font-weight:bold">0</text>
        </view>
        <view style="display:flex;flex-direction:column;text-align:center;color:#fff">
          <text style="font-size:14px">我的直推的合伙人</text>
          <text style="font-size: 35px;margin-top:15px;font-weight:bold">0</text>
        </view>
      </view>
      <view style="width:100%;height:100rpx;position:absolute;top:280rpx;">
        <view
          style="display:flex;align-items:center;width:93%;height:120rpx;background:#fff;margin:0 auto;border-radius:50rpx;box-shadow:0 10px 9px #eee;font-size:27rpx"
        >
          <view style="margin: 0 20rpx">
            <image
              src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIqLVWicHKwuBia3O9xR1oN9eI5EaORmV9suCtmV5aUicbwG2pH1CZoEicaCPppxBTHg2KTrzohmC5taA/132"
              style="width:60rpx;height:60rpx;border-radius:50%"
            />
          </view>
          <view style="display:flex;flex-direction:column">
            <div>
              <text>名字</text>
              <text
                style="margin-left:25rpx;background:#FFC0CB;border-radius:15px;padding:0 10rpx;color:#fff"
              >我的邀请人</text>
            </div>
            <text>称号</text>
          </view>
        </view>
      </view>
      <view style="margin-top:95px;">
        <view
          style="display:flex;justify-content:space-around;font-size:29rpx;padding:15rpx 0;border-bottom:1px solid #eee"
        >
          <view
            v-for="(item, index) in sortList"
            :key="index"
            :class="[activeIndex === index?'activeItem': '']"
            style="position:relative;color:#444"
            @tap="focusItem(item, index)"
          >
            {{item.name}}
            <view style="position:absolute;right:-23rpx;top:5rpx;" v-if="item.isDot">
              <i
                :class="[activeDot === 0 && activeIndex === index?'activeItem': '', 'iconfont','iconsanjiaoxing']"
              ></i>
              <i
                :class="[activeDot === 1 && activeIndex === index?'activeItem': '', 'iconfont','iconsanjiaoxing-xia']"
              ></i>
            </view>
          </view>
        </view>
        <view v-for="item in 8" :key="item" style="padding: 0 50rpx;border-bottom: 2rpx solid #eee">
          <view style="display:flex;font-size:28rpx;padding:15rpx 0;">
            <image
              src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIqLVWicHKwuBia3O9xR1oN9eI5EaORmV9suCtmV5aUicbwG2pH1CZoEicaCPppxBTHg2KTrzohmC5taA/132"
              style="width:60rpx;height:60rpx;border-radius:50%"
            />
            <view style="display:flex;flex-direction: column;margin-left:20rpx;font-size:27rpx">
              <view style="height:40rpx; line-height:52rpx;">
                <text style="font-size:30rpx;color:#333">姓名</text>
                <text
                  style="margin-left: 5rpx;padding: 5rpx;background: #cadbfd;color:#6495ED;border-radius: 10rpx"
                >会员</text>
              </view>
              <view style="color:#999; line-height:60rpx;margin-top:20rpx">
                <text>邀请时间:</text>
                <text style="margin-left: 5rpx;">2019-11-15</text>
              </view>
              <view style="color:#555; line-height:60rpx">
                <text>直邀好友:</text>
                <text style="margin-left: 5rpx;">2</text>
              </view>
              <view style="color:#555; line-height:60rpx">
                <text>团队人数:</text>
                <text style="margin-left: 5rpx;">2</text>
              </view>
              <view style="color:#555; line-height:60rpx">
                <text>最近登录时间:</text>
                <text style="margin-left: 5rpx;">2019-12-01 23:12:10</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { get } from '@/utils/http'
export default {
  name: 'myFriend',
  data() {
    return {
      sortList: [
        { name: '加入时间', isDot: true },
        { name: '好友数量', isDot: true },
        { name: '好友等级', isDot: false }
      ],
      activeIndex: -1,
      // 上为0 下为1
      activeDot: 0
    }
  },
  watch: {
    activeIndex(newVal, oldVal) {
      console.log(newVal, oldVal)
      if (newVal !== oldVal) {
        this.activeDot = 1
      }
    }
  },
  async onLoad() {
    const result = await get('/api/v1/member/friendsList')
    console.log(result)
  },
  onUnload() {
    this.activeIndex = -1
  },
  methods: {
    focusItem(item, index) {
      this.activeIndex = index
      this.activeDot++
      if (this.activeDot === 2) {
        this.activeDot = 0
      }
    }
  }
}
</script>
<style lang="scss">
page {
  background: #fff;
}
.iconfont {
  font-size: 17rpx;
  color: #eee;
}
.iconsanjiaoxing {
  margin-top: 3rpx;
}
.iconsanjiaoxing-xia {
  margin-top: -3rpx;
}
.activeItem {
  color: #d55251 !important;
}
</style>