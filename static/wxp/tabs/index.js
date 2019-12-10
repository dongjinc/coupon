Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuList: Array,
    currentTab: {
      type: Number,
      value: 0,
      observer: 'currentTabChange'
    },
    windowWidth: Number,
    tabScroll: Number,
    count: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    currentTabChange(newVal) {
      var res = wx.getSystemInfoSync()
      this.properties.windowWidth = res.windowWidth
      var tabWidth = this.properties.windowWidth / this.properties.count
      this.setData({
        tabScroll: (newVal - this.properties.count / 2) * tabWidth
      })
    },
    clickMenu: function (event) {
      var res = wx.getSystemInfoSync()
      this.properties.windowWidth = res.windowWidth
      var current = event.currentTarget.dataset.current
      var tabWidth = this.properties.windowWidth / this.properties.count
      this.setData({
        tabScroll: (current - this.properties.count / 2) * tabWidth
      })
      if (this.properties.currentTab == current) {
        return false
      } else {
        this.setData({
          currentTab: event.currentTarget.dataset.current
        })
        this.triggerEvent('clickMenu', { current: event.currentTarget.dataset.current }, {})
      }
    }

  }
})
