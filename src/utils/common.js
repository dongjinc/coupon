import { get, post } from './http'
import store from '../store'
/** 跳转路由 */
const serialize = function (obj, ary = []) {
  if (!obj) return ''
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      ary.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }
  }
  return '?' + ary.join('&')
}
export const moveTo = function (uri, param) {
  wx.navigateTo({
    url: uri + serialize(param)
  })
}

/** 对0 处理成 0.00 */
export const zeroDeal = function (obj) {
  for (let item in obj) { obj[item] = obj[item] * 1 || '0.00' }
  return obj
}
export const getLoginAnony = function () {
  wx.login({
    success(res) {
      if (res.code) {
        post('api/v1/login/weChat', { code: res.code }).then(res => {
          wx.setStorage({
            data: res.token,
            key: 'token',
            success(res) {
              getLoginInfo()
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
export const getLoginInfo = function () {
  get('api/v1/member/getMemberInfo').then(async resOne => {
    store.commit('setUserInfo', { ...resOne })
    await getUserInfo()
  }, err => {
    if (err.code === 101 || err.code === 103) {
      wx.removeStorage({
        key: 'token',
        success: () => {
          getLoginAnony()
        }
      })
    }
  })
}
/** 刷新账户信息 */
export const getUserInfo = async function () {
  const result = await get('api/v1/member/accountInfo')
  store.commit('setUserInfo', { ...store.state.userInfo, ...zeroDeal(result) })
}
