<template>
  <view>
    <view class="search-input">
      <van-search
        style="flex:1"
        :focus="true"
        background="null"
        use-action-slot
        clearable
        :value="searchValue"
        @change="searchValue = $event.mp.detail"
        @clear="searchListItem = []"
        placeholder="请输入搜索的商品"
      >
        <view slot="action" @tap="onSearch" style="color:white">搜索</view>
      </van-search>
    </view>
    <view v-if="searchListItem.length !== 0" class="search-container">
      <van-sticky offset-top="50" style="width:100%!important">
        <sort @sortType="changeType" :sortType="formObj.sortType"></sort>
      </van-sticky>
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
    <view v-else class="history-container" style="margin-top:60px">
      <view class="history-container-title">
        <text class="iconfont iconjiaoji"></text>
        <text>最近搜索</text>
        <text class="iconfont iconshanchu" @tap="delSearchHis"></text>
      </view>
      <view class="history-container-item">
        <view
          v-for="(item, index) in searchHistoryList"
          :key="index"
          @tap="clickSearch(item)"
        >{{item}}</view>
      </view>
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
    </view>
    <!-- 搜索发现 -->
  </view>
</template>
<script>
import indexList from '@/components/index-list'
import sort from '@/components/sort'
import { get } from '@/utils/http'
export default {
  name: 'search',
  components: { indexList, sort },
  data() {
    return {
      searchValue: '',
      searchListItem: [],
      searchHistoryList: [],
      searchExploreList: ['红富士苹果', '每日坚果', '卫生纸', '曲奇饼干', 'iphone 11'],
      formObj: {
        page: 1,
        sortType: 0
      }
    }
  },
  onLoad(param) { },
  onShow() {
    // 获取storage里面的值
    try {
      const res = wx.getStorageSync('search')
      if (res) {
        this.searchHistoryList = res
      }
    } catch (e) { console.log(e) }
    /* eslint-disable no-undef */
  },
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
    async onSearch() {
      if (this.searchValue === '') return wx.showToast({ title: '请输入要搜索的商品!', icon: 'none', duration: 1500 })
      if (!this.searchHistoryList.includes(this.searchValue)) {
        wx.setStorage({ key: 'search', data: [this.searchValue, ...this.searchHistoryList] })
      }
      this.formObj.page = 1
      this.getSearchList(true)
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
        console.log(e)
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
    clickSearch(item) {
      this.searchValue = item
      this.onSearch()
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
.iconfont {
  font-size: 38rpx;
}
.van-search {
  padding: 10px 0 10px 16px !important;
}
.search-input {
  position: fixed;
  display: flex;
  top: 0;
  width: 100%;
  background: #dc6364;
}
.search-container {
  margin-top: 50px;
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
</style>