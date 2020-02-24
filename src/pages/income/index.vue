<template>
  <view>
    <view v-if="!!incomeList.length">
      <view
        v-for="item in incomeList"
        :key="item"
        style="display:flex;flex-direction:column;border-bottom:2rpx solid #eee;padding:16rpx 16rpx 0"
      >
        <view style="font-size:27rpx;display:flex;align-items:center;">
          <image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573834603444&di=6f0b79cf28303fb69de7d3afc3c4f84e&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2Fac18b792ly1ftczwflpczj20dm0dmgq2.jpg"
            style="width:35rpx;height:35rpx"
          />
          <!-- <text style="margin:0 15rpx 0 10rpx">订单:</text> -->
          <text>{{item.remark}}</text>
        </view>
        <view style="display:flex;justify-content:space-between;margin:20rpx 0">
          <view style="display:flex;align-items:center">
            <image :src="userInfo.avatarUrl" style="width:80rpx;height:80rpx;border-radius:50%" />
            <view style="display:flex;flex-direction:column;margin-left:25rpx">
              <text style="font-size:35rpx">{{userInfo.nickName}}</text>
              <text style="font-size:23rpx;color:#333">{{item.createTime}}</text>
            </view>
          </view>
          <view>
            <view style="display:flex;flex-direction:column;">
              <text
                style="font-size:27rpx;color:#333;text-align:right"
              >{{item.type === 1?'预计收益': '提现'}}</text>
              <!-- type 1 收益  2 提现-->
              <text
                class="money"
                :style="{'color': item.type === 1? '#e56e86':'#519f53'}"
              >{{item.changeMoney}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view v-else>
      <van-divider
        contentPosition="center"
        customStyle="color: #999999;border-color: #999999;font-size: 14px;"
      >暂无数据</van-divider>
    </view>
  </view>
</template>
<script>
import store from '@/store'
import { PageBase } from '@/utils/http'
export default {
  name: 'Income',
  data() {
    return {
      userInfo: {},
      incomeList: []
    }
  },
  onLoad() {
    const { nickName, avatarUrl } = store.state.userInfo
    this.userInfo = { nickName, avatarUrl }
    this.pageBase = {
      pageLoader: new PageBase('/api/v1/member/accountDetailList')
    }
    this.getIncomeList()
  },
  // 下拉刷新
  async onPullDownRefresh() {
    wx.showNavigationBarLoading()
    await this.getIncomeList(true)
    wx.hideNavigationBarLoading() // 完成停止加载
    wx.stopPullDownRefresh() // 停止下拉刷新
  },
  onReachBottom() {
    // 到底部触发刷新
    // this.formObj.page++
    this.getIncomeList()
  },
  methods: {
    /** 收益明细 */
    async getIncomeList(reset) {
      if (reset) {
        this.pageBase.pageLoader.reset()
      }
      try {
        const result = await this.pageBase.pageLoader.next()
        if (reset) {
          this.incomeList = result
        } else {
          this.incomeList.push(...result)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang="scss">
.money {
  font-size: 38rpx;
  font-weight: bold;
  text-align: right;
}
</style>