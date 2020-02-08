<template>
  <div>
    <div class="container">
      <view class="month flex m-around" style="margin-top: -20px">
        <view class="arrow" @tap="prevMonth">《</view>
        <view class="year-and-month">
          <picker
            mode="date"
            :value="date"
            start="2015-09"
            end="2020-09"
            fields="month"
            @change="bindDateChange"
          >
            <view>{{date}}</view>
          </picker>
        </view>
        <view class="arrow" @tap="nextMonth">》</view>
      </view>
      <view class="calendar flex column s-center">
        <view class="week-row flex m-around">
          <div class="grid" v-for="(item, index) in week" :key="index">{{item}}</div>
        </view>
        <swiper class="swpier-box" circular="true" :current="swiperIndex" @change="swiperChange">
          <swiper-item class="flex m-around days-table">
            <!--  wx:for-item='x' -->
            <view
              v-for="(x, index) in calendar.first"
              :key="index"
              :class="['grid', x.month === month?'':'notCurrent',x.date === today?'today':'', x.date === beSelectDate ? 'choice':'']"
              @click="bindDayTap(x)"
            >
              <view>{{x.date === today?'今天':x.day}}</view>
            </view>
          </swiper-item>
          <swiper-item class="flex m-around days-table">
            <!-- wx:for-item="x"  data-test="{{(year + "-" +month + "-" + day)}}"-->
            <view
              v-for="x in calendar.second"
              :key="x.date"
              :class="['grid', x.month === month?'':'notCurrent',x.date === today?'today':'', x.date === beSelectDate ? 'choice':'']"
              @click="bindDayTap(x)"
            >
              <view>{{x.date === today?'今天':x.day}}</view>
            </view>
          </swiper-item>
          <swiper-item class="flex m-around days-table">
            <!-- wx:for-item='x' -->
            <view
              v-for="x in calendar.third"
              :key="x.date"
              :class="['grid', x.month === month?'':'notCurrent',x.date === today?'today':'', x.date === beSelectDate ? 'choice':'']"
              @click="bindDayTap(x)"
            >
              <view>{{x.date === today?'今天':x.day}}</view>
            </view>
          </swiper-item>
          <swiper-item class="flex m-around days-table">
            <!-- wx:for-item='x'  -->
            <view
              v-for="x in calendar.fourth"
              :key="x.date"
              :class="['grid', x.month === month?'':'notCurrent',x.date === today?'today':'', x.date === beSelectDate ? 'choice':'']"
              @click="bindDayTap(x)"
            >
              <view>{{x.date === today?'今天':x.day}}</view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
let chooseYear = null
let chooseMonth = null

console.log(chooseYear, chooseMonth)

