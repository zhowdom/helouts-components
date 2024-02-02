<template>
  <div class="eachCardBox clearfix">
    <div class="energyStatistic bdbox commonTitlebox comBoderAndBg" style="width:520px;height:245px;border: none;margin-top:0!important;">
                <div class="main1 flex-row" style="width:500px;">
                  <div class="mod1 flex-col"></div>
                  <span class="txt1">{{cardTitle}}</span>
                  <span class="word1" style="margin-left:15px;">{{cardSubTitle}}</span>
                  <div class="mod2 flex-col" style="margin-left:175px;"></div>
                  <div class="mod3 flex-col"></div>
                </div>
                <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:482px;margin-bottom:15px;"></div>
                <div class="sp3Btns abs" style="top:55px;">
                  <el-tabs v-model="activeName01" @tab-click="handleClickA">
                    <el-tab-pane label="用电" name="elec"></el-tab-pane>
                    <el-tab-pane label="用水" name="water"></el-tab-pane>
                    <el-tab-pane label="用气" name="gas"></el-tab-pane>
                  </el-tabs>
                </div>
                <div v-if="showElecProcess && cardData" class="mabboxT-l-topBT mabboxT-l-topBT_v2" style="overflow-y: scroll;overflow-x: hidden;height:146px;padding-left:16px;margin-top:40px;">
                  <p v-for="(item, index) in cardData[0].data" :key="index" class="clearfix" style="margin-bottom:5px;">
                    <el-tooltip class="item" effect="dark" :content="item.spaceName" placement="top-start">
                      <span class="fl esname eplise">{{item.deviceName}}</span>
                    </el-tooltip>
                    <el-progress class="esnameBar esnameBarv2 esnameBarv2this" :stroke-width="13" :format="formatElec" :percentage="percentageElec[index]" color="#32C5FFFF" :text-inside="true"></el-progress>
                  </p>
                </div>
                <div v-if="showWaterProcess && cardData" class="mabboxT-l-topBT mabboxT-l-topBT_v2" style="overflow-y: scroll;overflow-x: hidden;height:146px;padding-left:16px;margin-top:40px;">
                  <p v-for="(item, index) in cardData[1].data" :key="index" class="clearfix" style="margin-bottom:5px;">
                    <el-tooltip class="item" effect="dark" :content="item.spaceName" placement="top-start">
                      <span class="fl esname eplise">{{item.deviceName}}</span>
                    </el-tooltip>
                    <el-progress class="esnameBar esnameBarv2 esnameBarv2this" :stroke-width="13" :format="formatWater" :percentage="percentageWater[index]" color="#32C5FFFF" :text-inside="true"></el-progress>
                  </p>
                </div>
                <div v-if="showGasProcess && cardData" class="mabboxT-l-topBT mabboxT-l-topBT_v2" style="overflow-y: scroll;overflow-x: hidden;height:146px;padding-left:16px;margin-top:40px;">
                  <p v-for="(item, index) in cardData[2].data" :key="index" class="clearfix" style="margin-bottom:5px;">
                    <el-tooltip class="item" effect="dark" :content="item.spaceName" placement="top-start">
                      <span class="fl esname eplise">{{item.deviceName}}</span>
                    </el-tooltip>
                    <el-progress class="esnameBar esnameBarv2 esnameBarv2this" :stroke-width="13" :format="formatGas" :percentage="percentageGas[index]" color="#32C5FFFF" :text-inside="true"></el-progress>
                  </p>
                </div>

               
            </div>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'energy_ranking',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      // 卡片数据(有的是对象，有的数组)
      cardData: [
        {
          data: [],
          energyCode: 'Electrical',
          energyName: '用电',
          unit: "Kwh"
        },
        {
          data: [],
          energyCode: 'Water',
          energyName: '用水',
          unit: "T"
        },
        {
          data: [],
          energyCode: 'Gas',
          energyName: '用气',
          unit: "m³"
        }
      ],
      percentageElec: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      percentageWater: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      percentageGas: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      activeName01: 'elec',
      showElecProcess: true,
      showWaterProcess: false,
      showGasProcess: false,
    }
  },
  async mounted () {
    await this.matchParmsPageType()
    await this.queryEachCardData()
    this.handleOpenFold('open')
    setTimeout(this.executeProgressBarElec, 1000)
    setTimeout(this.executeProgressBarWater, 1000)
    setTimeout(this.executeProgressBarGas, 1000)
  },
  created () {},
  watch: {},
  methods: {
    handleClickA(tab) {
      switch (tab.name) {
        case 'elec':
          this.showElecProcess = true
          this.showWaterProcess = false
          this.showGasProcess = false
          break;
        case 'water':
          this.showElecProcess = false
          this.showWaterProcess = true
          this.showGasProcess = false
          break;
        case 'gas':
          this.showElecProcess = false
          this.showWaterProcess = false
          this.showGasProcess = true
          break;
        default:
          break;
      }
    },
    handleOpenFold (v) {
      this.hoverStatus = null
      this.hoverStatus2 = null
      if (v == 'open') {
        this.vshowFlag = true
        this.openStatus = true
        this.closeStatus = false
      } else {
        this.openStatus = false
        this.closeStatus = true
        setTimeout(() => {
          this.vshowFlag = false
        },1000)
      }
      this.executeProgressBarElec()
      this.executeProgressBarWater()
      this.executeProgressBarGas()
    },
    executeProgressBarElec () {
      this.cardData && this.cardData[0].data.forEach((v, index) => this.increaseElec(index, ((v.rate)*100).toFixed(0)))
      this.$forceUpdate()
    },
    executeProgressBarWater () {
      this.cardData && this.cardData[1].data.forEach((v, index) => this.increaseWater(index, ((v.rate)*100).toFixed(0)))
      this.$forceUpdate()
    },
    executeProgressBarGas () {
      this.cardData && this.cardData[2].data.forEach((v, index) => this.increaseGas(index, ((v.rate)*100).toFixed(0)))
      this.$forceUpdate()
    },
    increaseElec (index, percent) {
      let _timer = setInterval(() => {
        this.percentageElec[index] += 10;
        if (this.percentageElec[index] > percent) {
          this.percentageElec[index] = +percent;
          clearInterval(_timer)
        }
      }, 0)
    },
    increaseWater (index, percent) {
      let _timer = setInterval(() => {
        this.percentageWater[index] += 10;
        if (this.percentageWater[index] > percent) {
          this.percentageWater[index] = +percent;
          clearInterval(_timer)
        }
      }, 0)
    },
    increaseGas (index, percent) {
      let _timer = setInterval(() => {
        this.percentageGas[index] += 10;
        if (this.percentageGas[index] > percent) {
          this.percentageGas[index] = +percent;
          clearInterval(_timer)
        }
      }, 0)
    },
    formatElec(percentage) {
      let res = this.cardData[0].data.find(v => ((v.rate)*100).toFixed(0) == percentage)
      if (res) {
        return `${res.value}${this.cardData[0].unit}`;
      }
    },
    formatWater(percentage) {
      let res = this.cardData[1].data.find(v => ((v.rate)*100).toFixed(0) == percentage)
      if (res) {
        return `${res.value}${this.cardData[1].unit}`;
      }
    },
    formatGas(percentage) {
      let res = this.cardData[2].data.find(v => ((v.rate)*100).toFixed(0) == percentage)
      if (res) {
        return `${res.value}${this.cardData[2].unit}`;
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
            this.cardData = [
              {
                data: [],
                energyCode: 'Electrical',
                energyName: '用电',
                unit: "Kwh"
              },
              {
                data: [],
                energyCode: 'Water',
                energyName: '用水',
                unit: "T"
              },
              {
                data: [],
                energyCode: 'Gas',
                energyName: '用气',
                unit: "m³"
              }
            ]
            this.$message.error(response.message)
          }
          resolve(this.cardData)
        }).catch(e => {
          this.loading = false
        })
      })
      
    }
  }
}
</script>


