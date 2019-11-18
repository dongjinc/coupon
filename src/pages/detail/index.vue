<template>
  <view class="detail-container">
    <view class="back" :style="{top: topBack}" @tap="back">
      <image src="/static/images/back.png" />
    </view>
    <!-- 预览图 -->
    <swiper :indicator-dots="false" :style="{height: swiperHeight}">
      <block>
        <swiper-item v-for="(item, index) in goodsItem.goodsGalleryUrls" :key="index">
          <image @load="imageHeight" :style="{height: swiperHeight,width:'100%'}" :src="item" />
        </swiper-item>
      </block>
    </swiper>
    <view class="commodity-container">
      <!-- <image src="https://img.alicdn.com/imgextra/i1/356060330/O1CN01jV2NDF1EJBGpElxQi_!!356060330.jpg_430x430q90.jpg" style="width:100%;height:350px" /> -->
      <view class="commodity-title">
        <view class="commodity-price font-27">
          <text v-if="goodsItem.couponDiscount !== '0'">券后</text>
          <text>¥</text>
          <text class="coupon-price">{{goodsItem.couponPrice}}</text>
          <text
            class="normal-price font-27"
            v-if="goodsItem.couponDiscount !== '0'"
          >¥{{goodsItem.normalPrice}}</text>
        </view>
        <view class="commodity-assemble font-25">销量{{goodsItem.salesTip}}</view>
      </view>
      <view class="commodity-coupon" v-if="goodsItem.couponDiscount !== '0'">
        <text>发券</text>
        <text
          class="coupon-rest"
        >{{goodsItem.couponDiscount}}元券剩余{{goodsItem.couponRemainQuantity}}张</text>
      </view>
      <!-- <view class="commodity-return-cash">
        <text class="cash">返现</text>
        <text class="estimate">
          得16%预计
          <text style="color:#be5041">1.29元</text>，晋升到中级预计赚2.66元
        </text>
        <text class="iconfont iconyou right" style="margin-left:auto"></text>
      </view>-->
      <text class="commodity-name">{{goodsItem.goodsName}}</text>
      <view class="commodity-service font-25">
        <text>拼多多，拼多多，拼的多，省的多。</text>
      </view>
    </view>
    <view class="similar-commodity">
      <view class="similar-title">
        <view>相似商品</view>
        <view class="all-similar">
          <text>查看全部</text>
          <text class="iconfont iconyou"></text>
        </view>
      </view>
      <!-- 更多商品 -->
      <view class="more-commodity">
        <view
          v-for="(item, index) in goodsItem.recommend"
          :key="index"
          class="more-commodity-item"
          @tap="moveToDetail(item)"
        >
          <image :src="item.goodsThumbnailUrl" />
          <view class="post-coupon">
            <text v-if="item.couponDiscount !== '0'">券后</text>
            <text>¥</text>
            <text style="font-size:25rpx">{{item.couponPrice}}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- <view class="similar-commodity">
      <view class="similar-title">
        <view>商品评价</view>
        <view class="right-all">
          <text>查看全部</text>
          <text class="iconfont iconyou"></text>
        </view>
    </view>-->
    <!-- 评论 -->
    <!-- <view class="more-commodity comment-container"> -->
    <!-- 评论标签 -->
    <!-- <view class="comment-tag">
          <view class="comment-tag-item">正品(18)</view>
          <view class="comment-tag-item">质量很好(10218)</view>
          <view class="comment-tag-item">衣服很好(389218)</view>
    </view>-->
    <!-- 评论列表 -->
    <!-- <view class="comment-list">
          <view class="comment-list-top">
            <view class="comment-list-top-left">
              <image
                src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1573316656&di=e6346dfae80b451c19ccf8e6253ae28a&src=http://downhdlogo.yy.com/hdlogo/640640/630/630/71/1000710067/u1000710067JGb2l8C.png"
              />
              <text>凌波的云</text>
            </view>
            <view class="color-91918f">2019.10.10</view>
          </view>
          <view style="color:#696969">这件衣服很好看。。。</view>
        </view>
      </view>
    </view>-->
    <!-- 店铺 -->
    <view class="similar-commodity">
      <view class="commodity-shop">
        <view class="commodity-shop-top">
          <image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573834603444&di=6f0b79cf28303fb69de7d3afc3c4f84e&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Flarge%2Fac18b792ly1ftczwflpczj20dm0dmgq2.jpg"
          />
          <view class="commodity-shop-top-left">
            <view>
              <text style="font-size:27rpx">{{goodsItem.mallName}}</text>
              <!-- <text class="commodity-shop-top-left-extension">全国推广1%</text> -->
            </view>
            <!-- <view class="commodity-shop-top-left-number">
              <text>商品数量：9</text>
              <text style="margin-left:18rpx">已拼：10万+件</text>
            </view>-->
          </view>
        </view>
        <view class="commodity-shop-bottom">进入店铺</view>
      </view>
      <view class="shop-comment">
        <text>
          描述相符
          <text class="shop-comment-status">{{goodsItem.descTxt}}</text>
        </text>
        <text>
          服务态度
          <text class="shop-comment-status">{{goodsItem.servTxt}}</text>
        </text>
        <text>
          物流服务
          <text class="shop-comment-status">{{goodsItem.lgstTxt}}</text>
        </text>
      </view>
    </view>
    <!-- 详情 -->
    <view class="similar-commodity">
      <view class="similar-title">商品详情</view>
      <view style="margin:10px 0;font-size:30rpx;text-indent:30px;">{{goodsItem.goodsDesc}}</view>
      <view
        class="commodity-details"
        v-for="(item, index) in goodsItem.goodsDescImageUrls"
        :key="index"
      >
        <image :src="item" :style="{height: swiperHeight,width:'100%'}" @tap="viewImage(item)" />
      </view>
    </view>
    <!-- 分享以及立刻购买 -->
    <view class="share-container font-25">
      <view class="share-purchase-commodity bg-left">
        <view class="font-31">分享商品</view>
        <view>
          <text class="iconfont iconjinbi font-25"></text>拿奖励
        </view>
      </view>
      <view class="share-purchase-commodity bg-right" @tap="toPddWeApp">
        <view class="font-31">立即购买</view>
        <view>省{{goodsItem.commission}}元</view>
      </view>
    </view>
  </view>
