<template>
  <view>
    <view class="header-container">
      <view :style="{marginTop: searchTop}">
        <van-search
          background="null"
          :value="searchValue"
          placeholder="搜索需要的商品"
          @click="moveToSearch"
          readonly
          :custom-class="['search-index']"
        />
      </view>
      <tab
        :currentTab="currentDot"
        :menuList="tabData1"
        :count="5"
        :tabScroll="80"
        windowWidth="100"
        @clickMenu="changeDot"
      ></tab>
      <!-- <tab :tab-data="tabData1" :size="80" scroll @change="changeDot"></tab> -->

      <!-- <bannerSwiper :imgUrls="imgUrls"></bannerSwiper> -->
    </view>
    <swiper :current="currentDot" :indicator-dots="false" @animationfinish="swipeChange">
      <swiper-item v-for="(item, index) in categoryData" :key="item">
        <!-- <view>{{item}}</view> -->
        <scroll
          :requesting="item.requesting"
          :end="item.end"
          :empty-show="item.emptyShow"
          :list-count="item.listData.length"
          :has-top="true"
          :iphone-top="sucessViewTop"
          :refresh-size="loadingRefresh"
          @refresh="refresh"
          @more="more"
        >
          <view class="cells">
            <swiper
              class="slideshow"
              v-if="index === 0"
              :indicator-dots="indicatorDots"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration"
              circular="true"
              indicator-active-color="#fff"
            >
              <block v-for="(items, indexs) in bannerList" :key="indexs">
                <swiper-item style="display:flex;" @click="moveToBdd(items)">
                  <image :src="items.imageUrl" style="margin:0 auto;max-height:100%;width:100%" />
                </swiper-item>
              </block>
            </swiper>
            <view
              v-for="(child, childIndex) in item.listData"
              :key="childIndex"
              @tap="moveToDetail(child)"
              style="background:#fff"
            >
              <indexList :item="child"></indexList>
            </view>
          </view>
        </scroll>
      </swiper-item>
    </swiper>
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
let pageStart = 0
const classArray = [0, 8182, 6398, 8583, 239, 18637]
export default {
  components: { bannerSwiper, indexList, authButton },
  data() {
    return {
      searchValue: '',
      pageList: [],
      bannerList: [],
      indicatorDots: true,
      autoplay: true,
      interval: 4000,
      duration: 1000,
      showDialog: false,
      tabData1: [{
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
      sucessViewTop: 0,
      loadingRefresh: 0
    }
  },
  async onLoad() {
    const iphoneInfo = store.state.systemInfo
    const iphoneRect = await wx.getMenuButtonBoundingClientRect()
    const query = wx.createSelectorQuery()
    query.select('.header-container').boundingClientRect()
    query.exec(res => {
      this.sucessViewTop = res[0].height + (iphoneInfo.model.search('iPhone X') !== -1 ? 10 : -13)
      this.loadingRefresh = res[0].height + (iphoneInfo.model.search('iPhone X') !== -1 ? 10 : -20)
    })
    if (iphoneInfo.model === 'iphone X') {
    } else {
      this.searchTop = iphoneRect.top - 16 + 'px'
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
  methods: {
    changeDot(e) {
      this.currentDot = e.mp.detail.current
      this.loadData()
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
        pageData.end = false
      }
      // this.setCurrentData(currentCur, pageData)
    },
    // 刷新数据
    refresh() {
      this.pageList[this.currentDot].reset()
      this.getList('refresh', pageStart)
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
    loadData() {
      let pageData = this.getCurrentData(this.currentDot)
      if (pageData.listData.length === 0) {
        this.getList('refresh', pageStart)
      }
    },
    // 页面滑动切换事件
    async swipeChange(e) {
      // this.categoryData[this.currentDot].listData = []
      // this.pageList[this.currentDot].reset()
      console.log(this.categoryData[this.currentDot])
      /** todo */
      this.currentDot = e.mp.detail.current >= 6 ? 0 : e.mp.detail.current
      this.loadData()
    },
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
swiper {
  height: 100vh;
}
.movable-area {
  margin-top: 100px;
}
.cells {
  background: #ffffff;
  margin-top: 20rpx;
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
  width: 95%;
  height: 274rpx;
  border-radius: 20rpx;
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
  padding-top: 10rpx;
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