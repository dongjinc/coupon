<template>
  <view>
    <!-- 头部 -->
    <view>
      <!-- 个人 -->
      <view style="display:flex;padding:40rpx 20rpx 0 20rpx;" v-if="isLogin">
        <image
          src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573316656&di=e6346dfae80b451c19ccf8e6253ae28a&src=http://downhdlogo.yy.com/hdlogo/640640/630/630/71/1000710067/u1000710067JGb2l8C.png"
          style="width:100rpx;height:100rpx;border-radius:50%"
        />
        <view
          style="display:flex;flex-direction:column;justify-content:space-between;margin-left:15rpx;font-size:26rpx;position:relative"
        >
          <view style="display: flex;align-items:center">
            普通会员
            <view class="iconfont iconyou" style="font-size:21rpx;margin-left:10rpx"></view>
          </view>
          <text
            style="padding:9rpx;background:#FFE4B5;position:absolute;top:24px;border-radius:25rpx;font-size:23rpx;border:2rpx solid #FFA500;color:#FFA500"
          >金币666</text>
        </view>
        <view style="display:flex;align-items:center;margin-left:auto">
          <view
            style="display:flex;align-items:center;height:30rpx;line-height:50px;padding:8rpx;font-size:25rpx;background:#e86453;border-radius:10rpx;color:#fff"
          >
            <text class="iconfont iconjinbi1"></text>赚更多
          </view>
        </view>
      </view>
      <view v-else style="text-align:center;margin-top: 50rpx;">
        <button
          type="primary"
          size="mini"
          open-type="getUserInfo"
          @getuserinfo="getUserInfo"
          @tap="getLoginCode"
        >请登录</button>
      </view>
      <view
        style="background:#e86453;height:200rpx;border-radius:20rpx 20rpx 0 0;margin:24rpx 20rpx;padding:20rpx 15rpx 20rpx 45rpx;color:#fff;font-size:26rpx"
      >
        <view style="display:flex;justify-content:space-between;align-items:center">
          <view style="display:flex;flex-direction:column;width:60%" @tap="onWithdrawal">
            <text>可提现余额</text>
            <view>
              ¥
              <text style="font-size:58rpx;">0.00</text>
            </view>
          </view>
          <view
            @tap="moveToIncome"
            style="display:flex;align-items:center;padding:12rpx;background:#fff;color:#e86453;border-radius:25rpx;"
          >
            <view>我的收入</view>
            <view class="iconfont iconyou" style="font-size:21rpx;"></view>
          </view>
        </view>
        <view
          style="display:flex;justify-content:space-between;align-items:center;margin:40rpx 0 5rpx"
        >
          <text>
            即将到账
            <text style="margin-left:10rpx;">¥ 100.00</text>
          </text>
          <text>|</text>
          <text>
            累计到账
            <text style="margin-left:10rpx;">¥ 0.00</text>
          </text>
        </view>
      </view>
    </view>
    <view style="padding:0 40rpx;">
      <swiper
        style="text-align:center;height:200rpx"
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000"
        indicator-active-color="#fff"
      >
        <block v-for="(item, index) in personalBanner" :key="index">
          <swiper-item style="border-radius:25rpx;height:200rpx">
            <image :src="item" style="width:100%;height:200rpx" />
          </swiper-item>
        </block>
      </swiper>
    </view>
    <view
      style="margin:30rpx 40rpx;padding:10rpx 20rpx;background:#fff;border-radius:25rpx;display:flex;"
    >
      <view style="margin:20rpx 0;text-align:center;margin-right:27rpx;" @tap="moveToOrder">
        <image src="/static/images/order.png" style="width:60rpx;height:60rpx;" />
        <view style="color:#555;font-size:26rpx;">我的订单</view>
      </view>
      <view style="margin:20rpx 0;text-align:center;margin-right:27rpx;">
        <image src="/static/images/footer.png" style="width:60rpx;height:60rpx;" />
        <view style="color:#555;font-size:26rpx">浏览记录</view>
      </view>
      <view style="margin:20rpx 0;text-align:center;margin-right:27rpx;">
        <image src="/static/images/question.png" style="width:60rpx;height:60rpx;" />
        <view style="color:#555;font-size:26rpx">常见问题</view>
      </view>
    </view>
    <!-- <view style="margin:30rpx 40rpx;padding:10rpx 20rpx;background:#fff;border-radius:25rpx">
      <text style="font-weight:bold">常用功能</text>
      <view style="margin:20rpx 0;display:flex;align-items:center">
        <image src="/static/images/order.png" style="width:60rpx;height:60rpx;margin-right:15rpx" />
        <text style="color:#555;font-size:28rpx;margin-right:30rpx">订单</text>
        <image src="/static/images/footer.png" style="width:60rpx;height:60rpx;margin-right:15rpx" />
        <text style="color:#555;font-size:28rpx">浏览</text>
      </view>
    </view>-->
  </view>
</template>
<script>
import { post } from '@/utils/http'
export default {
  name: 'Me',
  data() {
    return {
      isLogin: false,
      loginCode: '',
      personalBanner: [
        'http://img3.imgtn.bdimg.com/it/u=219617380,3771697655&fm=26&gp=0.jpg',
        'http://img1.imgtn.bdimg.com/it/u=162228925,3147880140&fm=26&gp=0.jpg'
      ]
    }
  },
  onShow() {
    const res = wx.getStorageSync('token')
    this.isLogin = !!res
  },
  methods: {
    // 获取用户登录
    async getUserInfo(e) {
      wx.showLoading({
        title: '加载中...'
      })
      if (e.mp.detail.userInfo) {
        try {
          const result = await post('api/v1/login/wx', {
            'code': this.loginCode,
            'encrypted_data': e.mp.detail.encryptedData,
            'iv': e.mp.detail.iv,
            'parentId': -1
          })
          this.isLogin = true
          wx.setStorageSync('token', result.token)
          wx.setStorageSync('time', result.expMillis)
        } catch (e) {
          console.log(e)
        } finally {
          wx.hideLoading()
        }
      } else {
        console.log('error')
      }
    },
    // 获取loginCode
    getLoginCode() {
      const _this = this
      wx.login({
        success(res) {
          if (res.code) {
            _this.loginCode = res.code
            // 发起网络请求
            console.log(res.code)
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    moveToIncome() {
      const url = '../income/main'
      wx.navigateTo({
        url
      })
    },
    // 提现
    onWithdrawal() {
      console.log(123)
    },
    // 我的订单
    moveToOrder() {
      const url = '../order/main'
      wx.navigateTo({
        url
      })
    }
  }
}
</script>
<style lang="scss">
page {
  background: #f6f5f4;
}
.iconjinbi1 {
  color: #ffff00;
}
</style>