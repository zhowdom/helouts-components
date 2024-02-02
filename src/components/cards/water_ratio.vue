<template>
  <div class="eachCardBox clearfix">
    <div class="energyStatistic bdbox commonTitlebox comBoderAndBg rela" style="width:520px;height:213px;border: none;">
      <div class="main1 flex-row" style="width:500px;">
        <div class="mod1 flex-col"></div>
        <span class="txt1">{{cardTitle}}</span>
        <span class="word1">{{cardSubTitle}}</span>
        <div class="mod2 flex-col" style="margin-left:175px;"></div>
        <div class="mod3 flex-col"></div>
      </div>
      <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:482px;"></div>
      <div class="sp3Btns abs">
        <el-tabs v-model="activeName2" @tab-click="handleClick2">
          <el-tab-pane label="日" name="day"></el-tab-pane>
          <el-tab-pane label="月" name="month"></el-tab-pane>
          <el-tab-pane label="年" name="year"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-show="showDayPieWater" id="echrMain3Pie2Day" style="width: 420px;height: 158px;"></div>
      <div v-show="showMonthPieWater" id="echrMain3Pie2Month" style="width: 420px;height: 158px;"></div>
      <div v-show="showYearPieWater" id="echrMain3Pie2Year" style="width: 420px;height: 158px;"></div>
  </div>



 

  </div>
</template>

<script>
import * as echarts from 'echarts'
import mixin from '../mixin'
export default {
  name: 'water_ratio',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      // 卡片数据(有的是对象，有的数组)
      cardData: {
        dayData: [],
        monthData: [],
        yearData: []
      },
      activeName2: 'day',
      showDayPieWater: true,
      showMonthPieWater:false,
      showYearPieWater:false,
    }
  },
  async mounted () {
    await this.matchParmsPageType()
    await this.queryEachCardData()
    this.handleOpenFold('open')
  },
  created () {},
  watch: {
    '$store.state.twosidemenu.openOrfold' () {
      if (this.$store.state.twosidemenu.openOrfold == false) {
        this.handleOpenFold('close')
      } else {
        this.handleOpenFold('open')
      }
    }
  },
  methods: {
    handleOpenFold (v) {
      this.hoverStatus = null
      this.hoverStatus2 = null
      if (v == 'open') {
        this.vshowFlag = true
        this.openStatus = true
        this.closeStatus = false
        this.myEcharts3Pie3Day()
      } else {
        this.openStatus = false
        this.closeStatus = true
        setTimeout(() => {
          this.vshowFlag = false
        },1000)
      }
    },
    handleClick2 (tab) {
      switch (tab.name) {
        case 'day':
          this.showDayPieWater = true
          this.showMonthPieWater = false
          this.showYearPieWater = false
          // this.myEcharts3Pie3Day()
          break;
        case 'month':
          this.showDayPieWater = false
          this.showMonthPieWater = true
          this.showYearPieWater = false
          this.myEcharts3Pie3Month()
          break;
        case 'year':
          this.showDayPieWater = false
          this.showMonthPieWater = false
          this.showYearPieWater = true
          this.myEcharts3Pie3Year()
          break;
        default:
          break;
      }
    },
    queryEachCardData () {
      return new Promise((resolve, reject) => {
        const _temp = this.$store.getters.floatMenus
        const _params = _temp.find(v => v.pageCode === this.getCurrentPath()).cartList.find(v => v.cardCode === this.$options.name).params
        _params.cardCode = this.$options.name
        this.$axios.post(this.apiUrl, _params).then(({data}) => {
          if (data.code === 200) {
            this.cardData = data.data
          } else {
            this.cardData = {
              dayData: [],
              monthData: [],
              yearData: []
            }
            this.$message.error(response.message)
          }
          resolve(this.cardData)
        }).catch(e => {
          this.loading = false
        })
      })
      
    },
    myEcharts3Pie3Day () {
      var myChart = echarts.init(document.getElementById('echrMain3Pie2Day'))

      var itemStyle = {
          normal: {
              opacity: 1
            }
      };
      var option = {
          title: {
            show: false,
              text: '饼图纹理',
              textStyle: {
                  color: '#235894'
              }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
              name: '用水占比(日)',
              type: 'pie',
              center: ['55%', '56%'],
              selectedMode: 'single',
              selectedOffset: 30,
              clockwise: true,
              radius: ['0%', '60%'],
              label: {
                  fontSize: 12,
                  color: '#4B7CF6FF'
              },
              labelLine: {
                  lineStyle: {
                      color: '#235894'
                  }
              },
              data: this.cardData.dayData.map((v, i) => {
                const colorArr = ['#efc511', '#e78024', '#ea4c3d', '#9c5ab7']
                return {
                  value: v.value,
                  name: v.deviceName,
                  itemStyle: { color: colorArr[i] }
                }
              }),
              itemStyle: itemStyle
          }]
      };
      myChart.setOption(option);
    },
    myEcharts3Pie3Month () {
      var myChart = echarts.init(document.getElementById('echrMain3Pie2Month'))

      var itemStyle = {
          normal: {
              opacity: 1
            }
      };
      var option = {
          title: {
            show: false,
              text: '饼图纹理',
              textStyle: {
                  color: '#235894'
              }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
              name: '用水占比(月)',
              type: 'pie',
              center: ['55%', '56%'],
              selectedMode: 'single',
              selectedOffset: 30,
              clockwise: true,
              radius: ['0%', '60%'],
              label: {
                  fontSize: 12,
                  color: '#4B7CF6FF'
              },
              labelLine: {
                  lineStyle: {
                      color: '#235894'
                  }
              },
              data: this.cardData.monthData.map((v, i) => {
                const colorArr = ['#efc511', '#e78024', '#ea4c3d', '#9c5ab7']
                return {
                  value: v.value,
                  name: v.deviceName,
                  itemStyle: { color: colorArr[i] }
                }
              }),
              itemStyle: itemStyle
          }]
      };
      myChart.setOption(option);
    },
    myEcharts3Pie3Year () {
      var myChart = echarts.init(document.getElementById('echrMain3Pie2Year'))

      var itemStyle = {
          normal: {
              opacity: 1
            }
      };
      var option = {
          title: {
            show: false,
              text: '饼图纹理',
              textStyle: {
                  color: '#235894'
              }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
              name: '用水占比(年)',
              type: 'pie',
              center: ['55%', '56%'],
              selectedMode: 'single',
              selectedOffset: 30,
              clockwise: true,
              radius: ['0%', '60%'],
              label: {
                  fontSize: 12,
                  color: '#4B7CF6FF'
              },
              labelLine: {
                  lineStyle: {
                      color: '#235894'
                  }
              },
              data: this.cardData.yearData.map((v, i) => {
                const colorArr = ['#efc511', '#e78024', '#ea4c3d', '#9c5ab7']
                return {
                  value: v.value,
                  name: v.deviceName,
                  itemStyle: { color: colorArr[i] }
                }
              }),
              itemStyle: itemStyle
          }]
      };
      myChart.setOption(option);
    },
  }
}
</script>


