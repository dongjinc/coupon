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
