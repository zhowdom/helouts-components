<template>
  <div class="eachCardBox clearfix">
    <div class="visitStatistic bdbox commonTitlebox comBoderAndBg" style="height:220px;">
        <div class="main1 flex-row">
          <div class="mod1 flex-col"></div>
          <span class="txt1">{{cardTitle}}</span>
          <span class="word1">{{cardSubTitle}}</span>
          <div class="mod2 flex-col"></div>
          <div class="mod3 flex-col"></div>
        </div>

        <div class="linerStyle" style="margin-top:5px;margin-left:16px;"></div>
        <div class="visitStatistic-main clearfix">
          <div v-if="cardData" class="vs-ml fl">
            <div class="esmallbox clearfix rela" style="margin-top:11px;">
              <div class="esmall fl" style="height:80px;">
                <div class="estitle">今日进出车辆</div>
                <div class="esvalue txtc rela" style="font-size:20px;">{{cardData.todayCount}}</div>
                <div class="embooking txtc" style="color:#fff;background: #05103c;opacity: .81;font-size:12px;">昨日车辆：{{cardData.lastDayCount}}</div>
              </div>
              <div class="esmall fr" style="height:80px;">
                <div class="estitle">今日剩余车辆空位</div>
                <div class="esvalue txtc rela" style="font-size:20px;">{{cardData.todayRemainCount}}</div>
                <div class="embooking txtc" style="color:#05103CFF;background: #05103c;opacity: .81;font-size:12px;">**</div>
              </div>

              
            </div>
            <div class="emainbox clearfix" style="margin-top:8px;">
              <div class="emain fl">
                <div class="emtitle">本周</div>
                <div class="emvalue txtc" style="font-size:17px;">{{cardData.thisWeekCount}}</div>
                <div class="embooking txtc" style="color:#05103CFF">**</div>
              </div>
              <div class="emain fl">
                <div class="emtitle">本月</div>
                <div class="emvalue txtc" style="font-size:17px;">{{cardData.thisMonthCount}}</div>
                <div class="embooking txtc" style="color:#05103CFF">**</div>
              </div>
              <div class="emain fl">
                <div class="emtitle">本年</div>
                <div class="emvalue txtc" style="font-size:17px;">{{cardData.thisYearCount}}</div>
                <div class="embooking txtc" style="color:#05103CFF">**</div>
              </div>

            </div>
            
          </div>
          <div class="vs-mr fr rela" style="margin-top:15px;">
            <div class="aboveRings abs"></div>
            <span class="vsmrname abs">使用率</span>
            <span class="vsmrname abs percentVALUES" style="bottom:45px!important;"><i>{{(cardData.rate*100).toFixed(0)}}</i><sub>%</sub></span>
            <div class="echrMainBingBox abs">
                <div id="echrMainBing1_2" style="width:110px;height:110px;"></div>
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
  name: 'packing_lot',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      cardData: {
        rate: 0,
        thisMonthCount: 0,
        thisWeekCount: 0,
        thisYearCount: 0,
        todayCount: 0,
        todayRemainCount: 0
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
    myEchartsBing_2 () {
      // 通过id获取获取画布
      const myChart = echarts.init(document.getElementById('echrMainBing1_2'));
      // 指定图表的配置项和数据
      let data = (this.cardData.rate*100).toFixed(0);
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
        this.myEchartsBing_2()
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
  height: 210px;
}
.commonTitlebox .main1{
  width: 500px;
  height: 28px;
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
.vs-mr{
  width:132px;
  height: 132px;
  margin-top:25px;
}
.vs-mr  .vsmrname{
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
.echrMainBingBox{
  width: 110px;
  height: 110px;
  top:50%;
  left:50%;
  margin-top:-55px;
  margin-left:-55px;
}
.echrMainBingBoxv2{
  width: 140px;
  height: 140px;
  top:50%;
  left:50%;
  margin-top:-70px;
  margin-left:-70px;
}
.visitStatistic-main .vs-ml{
  width:361px;
}
.visitStatistic-main .vs-ml .emain{
  width:115px;
  height: 70px;
}
.visitStatistic-main .vs-ml .esmall{
  width:115px;
  height: 60px;
}
.esmallbox {
  width:100%;
  width:238px;
}
.esmall .estitle {
  height: 20px;
  text-indent: 13px;
  color: #fff;
  line-height: 20px;
  font-size: 12px;
  background: url('../../assets/lefttop-triangle.png') no-repeat left top;
}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
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
.emainbox .emain .emtitle{
    height: 20px;
    text-indent: 13px;
    color: #fff;
    line-height: 20px;
    font-size: 12px;
    border-bottom: 1px solid rgba(5, 16, 60, 0.6);
    background: url('../../assets/lefttop-triangle.png') rgba(9, 19, 43, 0.4) no-repeat left top;
}
.emainbox .emain .emvalue{
  height: 27px;
  color: #32C5FF;
  line-height: 27px;
  font-weight: bold;
  background: rgba(9, 19, 43, 0.4);
}
.emainbox .emain .embooking{
  color: #fff;
  font-size: 12px;
  background: #05103C;
  opacity: 0.81;
}
.emainbox .emain{
  width:115px;
  margin-right: 8px;
}
.emainbox .emain:last-child{
  margin-right: 0;
}
</style>

