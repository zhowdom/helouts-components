<template>
  <div class="eachCardBox clearfix">
    <div class="energyStatistic bdbox commonTitlebox comBoderAndBg" style="width:520px;height:254px;">
          <div class="main1 flex-row" style="width:499px;">
            <div class="mod1 flex-col"></div>
            <span class="txt1">{{cardTitle}}</span>
            <div class="mod2 flex-col" style="margin-left:340px;"></div>
            <div class="mod3 flex-col"></div>
          </div>
          <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:481px;"></div>
          <div id="echrMain3Pie" style="width: 490px;height: 189px;"></div>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import mixin from '../mixin'
export default {
  name: 'env_year_total',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      // 卡片数据(有的是对象，有的数组)
      cardData: []
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
    queryEachCardData () {
      return new Promise((resolve, reject) => {
        const _temp = this.$store.getters.floatMenus
        const _params = _temp.find(v => v.pageCode === this.getCurrentPath()).cartList.find(v => v.cardCode === this.$options.name).params
        _params.cardCode = this.$options.name
        this.$axios.post(this.apiUrl, _params).then(({data}) => {
          if (data.code === 200) {
            this.cardData = data.data || []
          } else {
            this.cardData = []
            this.$message.error(response.message)
          }
          resolve(this.cardData)
        }).catch(e => {
          this.loading = false
        })
      })
      
    },
    myEcharts3Pie () {
      var myChart = echarts.init(document.getElementById('echrMain3Pie'))

      var itemStyle = {
          normal: {
              opacity: 1
            }
      };
      var option = {
          title: {
            show: false,
              text: '',
              textStyle: {
                  color: '#235894'
              }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
              name: '全年环境有序天数统计',
              type: 'pie',
              center: ['50%', '55%'],
              selectedMode: 'single',
              selectedOffset: 30,
              clockwise: true,
              label: {
                  fontSize: 12,
                  color: '#4B7CF6FF'
              },
              labelLine: {
                  lineStyle: {
                      color: '#235894'
                  }
              },
              data: this.cardData.map((v, index) => {
                const colorArr = ['#4BD5F7', '#E74C3C', '#E67E22']
                return {value: v.days, name: v.name, itemStyle: { color: colorArr[index] }}
              }),
              itemStyle: itemStyle
          }]
      };
      myChart.setOption(option);
    },
    handleOpenFold (v) {
      this.hoverStatus = null
      this.hoverStatus2 = null
      if (v == 'open') {
        this.vshowFlag = true
        this.openStatus = true
        this.closeStatus = false
        this.myEcharts3Pie()
      } else {
        this.openStatus = false
        this.closeStatus = true
        setTimeout(() => {
          this.vshowFlag = false
        },1000)
      }
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
</style>

