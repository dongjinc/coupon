<script>
import store from './store'
import { getLoginAnony, getLoginInfo } from '@/utils/common'
export default {
  async onLaunch() {
    wx.getSystemInfo({
      success: res => {
        store.commit('setSysInfo', res)
      }
    })
    /** 获取感知登录判断 是否存在token */
    const result = wx.getStorageSync('token')
    try {
      if (result) {
        await getLoginInfo()
      } else {
        await getLoginAnony()
      }
    } catch (e) {
    } finally {
      this.$_eventBus.$emit('onLoad')
    }
    // wx.getStorage({
    //   key: 'token',
    //   success: async () => {
    //     await getLoginInfo()
    //   },
    //   fail: async res => {
    //     await getLoginAnony()
    //   }
    // })

    // 判断更新版本问题
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
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
