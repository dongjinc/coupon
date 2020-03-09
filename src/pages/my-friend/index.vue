<template>
  <view>
    <scroll-view :scroll-y="true" style="height: 100vh" @scrolltolower="more">
      <view
        style="height: 170rpx;background: #ef7a82;border-radius: 0 0 50px 50px;padding-top:30px;"
      >
        <view style="display:flex;justify-content:space-around">
          <view style="display:flex;flex-direction:column;text-align:center;color:#f0f0f4">
            <text style="font-size:14px">我的好友</text>
            <view>
              <text style="font-size: 15px;font-weight:bold;margin-right:5rpx">好友数:</text>
              <text style="font-size: 14px;font-weight:bold">{{parentInfo.subordinateNum || 0}}</text>
            </view>
          </view>
          <!-- <view style="display:flex;flex-direction:column;text-align:center;color:#fff">
          <text style="font-size:14px">我的直推的合伙人</text>
          <text style="font-size: 35px;margin-top:15px;font-weight:bold">0</text>
          </view>-->
          <view style="display:flex;align-items:center;text-align:center;color:#fff">
            <view
              style="background: #a88462;padding: 2px 10rpx;border-radius: 20px;display: flex;align-items: center;"
            >
              <button
                size="mini"
                class="invite-btn"
                style="display: flex;align-items: center;"
                @tap="showInvitePopup"
              >
                立即邀请
                <image
                  src="/static/images/invite.png"
                  style="width:15px;height:15px;margin-left:10rpx"
                />
              </button>
            </view>
          </view>
        </view>
        <view
          v-if="parentInfo.xjdkqMember"
          style="width:100%;height:100rpx;position:absolute;top:200rpx;"
        >
          <view
            style="display:flex;align-items:center;width:93%;height:120rpx;background:#fff;margin:0 auto;border-radius:50rpx;box-shadow:0 10px 9px #eee;font-size:27rpx"
          >
            <view style="margin: 0 20rpx">
              <image
                :src="parentInfo.xjdkqMember.avatarUrl"
                style="width:60rpx;height:60rpx;border-radius:50%"
              />
            </view>
            <view style="display:flex;flex-direction:column">
              <div>
                <text>{{parentInfo.xjdkqMember.nickName}}</text>
                <text
                  style="margin-left:25rpx;background:#FFC0CB;border-radius:15px;padding:0 10rpx;color:#fff"
                >我的邀请人</text>
              </div>
              <text>称号</text>
            </view>
          </view>
        </view>
        <view :style="{'margin-top':parentInfo.xjdkqMember?'95px':'60px'}">
          <view
            style="display:flex;justify-content:space-around;font-size:29rpx;padding:15rpx 0;border-bottom:1px solid #eee"
          >
            <view
              v-for="(item, index) in sortList"
              :key="index"
              :class="[activeIndex === index?'activeItem': '']"
              style="position:relative;color:#444"
              @tap="focusItem(item, index)"
            >
              {{item.name}}
              <view style="position:absolute;right:-23rpx;top:5rpx;" v-if="item.isDot">
                <i
                  :class="[activeDot === 0 && activeIndex === index?'activeItem': '', 'iconfont','iconsanjiaoxing']"
                ></i>
                <i
                  :class="[activeDot === 1 && activeIndex === index?'activeItem': '', 'iconfont','iconsanjiaoxing-xia']"
                ></i>
              </view>
            </view>
          </view>
          <view v-if="!!inviteChildList.length">
            <view
              v-for="item in inviteChildList"
              :key="item"
              style="padding: 0 50rpx;border-bottom: 2rpx solid #eee"
            >
              <view style="display:flex;font-size:28rpx;padding:20rpx 0 10rpx;">
                <image :src="item.avatarUrl" style="width:60rpx;height:60rpx;border-radius:50%" />
                <view style="display:flex;flex-direction: column;margin-left:20rpx;font-size:27rpx">
                  <view style="height:40rpx; line-height:52rpx;">
                    <text style="font-size:30rpx;color:#333">{{item.nickName}}</text>
                    <text
                      style="margin-left: 5rpx;padding: 5rpx;background: #cadbfd;color:#6495ED;border-radius: 10rpx"
                    >会员</text>
                  </view>
                  <view style="color:#999; line-height:60rpx;margin-top:20rpx">
                    <text>邀请时间:</text>
                    <text style="margin-left: 5rpx;">{{item.invitationTime}}</text>
                  </view>
                  <!-- <view style="color:#555; line-height:60rpx">
                <text>直邀好友:</text>
                <text style="margin-left: 5rpx;">2</text>
              </view>
              <view style="color:#555; line-height:60rpx">
                <text>团队人数:</text>
                <text style="margin-left: 5rpx;">2</text>
              </view>
              <view style="color:#555; line-height:60rpx">
                <text>最近登录时间:</text>
                <text style="margin-left: 5rpx;">2019-12-01 23:12:10</text>
                  </view>-->
                </view>
              </view>
            </view>
          </view>
          <view
            @tap="showInvitePopup"
            v-else
            style="text-align:center;font-size: 28rpx;margin-top: 25rpx;"
          >
            暂无好友，快去
            <text style="color: #ef7a82;margin-right: 14rpx;">邀请</text>吧！
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 分享 -->
    <van-popup
      :show="showPopup"
      position="bottom"
      custom-style="height: 18%;"
      @close="showPopup = false"
    >
      <view @touchmove.stop.prevent class="share-content">
        <view class="left-wrap button-common">
          <image src="/static/images/wechat.jpg" />
          <button open-type="share">发给好友</button>
        </view>
        <view class="right-wrap button-common">
          <image src="/static/images/poster.png" />
          <button @tap="createPoster">生成海报</button>
        </view>
      </view>
    </van-popup>
    <!-- 生成后的 -->
    <van-overlay :show="postedPopup" @click.stop="postedPopup = false">
      <view class="canvas-wrap" v-if="postedPopup">
        <view class="content">
          <canvas canvas-id="firstCanvas"></canvas>
        </view>
        <view class="save-btn" @click.stop="savePoster">保存本地</view>
      </view>
    </van-overlay>
  </view>
