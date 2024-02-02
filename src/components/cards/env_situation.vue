<template>
  <div class="eachCardBox clearfix">
    <div class="deviceWatch indexL2 indexL2_YH1080 bdbox commonTitlebox comBoderAndBg pureSetBG" style="height:206px!important;">
              <div class="main1 flex-row" style="width:550px;">
                <div class="mod1 flex-col"></div>
                <span class="txt1">{{cardTitle}}</span>
                <span class="word1">{{cardSubTitle}}</span>
                <div class="mod2 flex-col" style="margin-left:180px;"></div>
                <div class="mod3 flex-col"></div>
              </div>

              <div class="linerStyle" style="width:480px;margin-top:5px;margin-left:16px;"></div>

              
              <div v-if="cardData" class="trCommBar clearfix" style="margin-top:27px;">

                <div class="fl" style="width:108px;height:90px;background: rgba(45,53,74,.7);margin-left:15px;">
                  <div style="height:20px;border-bottom:1px solid #05103C;border-left:4px solid #03FF1C;line-height:20px;">
                    <span style="color:#fff;font-weight: bold;font-size: 12px;margin-left:5px;">健康</span>
                  </div>
                  <div style="color:#32C5FF;text-align:center;font-size: 28px;font-weight: 600;line-height:66px;height:66px;">{{cardData.health||0}}</div>
                  <div style="color:#fff;text-align:center;font-size: 12px;font-weight: 400;line-height:20px;height:20px;background:#05103C;">个房间</div>
                </div>
                <div class="fl" style="width:108px;height:90px;background: rgba(45,53,74,.7);margin-left:15px;">
                  <div style="height:20px;border-bottom:1px solid #05103C;border-left:4px solid #FEEF08;line-height:20px;">
                    <span style="color:#fff;font-weight: bold;font-size: 12px;margin-left:5px;">舒适</span>
                  </div>
                  <div style="color:#32C5FF;text-align:center;font-size: 28px;font-weight: 600;line-height:66px;height:66px;">{{cardData.comfortable||0}}</div>
                  <div style="color:#fff;text-align:center;font-size: 12px;font-weight: 400;line-height:20px;height:20px;background:#05103C;">个房间</div>
                </div>
                <div class="fl" style="width:108px;height:90px;background: rgba(45,53,74,.7);margin-left:15px;">
                  <div style="height:20px;border-bottom:1px solid #05103C;border-left:4px solid #32C5FF;line-height:20px;">
                    <span style="color:#fff;font-weight: bold;font-size: 12px;margin-left:5px;">安全</span>
                  </div>
                  <div style="color:#32C5FF;text-align:center;font-size: 28px;font-weight: 600;line-height:66px;height:66px;">{{cardData.safety||0}}</div>
                  <div style="color:#fff;text-align:center;font-size: 12px;font-weight: 400;line-height:20px;height:20px;background:#05103C;">个房间</div>
                </div>
                <div class="fl" style="width:108px;height:90px;background:rgba(45,53,74,.7);margin-left:15px;">
                  <div style="height:20px;border-bottom:1px solid #05103C;border-left:4px solid #E74C3C;line-height:20px;">
                    <span style="color:#fff;font-weight: bold;font-size: 12px;margin-left:5px;">告警</span>
                  </div>
                  <div style="color:#32C5FF;text-align:center;font-size: 28px;font-weight: 600;line-height:66px;height:66px;">{{cardData.alarm||0}}</div>
                  <div style="color:#fff;text-align:center;font-size: 12px;font-weight: 400;line-height:20px;height:20px;background:#05103C;">个房间</div>
                </div>

                
              </div>
              
            </div>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'env_situation',
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

