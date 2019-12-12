<template>
  <view>
    <view class="me-container" v-if="isLogin">
      <!-- 头部 -->
      <view class="me-header">
        <view
          style="height: 148px;background: #39b54a;border-radius: 0 0 60px 60px;position: absolute;width: 100%;z-index: -1;"
        ></view>
        <!-- 个人 -->
        <view class="person-wrap">
          <image :src="meInfo.avatarUrl" />
          <view class="member-content">
            <view class="member-name">{{meInfo.nickName}}</view>
            <!-- <text class="gold">金币666</text> -->
          </view>
          <view class="earn-more">
            <!-- <view class="more-content">
              <text class="iconfont iconjinbi1"></text>赚更多
            </view>-->
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
              <text class="account-content-border">¥ {{meInfo.soonMoney}}</text>
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
        <view class="me-item" style="position:relative">
          <image src="/static/images/customer.png" />
          <view>联系客服</view>
          <button
            open-type="contact"
            style="position: absolute;left: 0;top: 0;height: 109rpx;opacity: 0;"
            size="mini"
          >授权登录</button>
        </view>
        <!-- <view class="me-item">
          <image src="/static/images/footer.png" />
          <view>浏览记录</view>
        </view>
        <view class="me-item">
          <image src="/static/images/question.png" />
          <view>常见问题</view>
        </view>-->
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
    <authButton :showDialog.sync="showDialog" :meInfo.sync="meInfo" :isLogin.sync="isLogin"></authButton>
  </view>
</template>
<script>
import { get } from '@/utils/http'
import { moveTo, zeroDeal } from '@/utils/common'
import authButton from '@/components/auth-button'
import store from '../../store'
export default {
  name: 'Me',
  components: {
    authButton
  },
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
    const res = wx.getStorageSync('token')
    if (res && !this.meInfo.nickName) this.login()
    this.isLogin = !!res
    this.showDialog = !res
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
      this.showDialog = false
    },
    // 获取个人信息
    async login() {
      try {
        const meInfo = await get('api/v1/member/getMemberInfo')
        const meFund = await get('api/v1/member/accountInfo')

        this.meInfo = { ...meInfo, ...zeroDeal(meFund) }
      } catch (e) {
        console.log(e)
      }
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
  // background-image: linear-gradient(180deg, #39b54a, #8dc63f);
  // border-radius: 0 0 90px 90px;
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
      justify-content: center;
      margin-left: 15rpx;
      font-size: 26rpx;
      .member-name {
        display: flex;
        align-items: center;
        color: #fff;
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
    background: #6cbf6f;
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
        color: #eb6961;
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