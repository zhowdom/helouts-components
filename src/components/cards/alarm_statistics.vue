<template>
  <div class="eachCardBox clearfix">
    <div class="visitStatistic bdbox commonTitlebox comBoderAndBg" style="height:210px;">
              <div class="main1 flex-row">
                <div class="mod1 flex-col"></div>
                <span class="txt1">{{cardTitle}}</span>
                <span class="word1">{{cardSubTitle}}</span>
                <div class="mod2 flex-col"></div>
                <div class="mod3 flex-col"></div>
              </div>

              <div class="linerStyle" style="margin-top:5px;margin-left:16px;"></div>
              <div class="visitStatistic-main clearfix">
                <div class="vs-ml fl" style="width:340px;">
                  <div v-if="cardData.processCount" class="esmallbox clearfix rela" style="margin-top:11px;margin-left:15px;">
                    <div class="esmall estitle2 fl rela" style="height:40px;width:300px;">
                      <div class="esvalue rela clearfix">
                        <span class="fl" style="margin-left:10px;">报警总数</span>
                        <span class="fr" style="margin-right:10px;">{{cardData.processCount.totalCount}}</span>
                      </div>
                    </div>

                    <div class="esmall estitle2 fl rela" style="height:40px;width:300px;margin-top:9px;margin-bottom:9px;">
                      <div class="esvalue rela clearfix">
                        <span class="fl" style="margin-left:10px;">已处理报警</span>
                        <span class="fr" style="margin-right:10px;">{{cardData.processCount.processedCount}}</span>
                      </div>
                    </div>

                    <div class="esmall estitle2 fl rela" style="height:40px;width:300px;">
                      <div class="esvalue rela clearfix">
                        <span class="fl" style="margin-left:10px;">未处理报警</span>
                        <span class="fr" style="margin-right:10px;">{{cardData.processCount.unProcessedCount}}</span>
                      </div>
                    </div>
                    
                  </div>
                  
                  
                </div>
                <div class="vs-mr fr rela" style="margin-right:10px;">
                  <div class="aboveRings abs"></div>
                  <span class="vsmrname abs" style="left:33%;">综合得分</span>
                  <span v-if="cardData.processCount" class="vsmrname abs percentVALUES" style="bottom:45px!important;"><i>{{(cardData.processCount.rate*100).toFixed(0)}}</i><sub>%</sub></span>
                  <div class="echrMainBingBox abs">
                      <div id="echrMainBing2" style="width:110px;height:110px;"></div>
                  </div>

                </div>
              </div>
            </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import mixin from '../mixin'
