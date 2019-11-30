<template>
  <view class="me-container">
    <!-- 头部 -->
    <view class="me-header">
      <!-- 个人 -->
      <view class="person-wrap" v-if="isLogin">
        <image
          src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573316656&di=e6346dfae80b451c19ccf8e6253ae28a&src=http://downhdlogo.yy.com/hdlogo/640640/630/630/71/1000710067/u1000710067JGb2l8C.png"
        />
        <view class="member-content">
          <view class="member-name">
            普通会员
            <view class="iconfont iconyou"></view>
          </view>
          <text class="gold">金币666</text>
        </view>
        <view class="earn-more">
          <view class="more-content">
            <text class="iconfont iconjinbi1"></text>赚更多
          </view>
        </view>
      </view>
      <view class="not-logged" v-else>
        <button
          type="primary"
          size="mini"
          open-type="getUserInfo"
          @getuserinfo="getUserInfo"
          @tap="getLoginCode"
        >请登录</button>
      </view>
      <view class="income-wrap">
        <view class="income-content">
          <view class="income-content-left" @tap="moveToWithdrawal">
            <text>可提现余额</text>
            <view>
              ¥
              <text style="font-size:58rpx;">0.00</text>
            </view>
          </view>
          <view class="income-content-right" @tap="moveToIncome">
            <view>我的收入</view>
            <view class="iconfont iconyou"></view>
          </view>
        </view>
        <view class="account-content">
          <text>
            即将到账
            <text class="account-content-border">¥ 100.00</text>
          </text>
          <text>|</text>
          <text>
            累计到账
            <text class="account-content-border">¥ 0.00</text>
          </text>
        </view>
      </view>
    </view>
    <view class="swiper-wrap">
      <swiper
        indicator-dots="true"
        autoplay="true"
        interval="5000"
        duration="1000"
        indicator-active-color="#fff"
      >
        <block v-for="(item, index) in personalBanner" :key="index">
          <swiper-item>
            <image :src="item" />
          </swiper-item>
        </block>
      </swiper>
    </view>
    <view class="common-fun-wrap">
      <view class="me-item" @tap="moveToOrder">
        <image src="/static/images/order.png" />
        <view>我的订单</view>
      </view>
      <view class="me-item">
        <image src="/static/images/footer.png" />
        <view>浏览记录</view>
      </view>
      <view class="me-item">
        <image src="/static/images/question.png" />
        <view>常见问题</view>
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
    moveToWithdrawal() {
      const url = '../withdrawal/main'
      wx.navigateTo({
        url
      })
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
.me-header {
  .person-wrap {
    display: flex;
    padding: 40rpx 20rpx 0 20rpx;
    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
    .member-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 15rpx;
      font-size: 26rpx;
      .member-name {
        display: flex;
        align-items: center;
        .iconyou {
          margin-left: 10rpx;
          font-size: 21rpx;
        }
      }
      .gold {
        padding: 9rpx;
        background: #ffe4b5;
        position: absolute;
        top: 24px;
        border-radius: 25rpx;
        font-size: 23rpx;
        border: 2rpx solid #ffa500;
        color: #ffa500;
      }
    }
    .earn-more {
      display: flex;
      align-items: center;
      margin-left: auto;
      .more-content {
        display: flex;
        align-items: center;
        height: 30rpx;
        line-height: 50px;
        padding: 8rpx;
        font-size: 25rpx;
        background: #e86453;
        border-radius: 10rpx;
        color: #fff;
      }
    }
  }
  .not-logged {
    margin-top: 50rpx;
    text-align: center;
  }
  .income-wrap {
    background: #e86453;
    height: 200rpx;
    border-radius: 20rpx 20rpx 0 0;
    margin: 24rpx 20rpx;
    padding: 20rpx 15rpx 20rpx 45rpx;
    color: #fff;
    font-size: 26rpx;
    .income-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-left {
        width: 60%;
        display: flex;
        flex-direction: column;
      }
      &-right {
        display: flex;
        align-items: center;
        padding: 12rpx;
        background: #fff;
        color: #e86453;
        border-radius: 25rpx;
        .iconyou {
          font-size: 21rpx;
        }
      }
    }
    .account-content {
      margin: 40rpx 0 5rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-border {
        margin-left: 10rpx;
      }
    }
  }
}
.swiper-wrap {
  padding: 0 40rpx;
  ._swiper {
    height: 200rpx;
    text-align: center;
  }
  ._swiper-item {
    height: 200rpx;
    border-radius: 25rpx;
    image {
      width: 100%;
      height: 200rpx;
    }
  }
}
.common-fun-wrap {
  display: flex;
  margin: 30rpx 40rpx;
  padding: 10rpx 20rpx;
  background: #fff;
  border-radius: 25rpx;
  .me-item {
    margin: 20rpx 27rpx 0 0;
    text-align: center;
    image {
      width: 60rpx;
      height: 60rpx;
    }
    view {
      color: #555;
      font-size: 26rpx;
    }
  }
}
</style>