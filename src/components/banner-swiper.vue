<template>
  <view class="banner-container">
    <swiper
      :style="{width:'100vw', height: '470rpx'}"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      :previous-margin="'60rpx'"
      :next-margin="'60rpx'"
      indicator-active-color="#eb3e47"
      @change="swiperChange"
    >
      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <view
            class="image-container"
            :style="{
            justifyContent: currentIndex===0?((index===imgUrls.length-1)?'flex-end':(index===1?'flex-start':'center')):(currentIndex===imgUrls.length-1?(index===0?'flex-start':(index===imgUrls.length-2?'flex-end':'center')):(index===currentIndex-1?'flex-end':(index===currentIndex+1?'flex-start':'center'))), 
            padding: currentIndex===0?((index===imgUrls.length-1)?'56rpx 26rpx 0 0':(index===1?'56rpx 0 0 26rpx':'56rpx 0 0 0')):(currentIndex===imgUrls.length-1?(index===0?'56rpx 0 0 26rpx':(index===imgUrls.length-2?'56rpx 26rpx 0 0':'56rpx 0 0 0')):(index===currentIndex-1?'56rpx 26rpx 0 0':(index===currentIndex+1?'56rpx 0 0 26rpx':'56rpx 0 0 0')))
          }"
          >
            <image
              :src="item"
              class="slide-image"
              :style="{
                        transform: currentIndex===index?'scale(' + scaleX + ',' + scaleY + ')':'scale(1,1)'
                    }"
            />
          </view>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>
<script>
export default {
  name: 'bannerSwiper',
  props: {
    imgUrls: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      scaleX: 1.1527,
      scaleY: 1.1524,
      currentIndex: 0,
      circular: true
    }
  },
  methods: {
    swiperChange(e) {
      this.currentIndex = e.mp.detail.current
      this.scaleX = (634 / 550).toFixed(4)
      this.scaleY = (378 / 328).toFixed(4)
    }
  }
}
</script>
<style lang="scss" scoped>
.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
}
.slide-image {
  width: 550rpx;
  height: 328rpx;
  z-index: 200;
  border-radius: 16rpx;
  transition-duration: 0.3s;
  transition-timing-function: 'ease';
}
</style>
