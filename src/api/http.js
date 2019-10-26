import global from './config'

export const get = function (uri, data) {
  return http('GET', uri, data)
}

export const http = function (methods, url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: global.BASE_URL + '/' + url,
      header: global.header,
      methods: methods,
      data: data,
      success(res) {
        resolve(res)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
