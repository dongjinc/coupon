const serialize = function (obj, ary = []) {
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
