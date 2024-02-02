<template>
  <div class="eachCardBox clearfix">
    <div class="energyStatistic bdbox commonTitlebox comBoderAndBg" style="width:520px;height:233px;">
                <div class="main1 flex-row" style="width:504px;">
                  <div class="mod1 flex-col"></div>
                  <span class="txt1">{{cardTitle}}</span>
                  <span class="word1">{{cardSubTitle}}</span>
                  <div class="mod2 flex-col" style="margin-left:182px;"></div>
                  <div class="mod3 flex-col"></div>
                </div>
                <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:484px;"></div>

                <el-carousel class="hwcdBoxTAB shezhiBox" height="210px" direction="horizontal" :autoplay="false">
                  <el-carousel-item>
                    <div id="echrMain" style="width: 490px;height: 178px;"></div>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div id="echrMain_b" style="width: 490px;height: 178px;"></div>
                  </el-carousel-item>
                  <el-carousel-item>
                    <div id="echrMain_c" style="width: 490px;height: 178px;"></div>
                  </el-carousel-item>
                </el-carousel>

            </div>
  </div>
</template>

<script>
// copy from 'energy_statistics.vue'
import * as echarts from 'echarts'
import mixin from '../mixin'
export default {
  name: 'energy_situation',
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
    handleOpenFold (v) {
      this.hoverStatus = null
      this.hoverStatus2 = null
      if (v == 'open') {
        this.vshowFlag = true
        this.openStatus = true
        this.closeStatus = false
        this.myEcharts()
        this.myEcharts_b()
        this.myEcharts_c()
      } else {
        this.openStatus = false
        this.closeStatus = true
        setTimeout(() => {
          this.vshowFlag = false
        },1000)
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
            this.cardData = []
            this.$message.error(response.message)
          }
          resolve(this.cardData)
        }).catch(e => {
          this.loading = false
        })
      })
    },
    myEcharts () {
      var myChart = echarts.init(document.getElementById('echrMain'))
      var option = {
        title: {
          text: '',
          subtext: this.cardData.length && this.cardData[0].unitName,
          left: 10,
          subtextStyle:{
            color:"#32c5ff"
          }
        },
        subtextStyle: {
          left: 'right'
        },
        grid: {
          left: '3%',
          top: '20%',
          right: '0.5%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {},
        legend: {
          orient: 'horizontal',
          x: 'right',
          y: '8',
          // data: [this.indexData.energyCount && this.indexData.energyCount[0].name],
          data: [],
          textStyle: {
            color: '#32C5FF'
          }
        },
        xAxis: [{
          data: this.cardData.length && this.cardData[0].list.map(v => v.month+'月'),
          axisTick:{
            show:false, 
            lineStyle:{color:'#183466'}
          },
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
                color:'#183466',
                width:1,
            }
          },
          splitLine: { 
            show: true,
              lineStyle: {
                  color: '#183466',
              },
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#32C5FF', 
              fontSize: '12', 
            }
          },
          splitLine: {    
            lineStyle: {
              color: '#183466',
              type: 'solid'    
            },
            show: true 
          }
        }],
        series: [
          {
            name: this.cardData.length && this.cardData[0].itemName,
            type: 'line',
            smooth: true,
            data: this.cardData.length && this.cardData[0].list.map(v => v.value),
            itemStyle: {
              // 设置线条上点的颜色（和图例的颜色）
              normal: {
                color: '#64c0f9',
              },
            },
            lineStyle: {// 设置线条的style等
              normal: {
                color: '#64c0f9', // 折线线条颜色
              },
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    myEcharts_b () {
      var myChart = echarts.init(document.getElementById('echrMain_b'))
      
      var option = {
        title: {
          text: '',
          subtext: this.cardData.length && this.cardData[1].unitName,
          left: 10,
          subtextStyle:{
            color:"#32c5ff"
          }
        },
        subtextStyle: {
          left: 'right'
        },
        grid: {
          left: '3%',
          top: '20%',
          right: '0.5%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {},
        legend: {
          orient: 'horizontal',
          x: 'right',
          y: '8',
          // data: [this.indexData.energyCount && this.indexData.energyCount[1].name],
          data: [],
          textStyle: {
            color: '#32C5FF'
          }
        },
        xAxis: [{
          data: this.cardData.length && this.cardData[1].list.map(v => v.month+'月'),
          axisTick:{
            show:false, 
            lineStyle:{color:'#183466'}    
          },
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
                color:'#183466',
                width:1,
            }
          },
          splitLine: { 
            show: true,
              lineStyle: {
                  color: '#183466',
              },
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#32C5FF', 
              fontSize: '12', 
            }
          },
          splitLine: {    
            lineStyle: {
              color: '#183466',
              type: 'solid'    
            },
            show: true 
          }
        }],
        series: [
          {
            name: this.cardData.length && this.cardData[1].itemName,
            type: 'line',
            smooth: true,
            data: this.cardData.length && this.cardData[1].list.map(v => v.value),
            itemStyle: {
              // 设置线条上点的颜色（和图例的颜色）
              normal: {
                color: '#64c0f9',
              },
            },
            lineStyle: {// 设置线条的style等
              normal: {
                color: '#64c0f9', // 折线线条颜色
              },
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    myEcharts_c () {
      var myChart = echarts.init(document.getElementById('echrMain_c'))
      
      var option = {
        title: {
          text: '',
          subtext: this.cardData.length && this.cardData[2].unitName,
          left: 10,
          subtextStyle:{
            color:"#32c5ff"
          }
        },
        subtextStyle: {
          left: 'right'
        },
        grid: {
          left: '3%',
          top: '20%',
          right: '0.5%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {},
        legend: {
          orient: 'horizontal',
          x: 'right',
          y: '8',
          // data: [this.indexData.energyCount && this.indexData.energyCount[2].name],
          data: [],
          textStyle: {
            color: '#32C5FF'
          }
        },
        xAxis: [{
          data: this.cardData.length && this.cardData[2].list.map(v => v.month+'月'),
          axisTick:{
            show:false, 
            lineStyle:{color:'#183466'}    
          },
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
                color:'#183466',
                width:1,
            }
          },
          splitLine: { 
            show: true,
              lineStyle: {
                  color: '#183466',
              },
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#32C5FF', 
              fontSize: '12', 
            }
          },
          splitLine: {    
            lineStyle: {
              color: '#183466',
              type: 'solid'    
            },
            show: true 
          }
        }],
        series: [
          {
            name: this.cardData.length && this.cardData[2].itemName,
            type: 'line',
            smooth: true,
            data: this.cardData.length && this.cardData[2].list.map(v => v.value),
            itemStyle: {
              // 设置线条上点的颜色（和图例的颜色）
              normal: {
                color: '#64c0f9',
              },
            },
            lineStyle: {// 设置线条的style等
              normal: {
                color: '#64c0f9', // 折线线条颜色
              },
            }
          }
        ]
      };
      myChart.setOption(option);
    },
  }
}
</script>


<style scoped>
.commonTitlebox .main1 .mod1{
    width: 6px;
    height: 28px;
    background: url(../../assets/mod1-bg.png) 100% no-repeat;
}
.energyStatistic{
  padding: 10px;
  width:520px;
  height:270px;
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
.commonTitlebox .main1 .mod2 {
    width: 42px;
    height: 2px;
    background: url(../../assets/mod2-bg.png) 100% no-repeat;
    margin: 10px 0 0 184px;
}
</style>

