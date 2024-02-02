<template>
  <div class="eachCardBox clearfix">
    <div class="visitStatistic bdbox commonTitlebox comBoderAndBg" style="height:228px;">
        <div class="main1 flex-row">
          <div class="mod1 flex-col"></div>
          <span class="txt1">{{cardTitle}}</span>
          <span class="word1">{{cardSubTitle}}</span>
          <div class="mod2 flex-col"></div>
          <div class="mod3 flex-col"></div>
        </div>

        <div class="linerStyle" style="margin-top:5px;margin-left:16px;"></div>

        <div class="oneBoxr fl n2n" style="width:500px;margin-top:10px;">
              <div class="nandBox-r fl sdcv" style="width:100%;height:158px;">
              <div class="nandBox-rT clearfix" style="background:#141d34;border-bottom: 1px solid #121a32;"><div class="time eplise">时间</div><div class="no eplise">车牌</div><div class="name eplise">人员</div><div class="op eplise">状态</div></div>
              <div class="nandBox-rB">
                <ul v-if="cardData" style="height:115px;">
                  <li v-for="(item, index) in cardData" :key="index" class="clearfix">
                    <div class="time eplise" style="width:130px;">{{dayjs(item.time).format('YYYY-MM-DD HH:mm')}}</div><div class="no eplise" style="width:160px;">{{item.carNumber}}</div><div class="name eplise">{{item.name}}</div><div class="op eplise" style="color:#FF6F6FFF;">{{item.statusName}}</div>
                  </li>
                </ul>
              </div>
            </div>
            </div>
        
      </div>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'packing_record',
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
    this.queryEachCardData()
  },
  created () {},
  watch: {},
  methods: {
    queryEachCardData () {
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
      }).catch(e => {
        this.loading = false
      })
    }
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
    margin: 10px 0 0 134px;
}
.commonTitlebox .main1 .mod3 {
        width: 27px;
    height: 8px;
    background: url(../../assets/mod3-bg.png) 0px 0px no-repeat;
    margin: 7px 0 0 8px;
}
.n2n .sdcv{
  height: 200px;
  background: #1d253f;
}
.n2n .sdcv ul{
  height: 168px;
}
.n2n .time{
  width:120px;
}
.n2n .no{
  width:170px;
}
.nandBox-r .time{width:110px;float: left;}
.nandBox-r .op{width:40px;float: left;}
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
    margin: 9px 0 0 59px;
}
.sdcv li{
  background: #1d253f;
  padding: 12px 0;
  border-bottom: 1px solid #121a32;
}
.sdcv li:last-of-type{
  border-bottom: 1px solid none;
}
.sdcv ul{
  height: 252px;
  overflow-y: scroll;
}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
.n2n .time{
  width:120px;
}
.n2n .no{
  width:170px;
}
.n2n .oneBox{
  width:100%;
  height:200px;
  background: #09132B66;
}
.n2n .oneBoxl{
  width:150px;
  background: #09132B99;
  height:200px;
}
.n2n .oneBoxr{
  width:calc(100% - 150px);
  height:200px;
}
.n2n .sdcv{
  height: 200px;
  background: #1d253f;
}
.n2n .sdcv ul{
  height: 168px;
}
.sdcv .nandBox-rT{
  padding-top:12px;
  padding-bottom:12px;
}
.sdcv ul{
  height: 252px;
  overflow-y: scroll;
}
.nandBox-rT{
  color: #00CCFFFF;
  font-size: 13px;
  font-weight: bold;
  background: #09132B99;
  padding: 10px 0;
  box-sizing: border-box;
  text-align: center;
}
.nandBox-r .no{width:40px;float: left;}
.nandBox-r .time{width:110px;float: left;}
.nandBox-r .name{width:110px;float: left;}
.nandBox-r .status{width:40px;float: left;}
.nandBox-r .op{width:40px;float: left;}
.gxgTitle{
  height:27px;border-bottom: 1px solid rgba(5,16,60,0.6000);color:#fff;line-height:27px;font-size: 12px;font-weight:500;
}
.n2n .no{
  width:170px;
}
.n2n .time{
  width:120px;
}
.nandBox-rT{
  color: #00CCFFFF;
  font-size: 13px;
  font-weight: bold;
  background: #09132B99;
  padding: 10px 0;
  box-sizing: border-box;
  text-align: center;
}
.nandBox-rB{
  color: #00CCFFFF;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background: #09132B66;
}
.nandBox-rB ul li{
  border-bottom:1px solid rgba(9,19,43,0.4000);
  padding: 7px 0;
}
</style>

