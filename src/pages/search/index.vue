<template>
  <view>
    <view class="search-input" :style="{'position': !searching? '': 'fixed'}">
      <!-- <van-search
        style="flex:1"
        background="null"
        use-action-slot
        :focus="focus"
        clearable
        :value="searchValue"
        @change="searchValue = $event.mp.detail"
        @focus="searching = false;getSearchStorge()"
        @clear="searching = false;getSearchStorge"
        @search="searchItem"
        placeholder="请输入搜索的商品"
      >
        <view slot="action" @tap="onSearch" style="color:white">搜索</view>
      </van-search>-->

      <view class="input-wrap">
        <view class="left-wrap">
          <image src="/static/tabs/search.png" />
          <input
            class="weui-input"
            :focus="focus"
            :value="searchValue"
            confirm-type="search"
            placeholder-style="height:72rpx;line-height: 72rpx"
            :adjust-position="false"
            :cursor-spacing="80"
            @focus="searching = false;getSearchStorge()"
            @input="searchItem"
            @confirm="onSearch"
            @blur="focus = false"
            placeholder="请输入搜索的商品"
          />
        </view>
        <button class="search-btn" size="mini" @tap="onSearch">搜索</button>
      </view>

      <view v-if="searchListItem.length !== 0 && searching">
        <sort @sortType="changeType" :sortType="formObj.sortType"></sort>
      </view>
    </view>

    <view
      v-if="searchListItem.length !== 0 && searching"
      class="search-container"
      :style="{'margin-top': !searching?'0':'80px'}"
    >
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
    <view
      v-if="!searching"
      class="history-container"
      :style="{'margin-top':!searching?'20px':'60px'}"
    >
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
import { get, PageBase } from '@/utils/http'
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
      focus: false,
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
    this.$_eventBus.$on('focus', param => {
      if (param) {
        /** 延迟聚焦 否则会出现选择某一个item 还会再弹出键盘 */
        setTimeout(() => {
          this.focus = true
        }, 100)
        this.searchValue = ''
      } else {
        this.focus = false
        wx.nextTick(() => {
          this.isDetail = false
        })
      }
    })
    this.pageBase = {
      pageLoader: new PageBase('api/v1/goods/search')
    }
  },
  onShow() {
    if (!this.isDetail) { this.$_eventBus.$emit('focus', true) }
    setTimeout(() => {
      this.isDetail = false
    }, 1000)
  },
  onHide() {
    /* eslint-disable no-undef */
    const list = getCurrentPages()

    console.log(111, list)
  },
  onReachBottom() {
    // 到底部触发刷新
    // this.formObj.page++
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
        // this.formObj.page = 1
        this.getSearchList(true)
      }
    }
  },
  methods: {
    onInput(e) {
      console.log(e)
    },
    /** 记录搜索内容 */
    async getSearchStorge() {
      // 获取storage里面的值
      try {
        const res = await wx.getStorageSync('search')
        if (res) {
          this.searchHistoryList = res.map(item => item.length > 13 ? item.substr(0, 13) + '...' : item)
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
        /** 截取超过14条以上 记录进行截取 */
        wx.setStorage({ key: 'search', data: [searchVal, ...(storageSearch.length >= 14 ? storageSearch.splice(-1) : storageSearch)] })
      }
      // this.formObj.page = 1
      await this.getSearchList(true)
    },
    searchItem(e) {
      this.searchValue = e.mp.detail.value
    },
    // 搜索数据
    async getSearchList(reset) {
      if (reset) {
        wx.showLoading({
          title: '加载中...'
        })
        this.pageBase.pageLoader.reset()
      }
      try {
        const result = await this.pageBase.pageLoader.next({ sortType: this.formObj.sortType, keyword: this.searchValue })
        if (reset) this.searchListItem = result
        else this.searchListItem.push(...result)
      } catch (e) {
        wx.showToast({
          title: '未搜到结果!',
          icon: 'none'
        })
        reset = false
      } finally {
        if (reset) {
          wx.hideLoading()
        }
        this.searching = true
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
      this.isDetail = true
      moveTo('/detail/pages/main', { id: item.goodsId })
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
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  top: 0;
  z-index: 100;
  background: #d55251;
  .input-wrap {
    padding: 10rpx 0 0 25rpx;
    margin-bottom: 12rpx;
    display: flex;
    align-items: center;
    .left-wrap {
      display: flex;
      align-items: center;
      flex: 1;
      background: #fff;
      border-radius: 15rpx;
      image {
        width: 45rpx;
        height: 45rpx;
        margin: 0 10rpx;
      }
      .weui-input {
        height: 72rpx;
        flex: 1;
      }
    }
  }
  .search-btn {
    color: #fff;
    background: #d55251;
    width: 100rpx;
    padding: 0;
  }
  .search-btn::after {
    border: 0 !important;
  }
}
.search-container {
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