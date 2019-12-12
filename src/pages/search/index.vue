<template>
  <view>
    <view class="search-input" style="display:flex;flex-direction:column">
      <van-search
        style="flex:1"
        :focus="true"
        background="null"
        use-action-slot
        clearable
        :value="searchValue"
        @change="searchValue = $event.mp.detail"
        @focus="searching=false;getSearchStorge()"
        @clear="searching = false;getSearchStorge"
        @search="searchItem"
        placeholder="请输入搜索的商品"
      >
        <view slot="action" @tap="onSearch" style="color:white">搜索</view>
      </van-search>
      <view v-if="searchListItem.length !== 0 && searching">
        <sort @sortType="changeType" :sortType="formObj.sortType"></sort>
      </view>
    </view>
    <view v-if="searchListItem.length !== 0 && searching" class="search-container">
      <view
        v-for="(item, index) in searchListItem"
        :key="index"
        style="background:#fff"
        @tap="moveToDetail(item)"
      >
        <indexList :item="item"></indexList>
      </view>
      <!-- 最近搜索 -->
    </view>
    <view v-if="searching && searchListItem.length === 0" class="not-data">
      <image src="/static/images/no-data.png" />
      <view>暂无数据</view>
    </view>
    <view v-if="!searching" class="history-container" style="margin-top:60px">
      <view class="history-container-title">
        <text class="iconfont icontansuo"></text>
        <text>探索发现</text>
      </view>
      <view class="history-container-item">
        <view
          v-for="(item, index) in searchExploreList"
          :key="index"
          @tap="clickSearch(item)"
        >{{item}}</view>
      </view>
      <view class="history-container-title">
        <text class="iconfont iconjiaoji"></text>
        <text>最近搜索</text>
        <text class="iconfont iconshanchu" @tap="delSearchHis"></text>
      </view>
      <view class="history-container-item">
        <view
          v-for="(item, index) in searchHistoryList"
          :key="index"
          @tap="clickSearch(item, index)"
        >{{item}}</view>
      </view>
    </view>
    <!-- 搜索发现 -->
  </view>
</template>
<script>
import indexList from '@/components/index-list'
import sort from '@/components/sort'
import { get } from '@/utils/http'
import { moveTo } from '@/utils/common'
export default {
  name: 'search',
  components: { indexList, sort },
  data() {
    return {
      searchValue: '',
      searchListItem: [],
      searchHistoryList: [],
      searchExploreList: [],
      searching: false,
      formObj: {
        page: 1,
        sortType: 0
      }
    }
  },
  onLoad(param) {
    /** 探索发现 */
    this.getHotSearchList()
    this.getSearchStorge()
  },
  onShow() { },
  onReachBottom() {
    // 到底部触发刷新
    this.formObj.page++
    this.getSearchList()
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
  // 判断是否是从Tab跳转过来的
  // onTabItemTap() {
  //   wx.showLoading({ title: '加载中...' })
  //   this.searchListItem = []
  //   this.searchValue = ''
  //   setTimeout(() => {
  //     wx.hideLoading()
  //   }, 700)
  // },
  watch: {
    'formObj.sortType': {
      handler(newVal) {
        this.formObj.page = 1
        this.getSearchList(true)
      }
    }
  },
  methods: {
    /** 记录搜索内容 */
    async getSearchStorge() {
      // 获取storage里面的值
      try {
        const res = await wx.getStorageSync('search')
        if (res) {
          this.searchHistoryList = res.map(item => item.length > 11 ? item.substr(0, 10) + '...' : item)
        }
      } catch (e) { console.log(e) }
    },
    /** 获取探索发现列表 */
    async getHotSearchList() {
      try {
        const result = await get('api/v1/goods/hotSearch')
        this.searchExploreList = result.hotSearch
      } catch (e) { console.log(e) }
    },
    async onSearch() {
      const searchVal = this.searchValue
      this.searching = false
      const storageSearch = wx.getStorageSync('search')
      if (searchVal === '') return wx.showToast({ title: '请输入要搜索的商品!', icon: 'none', duration: 1500 })
      if (!storageSearch.includes(searchVal)) {
        wx.setStorage({ key: 'search', data: [searchVal, ...storageSearch] })
      }
      this.formObj.page = 1
      await this.getSearchList(true)
      this.searching = true
    },
    searchItem(e) {
      this.searchValue = e.mp.detail
      this.onSearch()
    },
    // 搜索数据
    async getSearchList(isSort) {
      if (isSort) {
        wx.showLoading({
          title: '加载中...'
        })
      }
      try {
        const result = await get('api/v1/goods/search', { ...this.formObj, keyword: this.searchValue })
        if (isSort) this.searchListItem = result
        else this.searchListItem.push(...result)
      } catch (e) {
        wx.showToast({
          title: '未搜到结果!',
          icon: 'none'
        })
        isSort = false
      } finally {
        if (isSort) {
          wx.hideLoading()
        }
      }
    },
    changeType(val) {
      this.$set(this.formObj, 'sortType', val)
    },
    // 清空storage
    delSearchHis() {
      const that = this
      wx.showModal({
        title: '提示',
        content: '确定要清空最近搜索内容吗？',
        success(res) {
          if (res.confirm) {
            that.searchHistoryList = []
            wx.setStorage({ key: 'search', data: [] })
          }
        }
      })
    },
    // 点击搜索
    async clickSearch(item, index) {
      const storageSearch = wx.getStorageSync('search')
      this.searchValue = storageSearch[index] || item
      this.onSearch()
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
.iconfont {
  font-size: 38rpx;
}
.van-search {
  padding: 10px 0 10px 16px !important;
}
.search-input {
  position: fixed;
  display: flex;
  top: -2rpx;
  width: 100%;
  background: #39b54a;
}
.search-container {
  margin-top: 90px;
  .item-container {
    border-bottom: 5rpx solid #eee;
  }
}
.history-container {
  margin: 0 25rpx;
  &-title {
    display: flex;
    align-items: center;
    color: gray;
    font-size: 28rpx;
    :nth-child(2) {
      margin-left: 4rpx;
    }
    :nth-child(3) {
      margin-left: auto;
    }
  }
  &-item {
    display: flex;
    flex-wrap: wrap;
    margin: 10rpx;
    font-size: 27rpx;
    view {
      margin: 0 13rpx 13rpx 0;
      padding: 13rpx;
      background: #eee;
      color: #363636;
      border-radius: 30rpx;
    }
  }
}
.not-data {
  height: 100%;
  text-align: center;
  image {
    margin-top: 40%;
    width: 150px;
    height: 130px;
  }
  :last-child {
    margin-top: 30rpx;
    font-size: 30rpx;
    color: #555555;
  }
}
</style>