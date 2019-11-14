<template>
  <view>
    <view class="header-container">
      <van-search
        background="null"
        :value="searchValue"
        placeholder="搜索需要的商品"
        @click="moveToSearch"
        readonly
      />
      <bannerSwiper :imgUrls="imgUrls"></bannerSwiper>
    </view>
    <view class="tabs-container">
      <van-tabs sticky :active="tabActive" swipeable animated line-height="0px" @change="onChange">
        <van-tab title="精选">
          <view v-for="item in 10" :key="item" @tap="moveToDetail(item)" style="background:#fff">
            <indexList></indexList>
          </view>
        </van-tab>
        <van-tab title="百货">
          <view v-for="item in 100" :key="item">{{item}}</view>
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
import indexList from '@/components/index-list'
import { get } from '@/api/http'
export default {
  components: { bannerSwiper, indexList },
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
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1500)
  },
  methods: {
    bindViewTap() {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        wx.switchTab({ url })
      } else {
        wx.navigateTo({ url })
      }
    },
    async detail() {
      const result = await get('url')
      console.log(result)
      console.log(1)
    },
    // 移动到搜索页
    moveToSearch() {
      const url = '../search/main?index=true'
      wx.switchTab({ url })
    },
    // 移动详情页
    moveToDetail(i) {
      const url = '../detail/main'
      wx.navigateTo({ url })
      console.log(i)
    },
    onChange() { }
  }
}
</script>
<style lang="scss">
page {
  background: #f6f5f4;
}
.header-container {
  background-image: linear-gradient(180deg, #eb3e47, #ffffff);
  padding-top: 10rpx;
  .van-search__content {
    border-radius: 16px !important;
  }
}
.tabs-container {
  margin-top: 10rpx;
}

.van-tab--active {
  color: #eb3e47 !important;
}
</style>