export default {
  data() {
    return {
      day: '',
      year: '',
      month: '',
      date: '2017-01',
      today: '',
      week: ['日', '一', '二', '三', '四', '五', '六'],
      calendar: {
        first: [],
        second: [],
        third: [],
        fourth: []
      },
      swiperMap: ['first', 'second', 'third', 'fourth'],
      swiperIndex: 1,
      showCaldenlar: false,
      beSelectDate: ''
    }
  },
  computed: {
    count() {
      return store.state.count
    }
  },
  mounted() {
    const date = new Date()
    const month = this.formatMonth(date.getMonth() + 1)
    const year = date.getFullYear()
    const day = this.formatDay(date.getDate())
    const today = `${year}-${month}-${day}`
    const calendar = this.generateThreeMonths(year, month)
    this.calendar = calendar
    this.month = month
    this.year = year
    this.day = day
    this.today = today
    this.beSelectDate = today
    this.date = `${year}-${month}`
    console.log(month)
  },
  methods: {
    swiperChange(e) {
      const lastIndex = this.swiperIndex
      const currentIndex = e.target.current
      let flag = false
      // todo
      let { year, month, day, today, date, calendar, swiperMap } = this
      // todo
      let change = swiperMap[(lastIndex + 2) % 4]
      let time = this.countMonth(year, month)
      let key = 'lastMonth'
      console.log(calendar)
      if (lastIndex > currentIndex) {
        // todo
        const no1 = lastIndex === 3 && currentIndex === 0
          ? flag = true
          : null
        console.log(no1, flag)
      } else {
        // todo
        const no1 = lastIndex === 0 && currentIndex === 3
          ? null
          : flag = true
        console.log(no1)
      }
      if (flag) {
        key = 'nextMonth'
      }

      year = time[key].year
      month = time[key].month
      date = `${year}-${month}`
      day = ''
      console.log(month, key)
      if (today.indexOf(date) !== -1) {
        day = today.slice(-2)
      }

      time = this.countMonth(year, month)
      calendar[change] = null
      calendar[change] = this.generateAllDays(time[key].year, time[key].month)
      this.swiperIndex = currentIndex
      console.log(currentIndex)
      this.year = year.toString()
      this.month = month.toString()
      this.date = date.toString()
      this.day = day.toString()
      this.calendar = calendar
    },
    showCaldenlar() {
      this.showCaldenlar = !this.showCaldenlar
    },
    // 直接改变日期
    changeDate(year, month) {
      let day = this.day
      let today = this.today
      let calendar = this.generateThreeMonths(year, month)
      let date = `${year}-${month}`
      day = date.indexOf(today) === -1
        ? '01'
        : today.slice(-2)
      // todo
      this.calendar = calendar
      this.day = day.toString()
      this.date = date
      this.month = month.toString()
      this.year = year.toString()
    },
    prevMonth(e) {
      let year = this.year
      let month = this.month
      let time = this.countMonth(year, month)
      this.changeDate(time.lastMonth.year, time.lastMonth.month)
    },
    nextMonth(e) {
      let { year, month } = this
      let time = this.countMonth(year, month)
      this.changeDate(time.nextMonth.year, time.nextMonth.month)
    },

    bindDateChange(e) {
      if (e.detail.value === this.data.date) {
        return
      }

      const month = e.detail.value.slice(-2)
      const year = e.detail.value.slice(0, 4)

      this.changeDate(year, month)
    },
    bindDayTap(x) {
      console.log(x)
      let { month, year } = this
      let time = this.countMonth(year, month)
      let tapMon = x.month
      let day = x.day
      // todo
      if (tapMon === time.lastMonth.month) {
        this.changeDate(time.lastMonth.year, time.lastMonth.month)
      } else if (tapMon === time.nextMonth.month) {
        this.changeDate(time.nextMonth.year, time.nextMonth.month)
      } else {
        this.day = day
      }
      let beSelectDate = x.date
      this.beSelectDate = beSelectDate
      this.showCaldenlar = false
    },
    generateThreeMonths(year, month) {
      // todo
      let { swiperIndex, swiperMap, calendar } = this
      let thisKey = swiperMap[swiperIndex]
      let lastKey = swiperMap[swiperIndex - 1 === -1 ? 3 : swiperIndex - 1]
      let nextKey = swiperMap[swiperIndex + 1 === 4 ? 0 : swiperIndex + 1]
      let time = this.countMonth(year, month)
      delete calendar[lastKey]
      calendar[lastKey] = this.generateAllDays(time.lastMonth.year, time.lastMonth.month)
      delete calendar[thisKey]
      calendar[thisKey] = this.generateAllDays(time.thisMonth.year, time.thisMonth.month)
      delete calendar[nextKey]
      calendar[nextKey] = this.generateAllDays(time.nextMonth.year, time.nextMonth.month)
      return calendar
    },
    // 月份处理
    countMonth(year, month) {
      let lastMonth = {
        month: this.formatMonth(parseInt(month) - 1)
      }
      let thisMonth = {
        year,
        month,
        num: this.getNumOfDays(year, month)
      }
      let nextMonth = {
        month: this.formatMonth(parseInt(month) + 1)
      }

      lastMonth.year = parseInt(month) === 1 && parseInt(lastMonth.month) === 12
        ? `${parseInt(year) - 1}`
        : year + ''
      lastMonth.num = this.getNumOfDays(lastMonth.year, lastMonth.month)
      nextMonth.year = parseInt(month) === 12 && parseInt(nextMonth.month) === 1
        ? `${parseInt(year) + 1}`
        : year + ''
      nextMonth.num = this.getNumOfDays(nextMonth.year, nextMonth.month)
      return {
        lastMonth,
        thisMonth,
        nextMonth
      }
    },
    // 生成一个月
    generateAllDays(year, month) {
      let lastMonth = this.lastMonthDays(year, month)
      let thisMonth = this.currentMonthDays(year, month)
      let nextMonth = this.nextMonthDays(year, month)
      let days = [].concat(lastMonth, thisMonth, nextMonth)
      return days
    },
    // 生成上个月
    lastMonthDays(year, month) {
      const lastMonth = this.formatMonth(parseInt(month) - 1)
      const lastMonthYear = parseInt(month) === 1 && parseInt(lastMonth) === 12
        ? `${parseInt(year) - 1}`
        : year
      const lastNum = this.getNumOfDays(lastMonthYear, lastMonth) // 上月天数
      let startWeek = this.getWeekOfDate(year, month - 1, 1) // 本月1号是周几
      let days = []
      // todo
      if (startWeek === 7) {
        return days
      }

      const startDay = lastNum - startWeek

      return this.generateDays(lastMonthYear, lastMonth, lastNum, { startNum: startDay, notCurrent: true })
    },
    generateDays(year, month, daysNum, option = {
      startNum: 1,
      notCurrent: false
    }) {
      const weekMap = ['一', '二', '三', '四', '五', '六', '日']
      let days = []
      for (let i = option.startNum; i <= daysNum; i++) {
        let week = weekMap[new Date(year, month - 1, i).getUTCDay()]
        let day = this.formatDay(i)
        days.push({
          date: `${year}-${month}-${day}`,
          event: false,
          day,
          week,
          month,
          year
        })
      }
      return days
    },
    // 生成下个月
    nextMonthDays(year, month) {
      const nextMonth = this.formatMonth(parseInt(month) + 1)
      const nextMonthYear = parseInt(month) === 12 && parseInt(nextMonth) === 1
        ? `${parseInt(year) + 1}`
        : year
      // todo
      this.getNumOfDays(nextMonthYear, nextMonth) // 下月天数
      let endWeek = this.getWeekOfDate(year, month)
      let days = []
      let daysNum = 0
      // todo
      if (endWeek === 6) {
        return days
      } else if (endWeek === 7) {
        daysNum = 6
      } else {
        daysNum = 6 - endWeek
      }
      return this.generateDays(nextMonthYear, nextMonth, daysNum, { startNum: 1, notCurrent: true })
    },
    currentMonthDays(year, month) {
      const numOfDays = this.getNumOfDays(year, month)
      return this.generateDays(year, month, numOfDays)
    },
    // 获取指定 第n天是周几
    getWeekOfDate(year, month, day = 0) {
      let dateOfMonth = new Date(year, month, 0).getUTCDay() + 1
      // todo
      dateOfMonth = dateOfMonth === 7 ? dateOfMonth = 0 : ''
      return dateOfMonth
    },
    getNumOfDays(year, month, day = 0) {
      return new Date(year, month, day).getDate()
    },
    formatMonth(month) {
      let monthStr = ''
      if (month > 12 || month < 1) {
        monthStr = Math.abs(month - 12) + ''
      } else {
        monthStr = month + ''
      }
      monthStr = `${monthStr.length > 1 ? '' : '0'}${monthStr}`
      return monthStr
    },
    formatDay(day) {
      return `${(day + '').length > 1 ? '' : '0'}${day}`
    }
  }

}
</script>

