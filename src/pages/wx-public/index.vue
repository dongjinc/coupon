<template>
  <web-view :src="webSrc"></web-view>
</template>
<script>
export default {
  name: 'wxPublic',
  data() {
    return {
      webSrc: ''
    }
  },
  onLoad(query) {
    // https:// mp.weixin.qq.com/s?__biz=MzIzOTM1MTIyMw==&mid=100000007&idx=1&sn=d35ab05c27625d4817328d700490bee0&chksm=692a25df5e5dacc9f9f4ee095f80d3c6b7aea3455b2da16437c2ed231a13be15680fa512f15a#rd
    this.webSrc = decodeURIComponent(query.src)
    // this.webSrc = 'https://mp.weixin.qq.com/s?__biz=MzIzOTM1MTIyMw==&mid=100000007&idx=1&sn=d35ab05c27625d4817328d700490bee0&chksm=692a25df5e5dacc9f9f4ee095f80d3c6b7aea3455b2da16437c2ed231a13be15680fa512f15a#rd'
  }
}
</script>