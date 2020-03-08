<template>
  <view style="margin:0 32rpx;">
    <view
      style="display:flex;justify-content:space-between;padding:35rpx;box-sizing:border-box;height:210rpx;border-radius:15rpx;background:linear-gradient(90deg, #EE799F, #F08080 );margin-top:30rpx;color:#fff;box-shadow:0 20rpx 60rpx #FFC0CB"
    >
      <view style="display:flex;flex-direction:column;flex: 1;">
        <text style="font-size:28rpx;">当前余额(元)</text>
        <view>
          <text>¥</text>
          <text style="font-size:56rpx;line-height:95rpx;margin-left: 10rpx;">{{memberMoney.money}}</text>
        </view>
      </view>
      <view
        @tap="toIncome"
        style="width:130rpx;height:40rpx;border-radius:25rpx;border:1px solid #fff;padding:8rpx;font-size:26rpx;line-height:40rpx;text-align:center"
      >余额明细</view>
    </view>
    <view style="display:flex;flex-direction:column;padding: 36rpx 0;">
      <view>提现金额</view>
      <view
        style="display:flex;align-items:center;font-size: 55rpx;font-weight: bold;margin-top: 20rpx;"
      >
        ¥
        <input
          :value="money"
          @input="inputMoney"
          style="height: 2.7rem;line-height: 2.7rem;flex: 1;margin-left: 10rpx;"
          placeholder-style="height:70rpx;line-height:70rpx"
          class="weui-input"
          type="number"
          placeholder="0.00"
        />
        <van-button
          @tap="withdrawalAllMoney"
          type="primary"
          custom-style="border-radius: 15rpx;"
          color="#EE799F"
          size="normal"
        >全部提现</van-button>
      </view>
      <van-button
        class="withdrawal-btn"
        style="width: 100%;border-radius: 30rpx"
        custom-style="width:100%;border-radius: 50px"
        round
        type="primary"
        color="#EE799F"
        size="normal"
        @tap="onWithdrawalMoney"
      >立即提现</van-button>
    </view>
    <view
      v-if="showPopup"
      style="position: absolute;top: calc(50% - 120px);width: calc(100% - 32px);text-align: center;z-index: 300;background: #fff;border-radius: 10px;height: 120px;line-height: 35px;"
    >
      <text style="color:#EE799F;font-size: 18px;">提现成功</text>
      <view style="display:flex;flex-direction:column;align-items:center">
        <view>
          请复制
          <text style="color:#EE799F;font-weight: bold;margin-right: 10rpx;">提现码</text>联系客服
        </view>
        <view
          @tap="copyWithdrawalCode"
          style="color:#EE799F;font-weight: bold;display:flex;flex-direction: column;align-items:center;line-height: 35rpx;margin-top: 15rpx;"
        >
          {{withdrawalCode}}
          <text style="font-size: 20rpx;color:#000">(点击即可复制哦!)</text>
        </view>
      </view>
    </view>
    <!-- 提现帮助和联系客服 -->
    <van-popup
      :show="showPopup"
      position="bottom"
      custom-style="height: 18%;"
      @close="showPopup = false"
    >
      <view @touchmove.stop.prevent class="share-content">
        <view class="left-wrap button-common">
          <image src="/static/images/wechat.jpg" />
          <button open-type="share">发给好友</button>
        </view>
        <view class="right-wrap button-common">
          <image src="/static/images/customer.png" />
          <button open-type="contact" @tap="createPoster">联系客服</button>
        </view>
      </view>
    </van-popup>
  </view>
</template>
<script>
import { get } from '@/utils/http'
import { getUserInfo } from '@/utils/common'
export default {
  name: 'withdrawal',
  data() {
    return {
      money: '',
      showPopup: false,
      memberMoney: {},
      withdrawalCode: ''
    }
  },
  onLoad() {
    this.getMemberMoney()
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
    async getMemberMoney() {
      try {
        const result = await get('api/v1/member/memberMoney')
        this.memberMoney = result
      } catch (e) {
        console.log(e)
      }
    },
    /** 输入金额 */
    inputMoney(e) {
      const value = e.mp.detail.value
      if (/^(\d?)+(\.\d{0,2})?$/.test(value)) {
        this.money = value
      } else {
        return {
          value: value.substring(0, e.mp.detail.value.length - 1)
        }
      }
    },
    /** 立即提现 */
    async onWithdrawalMoney() {
      if (!this.money) {
        return wx.showToast({
          title: '提现金额不能为空!',
          icon: 'none',
          duration: 1300
        })
      }
      if (this.money * 1 > this.memberMoney.money * 1 || this.money * 1 <= 0) {
        return wx.showToast({
          title: '输入金额有误!',
          icon: 'none',
          duration: 1300
        })
      }
      wx.showLoading({
        title: '请稍等...',
        mask: true
      })
      try {
        const result = await get('/api/v1/takeMoney/applyTakeMoney', { money: this.money * 100 })
        this.withdrawalCode = result
        await getUserInfo()

        this.$_eventBus.$emit('withdrawal-money')

        this.getMemberMoney()
        /** 提现成功 */
        this.showPopup = true
        this.money = ''
      } catch (e) {
        wx.showToast({
          title: '提现失败!',
          icon: 'none',
          duration: 1200
        })
      } finally {
        wx.hideLoading()
      }
    },
    /** 全部提现 */
    withdrawalAllMoney() {
      this.money = this.memberMoney.money
    },
    /** 复制提现码 */
    copyWithdrawalCode() {
      wx.setClipboardData({
        data: this.withdrawalCode,
        success: res => {
          wx.showToast({
            title: '复制成功!',
            duration: 1000
          })
          console.log(res)
        }
      })
    },
    /** 余额明细页 */
    toIncome() {
      wx.navigateTo({
        url: '../income/main'
      })
    }
  }
}
</script>
<style lang="scss">
.van-button {
  border-radius: 15rpx !important;
}
.withdrawal-btn {
  .van-button {
    width: 100%;
    margin-top: 70rpx;
    border-radius: 40rpx !important;
  }
}
.share-content {
  display: flex;
  justify-content: space-around;
  .button-common {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    flex: 1;
    align-items: center;
  }
  .left-wrap {
    image {
      width: 160rpx;
      height: 150rpx;
    }
    button {
      margin-left: 8rpx;
    }
  }
  .right-wrap {
    image {
      width: 130rpx;
      height: 130rpx;
      margin-top: 8rpx;
    }
    button {
      margin-left: 4rpx;
    }
  }
  button {
    font-size: 31rpx;
    background: transparent;
    position: absolute;
    height: 200rpx;
    line-height: 340rpx;
    ::after {
      border: none !important;
    }
  }
  button::after {
    border: none !important;
  }
}
</style>