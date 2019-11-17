import { global } from './global.js'
/**
 * @param {使用科里化} method
 * @param {*} url
 */
const request = (method, url) => {
  return function (api, param = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url + '/' + api,
        header: global.header,
        method: method,
        data: param,
        success(res) {
          if (res.data.code === 1) {
            return resolve(res.data.data)
          }
          reject(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}
/**
 * @param
 *  method GET
 */
const gets = request('GET', global.node_uri)
export const get = function (api, param = {}) {
  if (!param) return gets(api)
  return gets(api + serialize(param))
}
// get方法处理
const serialize = function (obj, ary = []) {
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p]) {
      ary.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }
  }
  return '?' + ary.join('&')
}
/**
 * @param
 *  method POST
 */
export const post = request('POST', global.node_uri)

export class PageBase {
  currentPage = 0
  pageApi = ''
  constructor(api) {
    this.pageApi = api
  }
  getPageList = async function (catId) {
    const result = await get(this.pageApi, { page: this.currentPage, catId })
    return result
  }
  next(catId) {
    this.currentPage++
    return this.getPageList(catId)
  }
  reset() {
    this.currentPage = 0
  }
}
