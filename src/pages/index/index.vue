<template>
    <view>
      <view style="background-image: linear-gradient(180deg,#eb3e47, #ffffff)">
        <van-search background="null" :value="searchValue" placeholder="请输入搜索关键词" />
        <bannerSwiper :imgUrls="imgUrls"></bannerSwiper>
      </view>
      <view style="margin-top:10rpx">
        <van-tabs sticky :active="tabActive" swipeable animated line-height="0px" @change="onChange">
          <van-tab title="精选">
            <view v-for="item in 100" :key ="item">{{item}}</view>
          </van-tab>
          <van-tab title="百货">
            <view v-for="item in 100" :key ="item">{{item}}</view>
          </van-tab>
          <van-tab title="食品">内容 3</van-tab>
          <van-tab title="内衣">内容 4</van-tab>
          <van-tab title="水果">内容 4</van-tab>
          <van-tab title="化妆">内容 4</van-tab>
        </van-tabs>
      </view>
  </view>
</template>

<script>
import bannerSwiper from '@/components/banner-swiper'
import {get} from '@/api/http'
export default {
  components: { bannerSwiper },
  data() {
    return {
      searchValue: '',
      tabActive: 0,
      imgUrls: [
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-gulaorou.png',
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-heniu.png',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572167835009&di=9a7b805520cad4b7bdbc49bb8a45066d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F037094356e1859e32f875520f774466.jpg'
      ]
    }
  },
  onReachBottom() {
  // 到这底部在这里需要做什么事情
    console.log(123)
  },
  onPullDownRefresh() {
    console.log(123)
    wx.showNavigationBarLoading()
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1500)
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
    },
    onChange() {}
  }
}
</script>
<style>
page{
  background:#f6f5f4;
}
.van-search{
  background: null!important;
}
.van-search__content {
  border-radius: 16px!important;
}
.van-tab--active{
  color: #eb3e47!important;
}
</style>