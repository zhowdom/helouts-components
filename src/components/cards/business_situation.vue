<template>
  <div class="eachCardBox clearfix">
    <div class="deviceWatch deviceWatchv2 bdbox commonTitlebox comBoderAndBg pureSetBG" style="width:520px;height:240px;">
              <div class="main1 flex-row" style="width:495px;">
                <!-- <div class="mod1 flex-col"></div>原来的标题背景 -->
                <i class="cm_verticalTitle_icon" style="margin-top:5px;"></i>
                <span class="txt1">{{cardTitle}}</span>
                <span class="word1">{{cardSubTitle}}</span>
                <div class="mod2 flex-col" style="margin-left:178px;"></div>
                <div class="mod3 flex-col"></div>
              </div>

              <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:480px;"></div>
              <div class="mabbox">
                <div class="pieTriggerBox">
                  <div id="pieTrigger" style="width:480px;height:190px;"></div>
                </div>
              </div>
              
            </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import mixin from '../mixin'
export default {
  name: 'business_situation',
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
            this.cardData = data.data
          } else {
            this.$message.error(response.message)
          }
          resolve(this.cardData)
        }).catch(e => {
          this.loading = false
        })
      })
      
    },
    handleOpenFold (v) {
      this.hoverStatus = null
      this.hoverStatus2 = null
      if (v == 'open') {
        this.vshowFlag = true
        this.openStatus = true
        this.closeStatus = false
        this.myEchartsTrigger()
      } else {
        this.openStatus = false
        this.closeStatus = true
        setTimeout(() => {
          this.vshowFlag = false
        },1000)
      }
    },
    myEchartsTrigger () {
      // 通过id获取获取画布
      const myChart = echarts.init(document.getElementById('pieTrigger'));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   top: '55%',
        //   left: 'center'
        // },
        legend: [{
              left: 'center',
              itemWidth: 3,
              itemHeight: 13,
              itemGap: 30, // 每个标题之间的间距
              top: '35',
              left: '260',
              textStyle: {
                color: '#fff'
              },
              data: [this.cardData[0]['itemName'], this.cardData[1]['itemName']]
          },
          {
              left: 'center',
              itemWidth: 3,
              itemHeight: 13,
              itemGap: 30, // 每个标题之间的间距
              top: '60',
              left: '260',
              textStyle: {
                color: '#fff'
              },
              data: [this.cardData[2]['itemName']]
          },
          // {
          //     left: 'center',
          //     // icon: 'none', // 'circle',  'rect',  'roundRect',  'triangle',  'diamond',  'pin',  'arrow',  'none'
          //     itemWidth: 3,
          //     itemHeight: 13,
          //     itemGap: 30, // 每个标题之间的间距
          //     top: '85',
          //     left: '260',
          //     textStyle: {
          //       color: '#fff'
          //     },
          //     data: ['文件资料检验', '微量物证检验']
          // },
          // {
          //     left: 'center',
          //     // icon: 'none', // 'circle',  'rect',  'roundRect',  'triangle',  'diamond',  'pin',  'arrow',  'none'
          //     itemWidth: 3,
          //     itemHeight: 13,
          //     itemGap: 30, // 每个标题之间的间距
          //     top: '110',
          //     left: '260',
          //     textStyle: {
          //       color: '#fff'
          //     },
          //     data: ['痕迹检验分析', '法医病理检验']
          // },
          // {
          //     left: 'center',
          //     // icon: 'none', // 'circle',  'rect',  'roundRect',  'triangle',  'diamond',  'pin',  'arrow',  'none'
          //     itemWidth: 3,
          //     itemHeight: 13,
          //     itemGap: 30, // 每个标题之间的间距
          //     top: '135',
          //     left: '260',
          //     textStyle: {
          //       color: '#fff'
          //     },
          //     data: ['法医物证(DNA)', '病毒检验']
          // }
        ],
        series: [
          {
            name: '业务态势',
            type: 'pie',
            radius: ['65%', '85%'],
            center: ['20%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false, // hover标题分类放大效果
                fontSize: 10,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.cardData[0]['count'], name: this.cardData[0]['itemName'], itemStyle: {color: '#E67E22'} },
              { value: this.cardData[1]['count'], name: this.cardData[1]['itemName'], itemStyle: {color: '#E74C3C'} },
              { value: this.cardData[2]['count'], name: this.cardData[2]['itemName'], itemStyle: {color: '#4BD5F7'} },
              // { value: 484, name: '电子物证检验', itemStyle: {color: '#95A5A6'} },
              // { value: 300, name: '文件资料检验', itemStyle: {color: '#2A5AE2'} },
              // { value: 300, name: '微量物证检验', itemStyle: {color: '#1ABC9C'} },
              // { value: 300, name: '痕迹检验分析', itemStyle: {color: '#3498DB'} },
              // { value: 300, name: '法医病理检验', itemStyle: {color: '#9B59B6'} },
              // { value: 300, name: '法医物证(DNA)', itemStyle: {color: '#34495E'} },
              // { value: 300, name: '病毒检验', itemStyle: {color: '#F1C40F'} },
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
  }
}
</script>


<style scoped>
.deviceWatch{
  padding: 10px;
  width:520px;
  height: 170px;
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
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
.indexL2{
  width:520px!important;
  height: 300px!important;
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

