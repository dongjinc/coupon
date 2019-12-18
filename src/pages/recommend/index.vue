<template>
  <view>
    <view class="header-container">
      <tab
        :currentTab="currentDot"
        :menuList="tabList"
        :count="3"
        :tabScroll="80"
        windowWidth="100"
        @clickMenu="changeDot"
      ></tab>
    </view>
    <swiper :current="currentDot" :indicator-dots="false" @animationfinish="swipeChange">
      <swiper-item v-for="item in categoryData" :key="item">
        <!-- <view>{{item}}</view> -->
        <scroll
          :requesting="item.requesting"
          :end="item.end"
          :empty-show="item.emptyShow"
          :list-count="item.listData.length"
          :iphone-top="sucessViewTop"
          :refresh-size="loadingRefresh"
          @refresh="refresh"
          @more="more"
        >
          <view class="cells">
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
  </view>
</template>

<script>
import indexList from '@/components/index-list'
import { PageBase, get } from '@/utils/http'
import { moveTo } from '@/utils/common'
import store from '../../store'
import authButton from '@/components/auth-button'
const typeList = [0, 1, 2]
let pageStart = 0
export default {
  components: { indexList, authButton },
  data() {
    return {
      searchValue: '',
      topList: [[], [], [], [], [], []],
      pageList: [],
      bannerList: [],
      indicatorDots: true,
      autoplay: true,
      interval: 4000,
      duration: 1000,
      showDialog: false,
      tabList: [{
        name: '1块9包邮'
      }, {
        name: '今日爆款'
      }, {
        name: '品牌清仓'
      }],
      currentDot: 0,
      categoryData: [
        {
          name: '推荐',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '精选集锦',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '最新体验',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        }
      ],
      isIphoneX: false,
      sucessViewTop: 0,
      loadingRefresh: 0
    }
  },
  async onLoad() {
    const iphoneInfo = store.state.systemInfo
    const query = wx.createSelectorQuery()
    query.select('.header-container').boundingClientRect()
    query.exec(res => {
      this.sucessViewTop = res[0].height + (iphoneInfo.model.search('iPhone X') !== -1 ? -44 : -44)
      this.loadingRefresh = res[0].height + (iphoneInfo.model.search('iPhone X') !== -1 ? 30 : 0)
    })
  },
  mounted() {
    this.pageList = [
      new PageBase('api/v1/goods/dayRecommend'),
      new PageBase('api/v1/goods/dayRecommend'),
      new PageBase('api/v1/goods/dayRecommend')
    ]
    this.getBannerList()
    this.getList('refresh')
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
    async getList(type) {
      let currentCur = this.currentDot
      let pageData = this.getCurrentData(currentCur)
      pageData.requesting = true
      // this.setCurrentData(currentCur, pageData);
      wx.showNavigationBarLoading()
      // 模拟异步获取数据场景
      const result = await this.pageList[this.currentDot].next(
        { channelType: typeList[this.currentDot] }
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
    swipeChange(e) {
      /** todo */
      this.currentDot = e.mp.detail.current === 6 ? 0 : e.mp.detail.current
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
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  background: #d55251;
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