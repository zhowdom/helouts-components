<template>
  <div class="eachCardBox clearfix">
    <div class="safeStatus bdbox commonTitlebox comBoderAndBg rela clearfix" style="width:520px;height:303px;">
              <div class="main1 flex-row" style="width:520px;">
                <div class="mod1 flex-col"></div>
                <span class="txt1">{{cardTitle}}</span>
                <span class="word1">{{cardSubTitle}}</span>
                <div class="mod2 flex-col" style="margin-left:176px;"></div>
                <div class="mod3 flex-col"></div>
              </div>
              <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:478px;margin-bottom:10px;"></div>
              <div class="menuBtn3box">
                <div id="echrMain_bar" style="width: 480px;height: 162px;background:rgba(26,36,60,.8);padding-bottom:3px;margin-left:15px;"></div>
              </div>
              <!--独立-->
              <div class="trCommBar clearfix" style="margin-top:10px;">
                <div class="fl" style="width:143px;height:59px;background: rgba(45,53,74,.7);margin-left:15px;">
                  <div style="height:20px;border-bottom:1px solid #151f41;border-left:4px solid #FF3A3B;line-height:20px;">
                    <span style="color:#fff;font-weight: bold;font-size: 12px;margin-left:5px;">预警总数</span>
                  </div>
                  <div v-if="cardData" style="color:#32C5FF;text-align:center;font-size: 18px;font-weight: 600;line-height:38px;">{{cardData.processSummary.total||0}}</div>
                </div>

                <div class="fl" style="width:143px;height:59px;background: rgba(45,53,74,.7);margin:0 26px;">
                  <div style="height:20px;border-bottom:1px solid #151f41;border-left:4px solid #03FF1C;line-height:20px;">
                    <span style="color:#fff;font-weight: bold;font-size: 12px;margin-left:5px;">已处理</span>
                  </div>
                  <div v-if="cardData" style="color:#32C5FF;text-align:center;font-size: 18px;font-weight: 600;line-height:38px;">{{cardData.processSummary.processedCount||0}}</div>
                </div>

                <div class="fl" style="width:143px;height:59px;background: rgba(45,53,74,.7);">
                  <div style="height:20px;border-bottom:1px solid #151f41;border-left:4px solid #050503;line-height:20px;">
                    <span style="color:#fff;font-weight: bold;font-size: 12px;margin-left:5px;">未处理</span>
                  </div>
                  <div v-if="cardData" style="color:#32C5FF;text-align:center;font-size: 18px;font-weight: 600;line-height:38px;">{{cardData.processSummary.unProcessCount||0}}</div>
                </div>
              </div>
              
              
            </div>


            <!--TAB 切换面板-->
            <div class="railwayTime clearfix comBoderAndBg pureSetBG">
              <div class="myCustomTabBox">
                <ul class="clearfix">
                  <li class="fl" :class="{'cur': curtabIndex == 'at1'}" @click="handleTabClick('at1')">全部报警<i v-if="cardData.typeDetial[0].details.length > 0" class="couts">{{cardData.typeDetial[0].details.length > 99 ? '99+' : cardData.typeDetial[0].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at2'}" @click="handleTabClick('at2')">设备报警<i v-if="cardData.typeDetial[1].details.length > 0" class="couts">{{cardData.typeDetial[1].details.length > 99 ? '99+' : cardData.typeDetial[1].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at3'}" @click="handleTabClick('at3')">能耗报警<i v-if="cardData.typeDetial[2].details.length > 0" class="couts">{{cardData.typeDetial[2].details.length > 99 ? '99+' : cardData.typeDetial[2].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at4'}" @click="handleTabClick('at4')">仪器报警<i v-if="cardData.typeDetial[3].details.length > 0" class="couts">{{cardData.typeDetial[3].details.length > 99 ? '99+' : cardData.typeDetial[3].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at5'}" @click="handleTabClick('at5')">安防报警<i v-if="cardData.typeDetial[4].details.length > 0" class="couts">{{cardData.typeDetial[4].details.length > 99 ? '99+' : cardData.typeDetial[4].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at6'}" @click="handleTabClick('at6')">环境报警<i v-if="cardData.typeDetial[5].details.length > 0" class="couts">{{cardData.typeDetial[5].details.length > 99 ? '99+' : cardData.typeDetial[5].details.length}}</i></li>
                  <!-- <li class="fl" :class="{'cur': curtabIndex == 'at7'}" @click="handleTabClick('at7')">人员报警</li> -->
                </ul>
              </div>
              <div class="myCustomTabContent newsctabox">

                <ul v-show="curtabIndex == 'at1'" style="overflow-y:scroll;height:292px;">
                  <span v-if="cardData.typeDetial[0].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData.typeDetial[0].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
                    <h3 class="clearfix">
                      <span class="fl">{{item.typeName}}</span>
                      <i class="fr">报警时间：{{dayjs(item.time).format('YYYY-MM-DD HH:mm')}}</i>
                    </h3>
                    <p>
                      <span style="margin-right:8px;">报警设备:<i>{{item.deviceCode}}-{{item.deviceName}}</i></span>
                      <span style="margin-right:8px;">报警点位:<i>{{item.attributeName}}</i></span>
                      <span style="margin-right:8px;">所属系统:<i>{{item.systemName}}</i></span>
                      <span style="margin-right:8px;">所属位置:<i>{{item.spaceCode}}-{{item.spaceName}}</i></span>
                      <span style="margin-right:8px;">值:<i>{{item.alarmValue}}-{{item.unitName}}</i></span>
                      <span>报警描述:<i>{{item.alarmDesc}}</i></span>
                    </p>
                  </li>
                </ul>

                <ul v-show="curtabIndex == 'at2'" style="overflow-y:scroll;height:292px;">
                  <span v-if="cardData.typeDetial[1].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData.typeDetial[1].details" :key="index" @click="miniEventClick(item.spaceCode)" class="pureSetBGUpper">
                    <h3 class="clearfix">
                      <span class="fl">{{item.typeName}}</span>
                      <i class="fr">报警时间：{{dayjs(item.time).format('YYYY-MM-DD HH:mm')}}</i>
                    </h3>
                    <p>
                      <span style="margin-right:8px;">报警设备:<i>{{item.spaceName}}</i></span>
                      <!-- <span style="margin-right:8px;">报警点位:<i>大金空调-故障状态</i></span> -->
                      <!-- <span style="margin-right:8px;">所属系统:<i>智能空调</i></span> -->
                      <span style="margin-right:8px;">所属位置:<i>{{item.spaceCode}}</i></span>
                      <!-- <span style="margin-right:8px;">值:<i>trun</i></span> -->
                      <span>报警描述:<i>{{item.alarmDesc}}</i></span>
                    </p>
                  </li>
                </ul>

                <ul v-show="curtabIndex == 'at3'" style="overflow-y:scroll;height:292px;">
                  <span v-if="cardData.typeDetial[2].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData.typeDetial[2].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
                    <h3 class="clearfix">
                      <span class="fl">{{item.typeName}}</span>
                      <i class="fr">报警时间：{{dayjs(item.time).format('YYYY-MM-DD HH:mm')}}</i>
                    </h3>
                    <p>
                      <span style="margin-right:8px;">报警设备:<i>{{item.spaceName}}</i></span>
                      <!-- <span style="margin-right:8px;">报警点位:<i>大金空调-故障状态</i></span> -->
                      <!-- <span style="margin-right:8px;">所属系统:<i>智能空调</i></span> -->
                      <span style="margin-right:8px;">所属位置:<i>{{item.spaceCode}}</i></span>
                      <!-- <span style="margin-right:8px;">值:<i>trun</i></span> -->
                      <span>报警描述:<i>{{item.alarmDesc}}</i></span>
                    </p>
                  </li>
                </ul>

                <ul v-show="curtabIndex == 'at4'" style="overflow-y:scroll;height:292px;">
                  <span v-if="cardData.typeDetial[3].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData.typeDetial[3].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
                    <h3 class="clearfix">
                      <span class="fl">{{item.typeName}}</span>
                      <i class="fr">报警时间：{{dayjs(item.time).format('YYYY-MM-DD HH:mm')}}</i>
                    </h3>
                    <p>
                      <span style="margin-right:8px;">报警设备:<i>{{item.spaceName}}</i></span>
                      <!-- <span style="margin-right:8px;">报警点位:<i>大金空调-故障状态</i></span> -->
                      <!-- <span style="margin-right:8px;">所属系统:<i>智能空调</i></span> -->
                      <span style="margin-right:8px;">所属位置:<i>{{item.spaceCode}}</i></span>
                      <!-- <span style="margin-right:8px;">值:<i>trun</i></span> -->
                      <span>报警描述:<i>{{item.alarmDesc}}</i></span>
                    </p>
                  </li>
                </ul>

                <ul v-show="curtabIndex == 'at5'" style="overflow-y:scroll;height:292px;">
                  <span v-if="cardData.typeDetial[4].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData.typeDetial[4].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
                    <h3 class="clearfix">
                      <span class="fl">{{item.typeName}}</span>
                      <i class="fr">报警时间：{{dayjs(item.time).format('YYYY-MM-DD HH:mm')}}</i>
                    </h3>
                    <p>
                      <span style="margin-right:8px;">报警设备:<i>{{item.spaceName}}</i></span>
                      <!-- <span style="margin-right:8px;">报警点位:<i>大金空调-故障状态</i></span> -->
                      <!-- <span style="margin-right:8px;">所属系统:<i>智能空调</i></span> -->
                      <span style="margin-right:8px;">所属位置:<i>{{item.spaceCode}}</i></span>
                      <!-- <span style="margin-right:8px;">值:<i>trun</i></span> -->
                      <span>报警描述:<i>{{item.alarmDesc}}</i></span>
                    </p>
                  </li>
                </ul>

                <ul v-show="curtabIndex == 'at6'" style="overflow-y:scroll;height:292px;">
                  <span v-if="cardData.typeDetial[5].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData.typeDetial[5].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
                    <h3 class="clearfix">
                      <span class="fl">{{item.typeName}}</span>
                      <i class="fr">报警时间：{{dayjs(item.time).format('YYYY-MM-DD HH:mm')}}</i>
                    </h3>
                    <p>
                      <span style="margin-right:8px;">报警设备:<i>{{item.spaceName}}</i></span>
                      <!-- <span style="margin-right:8px;">报警点位:<i>大金空调-故障状态</i></span> -->
                      <!-- <span style="margin-right:8px;">所属系统:<i>智能空调</i></span> -->
                      <span style="margin-right:8px;">所属位置:<i>{{item.spaceCode}}</i></span>
                      <!-- <span style="margin-right:8px;">值:<i>trun</i></span> -->
                      <span>报警描述:<i>{{item.alarmDesc}}</i></span>
                    </p>
                  </li>
                </ul>

              </div>

            </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import mixin from '../mixin'
export default {
  name: 'security_situation',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      cardData: {
        processSummary: {
          "total": 0,
          "processedCount": 0,
          "unProcessCount": 0
        },
        typeSummary: [],
        typeDetial: [
        {
            "typeCode": "all",
            "typeName": "全部报警",
            "details": []
        },
        {
            "typeCode": "device_alarm",
            "typeName": "设备",
            "details": []
        },
        {
            "typeCode": "energy_alarm",
            "typeName": "能耗",
            "details": []
        },
        {
            "typeCode": "instrument_alarm",
            "typeName": "仪器",
            "details": []
        },
        {
            "typeCode": "safety_alarm",
            "typeName": "安防",
            "details": []
        },
        {
            "typeCode": "space_alarm",
            "typeName": "环境",
            "details": []
        }
        ]
          
      },
      curtabIndex: 'at1'
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
    handleTabClick (index) {
      this.curtabIndex = index
    },
    miniEventClick (code) {
      console.log('报警设备ID：', code)
      window.ue.web.js_call_ue("报警", code)
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
        this.myEcharts_bar();
      } else {
        this.openStatus = false
        this.closeStatus = true
        setTimeout(() => {
          this.vshowFlag = false
        },1000)
      }
    },
    myEcharts_bar () {
      var chartDom = document.getElementById('echrMain_bar');
      var myChart = echarts.init(chartDom);
      let option = {
        tooltip: {},
        xAxis: {
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
          type: 'category',
          data: this.cardData.typeSummary.map(v => v.typeName)
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
              color: '#183466',
              type: 'solid'    
            },
            show: true 
          },
          type: 'value'
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: "#5d8fda"
        }, {
          offset: 1,
          color: "#133252"
        }]),
        grid: {
          left: '3%',
          top: '13%',
          right: '0.5%',
          bottom: '1%',
          containLabel: true
        },
        series: [
          {
            barWidth: 15,
            data: this.cardData.typeSummary.map(v => v.count),
            type: 'bar'
          }
        ]
      };

      option && myChart.setOption(option);
    },
  }
}
</script>


<style scoped>
.safeStatus{
  width:440px;
  padding: 10px;
  border: none;
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
.railwayTime{
  width:520px;
  height: 370px;
border-radius: 4px;
margin-top:10px;
padding: 17px 8px 11px 8px;
box-sizing: border-box;
}
.myCustomTabBox ul li.cur{
  background: #32C5FF;
}
.myCustomTabBox{
margin-bottom:15px;
}
.myCustomTabBox ul{
border-bottom: 1px solid #224f75;
}
.myCustomTabBox ul li {
  width:68px;
  height: 34px;
  box-sizing: border-box;
  line-height: 34px;
  text-align: center;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  margin-right: 10px;
  border-radius: 4px 4px 0 0;
  background: #0f1b37;
  cursor: pointer;
  position: relative;
}
.emptydataBox {
    text-align: center;
    line-height: 60px;
    color: #909399;
    display: inline-block;
    width: 100%;
}
</style>

