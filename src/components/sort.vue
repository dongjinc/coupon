<template>
  <view
    style="display:flex;justify-content:space-between;font-size:26rpx;padding: 20rpx 10rpx;background:#fff"
  >
    <view
      style="margin: 0 auto"
      @tap="onActive('综合')"
      :class="[activeItem === '综合' ? 'activeClass' : 'notActive']"
    >综合</view>
    <view
      @tap="onActive('销量')"
      :class="[activeItem === '销量' ? 'activeClass' : 'notActive']"
      style="position:relative;margin: 0 auto"
    >
      销量
      <view style="position: absolute;right:-26rpx;top:0;">
        <i
          :class="[
            activeItem === '销量' && saleNum === 1
              ? 'activeClass'
              : 'notActiveItem',
            'iconfont',
            'iconx'
          ]"
          style="color:#eee;font-size:18rpx;"
        ></i>
        <i
          style="color:#eee;font-size:18rpx"
          :class="[
            activeItem === '销量' && saleNum === 2
              ? 'activeClass'
              : 'notActiveItem',
            'iconfont',
            'iconx'
          ]"
        ></i>
      </view>
    </view>
    <view
      @tap="onActive('价格')"
      :class="[activeItem === '价格' ? 'activeClass' : 'notActive']"
      style="position:relative;margin: 0 auto"
    >
      价格
      <view style="position: absolute;right:-26rpx;top:0;">
        <i
          :class="[
            activeItem === '价格' && saleNum === 1
              ? 'activeClass'
              : 'notActiveItem',
            'iconfont',
            'iconx'
          ]"
          style="color:#eee;font-size:18rpx;"
        ></i>
        <i
          style="color:#eee;font-size:18rpx"
          :class="[
            activeItem === '价格' && saleNum === 2
              ? 'activeClass'
              : 'notActiveItem',
            'iconfont',
            'iconx'
          ]"
        ></i>
      </view>
    </view>
    <view style="margin: 0 auto">筛选</view>
    <van-popup
      :show="sumPopup"
      position="top"
      @close="onClose"
      custom-style="height: 40%;width: 80%;border-radius:15rpx;overflow-y: visible;z-index:100000"
    ></van-popup>
  </view>
</template>
<script>
const sortTypeObj = {
  '综合': 0,
  '销量': 2,
  '价格': 4
}
export default {
  name: 'sort',
  props: {
    sortType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeItem: '综合',
      saleNum: 0,
      sumPopup: false
    }
  },
  watch: {
    sortType(newVal) {
      const arr = ['综合', '销量', '销量', '价格', '价格']
      this.activeItem = arr[newVal]
    }
  },
  mounted() {
    this.activeItem = '综合'
  },
  methods: {
    onActive(name) {
      this.saleNum++
      if (this.saleNum === 3) this.saleNum = 1
      if (this.activeItem !== name && this.activeItem) this.saleNum = 1
      const num = this.saleNum % 2 ? 1 : 0
      this.$emit('sortType', sortTypeObj[name] - num < 0 ? 0 : sortTypeObj[name] - num)
    },
    onClose() {
      this.sumPopup = false
    }
  }
}
</script>
<style lang="scss">
.activeClass {
  color: #ff6a6a !important;
}
.notActive {
  color: #000;
}
.notActiveItem {
  color: #eee !important;
}
</style>