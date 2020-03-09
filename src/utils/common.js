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
  return new Promise(async (resolve, reject) => {
    const code = await getLoginCode()
    const result = await post('api/v1/login/weChat', { code: code })
    try {
      wx.setStorageSync('token', result.token)
      await getLoginInfo()
      resolve(result)
    } catch (e) { }
  })
}
export const getLoginInfo = async function () {
  await get('api/v1/member/getMemberInfo').then(async resOne => {
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

/** 获取 登录 code */
export const getLoginCode = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code)
          // 发起网络请求
        } else {
          reject(res.errMsg)
        }
      },
      timeout: 2000
    })
  })
}
/** 绘制初始化 */
export function drawInit() {
  var context = wx.createCanvasContext('firstCanvas')
  context.beginPath()// 开始一个新的路径
  /** 绘制中间 */
  context.rect(0, 50, 300, 430)
  context.setFillStyle('#fff')
  context.fill()
  const myGradient = context.createLinearGradient(0, 100, 300, 100)
  myGradient.addColorStop(0, '#d55251')
  myGradient.addColorStop(1, '#ef7a82')
  context.setFillStyle(myGradient)
  context.setStrokeStyle('#fff')
  // context.setLineJoin('round')
  // context.strokeRect(0, 0, 300, 100)
  /** 矩形 */
  context = drawRect(context, 0, 0, 300, 50, 12)
  context.fill()
  /** 填充文字 */
  context.setFillStyle('#F0F8FF')
  context.font = '19px Arial'
  context.fillText('藤蔓生活', 15, 32)
  context.font = '14px sans-serif'
  context.fillText('美好', 130, 32)
  context.fillText('生活', 180, 32)
  context.fillText('品质', 230, 32)
  context.setFillStyle('#000')
  context.fillText(store.state.userInfo.nickName, 75, 73)
  context.font = '14px Arial'
  context.fillText('推荐给你一个好物哟', 75, 99)
  return context
}
/** 绘制圆矩形 */
export function drawRect(ctx, x, y, w, h, r) {
  // 参考文章 https://www.zhangxinxu.com/study/201406/image-border-radius-canvas.html
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, 1)
  ctx.arcTo(x, y + h, x, y, 1)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
  return ctx
}

/** 绘制头像 */
export function drawPortrait(ctx) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: store.state.userInfo.avatarUrl,
      success: async res => {
        var avatorWidth = 50
        var avatorHeight = 50
        var avatarurlX = 15 // 绘制的头像在画布上的位置
        var avatarurlY = 55 // 绘制的头像在画布上的位置
        ctx.save()
        ctx.beginPath() // 开始绘制
        ctx.arc(avatorWidth / 2 + avatarurlX, avatorHeight / 2 + avatarurlY, avatorWidth / 2, 0, Math.PI * 2, false)
        ctx.clip()
        ctx.drawImage(res.tempFilePath, 15, 55, avatorWidth, avatorWidth)
        ctx.restore()
        resolve(ctx)
      }
    })
  })
}
/** 获取太阳码 */
export function getSunCode(ctx, param, startX = 215, endX = 390, avatarurlX = 215, avatarurlY = 390) {
  return new Promise(async (resolve, reject) => {
    const result = await get('api/v1/share/getSunCodeByteArray', param)
    const fsm = wx.getFileSystemManager()
    var showImgData = result

    // showImgData = showImgData.replace(/\ +/g, '') // 去掉空格方法
    showImgData = showImgData.replace(/[\r\n]/g, '')
    const buffer = wx.base64ToArrayBuffer(showImgData)
    const fileName = wx.env.USER_DATA_PATH + '/share_img.png'
    fsm.writeFileSync(fileName, buffer, 'binary')

    var avatorWidth = 60
    var avatorHeight = 60
    ctx.save()
    ctx.beginPath() // 开始绘制
    ctx.arc(avatorWidth / 2 + avatarurlX, avatorHeight / 2 + avatarurlY, avatorWidth / 2, 0, Math.PI * 2, false)
    ctx.clip()
    ctx.drawImage(fileName, startX, endX, avatorWidth, avatorWidth)
    ctx.restore()

    resolve(ctx)
    // todo 优化
    // 用wx.getFileSystemManager().unlink方法，删除binary格式图片；
    setTimeout(() => {
      fsm.unlink({
        filePath: fileName,
        success: res => {
          console.log('删除成功')
        }
      })
    }, 2000)
  })
}
