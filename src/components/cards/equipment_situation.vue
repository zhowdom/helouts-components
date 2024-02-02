<template>
  <div class="eachCardBox clearfix">
    <div class="deviceWatch indexL2 indexL2_YH1080 bdbox commonTitlebox comBoderAndBg pureSetBG" style="height:208px!important;">
              <div class="main1 flex-row" style="width:500px;">
                <div class="mod1 flex-col"></div>
                <span class="txt1">{{cardTitle}}</span>
                <span class="word1">{{cardSubTitle}}</span>
                <div class="mod2 flex-col" style="margin-left:180px;"></div>
                <div class="mod3 flex-col"></div>
              </div>

              <div class="linerStyle" style="width:480px;margin-top:5px;margin-left:16px;"></div>

              <div>
                <ul v-if="cardData" class="clearfix" style="margin-left:15px;">
                  <li class="fl rela railwaycode pureSetBGUpper" style="width:211px;height:54px;line-height:50px;border-top: 1px solid rgba(5,16,60,0.6);background: rgba(9,19,43,0.6);margin-right:45px;margin-top:18px;">
                    <span style="font-size: 12px;font-weight: bold;margin-left:10px;color:#fff;">接入设备数</span>
                    <span style="font-size: 24px;font-weight:600;color: #32C5FF;margin-left:20px;">{{cardData.totalCount||0}}</span>
                    <span style="font-size: 12px;font-weight:600;color: #32C5FF;">({{cardData.totalRate}})</span>
                  </li>
                  <li class="fl rela railwaycode pureSetBGUpper" style="width:211px;height:54px;line-height:50px;border-top: 1px solid rgba(5,16,60,0.6);background: rgba(9,19,43,0.6);margin-top:18px;">
                    <span style="font-size: 12px;font-weight: bold;margin-left:10px;color:#fff;">运行设备数</span>
                    <span style="font-size: 24px;font-weight:600;color: #32C5FF;margin-left:20px;">{{cardData.runingCount||0}}</span>
                    <span style="font-size: 12px;font-weight:600;color: #32C5FF;">({{cardData.runningRate}})</span>
                  </li>
                  <li class="fl rela railwaycode pureSetBGUpper" style="width:211px;height:54px;line-height:50px;border-top: 1px solid rgba(5,16,60,0.6);background: rgba(9,19,43,0.6);margin-right:45px;margin-top:18px;">
                    <span style="font-size: 12px;font-weight: bold;margin-left:10px;color:#fff;">故障设备数</span>
                    <span style="font-size: 24px;font-weight:600;color: #32C5FF;margin-left:20px;">{{cardData.failureCount||0}}</span>
                    <span style="font-size: 12px;font-weight:600;color: #32C5FF;">({{cardData.failureRate}})</span>
                  </li>
                  <li class="fl rela railwaycode pureSetBGUpper" style="width:211px;height:54px;line-height:50px;border-top: 1px solid rgba(5,16,60,0.6);background: rgba(9,19,43,0.6);margin-top:18px;">
                    <span style="font-size: 12px;font-weight: bold;margin-left:10px;color:#fff;">告警设备数</span>
                    <span style="font-size: 24px;font-weight:600;color: #32C5FF;margin-left:20px;">{{cardData.exceptionCount||0}}</span>
                    <span style="font-size: 12px;font-weight:600;color: #32C5FF;">({{cardData.exceptionRate}})</span>
                  </li>
                </ul>
              </div>
              
            </div>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'equipment_situation',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      // 卡片数据(有的是对象，有的数组)
      cardData: {
          "totalCount": 0,
          "runingCount": 0,
          "offlineCount": 0,
          "failureCount": 0,
          "exceptionCount": 0,
          "totalRate": "0%",
          "runningRate": "0%",
          "failureRate": "0%",
          "offlineRate": "0%",
          "exceptionRate": "0%"
      }
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
</style>

