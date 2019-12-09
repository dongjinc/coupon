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
      <tab
        :currentTab="currentDot"
        :menuList="tabData1"
        :count="6"
        :tabScroll="4"
        @clickMenu="changeDot"
      ></tab>
      <!-- <tab :tab-data="tabData1" :size="80" scroll @change="changeDot"></tab> -->
      <!-- <view>
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
      </view>-->
      <!-- <bannerSwiper :imgUrls="imgUrls"></bannerSwiper> -->
    </view>
    <swiper :current="currentDot" :indicator-dots="false" @animationfinish="swipeChange">
      <swiper-item v-for="item in categoryData" :key="item">
        <!-- <view>{{item}}</view> -->
        <scroll
          :requesting="item.requesting"
          :end="item.end"
          :empty-show="item.emptyShow"
          :list-count="item.listData.length"
          :has-top="true"
          :refresh-size="60"
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
    <view class="tabs-container">
      <!-- <van-tabs animated sticky :active="tabActive" line-height="0px" @change="onChange">
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
      </van-tabs>-->
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
let pageStart = 0
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
      showDialog: false,
      // tabData1: ['精选', '水果', '零食', '内衣', '男装', '美妆'],
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
      }, {
        name: '美妆'
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
        },
        {
          name: '资料',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '版本',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '攻略',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '排行',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        },
        {
          name: '热门',
          requesting: false,
          end: false,
          emptyShow: false,
          page: pageStart,
          listData: []
        }
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
        classArray[this.currentDot]
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
      this.currentDot = e.mp.detail.current
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
swiper {
  height: 100vh;
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
  background-image: linear-gradient(180deg, #eb3e47, #eee);
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