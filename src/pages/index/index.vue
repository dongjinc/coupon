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
      <!-- <bannerSwiper :imgUrls="imgUrls"></bannerSwiper> -->
    </view>
    <view class="tabs-container">
      <van-tabs animated sticky :active="tabActive" swipeable line-height="0px" @change="onChange">
        <van-tab title="精选">
          <view
            v-for="item in topList[0]"
            :key="item"
            @tap="moveToDetail(item)"
            style="background:#fff"
          >
            <indexList :item="item"></indexList>
          </view>
        </van-tab>
        <van-tab title="水果">
          <view
            v-for="item in topList[1]"
            :key="item"
            @tap="moveToDetail(item)"
            style="background:#fff"
          >
            <indexList :item="item"></indexList>
          </view>
        </van-tab>
        <van-tab title="零食">
          <view
            v-for="item in topList[2]"
            :key="item"
            @tap="moveToDetail(item)"
            style="background:#fff"
          >
            <indexList :item="item"></indexList>
          </view>
        </van-tab>
        <van-tab title="内衣">
          <view
            v-for="item in topList[3]"
            :key="item"
            @tap="moveToDetail(item)"
            style="background:#fff"
          >
            <indexList :item="item"></indexList>
          </view>
        </van-tab>
        <van-tab title="男装">
          <view
            v-for="item in topList[4]"
            :key="item"
            @tap="moveToDetail(item)"
            style="background:#fff"
          >
            <indexList :item="item"></indexList>
          </view>
        </van-tab>
        <van-tab title="美妆">
          <view
            v-for="item in topList[5]"
            :key="item"
            @tap="moveToDetail(item)"
            style="background:#fff"
          >
            <indexList :item="item"></indexList>
          </view>
        </van-tab>
      </van-tabs>
    </view>
  </view>
</template>

<script>
import bannerSwiper from '@/components/banner-swiper'
import indexList from '@/components/index-list'
import { PageBase } from '@/utils/http'
const classArray = [0, 8182, 6398, 8583, 239, 18637]
export default {
  components: { bannerSwiper, indexList },
  data() {
    return {
      searchValue: '',
      tabActive: 0,
      topList: [[], [], [], [], [], []],
      pageList: [],
      imgUrls: [
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-gulaorou.png',
        'https://mishi-image.oss-cn-hangzhou.aliyuncs.com/yry/wxapp/test/goodslist/menu-heniu.png',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572167835009&di=9a7b805520cad4b7bdbc49bb8a45066d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F037094356e1859e32f875520f774466.jpg'
      ]
    }
  },
  watch: {
    tabActive(val) {
      if (!this.pageList[this.tabActive].currentPage) {
        this.getTopList()
      }
    }
  },
  mounted() {
    this.pageList = [
      new PageBase('api/v1/goods/topList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList')
    ]
    this.getTopList()
  },
  onReachBottom() {
    // 到底部触发刷新
    this.getTopList(false)
  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1500)
  },
  methods: {
    // 获取列表
    async getTopList(loading = true) {
      if (loading) wx.showLoading({ title: '加载中...' })
      try {
        const result = await this.pageList[this.tabActive].next(
          classArray[this.tabActive]
        )
        this.topList[this.tabActive].push(...result)
      } catch (e) {
      } finally {
        if (loading) {
          wx.hideLoading()
        }
      }
    },
    // 切换tab
    onChange(e) {
      this.tabActive = e.mp.detail.index
    },
    bindViewTap() {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        wx.switchTab({ url })
      } else {
        wx.navigateTo({ url })
      }
    },
    // 移动到搜索页
    moveToSearch() {
      const url = '../search/main'
      wx.switchTab({ url })
    },
    // 移动详情页
    moveToDetail(item) {
      // todo 优化
      const url = `../detail/main?id=${item.goodsId}`
      wx.navigateTo({ url })
    }
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