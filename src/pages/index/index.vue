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
      <view>
        <swiper
          class="slideshow"
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          circular="true"
          indicator-active-color="#fff"
        >
          <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item style="display:flex;" @click="moveToBdd(item)">
              <image :src="item.imageUrl" style="margin:0 auto;max-height:100%;width:100%" />
            </swiper-item>
          </block>
        </swiper>
      </view>
      <!-- <bannerSwiper :imgUrls="imgUrls"></bannerSwiper> -->
    </view>
    <view class="tabs-container">
      <van-tabs animated sticky :active="tabActive" line-height="0px" @change="onChange">
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
          <view v-if="topList[1].length === 0" style="height:100vh"></view>
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
          <view v-if="topList[2].length === 0" style="height:100vh"></view>
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
          <view v-if="topList[3].length === 0" style="height:100vh"></view>
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
          <view v-if="topList[4].length === 0" style="height:100vh"></view>
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
          <view v-if="topList[5].length === 0" style="height:100vh"></view>
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
    <authButton :showDialog.sync="showDialog" :isOverlay="true"></authButton>
  </view>
</template>

<script>
import bannerSwiper from '@/components/banner-swiper'
import indexList from '@/components/index-list'
import { PageBase, get } from '@/utils/http'
import { moveTo } from '@/utils/common'
import store from '../../store'
import authButton from '@/components/auth-button'
const classArray = [0, 8182, 6398, 8583, 239, 18637]
export default {
  components: { bannerSwiper, indexList, authButton },
  data() {
    return {
      searchValue: '',
      tabActive: 0,
      topList: [[], [], [], [], [], []],
      pageList: [],
      bannerList: [],
      indicatorDots: true,
      autoplay: true,
      interval: 4000,
      duration: 1000,
      showDialog: false
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
    this.getBannerList()
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
    /** 获取banner */
    async getBannerList() {
      try {
        const result = await get('api/v1/index/banner')
        this.bannerList = result.indexBanner
        store.commit('setBanner', result)
      } catch (e) {
        console.log(e)
      }
    },
    /** banner type */
    moveToBdd(item) {
      const obj = {
        40: this.moveToPdd(item)
      }
      console.log(obj[item.type])
    },
    /** 跳转type */
    async moveToPdd(item) {
      try {
        const result = await get(item.value)
        wx.navigateToMiniProgram({
          appId: result.appId,
          path: result.pagePath,
          success(res) {
            // 打开成功
          }
        })
      } catch (e) {
        if (e.code === 100) {
          this.showDialog = true
        }
      } finally {
        wx.hideLoading()
      }
    },
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
    // 移动到搜索页
    moveToSearch() {
      const url = '../search/main'
      wx.switchTab({ url })
    },
    // 移动详情页
    moveToDetail(item) {
      moveTo('../detail/main', { id: item.goodsId })
    }
  }
}
</script>
<style lang="scss">
page {
  background: #f6f5f4;
}
.slideshow {
  margin: 0 auto;
  width: 95%;
  height: 274rpx;
  border-radius: 20rpx;
  overflow: hidden;
  transform: translateY(0);
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