<style scoped>
.energyStatistic{
  padding: 10px;
  width:520px;
  height:270px;
}
.commonTitlebox .main1 .mod1{
    width: 6px;
    height: 28px;
    background: url(../../assets/mod1-bg.png) 100% no-repeat;
}
.commonTitlebox .main1 .txt1 {
    width: 64px;
    height: 22px;
    display: block;
    overflow-wrap: break-word;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    white-space: nowrap;
    line-height: 22px;
    text-align: left;
    margin: 4px 0 0 10px;
}
.commonTitlebox .main1 .mod3 {
        width: 27px;
    height: 8px;
    background: url(../../assets/mod3-bg.png) 0px 0px no-repeat;
    margin: 7px 0 0 8px;
}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
.commonTitlebox .main1 .mod2 {
    width: 42px;
    height: 2px;
    background: url(../../assets/mod2-bg.png) 100% no-repeat;
    margin: 10px 0 0 184px;
}
.commonTitlebox .main1 .mod3 {
        width: 27px;
    height: 8px;
    background: url(../../assets/mod3-bg.png) 0px 0px no-repeat;
    margin: 7px 0 0 8px;
}
.commonTitlebox .main1 .word1 {
    width: 149px;
    height: 17px;
    display: block;
    overflow-wrap: break-word;
    color: rgba(50, 197, 255, 1);
    font-size: 12px;
    text-transform: uppercase;
    font-family: PingFangSC-Semibold;
    white-space: nowrap;
    line-height: 17px;
    text-align: left;
    margin: 9px 0 0 10px;
}
</style>
<style>
.sp3Btns{
  z-index: 1000;
  top:55px;
  right:10px;
}
.sp3Btns .el-tabs__nav-wrap:after{
  background-color: transparent;
}
.sp3Btns .el-tabs__item{
  color: #36C3FEFF;
  height: 24px;
  line-height: 24px;
  font-size: 13px;
  background: #141d36;
  margin-left: 7px;
  width:40px;
  text-align: center;
  padding: 0;
  border-radius: 4px;
}
.sp3Btns .el-tabs__item.is-active{
  color: #fff;
}
.sp3Btns .el-tabs__active-bar{
  background-color: none;
  height: 0;
}
</style>
