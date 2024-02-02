<template>
  <div class="eachCardBox clearfix">
    <div class="visitStatistic bdbox commonTitlebox comBoderAndBg" style="height:170px!important;margin-top:0!important;">
        <div class="main1 flex-row">
          <div class="mod1 flex-col"></div>
          <span class="txt1">{{cardTitle}}</span>
          <span class="word1">{{cardSubTitle}}</span>
          <div class="mod2 flex-col"></div>
          <div class="mod3 flex-col"></div>
        </div>

        <div class="linerStyle" style="margin-top:5px;margin-left:16px;"></div>

        <div v-if="cardData" class="mabboxB-l mabboxB-l_v2 fl clearfix" style="margin-top:20px!important;">
              <div class="fl eacc rela" style="margin-left:14px;">
                <div class="topPP abs clearfix" style="width:100%;border-bottom:1px solid #05103C;">
                  <i class="fl"></i><span class="fl">健康</span>
                </div>
                <p>{{cardData.health}}</p>
                <div class="botPP abs">个房间</div>
              </div>
              <div class="fl eacc rela" style="margin-left:45px;margin-right:45px;">
                <div class="topPP abs clearfix" style="width:100%;border-bottom:1px solid #05103C;">
                  <i class="fl"></i><span class="fl">舒适</span>
                </div>
                <p>{{cardData.comfortable}}</p>
                <div class="botPP abs">个房间</div>
              </div>
              <div class="fl eacc rela">
                <div class="topPP abs clearfix" style="width:100%;border-bottom:1px solid #05103C;">
                  <i class="fl"></i><span class="fl">安全</span>
                </div>
                <p>{{cardData.safety}}</p>
                <div class="botPP abs">个房间</div>
              </div>
            </div>
        
      </div>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'room_status',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      // 卡片数据(有的是对象，有的数组)
      cardData: {
        alarm: 0,
        comfortable: 0,
        health: 0,
        safety: 0,
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
              alarm: 0,
              comfortable: 0,
              health: 0,
              safety: 0,
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
  margin-top: 10px;
}
.mabboxB-l .eacc{
  width: 80px;
height: 100px;
background: rgba(9,19,43,0.4000);
}
.mabboxB-l .eacc:nth-child(2){
  margin:0 7px;
}
.mabboxB-l .eacc p{
  text-align: center;
  line-height: 100px;
  font-size: 24px;
  font-weight: bold;
  color: #32C5FF;
}
.mabboxB-l .eacc .topPP span{
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  padding-left: 5px;
}
.mabboxB-l .eacc .topPP i{
  height: 18px;
  width: 2px;
  background: #03FF1CFF;
  display: inline-block;
}
.mabboxB-l .eacc .botPP{
  bottom:0;
  left: 0;
  color: #fff;
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  width: 100%;
  background: #05103C;
  padding: 3px 0;
}
.mabboxB-l .eacc:nth-child(2) .topPP i{
  background: #FEEF08FF;
}
.mabboxB-l .eacc:nth-child(3) .topPP i{
  background: #32C5FFFF;
}
.mabboxB-l_v2 .eacc{
  width:130px!important;
  height: 80px!important;
}
.mabboxB-l_v2 .eacc p{
  line-height: 80px!important;
}
</style>

