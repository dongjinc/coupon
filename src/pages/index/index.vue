<template>
    <view>
      <bannerSwiper :imgUrls="imgUrls"></bannerSwiper>
      <van-button @tap="detail">接口请求</van-button>
  </view>
</template>

<script>
import bannerSwiper from '@/components/banner-swiper'
import {get} from '@/api/http'
export default {
  components: { bannerSwiper },
  data() {
    return {
      imgUrls: [
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-gulaorou.png',
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-heniu.png',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572167835009&di=9a7b805520cad4b7bdbc49bb8a45066d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F037094356e1859e32f875520f774466.jpg'
      ]
    }
  },
  methods: {
    bindViewTap() {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    async detail() {
      const result = await get('url')
      console.log(result)
      console.log(1)
    }
  }
}
</script>