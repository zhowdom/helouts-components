<template>
  <div class="eachCardBox clearfix">
    <div class="energyStatistic bdbox commonTitlebox comBoderAndBg" style="width:520px;height:212px;">
        <div class="main1 flex-row" style="width:545px;">
          <div class="mod1 flex-col"></div>
          <span class="txt1">{{cardTitle}}</span>
          <span class="word1">{{cardSubTitle}}</span>
          <div class="mod2 flex-col" style="margin-left:182px;"></div>
          <div class="mod3 flex-col"></div>
        </div>
        <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:481px;"></div>
        <div id="echrMain3Bar" style="width: 490px;height: 157px;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import mixin from '../mixin'
export default {
  name: 'env_status_statistics',
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
    myEcharts3Bar () {
      var myChart = echarts.init(document.getElementById('echrMain3Bar'))
      
      var option = {
        color: ['#4BD5F7FF','#4B7DF8FF', '#2A5AE1FF'],
        legend: {
          show: false,
          left: 'right',
          y: '8',
          icon: 'circle',
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#32C5FF',
            fontSize: '12', 
          }
        },
        grid: {
          left: '3%',
          top: '13%',
          right: '0.5%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {},
        dataset: {
          dimensions: ['product', '健康', '舒适', '安全'],
          source: this.cardData.length && this.cardData.map(item => {
            return {
              product: this.dayjs(item.date).format('MM-DD'),
              '健康': item.healty,
              '舒适': item.comfortable,
              '安全': item.safety,
            }
          })
        },
        xAxis: { 
          type: 'category',
          axisLabel: {
            interval: 0, 
            textStyle: {
              color: '#32C5FF', 
              fontSize: '12', 
            }
          },
          axisLine:{
              lineStyle:{
                  show:true,
                  color:'#183466FF',
                  width:1,
              }
            },
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: '#32C5FF', 
              fontSize: '12', 
            }
          },
          splitLine: {    
            lineStyle: {
              color: '#183466FF',
              type: 'solid'    
            },
            show: true 
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar', barWidth: 6 }, { type: 'bar', barWidth: 6 }, { type: 'bar', barWidth: 6 }]
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
        this.myEcharts3Bar()
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