<style lang="scss">
/* pages/calendar/calendar.wxss */
.container {
  height: 100vh;
  background-color: #393e44;
}
.days-table {
  flex-wrap: wrap;
  align-content: flex-start;
}
.calendar {
  position: fixed;
  z-index: 10000;
  background: #393e44;
}
.grid {
  width: 107.14rpx;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  font-size: 0.7rem;
  color: #fff;
}
.today {
  color: #88a1fd;
}
.grid view {
  height: 85rpx;
  line-height: 85rpx;
  width: 85rpx;
}
.choice view {
  border-radius: 50%;
  background: #88a1fd;
  background-position: center;
  color: white;
}
/* 非本月日期 */
.notCurrent {
  color: silver;
}
.day-hover {
  background: red;
}
.swpier-box {
  height: 500rpx;
  width: 100%;
}
.arrow {
  width: 100rpx;
  color: #88a1fd;
  text-align: center;
}
.year-and-month {
  color: #88a1fd;
}

.flex {
  display: flex;
}
/* 轴向 */
.column {
  flex-direction: column;
}
/* 主轴方向 */
.m-start {
  justify-content: flex-start;
}

.m-end {
  justify-content: flex-end;
}

.m-around {
  justify-content: space-around;
}
.m-between {
  justify-content: space-between;
}
.m-center {
  justify-content: center;
}
/* 侧轴方向 */
.s-start {
  align-items: flex-start;
}
.s-end {
  align-items: flex-end;
}

.s-around {
  align-items: space-around;
}
.s-between {
  align-items: space-between;
}
.s-center {
  align-items: center;
}
</style>