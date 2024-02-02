<template>
  <div class="eachCardBox clearfix">
    <div class="visitStatistic bdbox commonTitlebox comBoderAndBg" style="height:217px;">
              <div class="main1 flex-row">
                <div class="mod1 flex-col"></div>
                <span class="txt1">{{cardTitle}}</span>
                <span class="word1">{{cardSubTitle}}</span>
                <div class="mod2 flex-col"></div>
                <div class="mod3 flex-col"></div>
              </div>

              <div class="linerStyle" style="margin-top:5px;margin-left:16px;"></div>
              <div class="visitStatistic-main clearfix">
                <div class="vs-mr fl rela" style="width:100px;height:150px;margin-left:10px;">
                  <img style="height:100px;width:100px;margin-top:16px;" src="../../assets/ks2.png">
                </div>
                <div class="vs-ml fr" style="width:calc(100% - 130px);margin-top:20px;">
                  <div class="clearfix">
                    <div class="hasbox rela fl" style="margin-right:10px;">
                      <p>今日用气量</p>
                      <h3>{{cardData.todayValue}}<span style="font-size:12px;">{{cardData.unit}}</span></h3>
                    </div>

                    <div class="hasbox rela fl">
                      <p>昨日用气量</p>
                      <h3>{{cardData.lastDayValue}}<span style="font-size:12px;">{{cardData.unit}}</span></h3>
                    </div>
                  </div>

                <div class="clearfix" style="margin-top:8px;">
                    <div class="hasboxEm rela fl">
                      <p>本月</p>
                      <h3>{{cardData.thisMonthValue}}<span style="font-size:12px;">{{cardData.unit}}</span></h3>
                    </div>

                    <div class="hasboxEm rela fl" style="margin:0 10px;">
                      <p>上月</p>
                      <h3>{{cardData.lastMonthValue}}<span style="font-size:12px;">{{cardData.unit}}</span></h3>
                    </div>

                    <div class="hasboxEm rela fl">
                      <p>本年</p>
                      <h3>{{cardData.thisYearValue}}<span style="font-size:12px;">{{cardData.unit}}</span></h3>
                    </div>

                  </div>
                  
                </div>
                
              </div>
            </div>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'gas_statistics',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      // 卡片数据(有的是对象，有的数组)
      cardData: {
        "unit": "m³",
        "todayValue": 0,
        "lastDayValue": 0,
        "thisMonthValue": 0,
        "lastMonthValue": 0,
        "thisYearValue": 0,
        "lastYearValue": 0
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
            this.cardData = {
              "unit": "m³",
              "todayValue": 0,
              "lastDayValue": 0,
              "thisMonthValue": 0,
              "lastMonthValue": 0,
              "thisYearValue": 0,
              "lastYearValue": 0
            }
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
.energyStatistic{
  padding: 10px;
  width:520px;
  height:270px;
  margin-top: 10px;
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
.visitStatistic{
  padding: 10px;
  width:520px;
  height: 220px;
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
.hasbox{
  width: 115px;
  height: 68px;
  background: #273149;
  text-align: center;
}
.hasbox p{
  height: 28px;
  width: 100%;
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 28px;
  border-bottom: 1px solid #1b2241;
}
.hasbox::after{
    content: " ";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 100%;
    background: rgba(5,16,60,.58);
    position: absolute;
    top: -4px;
    right: -4px;
    border: 1px solid rgba(5,16,60,.6);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.hasbox h3{
  width: 100%;
  height: 39px;
  font-size: 20px;
  font-weight: bold;
  color: #32C5FF;
  line-height: 39px;
}
.hasboxEm{
  width:115px;
  height: 60px;
}
.hasboxEm p{
  height:21px;
  line-height: 21px;
  text-indent: 10px;
  color: #fff;
  background: #192342;
  border-bottom: 1px solid #10193e;
  font-size: 12px;
  background: url('../../assets/lefttop-triangle.png') #1a2342 no-repeat left top;
}
.hasboxEm h3{
  height:39px;
  line-height: 39px;
  text-align: center;
  color: #32C5FFFF;
  background: #253048;
}
</style>