export default {
  name: 'alarm_statistics',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      cardData: {
        processCount: {
          processedCount: 0,
          rate: 0,
          totalCount: 0,
          unProcessedCount: 0
        }
      },
    }
  },
  async mounted () {
    await this.matchParmsPageType()
    await this.queryEachCardData()
    this.handleOpenFold('open')
  },
  created () {
    /**
     * 停车场
     */
  },
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
            this.cardData = {
              rate: 0,
              thisMonthCount: 0,
              thisWeekCount: 0,
              thisYearCount: 0,
              todayCount: 0,
              todayRemainCount: 0
            }
            this.$message.error(response.message)
          }
          resolve(this.cardData)
        }).catch(e => {
          this.loading = false
        })
      })
    },
    myEchartsBing2 () {
      // 通过id获取获取画布
      const myChart = echarts.init(document.getElementById('echrMainBing2'));
      // 指定图表的配置项和数据
      let data = (this.cardData.processCount.rate*100).toFixed(0);
      let option = {
        title: {
          text:'',//主标题文本
          subtext:'',//副标题文本
          left:'16%',
          top:'30%',
          textStyle:{
            fontWeight: 'bold',
            fontSize: 30,
            color:'#64c2fa',
            align:'center',
            left:10,
            textAlign:'center'
          },
          subtextStyle:{
            fontSize: 12,
            color:'#64c2fa',
            textAlign:'center'
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{d}%",
          show: true,
        },
        legend: {
          top: 20,
          right:20,
          data: []
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['75%', '100%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: data,
                name: "来访率",
                selected:false,
                itemStyle: {
                  color: "#717bea",
                }
              },
              {
                value: 100-data,
                name: "",
                itemStyle: {
                  color: "#1a2e4f",
                },
                label:{
                  normal:{
                    show:false
                  }
                }
              },
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。画布为 myCharts  true为显示
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    handleOpenFold (v) {
      this.hoverStatus = null
      this.hoverStatus2 = null
      if (v == 'open') {
        this.vshowFlag = true
        this.openStatus = true
        this.closeStatus = false
        this.myEchartsBing2()
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
.visitStatistic{
  padding: 10px;
  width:520px;
  height: 220px;
}
.esmall .esvalue {
  height: 40px;
  color: #32C5FF;
  background: rgba(9, 19, 43, 0.6);
  line-height: 40px;
  font-weight: bold;
  border-top: 1px solid rgba(5, 16, 60, 0.6);
}
.esmall .esvalue::after{
  content: " ";
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  background: rgba(5, 16, 60, 0.58);
  position: absolute;
  top:-4px;
  right:-4px;
  border: 1px solid rgba(5, 16, 60, 0.6);
  box-sizing: border-box;
}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
.echrMainBingBox{
  width: 110px;
  height: 110px;
  top:50%;
  left:50%;
  margin-top:-55px;
  margin-left:-55px;
}
.vs-mrv2  .vsmrname{
  bottom: 42px;
  left: 40%;
  font-size: 12px;
  color: #32C5FF;
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
.vs-mr{
  width:132px;
  height: 132px;
  margin-top:15px;
}
.vs-mr .vsmrname{
  bottom: 32px;
  left: 37%;
  font-size: 12px;
  color: #32C5FF;
}
  .vs-mr .aboveRings{
    width:129px;
    height: 129px;
    border:1px solid #7592FE;
    top:0;
    left: 0;
    border-radius: 100%;
  }
.vs-mr .aboveRings::after{
  position: absolute;
  content: " ";
  display: inline-block;
  width: 10px;
  height: 10px;
  bottom: 11px;
  right:15px;
  background: #31C7FE;
  border-radius: 100%;
}
.vs-mr .aboveRings::before{
  position: absolute;
  content: " ";
  display: inline-block;
  height: 6px;
  width:6px;
  top:11px;
  left: 20px;
  background: #6567F7;
  border-radius: 100%;
}
.vs-mrv2{
  width:162px;
  height: 162px;
  margin-top:25px;
}
.vs-mrv2  .vsmrname{
  bottom: 42px;
  left: 40%;
  font-size: 12px;
  color: #32C5FF;
}
  .vs-mr .aboveRingsv2{
    width:159px;
    height: 159px;
    border:1px solid #7592FE;
    top:0;
    left: 0;
    border-radius: 100%;
  }
.vs-mr .aboveRingsv2::after{
  position: absolute;
  content: " ";
  display: inline-block;
  width: 10px;
  height: 10px;
  bottom: 20px;
  right:15px;
  background: #31C7FE;
  border-radius: 100%;
}
.vs-mr .aboveRingsv2::before{
  position: absolute;
  content: " ";
  display: inline-block;
  height: 6px;
  width:6px;
  top:19px;
  left: 20px;
  background: #6567F7;
  border-radius: 100%;
}
.estitle2::after{
  width:25px;
  height: 25px;
  position: absolute;
  content: '';
  top:0;
  left: 0;
  background: url('../../assets/lefttop-triangle.png') no-repeat left top;
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
.commonTitlebox .main1 .mod1{
    width: 6px;
    height: 28px;
    background: url(../../assets/mod1-bg.png) 100% no-repeat;
}
</style>