</template>
<script>
import { get } from '@/utils/http'

export default {
  name: 'detail',
  data() {
    return {
      swiperHeight: '375px',
      topBack: '56rpx',
      // 详情内容
      goodsItem: {}
    }
  },
  onLoad(query) {
    this.getGoodDetail()
  },
  // 下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1500)
  },
  methods: {
    // 详情页
    async getGoodDetail() {
      wx.showLoading({ title: '加载中...' })
      try {
        const result = await get('api/v1/goods/detail', {
          goodsId: this.$mp.query.id
        })
        this.goodsItem = result
        console.log(result)
      } catch (e) {
      } finally {
        wx.hideLoading()
      }
    },
    // 预览图片
    viewImage(url) {
      wx.previewImage({
        current: url,
        urls: this.goodsItem.goodsDescImageUrls
      })
    },
    // 移动详情页
    moveToDetail(item) {
      // todo 优化
      const url = `../detail/main?id=${item.goodsId}`
      wx.navigateTo({ url })
    },
    // 返回
    back() {
      wx.navigateBack()
    },
    imageHeight(e) {
      // rpx与px单位之间的换算 : 750/windowWidth = 屏幕的高度（rpx）/windowHeight
      // https://www.jb51.net/article/138776.htm 计算swiper图片
      const winWid = wx.getSystemInfoSync().windowWidth
      const winInfo = wx.getSystemInfoSync()
      this.topBack =
        750 / winWid * 1 * (winInfo.model === 'iPhone X' ? 55 : 28) + 'rpx'
      const imagw = e.target.width
      const imagh = e.target.height
      this.swiperHeight = winWid * imagh / imagw + 'px'
    },
    async toPddWeApp() {
      try {
        const result = await get('api/v1/goods/generateWeAppInfo', {
          goodsId: this.$mp.query.id
        })
        let pddWeAppInfo = result
        // console.log(result)
        console.log(pddWeAppInfo)
        wx.navigateToMiniProgram({
          appId: pddWeAppInfo.appId,
          path: pddWeAppInfo.pagePath,
          success(res) {
            // 打开成功
          }
        })
      } catch (e) {
      } finally {
        wx.hideLoading()
      }
    }
  }
}
</script>
<style lang="scss">
page {
  background: #f6f5f4;
}
.font-25 {
  font-size: 25rpx;
}
.font-27 {
  font-size: 27rpx;
}
.font-31 {
  font-size: 31rpx;
}
.iconyou {
  font-size: 21rpx;
  margin-left: 3rpx;
}
.iconjinbi {
  color: yellow;
  margin-right: 6rpx;
}
.color-91918f {
  color: #91918f;
}
.detail-container {
  .back {
    font-size: 45rpx;
    position: fixed;
    top: 28px;
    left: 27px;
    z-index: 1;
    border-radius: 50%;
    color: #fff;
    image {
      width: 27px;
      height: 27px;
    }
  }
  .commodity-container {
    padding: 10rpx 27rpx 0 27rpx;
    background: #fff;
    .commodity-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .commodity-price {
        color: #cd4939;
        :nth-child(2) {
          margin: 0 3rpx;
          font-weight: bold;
        }
        .coupon-price {
          margin-right: 12rpx;
          font-size: 50rpx;
          font-weight: bold;
        }
        .normal-price {
          color: #808281;
          text-decoration: line-through;
        }
      }
      .commodity-assemble {
        color: #808281;
      }
    }
    .commodity-coupon {
      margin: 20rpx 0;
      font-size: 23rpx;
      :first-child {
        padding: 4rpx 8rpx;
        background: #be5041;
        border-radius: 5rpx;
        color: #fff;
      }
      .coupon-rest {
        margin-left: 8rpx;
        padding: 2rpx 8rpx;
        border: 3rpx solid #be5041;
        border-radius: 5rpx;
        color: #be5041;
      }
    }
    .commodity-return-cash {
      display: flex;
      align-items: center;
      font-size: 23rpx;
      .cash {
        padding: 5rpx 8rpx;
        background: #be5041;
        border-radius: 5rpx;
        color: #fff;
      }
      .estimate {
        margin-left: 8rpx;
        color: #91918f;
      }
      .right {
        margin-left: auto;
        color: #91918f;
      }
    }
    .commodity-name {
      display: flex;
      margin-top: 15rpx;
      padding-bottom: 16rpx;
      border-bottom: 2rpx solid #eee;
    }
    .commodity-service {
      display: flex;
      padding: 18rpx 0;
      align-items: center;
      color: #91918f;
    }
  }
  .similar-commodity {
    margin-top: 15rpx;
    padding: 0 27rpx;
    background: #fff;
    .similar-title {
      display: flex;
      padding: 15rpx 0;
      justify-content: space-between;
      border-bottom: 2rpx solid #eee;
      font-size: 27rpx;
      /** 查看全部按钮 */
      .right-all {
        display: flex;
        align-items: center;
        color: #91918f;
      }
    }
    /** 评论列表 */
    .comment-container {
      display: flex;
      flex-direction: column;
      .comment-tag {
        display: flex;
        margin-bottom: 10rpx;
        font-size: 24rpx;
        &-item {
          margin-right: 12rpx;
          padding: 10rpx;
          background: #f6e8eb;
          border-radius: 10rpx;
          color: #333;
        }
      }
      .comment-list {
        display: flex;
        flex-direction: column;
        padding: 15rpx 0;
        font-size: 24rpx;
        border-bottom: 2rpx solid #eee;
        &-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10rpx;
          &-left {
            display: flex;
            align-items: center;
            image {
              margin-right: 10rpx;
              width: 40rpx;
              height: 40rpx;
              border-radius: 50%;
            }
          }
        }
      }
    }
    /** 商铺 */
    .commodity-shop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15rpx;
      padding: 15rpx 0;
      &-top {
        display: flex;
        align-items: center;
        image {
          margin-right: 10rpx;
          width: 70rpx;
          height: 70rpx;
          border-radius: 10rpx;
        }
        &-left {
          display: flex;
          flex-direction: column;
          margin-left: 10rpx;
          font-size: 24rpx;
          &-extension {
            margin-left: 10rpx;
            padding: 2rpx;
            background: #f7e3e5;
            border-radius: 8rpx;
            font-size: 21rpx;
            color: #ff6347;
          }
          &-number {
            margin-top: 8rpx;
            font-size: 21rpx;
            color: #91918f;
          }
        }
      }
      &-bottom {
        padding: 6rpx;
        border-radius: 10rpx;
        font-size: 24rpx;
        border: 2rpx solid #eee;
      }
    }
    /** 商铺评价 */
    .shop-comment {
      display: flex;
      justify-content: space-between;
      padding: 0 40rpx 10rpx;
      font-size: 24rpx;
      &-status {
        padding: 0 6rpx;
        background: #f7e3e5;
        color: #ff6347;
      }
    }
    /** 商品详情 */
    .commodity-details {
      margin-top: 15rpx;
      &:last-child {
        padding-bottom: 100rpx;
      }
      image {
        width: 100%;
        height: 600rpx;
      }
    }

    .more-commodity {
      display: flex;
      margin-top: 15rpx;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      &-item {
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        align-items: center;
        margin-right: 10rpx;
        width: 150rpx;
        height: 180rpx;
        image {
          width: 100%;
          height: 150rpx;
          border-radius: 10rpx;
        }
        .post-coupon {
          font-size: 18rpx;
          font-weight: bold;
          color: #be5041;
          :nth-child(2) {
            margin: 0 1rpx;
          }
        }
      }
    }
  }
  .share-container {
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background: red;
    color: white;
    .share-purchase-commodity {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex: 1;
    }
    .bg-left {
      background: #eaa59e;
    }
    .bg-right {
      background: #d44f38;
    }
  }
}
</style>
