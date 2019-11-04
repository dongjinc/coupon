<template>
    <view>
        <view style="position:fixed;width:100%;background:#dc6364;display:flex;top:0;height:54px">
          <van-search style="flex:1" :focus="true" background="null" use-action-slot :value="searchValue" placeholder="请输入搜索的商品">
            <view slot="action" @tap="onSearch" style="color:white">搜索</view>
          </van-search>
        </view>
        <view class="search-container">
            <view style="display:flex;justify-content:space-between;padding:18rpx;position:sticky;top:54px;background:#fff;font-size:27rpx;color:#585858">
              <!-- 综合  销量  规格  筛选-->
              <view>综合</view>
              <view>销量</view>
              <view>规格</view>
              <view>筛选</view>
            </view>
            <indexList v-for="item in 10" :key="item"></indexList>
        </view>
    </view>
</template>
<script>
import indexList from '@/components/index-list'

export default {
  name: 'search',
  components: { indexList },
  data() {
    return {
      searchValue: ''
    }
  },
  onLoad(param) {
    console.log(param)
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
  margin-top:54px;
  background:#fff;
  .item-container{
    border-bottom: 5rpx solid #eee;
  }
}
</style>