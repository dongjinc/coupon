<template>
  <view>
    <view class="header-container">
      <view :style="{marginTop: searchTop}">
        <van-search
          background="null"
          placeholder="搜索需要的商品"
          @click="moveToSearch"
          readonly
          :custom-class="['search-index']"
        />
      </view>
      <tab
        :currentTab="currentDot"
        :menuList="tabList"
        :count="5"
        :tabScroll="80"
        windowWidth="100"
        @clickMenu="changeDot"
      ></tab>
      <!-- <tab :tab-data="tabData1" :size="80" scroll @change="changeDot"></tab> -->
      <!-- <bannerSwiper :imgUrls="imgUrls"></bannerSwiper> -->
    </view>
    <swiper
      :current="currentDot"
      :indicator-dots="false"
      @change="swipeChanges"
      @animationfinish="swipeChange"
    >
      <swiper-item v-for="(item, index) in categoryData" :key="item">
        <scroll
          :requesting="item.requesting"
          :end="item.end"
          :empty-show="item.emptyShow"
          :list-count="item.listData.length"
          :has-top="true"
          @refresh="refresh"
          @more="more"
        >
          <view class="cells">
            <view style="position:relative" v-if="index === 0">
              <swiper
                class="slideshow"
                :indicator-dots="false"
                :autoplay="true"
                :interval="5000"
                :duration="2500"
                circular="true"
                indicator-active-color="#fff"
                @change="bannerChange"
              >
                <block v-for="(items, indexs) in bannerList" :key="indexs">
                  <swiper-item style="display:flex;" @click="moveToBdd(items)">
                    <image :src="items.imageUrl" style="margin:0 auto;max-height:100%;width:100%" />
                  </swiper-item>
                </block>
              </swiper>
              <view
                style="position:absolute;bottom:10rpx;display:flex;justify-content:space-between;width:75rpx;right:50rpx"
              >
                <view
                  style="width:16rpx;height:16rpx;background:#fff;border-radius:10rpx;transition:all .3s"
                  v-for="(item, indexd) in bannerList.length"
                  :key="indexd"
                  :class="[indexd === bannerDot? 'banner-active': '']"
                ></view>
              </view>
            </view>
            <official-account></official-account>
            <view
              v-if="index === 0"
              style="padding: 10rpx 16rpx;display:flex;;flex-wrap:wrap;justify-content:space-between"
            >
              <view
                style="display:flex;flex-direction:column;align-items:center;font-size:26rpx;color:#666;margin-bottom:15rpx;width:25%;"
                v-for="(item, iconIndex) in iconList"
                :key="iconIndex"
                @tap="moveToBdd(item)"
              >
                <image :src="item.imageUrl" style="width:130rpx;height:110rpx;" />
                <text>{{item.title}}</text>
              </view>
            </view>
            <view v-if="index === 0" style="padding: 0 16rpx 16rpx">
              <!-- <view style="display:flex;font-size:28rpx;line-height:22px">
                <view style="width:10rpx;height:44rpx;background:#d55251;margin-right:8rpx;"></view>
                <text>推荐专题</text>
              </view>-->
              <view
                v-for="(item, themeIndex) in themeList"
                :key="themeIndex"
                @tap="moveToBdd(item)"
                style="height:270rpx;border-radius:10rpx;overflow:hidden;margin:10rpx 0 15rpx;box-shadow: 0 0 60rpx rgba(213,82,81, .5)"
              >
                <image style="width:100%;height:100%" :src="item.imageUrl" />
                <view
                  style="display:flex;justify-content:space-between;padding:0 15rpx;margin: 15rpx 0 20rpx"
                ></view>
              </view>
            </view>

            <view
              v-for="(child, childIndex) in item.listData"
              :key="childIndex"
              @tap="moveToDetail(child)"
              style="background:#fff"
            >
              <view class="item-container">
                <image :src="child.goodsThumbnailUrl" lazy-load="true" />
                <view class="item-right-container">
                  <view class="right-title">{{ child.goodsName }}</view>
                  <view class="right-sales">销量{{ child.salesTip }}</view>
                  <view v-if="child.couponDiscount !== '0'">
                    <text class="right-coupon coupon-cash">{{ child.couponDiscount }}元券</text>
                    <!-- <text class="right-return-cash coupon-cash"></text> -->
                  </view>
                  <view class="right-bottom-container">
                    <view class="post-coupon">
                      <text v-if="child.couponDiscount !== '0'">券后</text>
                      <text>¥</text>
                      <text class="post-coupon-price">{{ child.couponPrice }}</text>
                    </view>
                    <view class="save-money">
                      <text class="iconfont iconfenxiang"></text>
                      <text>省</text>
                      <text>¥</text>
                      <text>{{ child.commission }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import bannerSwiper from '@/components/banner-swiper'
import indexList from '@/components/index-list'
import { PageBase, get } from '@/utils/http'
import { moveTo } from '@/utils/common'
import store from '../../store'
let pageStart = 0
const classArray = [0, 8182, 6398, 8583, 239, 18637]
export default {
  components: { bannerSwiper, indexList },
  data() {
    return {
      bannerList: [],
      iconList: [],
      themeList: [],
      showDialog: false,
      tabList: [{
        name: '精选'
      }, {
        name: '水果'
      }, {
        name: '零食'
      }, {
        name: '内衣'
      }, {
        name: '男装'
      }, {
        name: '美妆'
      }],
      currentDot: 0,
      categoryData: [
        {
          name: '精选',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '水果',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '零食',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '内衣',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '男装',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '美妆',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        }
      ],
      searchTop: '22px',
      bannerDot: 0
    }
  },
  watch: {
    currentDot(newVal, oldVal) {
      this.oldCurrentDot = oldVal
    }
  },
  async onLoad() {
    const iphoneInfo = store.state.systemInfo
    const iphoneRect = await wx.getMenuButtonBoundingClientRect()
    if (iphoneInfo.model !== 'iphone X') { this.searchTop = iphoneRect.top - 11 + 'px' }
  },
  mounted() {
    // wx.navigateTo({
    //   url: '../counter/main'
    // })
    this.pageList = [
      new PageBase('api/v1/goods/topList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList'),
      new PageBase('api/v1/goods/catList')
    ]
    // this.getTopList()
    this.getBannerList()
    this.getList('refresh', pageStart)
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
  // 分享
  onShareAppMessage() {
    return {
      title: '藤蔓生活'
    }
  },
  methods: {
    changeDot(e) {
      this.currentDot = e.mp.detail.current
    },
    async getList(type, currentPage) {
      let currentCur = this.currentDot
      let pageData = this.getCurrentData(currentCur)
      pageData.requesting = true
      // this.setCurrentData(currentCur, pageData);
      wx.showNavigationBarLoading()
      // 模拟异步获取数据场景
      const result = await this.pageList[this.currentDot].next(
        { catId: classArray[this.currentDot] }
      )
      pageData.requesting = false
      wx.hideNavigationBarLoading()
      if (type === 'refresh') {
        this.categoryData[this.currentDot].listData = result
        pageData.end = false
      } else {
        this.categoryData[this.currentDot].listData.push(...result)
        pageData.end = this.pageList[this.currentDot].currentPage === 20
      }
      if (this.oldCurrentDot === 0 || this.oldCurrentDot) {
        this.categoryData[this.oldCurrentDot].listData = []
        this.pageList[this.oldCurrentDot].reset()
      }
    },
    // 刷新数据
    refresh() {
      this.pageList[this.currentDot].reset()
      this.getList('refresh', pageStart)
      this.getBannerList()
    },
    // 加载更多
    more() {
      this.getList('more', this.getCurrentData(this.currentDot).page)
    },
    // 获取当前激活页面的数据
    getCurrentData(currentCur) {
      return this.categoryData[currentCur]
    },
    // 判断是否为加载新的页面,如果是去加载数据
    async loadData() {
      let pageData = this.getCurrentData(this.currentDot)
      if (pageData.listData.length === 0) {
        await this.getList('refresh', pageStart)
      }
    },
    // banner
    bannerChange(e) {
      this.bannerDot = e.mp.detail.current
    },
    // 页面滑动切换事件
    async swipeChange(e) {
      /** todo */
      this.currentDot = e.mp.detail.current >= 6 ? 0 : e.mp.detail.current
      this.loadData()
    },
    /** 获取banner */
    async getBannerList() {
      try {
        const result = await get('api/v1/index/banner')
        this.bannerList = result.indexBanner
        this.iconList = result.indexIcon
        this.themeList = result.indexTheme
        store.commit('setBanner', result)
      } catch (e) {
        console.log(e)
      }
    },
    /** banner type */
    moveToBdd(item) {
      if (this.$mp.page.isMoveing) return false
      this.$mp.page.isMoveing = true
      const obj = {
        10: this.moveToSpecial,
        20: this.moveToWebView,
        40: this.moveToPdd
      }
      obj[item.type](item)
    },
    /** webview */
    moveToWebView(item) {
      moveTo('../wx-public/main', { src: item.value })
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
        setTimeout(() => {
          this.$mp.page.isMoveing = false
        }, 400)
        wx.hideLoading()
      }
    },
    // 移动到搜索页
    moveToSearch() {
      const url = '../search/main'
      wx.switchTab({ url })
    },
    // 移动专题
    moveToSpecial(item) {
      moveTo(item.value)
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
swiper {
  height: 100vh;
}
.banner-active {
  width: 26rpx !important;
  background: #d55251 !important;
}
.cells {
  background: #ffffff;
  margin-top: 10rpx;
}

.cell {
  display: flex;
  padding: 20rpx;
}
.cell:not(:last-child) {
  border-bottom: 1rpx solid #ebedf0;
}
.cell__hd {
  font-size: 0;
}
.cell__hd image {
  width: 160rpx;
  height: 160rpx;
  margin-right: 20rpx;
  border-radius: 12rpx;
}
.cell__bd {
  flex: 1;
}
.cell__bd .name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
  font-size: 28rpx;
  margin-bottom: 12rpx;
}
.cell__bd .des {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
  color: #666666;
  font-size: 24rpx;
}

.slideshow {
  margin: 0 auto;
  width: 99%;
  height: 260rpx;
  // border-radius: 20rpx;
  overflow: hidden;
  transform: translateY(0);
}
.header-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  background-image: linear-gradient(90deg, #d55251, #ef7a82);
  // background: #3b7642;
  .van-search__content {
    border-radius: 16px !important;
  }
  .search-index {
    width: 77%;
  }
}
.tabs-container {
  margin-top: 10rpx;
}

.van-tab--active {
  color: #eb3e47 !important;
}
</style>