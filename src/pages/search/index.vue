<template>
    <view>
        <view style="position:fixed;width:100%;background:#dc6364;display:flex;top:0;height:54px">
          <van-search style="flex:1" :focus="true" background="null" use-action-slot :value="searchValue" placeholder="请输入搜索的商品">
            <view slot="action" @tap="onSearch" style="color:white">搜索</view>
          </van-search>
        </view>
        <view v-if="searchListItem.length !== 0" class="search-container">
            <view style="display:flex;justify-content:space-between;padding:18rpx;position:sticky;top:54px;font-size:27rpx;color:#585858;background:#fff">
              <!-- 综合  销量  规格  筛选-->
              <view>综合</view>
              <view>销量</view>
              <view>规格</view>
              <view>筛选</view>
            </view>
            <indexList v-for="item in 10" :key="item"></indexList>
            <!-- 最近搜索 -->
        </view>
        <view v-else class="history-container" style="margin-top:60px">
          <view class="history-container-title">
              <text class="iconfont share" style="font-size:28rpx"></text>
              <text>最近搜索</text>
              <text class="iconfont share"></text>
          </view>
          <view class="history-container-item">
            <view>可惜不是你嗷嗷</view>
            <view>22221</view>
            <view>一生衣服</view>
            <view>22221</view>
          </view>
          <view class="history-container-title">
              <text class="iconfont share" style="font-size:28rpx"></text>
              <text>探索发现</text>
          </view>
          <view class="history-container-item">
            <view>衣服扣子</view>
            <view>电话充费</view>
            <view>联通大王卡</view>
            <view>办公电脑</view>
          </view>
        </view>
        <!-- 搜索发现 -->
    </view>
</template>
<script>
import indexList from '@/components/index-list'

export default {
  name: 'search',
  components: { indexList },
  data() {
    return {
      searchValue: '',
      searchListItem: []
    }
  },
  onLoad(param) {
    this.searchListItem = []
    console.log(param)
  },
  methods: {
    onSearch() {
      console.log(123)
      this.searchListItem.push(1)
      console.log(this.searchListItem)
    }
  }
}
</script>
<style lang="scss">
page{
  background:#f6f5f4;
}
.van-search{
  padding: 10px 0 10px 16px!important;
}
.search-container{
  margin-top:50px;
  .item-container{
    border-bottom: 5rpx solid #eee;
  }
}
.history-container{
  margin: 0 25rpx;
  &-title {
  display:flex;
  align-items:center;
  color:gray;
  font-size:26rpx;
    :nth-child(2){
      margin-left: 4rpx
    }
    :nth-child(3){
      margin-left:auto;
      font-size:28rpx;
    }
  }
  &-item{
    display:flex;
    flex-wrap:wrap;
    margin:10rpx;
    font-size:25rpx;
    view{
      margin:0 13rpx 13rpx 0;
      padding: 13rpx;
      background:#eee;
      color:#363636;
      border-radius:30rpx
    }
  }
}
</style>