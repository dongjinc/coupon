<template>
  <view>
    <view class="me-container" v-if="isLogin">
      <!-- 头部 -->
      <view class="me-header">
        <!-- 个人 -->
        <view class="person-wrap">
          <image :src="meInfo.avatarUrl" />
          <view class="member-content">
            <view class="member-name">
              {{meInfo.nickName}}
              <view class="iconfont iconyou"></view>
            </view>
            <!-- <text class="gold">金币666</text> -->
          </view>
          <view class="earn-more">
            <view class="more-content">
              <text class="iconfont iconjinbi1"></text>赚更多
            </view>
          </view>
        </view>

        <view class="income-wrap">
          <view class="income-content">
            <view class="income-content-left" @tap="moveToWithdrawal">
              <text>可提现余额</text>
              <view>
                ¥
                <text style="font-size:58rpx;">{{meInfo.money}}</text>
              </view>
            </view>
            <view class="income-content-right" @tap="moveToIncome">
              <!-- <view>我的收入</view> -->
              <view>立即提现</view>
              <view class="iconfont iconyou"></view>
            </view>
          </view>
          <view class="account-content">
            <text>
              即将到账
              <text
                class="account-content-border"
              >¥ {{meInfo.soonMoney === '0'? '0.00': meInfo.soonMoney}}</text>
            </text>
            <text>|</text>
            <text>
              累计到账
              <text class="account-content-border">¥ {{meInfo.cumulativeMoney}}</text>
            </text>
          </view>
        </view>
      </view>
      <view class="swiper-wrap">
        <swiper
          class="slideshow"
          indicator-dots="true"
          autoplay="true"
          interval="5000"
          duration="1000"
          circular="true"
          indicator-active-color="#fff"
        >
          <block v-for="(item, index) in personalBanner" :key="index">
            <swiper-item>
              <image :src="item.imageUrl" @click="moveToBdd(item)" />
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
          <image src="/static/images/customer.png" />
          <view>联系客服</view>
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
    <view class="not-logged" v-else>
      <button
        type="primary"
        size="mini"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
        @tap="getLoginCode"
      >请登录</button>
    </view>
    <van-dialog
      :width="230"
      use-slot
      :show="showDialog"
      :show-confirm-button="false"
      :show-cancel-button="false"
      confirm-button-open-type="getUserInfo"
      @close="onClose"
      @getuserinfo="getUserInfo"
    >
      <view>
        <view style="background:linear-gradient(90deg, #EE799F, #F08080 );height:180rpx"></view>
        <view style="height:150rpx;"></view>
        <view style="position:absolute;top:37%;width:100%;text-align:center">
          <image src="/static/images/auth.png" style="height:128rpx;width:80%" />
        </view>
        <view style="position:absolute;bottom:20rpx;width:100%;text-align:center">
          <button size="mini" @tap="onClose">授权登录</button>
        </view>
      </view>
    </van-dialog>
  </view>
</template>
<script>
import { get, post } from '@/utils/http'
import { moveTo } from '@/utils/common'
import store from '../../store'
export default {
  name: 'Me',
  data() {
    return {
      isLogin: false,
      loginCode: '',
      personalBanner: [],
      meInfo: {},
      showDialog: false
    }
  },
  onLoad() {
    this.personalBanner = store.state.bannerObj.personalCenterBanner
  },
  onShow() {
    this.showDialog = true
    const res = wx.getStorageSync('token')
    if (res && !this.meInfo.nickName) this.login()
    this.isLogin = !!res
  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1500)
  },
  methods: {
    onClose() {
      console.log(123)
      this.showDialog = false
    },
    // 获取用户登录
    async getUserInfo(e) {
      const _this = this
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
          wx.setStorageSync('time', result.expMillis)
          // 设置token 成功后调用获取个人信息的接口
          wx.setStorage({
            data: result.token,
            key: 'token',
            success(res) {
              _this.login()
            }
          })
        } catch (e) {
          console.log(e)
        } finally {
          wx.hideLoading()
        }
      } else {
        console.log('error')
      }
    },
    // 获取个人信息
    async login() {
      try {
        const meInfo = await get('api/v1/member/getMemberInfo')
        const meFund = await get('api/v1/member/accountInfo')
        this.meInfo = { ...meInfo, ...meFund }
      } catch (e) {
        console.log(e)
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
    /** banner type */
    moveToBdd(item) {
      const obj = {
        40: this.moveToPdd(item)
      }
      console.log(obj[item.type])
    },
    /** 跳转type */
    async moveToPdd(item) {
      try {
        const result = await get(item.value)
        wx.navigateToMiniProgram({
          appId: result.appId,
          path: result.pagePath,
          success(res) {
            // 打开成功
          }
        })
      } catch (e) {
      } finally {
        wx.hideLoading()
      }
    },
    /** 我的收入 */
    moveToIncome() {
      wx.showToast({
        title: '可提现额需大于1元',
        icon: 'none'
      })
      // moveTo('../income/main')
    },
    // 提现
    moveToWithdrawal() {
      wx.showToast({
        title: '可提现额需大于1元',
        icon: 'none'
      })
      // moveTo('../withdrawal/main')
    },
    // 我的订单
    moveToOrder() {
      moveTo('../order/main')
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
.slideshow {
  margin: 0 auto;
  width: 95%;
  height: 274rpx;
  border-radius: 20rpx;
  overflow: hidden;
  transform: translateY(0);
}
button::after {
  border: 0;
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
      width: 300rpx;
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
  .income-wrap {
    background: #e86453;
    height: 200rpx;
    border-radius: 20rpx 20rpx 0 0;
    margin: 24rpx 20rpx;
    padding: 20rpx;
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
    margin: 20rpx 40rpx 0 0;
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
.not-logged {
  margin-top: 50rpx;
  text-align: center;
}
</style>