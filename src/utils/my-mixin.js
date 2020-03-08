export default {
  created: function () {
    /** 初始化页面内容 */
    this.$_eventBus.$once('onLoad', () => {
      this.onAfterLoad()
    })
  },
  onLoad() { },
  methods: {
    onAfterLoad() { }
  }
}
