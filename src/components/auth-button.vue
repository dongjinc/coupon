<template>
  <van-dialog
    :width="230"
    use-slot
    :show="showDialog"
    :closeOnClickOverlay="isOverlay"
    :show-confirm-button="false"
    :show-cancel-button="false"
    confirm-button-open-type="getUserInfo"
    @close="$emit('update:showDialog', false)"
    @getuserinfo="getUserInfo"
  >
    <view class="auth-dialog">
      <view style="background:linear-gradient(90deg, #EE799F, #F08080 );height:180rpx"></view>
      <view style="height:150rpx;"></view>
      <view class="animate">
        <image src="/static/images/fortune.png" style="height:210rpx;width:53%" />
      </view>
      <view style="position:absolute;top:37%;width:100%;text-align:center">
        <image src="/static/images/auth.png" style="height:128rpx;width:80%" />
      </view>
      <view style="position:absolute;top:130rpx;width:100%;text-align:center;z-index:800;opacity:0">
        <button size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo" @tap="getLoginCode">1</button>
      </view>
      <view style="position:absolute;bottom:20rpx;width:100%;text-align:center">
        <button
          size="mini"
          open-type="getUserInfo"
          @getuserinfo="getUserInfo"
          @tap="getLoginCode"
        >授权登录</button>
      </view>
    </view>
  </van-dialog>
</template>
<script>
import { get, post } from '@/utils/http'
export default {
  name: 'authButton',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    isOverlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loginCode: '',
      meInfo: {}
    }
  },
  methods: {
    // 获取loginCode
    getLoginCode() {
      const _this = this
      wx.login({
        success(res) {
          if (res.code) {
            console.log(res.code)
            _this.loginCode = res.code
            // 发起网络请求
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
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
          console.log(result)
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
        wx.hideLoading()
        wx.showToast({ title: '授权失败!', icon: 'none' })
        console.log('error')
      }
    },
    // 获取个人信息
    async login() {
      try {
        const meInfo = await get('api/v1/member/getMemberInfo')
        const meFund = await get('api/v1/member/accountInfo')
        this.$emit('update:meInfo', { ...meInfo, ...meFund })
        this.$emit('update:isLogin', true)
        this.$emit('update:showDialog', false)
        wx.showToast({ title: '授权登录成功！' })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss">
.animate {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  z-index: 100;
  animation: myfirst 2s ease-in-out infinite;
}
@keyframes myfirst {
  0% {
    top: -5rpx;
  }
  50% {
    top: 15rpx;
  }
  100% {
    top: -5rpx;
  }
}
.auth-dialog {
  overflow: hidden;
  ._button {
    color: #fff;
    width: 50%;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 32rpx;
    background: #71c671;
  }
}
</style>