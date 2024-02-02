<template>
  <div class="warn_tabs_wrap">

    <div class="railwayTime clearfix comBoderAndBg pureSetBG">
              <div class="myCustomTabBox">
                <ul class="clearfix">
                  <li class="fl" :class="{'cur': curtabIndex == 'at1'}" @click="handleTabClick('at1')">全部报警<i v-if="cardData[0].details.length > 0" class="couts">{{cardData[0].details.length > 99 ? '99+' : cardData[0].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at2'}" @click="handleTabClick('at2')">设备报警<i v-if="cardData[1].details.length > 0" class="couts">{{cardData[1].details.length > 99 ? '99+' : cardData[1].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at3'}" @click="handleTabClick('at3')">能耗报警<i v-if="cardData[2].details.length > 0" class="couts">{{cardData[2].details.length > 99 ? '99+' : cardData[2].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at4'}" @click="handleTabClick('at4')">仪器报警<i v-if="cardData[3].details.length > 0" class="couts">{{cardData[3].details.length > 99 ? '99+' : cardData[3].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at5'}" @click="handleTabClick('at5')">安防报警<i v-if="cardData[4].details.length > 0" class="couts">{{cardData[4].details.length > 99 ? '99+' : cardData[4].details.length}}</i></li>
                  <li class="fl" :class="{'cur': curtabIndex == 'at6'}" @click="handleTabClick('at6')">环境报警<i v-if="cardData[5].details.length > 0" class="couts">{{cardData[5].details.length > 99 ? '99+' : cardData[5].details.length}}</i></li>
                  <!-- <li class="fl" :class="{'cur': curtabIndex == 'at7'}" @click="handleTabClick('at7')">人员报警</li> -->
                </ul>
              </div>
              <div class="myCustomTabContent newsctabox">

                <ul v-show="curtabIndex == 'at1'" style="overflow-y:scroll;height:292px;">
                  <span v-if="cardData[0].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData[0].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
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
                  <span v-if="cardData[1].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData[1].details" :key="index" @click="miniEventClick(item.spaceCode)" class="pureSetBGUpper">
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
                  <span v-if="cardData[2].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData[2].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
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
                  <span v-if="cardData[3].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData[3].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
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
                  <span v-if="cardData[4].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData[4].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
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
                  <span v-if="cardData[5].details.length == 0" class="emptydataBox">暂无数据</span>
                  <li v-for="(item, index) in cardData[5].details" :key="index" @click="miniEventClick(item.deviceId)" class="pureSetBGUpper">
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
import mixin from '../mixin'
export default {
  name: 'warn_tabs',
  props: {},
  inject: ['getCurrentPath'],
  mixins: [mixin],
  data () {
    return {
      curtabIndex: 'at1',
      // 卡片数据(有的是对象，有的数组)
      cardData: [
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
    }
  },
  mounted () {},
  created () {},
  watch: {},
  methods: {
    handleTabClick (index) {
      this.curtabIndex = index
    },
    miniEventClick (code) {
      console.log('报警设备ID：', code)
      window.ue.web.js_call_ue("报警", code)
    },
  }
}
</script>
<style scoped>
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