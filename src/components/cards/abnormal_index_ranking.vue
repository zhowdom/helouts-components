<template>
  <div class="eachCardBox clearfix">
    <div class="energyStatistic bdbox commonTitlebox comBoderAndBg" style="width:520px;height:250px;">
        <div class="main1 flex-row" style="width:545px;">
          <div class="mod1 flex-col"></div>
          <span class="txt1">{{cardTitle}}</span>
          <span class="word1" style="margin-left:40px;">{{cardSubTitle}}</span>
          <div class="mod2 flex-col" style="margin-left:150px;"></div>
          <div class="mod3 flex-col"></div>
        </div>
        <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:481px;margin-bottom:15px;"></div>
        <div v-if="cardData.length" class="mabboxT-l-topBT" style="padding-left:16px;">
          <p v-for="(item, index) in cardData" :key="index" class="clearfix" style="margin-bottom:10px!important;">
            <span class="fl esname">{{item.attributeName}}</span>
            <el-progress class="esnameBar esnameBar_v2" :stroke-width="6" :format="format" :percentage="percentage[index]" color="#32C5FFFF"></el-progress>
          </p>
        </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'abnormal_index_ranking',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      // 卡片数据(有的是对象，有的数组)
      cardData: [],
      percentage: [0,0,0,0,0,0,0,0,0,0,0,0],
    }
  },
  async mounted () {
    await this.matchParmsPageType()
    await this.queryEachCardData()
    setTimeout(this.executeProgressBar, 1000)
  },
  created () {},
  watch: {},
  methods: {
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
      this.executeProgressBar()
    },
    increase (index, percent) {
      let _timer = setInterval(() => {
        this.percentage[index] += 10;
        if (this.percentage[index] > percent) {
          this.percentage[index] = +percent;
          clearInterval(_timer)
        }
      }, 0)
    },
    executeProgressBar () {
      // 需要等后端修改
      this.cardData.length && this.cardData.forEach((v, index) => this.increase(index, (v.rate*100).toFixed(0)))
      setTimeout(() => {
        this.$forceUpdate()
      }, 1000)
    },
    format(percentage) {
      let res = this.cardData.find(v => (v.rate*100).toFixed(0) == percentage)
      if (res) {
        return `${res.count}次`;
      }
    },
    queryEachCardData () {
      return new Promise((resolve, reject) => {
        const _temp = this.$store.getters.floatMenus
        const _params = _temp.find(v => v.pageCode === this.getCurrentPath()).cartList.find(v => v.cardCode === this.$options.name).params
        _params.cardCode = this.$options.name
        this.$axios.post(this.apiUrl, _params).then(({data}) => {
          if (data.code === 200) {
            this.cardData = data.data || []
          } else {
            this.cardData = []
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
.esname{
  font-size: 12px;
  color: #32C5FFFF;
  width:62px;
  display: inline-block;
}
.esnameBar_v2{
  width:420px!important;
  float: left;
}
.esnameBar_v2 .el-progress-bar {
  width:420px!important;
}
.mabboxT-l-topBT_v2 p{margin-bottom: 13px;}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
</style>

