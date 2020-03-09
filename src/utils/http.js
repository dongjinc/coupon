import { global } from './global.js'
import { getLoginAnony } from './common'
/**
 * @param {使用科里化} method
 * @param {*} url
 */
const request = (method, url) => {
  let tryNum = 0
  return function (api, param = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url + '/' + api,
        header: { ...global.header, token: wx.getStorageSync('token') || '' },
        method: method,
        data: param,
        success: async res => {
          if (res.data.code === 1) {
            return resolve(res.data.data)
          }
          /** 关系绑定失败！ */
          if (res.data.code === 200) {
            reject(res.data)
          }
          /** 请重新登录 */
          switch (res.data.code) {
            case 0:
            case 101:
            case 102:
            case 103:
            case 104:
              wx.removeStorage({
                key: 'token',
                success: async () => {
                  const result = await getLoginAnony()
                  if (result) {
                    tryNum++
                    if (tryNum >= 3) {
                      tryNum = 0
                      return reject(res.data)
                    }
                    try {
                      method === 'get' ? resolve(await get(api)) : resolve(await post(api, param))
                    } catch (e) {
                      reject(e)
                    }
                  }
                }
              })
              break
          }
          // reject(res.data)
        },
        fail(err) {
          // console.log(err, 111)
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
const gets = request('get', global.node_uri)
export const get = function (api, param) {
  if (!param) return gets(api)
  return gets(api + serialize(param))
}
// get方法处理
const serialize = function (obj, ary = []) {
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && (obj[p] || obj[p] === 0)) {
      ary.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }
  }
  return '?' + ary.join('&')
}
/**
 * @param
 *  method POST
 */
export const post = request('post', global.node_uri)

export class PageBase {
  currentPage = 0;
  /** 空值计数3页后 表示没有更多 */
  emptyCountPage = 0;
  canNext = true;
  pageApi = '';
  constructor(api) {
    this.pageApi = api
  }
  /** 首页List */
  getPageList = async function (param) {
    const result = await get(this.pageApi, {
      page: this.currentPage,
      ...param
    })
    if (result.length === 0) {
      this.emptyCountPage++
      if (this.emptyCountPage >= 3) {
        this.canNext = false
      }
    }
    return result
  };
  next(param) {
    if (!this.canNext) return false
    this.currentPage++
    return this.getPageList(param)
  }
  reset() {
    this.currentPage = 0
  }
}
