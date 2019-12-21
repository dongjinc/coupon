<script>
import store from './store'
import { post } from '@/utils/http'
export default {
  async onLaunch() {
    const _this = this
    /** 获取感知登录判断 是否存在token */
    wx.getStorage({
      key: 'token',
      fail(res) {
        _this.getLoginAnony()
      }
    })
    wx.getSystemInfo({
      success: res => {
        store.commit('setSysInfo', res)
      }
    })
  },
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log() {
    console.log(`log at:${Date.now()}`)
  },
  methods: {
    getLoginAnony() {
      wx.login({
        success(res) {
          if (res.code) {
            post('api/v1/login/weChat', { code: res.code }).then(res => {
              wx.setStorage({
                data: res.token,
                key: 'token',
                success(res) {
                  console.log(res)
                  // this.login()
                }
              })
            })
            // 发起网络请求
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
}
</script>

<style>
@import url('../static/icon/iconfont.css');
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
view {
  word-break: break-all;
}
</style>