<style scoped>
.energyStatistic{
  padding: 10px;
  width:520px;
  height:270px;
  margin-top: 10px;
  position: relative;
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

.esnameBarv2this{
  width:405px!important;
  margin-bottom:6px;
}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
.esname{
  font-size: 12px;
  color: #32C5FFFF;
  width:62px;
  display: inline-block;
}
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
.el-progress-bar__outer{
  background-color: #05103CFF!important;
}
.esnameBarv2this {
    width: 480px!important;
    margin-bottom: 6px;
}
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
.commonTitlebox .main1 .mod3 {
        width: 27px;
    height: 8px;
    background: url(../../assets/mod3-bg.png) 0px 0px no-repeat;
    margin: 7px 0 0 8px;
}
</style>
<style>
.esnameBarv2this .el-progress-bar{
  width:405px!important;
}
.esnameBarv2this .el-progress-bar {
    width: 405px!important;
}
.sp3Btns .el-tabs__item.is-active{
  color: #fff;
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
.sp3Btns .el-tabs__active-bar{
  background-color: none;
  height: 0;
}
.elevatorMenuBox .el-tabs--left .el-tabs__active-bar.is-left, .elevatorMenuBox .el-tabs--left .el-tabs__nav-wrap.is-left::after{
  width:0;
}
.sp3Btns .el-tabs__nav-wrap:after{
  background-color: transparent;
}
</style>