</template>
<script>
import store from '@/store'
import { PageBase, get } from '@/utils/http'
import { formatTime } from '@/utils'
import { drawInit, drawPortrait, getSunCode } from '@/utils/common'
export default {
  name: 'myFriend',
  data() {
    return {
      sortList: [
        { name: '加入时间', isDot: true },
        { name: '好友数量', isDot: true },
        { name: '好友等级', isDot: false }
      ],
      inviteChildList: [],
      parentInfo: {},
      activeIndex: 0,
      // 上为0 下为1
      activeDot: 1,
      // 展示 popup
      showPopup: false,
      postedPopup: false
    }
  },
  watch: {
    activeIndex(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.activeDot = 1
      }
    }
  },
  async onLoad() {
    this.pageBase = {
      pageLoaders: new PageBase('api/v1/member/friendsList')
    }
    this.nextPage(true)
    this.getParentInfo()
  },

  onUnload() {
    this.activeIndex = -1
  },
  // 分享
  onShareAppMessage() {
    this.sharePopup = false
    return {
      title: '邀请好友',
      path: '/pages/index/main?userId=' + store.state.userInfo.id,
      imageUrl: '/static/images/invite-share.png'
    }
  },
  methods: {
    /** 获取父级集合 */
    async getParentInfo() {
      try {
        const result = await get('api/v1/member/superiorInfo')
        this.parentInfo = result
      } catch (e) {
        console.log(e)
      }
    },
    /** 获取我的邀请集合 */
    async nextPage(reset) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      try {
        const result = await this.pageBase.pageLoaders.next()
        if (result) {
          result.forEach(item => {
            item.invitationTime = item.invitationTime && formatTime(new Date(item.invitationTime))
          })
          if (reset) {
            this.inviteChildList = result
          } else {
            this.inviteChildList.push(...result)
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        wx.hideLoading()
      }
    },

    /** 生成海报 */
    async createPoster() {
      this.showPopup = false
      wx.showLoading({
        title: '生成海报中...',
        mask: true
      })
      let context = drawInit()
      context = await drawPortrait(context)
      wx.getImageInfo({
        src: '/static/images/invite-canvas.png',
        success: async res => {
          context.setStrokeStyle('red')
          context.strokeRect(14.5, 111.5, 271, 351)
          context.drawImage('/' + res.path, 15, 112, 270, 350)
        },
        fail: function (res) {
          console.log(res)
        }
      })
      // 绘制头像
      context = await getSunCode(context, { type: 10, value: 1022 }, 120, 377, 120, 377)
      context.draw()
      this.postedPopup = true
      wx.hideLoading()
    },
    /** 展示邀请 */
    showInvitePopup() {
      this.showPopup = true
    },
    // 保存海报
    savePoster() {
      wx.showLoading({
        title: '保存中...',
        mask: true
      })
      // 将 canvas 生成文件的临时路径 (本地路径)
      wx.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        success: res => {
          const tempFilePath = res.tempFilePath
          // 保存图片到系统相册
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: res => {
              wx.hideLoading()
              wx.showToast({
                title: '保存成功!',
                duration: 1000
              })
            },
            fail: () => {
              wx.hideLoading()
              wx.showToast({
                title: '保存失败!',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      })
    },
    /** 加载更多 */
    more() {
      this.nextPage()
    },
    focusItem(item, index) {
      this.activeIndex = index
      this.activeDot++
      if (this.activeDot === 2) {
        this.activeDot = 0
      }
    }
  }
}
</script>
<style lang="scss">
page {
  background: #fff;
}
.iconfont {
  font-size: 17rpx;
  color: #eee;
}
.iconsanjiaoxing {
  margin-top: 3rpx;
}
.iconsanjiaoxing-xia {
  margin-top: -3rpx;
}
.activeItem {
  color: #d55251 !important;
}
.invite-btn {
  color: #fff;
  background: 0;
  padding: 0 !important;
}
.invite-btn::after {
  border: 0 !important;
}
.share-content {
  display: flex;
  justify-content: space-around;
  .button-common {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    flex: 1;
    align-items: center;
  }
  .left-wrap {
    image {
      width: 160rpx;
      height: 150rpx;
    }
    button {
      margin-left: 8rpx;
    }
  }
  .right-wrap {
    image {
      width: 130rpx;
      height: 130rpx;
      margin-top: 8rpx;
    }
    button {
      margin-left: 4rpx;
    }
  }
  button {
    font-size: 31rpx;
    background: transparent;
    position: absolute;
    height: 200rpx;
    line-height: 340rpx;
    ::after {
      border: none !important;
    }
  }
  button::after {
    border: none !important;
  }
}
.canvas-wrap {
  height: 100%;
  .content {
    height: 950rpx;
    position: absolute;
    top: calc(45% - 500rpx);
    left: calc(50% - 300rpx);
    canvas {
      width: 300px;
      height: 100%;
    }
  }
  .save-btn {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    margin: 0 auto;
    background: #fff;
    line-height: 150rpx;
    text-align: center;
    font-size: 29rpx;
    box-shadow: 0 0 20rpx #eee;
    color: #444;
    position: absolute;
    bottom: 5%;
    left: calc(50% - 70rpx);
  }
}
</style>