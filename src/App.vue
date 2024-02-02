<template>
  <div id="app">

		<!--top Menu-->
		<div class="topperHeader rela" @click.stop="clickHeader">
        <div class="headerbox rela">
          <!-- <img src="./assets/test-copy.png"> -->
          <div class="repeatXBg"></div>
          <img src="./assets/ssbg.png">
          <div class="headerTitle txtc abs">科研建筑智慧运营平台-数字孪生系统</div>
        </div>

        <div class="logobox clearfix abs">
          <div class="shlogo fl rela">
            <img src="./assets/logo1.png">
            <!-- <img src="./assets/logov3.png"> -->
          </div>
          <span class="logoDate fl"><i id="date_1"></i> I <i id="date_2">{{nowTime}}</i></span>
        </div>

        <div class="userRight clearfix abs">
          <div class="fl ssImg">
            <img v-if="weatherInfos.wea_img == 'xue'" src="./assets/xue.png">
            <img v-else-if="weatherInfos.wea_img == 'lei'" src="./assets/lei.png">
            <img v-else-if="weatherInfos.wea_img == 'shachen'" src="./assets/shachen.png">
            <img v-else-if="weatherInfos.wea_img == 'wu'" src="./assets/wu.png">
            <img v-else-if="weatherInfos.wea_img == 'bingbao'" src="./assets/bingbao.png">
            <img v-else-if="weatherInfos.wea_img == 'yun'" src="./assets/yun.png">
            <img v-else-if="weatherInfos.wea_img == 'yu'" src="./assets/yu.png">
            <img v-else-if="weatherInfos.wea_img == 'yin'" src="./assets/yin.png">
            <img v-else-if="weatherInfos.wea_img == 'qing'" src="./assets/qing.png">
          </div>
          <p class="fl"><span>{{weatherInfos.tem}} {{weatherInfos.wea}}</span><span style="padding:0 10px;" @click.stop="handleWeather">天气控制</span></p>
          <div @click.stop="clickMessage" class="rela fl" style="width:40px;height:10px;margin-top:10px;cursor:pointer;">
           <i class="el-icon-message-solid"></i>
           <span v-show="alarmTotalCount > 0" class="abs" style="font-size:10px;top:-7px;right:17px;background:red;color:#fff;padding:0 2px;border-radius:10px;display:inline-block;height:18px;line-height:19px;">{{alarmTotalCount > 99 ? '99+' : (alarmTotalCount||0)}}</span>
          </div>
          <div class="fl ssImg"><img :src='loginInfos.avator'></div>
          <el-tooltip class="item" effect="dark" content="安岭生物" placement="top-start">
           <!-- <p class="fl loginName"><span class="eplise">{{loginInfos.nickName}}</span></p> -->
           <p class="fl loginName"><span class="eplise">安岭生物</span></p>
          </el-tooltip>
        </div>
      </div>

			<router-view/>
      
      <!--bottom Menu-->
      <!-- <div class="bottomMenuBox bottomMenuBoxNewVersion mgc clearfix fixed">
        <div @click="goto('situation')" :class="{'curBGcolor': isCurIndex == 'situation'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-1.png"></div><p class="btmMenuTxt abs">态势</p></div>
        <div @click="goto('global')" :class="{'curBGcolor': isCurIndex == 'global'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-2.png"></div><p class="btmMenuTxt abs">全局</p></div>
        <div @click="goto('structure')" :class="{'curBGcolor': isCurIndex == 'structure'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-3.png"></div><p class="btmMenuTxt abs">结构</p></div>
        <div @click="clickTo('daolan')" :class="{'curBGcolor': isCurIndex == 'daolan'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-4.png"></div><p class="btmMenuTxt abs">导览</p></div>
        <div @click="clickTo('inspection')" :class="{'curBGcolor': isCurIndex == 'inspection'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-5.png"></div><p class="btmMenuTxt abs">巡检</p></div>
        <div @click="goto('index')" :class="{'curBGcolor': isCurIndex == 'index'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-6.png"></div><p class="btmMenuTxt abs">区位</p></div>
        <div @click="goto('robot')" :class="{'curBGcolor': isCurIndex == 'robot'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-7.png"></div><p class="btmMenuTxt abs">机器人</p></div>
        <div class="isCenter fl rela">
          <div class="inImg">
          <img src="./assets/v2-8c.png">
          <span @click="clickCt('N')" :class="{'curColr': isCur == 'N'}">北</span>
          <span @click="clickCt('E')" :class="{'curColr': isCur == 'E'}">东</span>
          <span @click="clickCt('S')" :class="{'curColr': isCur == 'S'}">南</span>
          <span @click="clickCt('W')" :class="{'curColr': isCur == 'W'}">西</span>
          <span @click="clickCt('C')" :class="{'curColr': isCur == 'C'}" class="centerBtn"></span>
          </div>
        </div>
        <div @click="goto('environment')" :class="{'curBGcolor': isCurIndex == 'environment'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-9.png"></div><p class="btmMenuTxt abs">环境</p></div>
        <div @click="goto('electrical')" :class="{'curBGcolor': isCurIndex == 'electrical'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-10.png"></div><p class="btmMenuTxt abs">机电</p></div>
        <div @click="goto('instrument')" :class="{'curBGcolor': isCurIndex == 'instrument'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-11.png"></div><p class="btmMenuTxt abs">仪器</p></div>
        <div @click="goto('energy')" :class="{'curBGcolor': isCurIndex == 'energy'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-12.png"></div><p class="btmMenuTxt abs">能效</p></div>
        <div @click="goto('security')" :class="{'curBGcolor': isCurIndex == 'security'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-13.png"></div><p class="btmMenuTxt abs">安防</p></div>
        <div @click="clickTo('peoples')" :class="{'curBGcolor': isCurIndex == 'peoples'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-14.png"></div><p class="btmMenuTxt abs">人员</p></div>
        <div @click="goto('business')" :class="{'curBGcolor': isCurIndex == 'business'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-15.png"></div><p class="btmMenuTxt abs">运维</p></div>
      </div> -->

      <!--bottom Menu 隐藏了环境、机器人、机电、仪器、能耗、安防、人员、运维后续会继续联调放开的，增加class="hideClass230803", 后面放去掉就可以-->
      <div id="floatMenu_J" class="bottomMenuBox bottomMenuBoxNewVersion mgc clearfix fixed hideClass230803 forBlurFix240117">
        <!-- <div @click="goto('robot')" :class="{'curBGcolor': isCurIndex == 'robot'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-7.png"></div><p class="btmMenuTxt abs">机器人</p></div> -->
        <!-- <div @click="clickTo('daolan')" :class="{'curBGcolor': isCurIndex == 'daolan'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-4.png"></div><p class="btmMenuTxt abs">导览</p></div> -->
        <!-- <div @click="goto('instrument')" :class="{'curBGcolor': isCurIndex == 'instrument'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-11.png"></div><p class="btmMenuTxt abs">仪器</p></div> -->
        <!-- <div @click="clickTo('peoples')" :class="{'curBGcolor': isCurIndex == 'peoples'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-14.png"></div><p class="btmMenuTxt abs">人员</p></div> -->
        <!-- <div @click="goto('business')" :class="{'curBGcolor': isCurIndex == 'business'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-15.png"></div><p class="btmMenuTxt abs">运维</p></div> -->
        
        <!-- <ul>
          <li v-for="item in setFloatMenusArr" :key="item.pageCode">{{item.pageCode}}</li>
        </ul> -->

        <!-- <div v-for="item in setFloatMenusArr" 
          :key="item.pageCode" 
          @click="goto('situation')" 
          :class="{'curBGcolor': isCurIndex == 'situation'}" 
          class="commstyle fl rela">
          <div class="inImg">
            <img src="./assets/v2-1.png">
          </div>
          <p class="btmMenuTxt abs">态势</p>
        </div> -->

          <div v-for="(item, index) in setFloatMenusArr" class="clearfix periods2MenuEach" :class="{'centerBIG': item.pageCode == 'control'}" :key="item.pageCode">
            
            <div v-if="item.pageCode == 'location'" @click="goto('index')" :class="{'curBGcolor': isCurIndex == 'index'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-6.png"></div><p class="btmMenuTxt abs">{{item.pageTitle}}</p></div>
            <div v-else-if="item.pageCode == 'inspection'" @click="clickTo('inspection')" :class="{'curBGcolor': isCurIndex == 'inspection'}" class="commstyle fl rela"><div class="inImg"><img :src="item.icon"></div><p class="btmMenuTxt abs">{{item.pageTitle}}</p></div>
            <div v-else-if="item.pageCode == 'control'" class="isCenter fl rela" style="margin-right: 20px;">
              <div class="inImg">
              <img src="./assets/positionMenu.png">
              <span @click="clickCt('N')" :class="{'curColr': isCur == 'N'}">北</span>
              <span @click="clickCt('E')" :class="{'curColr': isCur == 'E'}">东</span>
              <span @click="clickCt('S')" :class="{'curColr': isCur == 'S'}">南</span>
              <span @click="clickCt('W')" :class="{'curColr': isCur == 'W'}">西</span>
              <span @click="clickCt('C')" :class="{'curColr': isCur == 'C'}" class="centerBtn"></span>
              </div>
            </div>
            <div v-else @click="goto(item.pageCode)" :class="{'curBGcolor': isCurIndex == item.pageCode}" class="commstyle fl rela"><div class="inImg"><img :src="item.icon"></div><p class="btmMenuTxt abs">{{item.pageTitle}}</p></div>

          </div>
        


        <!-- <div  @click="goto('situation')" :class="{'curBGcolor': isCurIndex == 'situation'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/situation.png"></div><p class="btmMenuTxt abs">态势</p></div>
        <div  @click="goto('global')" :class="{'curBGcolor': isCurIndex == 'global'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/global.png"></div><p class="btmMenuTxt abs">全局</p></div>
        <div  @click="goto('structure')" :class="{'curBGcolor': isCurIndex == 'structure'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/structure.png"></div><p class="btmMenuTxt abs">结构</p></div>
        <div  @click="goto('energy')" :class="{'curBGcolor': isCurIndex == 'energy'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/energy.png"></div><p class="btmMenuTxt abs">能效</p></div>
        <div  class="isCenter fl rela">
          <div class="inImg">
          <img src="./assets/v2-8c.png">
          <span @click="clickCt('N')" :class="{'curColr': isCur == 'N'}">北</span>
          <span @click="clickCt('E')" :class="{'curColr': isCur == 'E'}">东</span>
          <span @click="clickCt('S')" :class="{'curColr': isCur == 'S'}">南</span>
          <span @click="clickCt('W')" :class="{'curColr': isCur == 'W'}">西</span>
          <span @click="clickCt('C')" :class="{'curColr': isCur == 'C'}" class="centerBtn"></span>
          </div>
        </div>
        <div  @click="clickTo('inspection')" :class="{'curBGcolor': isCurIndex == 'inspection'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/inspection.png"></div><p class="btmMenuTxt abs">巡检</p></div>
        <div  @click="goto('index')" :class="{'curBGcolor': isCurIndex == 'index'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/v2-6.png"></div><p class="btmMenuTxt abs">区位</p></div>
        <div @click="goto('environment')" :class="{'curBGcolor': isCurIndex == 'environment'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/environment.png"></div><p class="btmMenuTxt abs">环境</p></div>
        <div @click="goto('electrical')" :class="{'curBGcolor': isCurIndex == 'electrical'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/electrical.png"></div><p class="btmMenuTxt abs">机电</p></div>
        <div @click="goto('security')" :class="{'curBGcolor': isCurIndex == 'security'}" class="commstyle fl rela"><div class="inImg"><img src="./assets/security.png"></div><p class="btmMenuTxt abs">安防</p></div> -->
        
        
      </div>

      <!--公共顶部消息-->
      <div id="fadeInDownBigMenu" v-show="show_status" class="messageBox" :class="{ 'animate__animated animate__fadeInDownBig':show_status }">
        <div class="mgbMenu">
          <el-tabs v-model="activeNameApp" type="card" @tab-click="handleClick">
            <el-tab-pane label="全部报警" :name="null"></el-tab-pane>
            <el-tab-pane label="设备报警" name="device_alarm"></el-tab-pane>
            <el-tab-pane label="仪器报警" name="instrument_alarm"></el-tab-pane>
            <el-tab-pane label="安防报警" name="safety_alarm"></el-tab-pane>
            <el-tab-pane label="环境报警" name="space_alarm"></el-tab-pane>
          </el-tabs>
          <i v-show="alarmTotalCount > 0" class="sct sct1">{{alarmTotalCount||0}}</i>
          <i v-show="alarmTotalResult['device_alarm'] > 0" class="sct sct2">{{alarmTotalResult['device_alarm']}}</i>
          <i v-show="alarmTotalResult['instrument_alarm'] > 0" class="sct sct3">{{alarmTotalResult['instrument_alarm']}}</i>
          <i v-show="alarmTotalResult['safety_alarm'] > 0" class="sct sct4">{{alarmTotalResult['safety_alarm']}}</i>
          <i v-show="alarmTotalResult['space_alarm'] > 0" class="sct sct5">{{alarmTotalResult['space_alarm']}}</i>
        </div>

        <div class="mgbList">
          <ul @scroll="scrollEvent">
            <li v-for="(item, index) in alarmListData" :key="index" @click="showVisibleWarn(item.deviceId)">
              <h3 class="clearfix">
                <span class="fl">{{item.alarmTypeName}}</span>
                <i class="fr">报警时间：{{dayjs(item.alarmTime).format('YYYY-MM-DD HH:mm')}}</i>
              </h3>
              <p>
                <span>报警设备：<i>{{item.deviceIdName}}</i></span>
                <span>报警点位：<i>{{item.attributeIdName}}</i></span>
                <span>所属系统：<i>{{item.deviceIdSystemIdName}}</i></span>
                <span>所属位置：<i>{{item.spaceIdNumber}}</i></span>
                <span>值：<i>trun</i></span>
                <span>报警描述：<i>{{item.alarmDesc}}</i></span>
              </p>
            </li>
            <h3 class="emptyDataH3" v-if="alarmListData.length <= 0">暂无数据</h3>
          </ul>
        </div>
      </div>

      <!--底部菜单-->
      <div class="spiderbox" v-if="false">
        <div class="spdr1 fl">
          <div id="lcChoose_js" class="spdr1menu" @click="hadHoveredq1 = true">图层选择</div>
          <div v-show="hadHoveredq1" class="spdr1Btns" :class="{'animate__animated animate__fadeInUpBig': true}">
            <!-- <div class="spdr1close" @click="hadHoveredq1 = false"><i class="el-icon-error"></i></div> -->
          <!--copy start-->
          <!--左侧悬浮菜单-->
              <div id="lcChoose_js2" class="cmABSMenu2 cmABSMenu2new bdbox clearfix" style="border-top-left-radius:5px;border-top-right-radius:5px;">
                <ul class="bdbox" id="hoverOpacityBox1">
                  <li class="clearfix ecbBase">
                    <div class="fl">基础</div>
                    <div class="fr">
                      <el-switch
                        @change="((e) => handleBTM(e, '基础'))"
                        :width="30"
                        v-model="swValue"
                        active-color="#00ccff"
                        inactive-color="#dddfe6">
                      </el-switch>
                    </div>
                  </li>
                  <li class="clearfix ecbTop">
                    <div class="fl">天花板</div>
                    <div class="fr">
                      <el-switch
                        @change="((e) => handleBTM(e, '天花板'))"
                        :width="30"
                        v-model="swValue2"
                        active-color="#00ccff"
                        inactive-color="#dddfe6">
                      </el-switch>
                    </div>
                  </li>
                  <li class="clearfix ecbHome">
                    <div class="fl">家具</div>
                    <div class="fr">
                      <el-switch
                        @change="((e) => handleBTM(e, '家具'))"
                        :width="30"
                        v-model="swValue3"
                        active-color="#00ccff"
                        inactive-color="#dddfe6">
                      </el-switch>
                    </div>
                  </li>
                  <li class="clearfix ecbWarn">
                    <div class="fl">暖通</div>
                    <div class="fr">
                      <el-switch
                        @change="((e) => handleBTM(e, '暖通'))"
                        :width="30"
                        v-model="swValue4"
                        active-color="#00ccff"
                        inactive-color="#dddfe6">
                      </el-switch>
                    </div>
                  </li>
                  <li class="clearfix ecbGas">
                    <div class="fl">气路</div>
                    <div class="fr">
                      <el-switch
                        @change="((e) => handleBTM(e, '气路'))"
                        :width="30"
                        v-model="swValue5"
                        active-color="#00ccff"
                        inactive-color="#dddfe6">
                      </el-switch>
                    </div>
                  </li>
                </ul>
              </div>
          <!--copy end-->
          </div>
        </div>
        <div id="loucengBoxingJS_rc"  class="spdr2 fl" @click="showDigitalGo">
          数字巡检
        </div>
        <div id="loucengBoxingJS" class="spdr3 fl" @click="showllayer">
          楼层
        </div>
        <div id="loucengBoxingJS2" class="loucengBoxing"  v-show="hadHoveredq2" :class="{'animate__animated animate__fadeInUpBig': true}">
          <div class="clearfix" style="padding:10px 5px;">
            <div class="xxstm fl"></div>
            <div class="xxstxt fl">楼层</div>
          </div>
          <ul>
            <li :class="{'cur': i == layerIndex}" v-for="(v, i) in elevatorMaps2" :key="i" @click="handleEachLayer(v.id, i)">{{v.label}}</li>
          </ul>
        </div>

        <div id="loucengBoxingJS2_rc" class="loucengBoxing loucengBoxing_rc"  v-show="hadHoveredq2_rc" :class="{'animate__animated animate__fadeInUpBig': true}">
          <ul>
            <li :class="{'cur': i == layerIndex_rc}" v-for="(v, i) in elevatorMaps_rc" :key="i" @click="handleEachLayer_rc(v.id, i)">{{v.label}}</li>
          </ul>
        </div>
        <!-- <div  class="spdr3 fl" @click="handleOpenFold('close')">
          收起
        </div>
        <div  class="spdr3 fl" @click="handleOpenFold('open')">
          展开
        </div> -->
      </div>

      <!--数字巡检弹窗1-->
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        :before-close="handleCloseLayer"
        custom-class="dzDialogStyle rela">
        <div class="dzDialogHeader clearfix abs">
          <div class="fl"></div>
          <div class="rightBBar">
            数字巡检
          </div>
        </div>
        <div class="clearfix" style="padding-left:23px;">
          <div class="inBoxitems" :class="{'cur': cclickIndex == index}" v-for="(item, index) in elevatorMaps" :key="index" @click="handleChooseLayer(index, item.id)">
            {{item.label}}
          </div>
        </div>
      </el-dialog>

      <!--dialog(附近2个｜1个楼层)-->
      <el-dialog
        title=""
        :visible.sync="dialogVisibleNearby"
        :before-close="handleCloseLayerNearby"
        custom-class="dzDialogStyle rela dzDialogStyleNearby">
        <div class="dzDialogHeader clearfix abs">
          <div class="fl"></div>
          <div class="rightBBar">
            数字巡检<span class="spreadByHomecheck"><el-checkbox @change="handleSpreadByHome" v-model="spreadByHome">分房间漫游</el-checkbox></span>
          </div>
        </div>
        <div class="clearfix" style="padding-left:23px;">
          <div class="inBoxitems" :class="{'cur': cclickIndex == index}" v-for="(item, index) in nearbyLayer" :key="index" @click="handleChooseLayerNearby(index, item.id)">
            {{item.label}}
          </div>
        </div>
      </el-dialog>

      <!--dialog(其他楼层)-->
      <el-dialog
        title=""
        :visible.sync="dialogVisibleAnother_temp"
        :before-close="handleCloseLayerAnother"
        custom-class="dzDialogStyle rela dzDialogStyleNearby">
        <div class="dzDialogHeader clearfix abs">
          <div class="fl"></div>
          <div class="rightBBar">
            数字巡检
          </div>
        </div>
        <div class="clearfix" style="padding-left:23px;">
          <div class="inBoxitems" :class="{'cur': cclickIndex == index}" v-for="(item, index) in anotherLayer" :key="index" @click="handleChooseLayerAnother(index, item.id)">
            {{item.label}}
          </div>
        </div>
      </el-dialog>

      <!--点击报警列表弹窗窗-->
      <el-dialog
        title=""
        :visible.sync="visibleWarn"
        :before-close="handleCloseWarn"
        custom-class="dzDialogStyle_warn rela">
        <div class="dzDialogHeader clearfix abs">
          <div class="fl"></div>
          <div class="rightBBar">
            报警确认
          </div>
        </div>
        <div class="clearfix wnlistbox">
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">设备名称:</span><span class="itnes eplise">1Ap-2抽屉柜</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">报警名称:</span><span class="itnes eplise">A相电压</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">报警描述:</span><span class="itnes eplise">A相电压过高</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">报警状态:</span><span class="itnes eplise">报警</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">报警级别:</span><span class="itnes eplise" style="color:#b26f74;">严重</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">检测值:</span><span class="itnes eplise">250.34V</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">所属项目:</span><span class="itnes eplise">武汉CBD一级管理处</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">所属系统:</span><span class="itnes eplise">供配电检测系统</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">设备位置:</span><span class="itnes eplise">配电房</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">设备级别:</span><span class="itnes eplise">一级</span></div>
          <div class="clearfix eechli rela fl"><i class="cm_daoTriangle_bg abs"></i><span class="nesname eplise">报警时间:</span><span class="itnes eplise">2019-07-11 20:36:55</span></div>
        </div>
        <div class="clearfix wnmemobox">
          <div class="wnmemoboxIn">
            <span style="color:#32C5FF;padding:10px;display:inline-block;padding-left:0;">备注：</span>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="wnmemoVal">
            </el-input>
            <div style="padding-top:10px;">
              <el-button type="primary" @click="closeEachVisibleWarn" style="background:#63c2fa;border-color:#63c2fa;">故障确认</el-button>
              <el-button type="primary" @click="closeEachVisibleWarn" style="background:#FD9544;border-color:#FD9544;">误报确认</el-button>
              <el-button type="primary" @click="closeEachVisibleWarn" style="background:#FF6F6F;border-color:#FF6F6F;">报警确认</el-button>
              <div class="wnmemoGLSelect">
                <el-select @change="closeEachVisibleWarn" popper-class="wnmemoGLSelectIn" v-model="wnmemoGLVal" placeholder="请选择">
                  <el-option label="隔离1小时" value="1"></el-option>
                  <el-option label="隔离2小时" value="2"></el-option>
                  <el-option label="隔离3小时" value="3"></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
        
      </el-dialog>


  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route': 'watchRoute'
  },
  provide () {
    return {
      getCurrentPath: this.getCurrentPath,
      queryBottomMenus: this.queryBottomMenus
    }
  },
  data () {
    return {
      isCurIndex: 'index',
      isCur: null,
      alarmTotalResult: {},
      alarmTotalCount: 0,
      pageIndex_AlarmList: 1, // 查第几页数据
      pageSize_AlarmList: 10, // 1页几条
      totalPage_AlarmList: 1, // 总页数
      currentPage_AlarmList: 0, // 当前页
      alarmListData: {},
      loginInfos: {
        nickName: sessionStorage.getItem('nickName'),
        avator: sessionStorage.getItem('avator')
      },
      cur_rcValue: null,
      weatherInfos: {
        wea: '',
        tem: '',
        wea_img: '',
      },
      layerIndex: null,
      layerIndex_rc: null,
      elevatorMaps_rc: [
        {
          label: '第一人称',
          id: 1
        },
        {
          label: '第三人称',
          id: 3
        }
      ],
      elevatorMaps2:[
        {
          label: 'F-1',
          id: '1'
        },
        {
          label: 'F-2',
          id: '2',
        },
        {
          label: 'F-3',
          id: '3',
        },
        {
          label: 'F-4',
          id: '4',
        },
        {
          label: 'F-5',
          id: '5',
        },
        {
          label: 'F-6',
          id: '6',
        },
        {
          label: 'F-7',
          id: '7',
        },
        {
          label: 'F-8',
          id: '8',
        },
        {
          label: 'F-9',
          id: '9',
        },
        {
          label: 'F-10',
          id: '10',
        },
        {
          label: 'F-11',
          id: '11',
        },
        {
          label: 'F-12',
          id: '12',
        },
        {
          label: 'F-13',
          id: '13',
        },
        {
          label: 'F-14',
          id: '14',
        },
        {
          label: 'F-15',
          id: '15',
        },
        {
          label: '顶楼',
          id: '16',
        }
      ],
      show_status: false,
      nowTime: '',
      hadHoveredq1: false,
      hadHoveredq2: false,
      hadHoveredq2_rc: false,
      swValue: false,
      swValue2: false,
      swValue3: false,
      swValue4: false,
      swValue5: false,
      clickCount: 0,
      clickedMe: false,
      activeNameApp: null,
      dialogVisible: false,
      cclickIndex: null,
      elevatorMaps:[
        {
          label: 'F-1',
          id: 'F1'
        },
        {
          label: 'F-9',
          id: 'F9',
        },
        {
          label: 'F-10',
          id: 'F10',
        },
        {
          label: 'F-11',
          id: 'F11',
        },
        {
          label: 'F-12',
          id: 'F12',
        },
        {
          label: 'F-13',
          id: 'F13',
        },
        {
          label: 'F-14',
          id: 'F14',
        },
        {
          label: 'F-15',
          id: 'F15',
        },
        {
          label: '顶楼',
          id: 'F6',
        }
      ],
      dialogVisibleNearby: false,
      nearbyLayer: [],
      spreadByHome: true,
      dialogVisibleAnother_temp: false,
      anotherLayer: [
        {
          label: '继续漫游',
          id: '继续漫游'
        },
        {
          label: '其他楼层',
          id: '其他楼层'
        }
      ],
      visibleWarn: false,
      wnmemoGLVal: '1',
      wnmemoVal: '',
      winWidth: '1920',
      winHeight: '1080',
      browserWidth: '1920',
      browserHeight: '1080',
      setFloatMenusArr: [],
    }
  },
  async created () {
    await this.queryBottomMenus()
    this.queryWeatherInfos()
    this.getAlarmTypeCount()
    this.getAlarmList()
  },
	mounted () {
    window.vue_app = this
    this.getTime()
    // 公共报警弹窗消息
    document.addEventListener('click',() =>{
      this.clickCount = 0
      // this.show_status = false
      this.hadHoveredq2 = false
      this.hadHoveredq2_rc = false
      this.hadHoveredq1 = false
    })
    const _fadeInDownEle = document.getElementById('fadeInDownBigMenu');
    _fadeInDownEle.addEventListener('click',() =>{
      event.stopPropagation()
    })
    // 底部楼层菜单
    // const _fadeInDownWarn = document.getElementById('loucengBoxingJS');
    // const _fadeInDownWarn2 = document.getElementById('loucengBoxingJS2');
    // const _fadeInDownWarn2_rc = document.getElementById('loucengBoxingJS2_rc');
    // const _fadeInDownWarn_rc = document.getElementById('loucengBoxingJS_rc');
    // const _lcse = document.getElementById('lcChoose_js');
    // const _lcse2 = document.getElementById('lcChoose_js2');
    // _fadeInDownWarn.addEventListener('click',() =>{
    //   event.stopPropagation()
    // })
    // _fadeInDownWarn2.addEventListener('click',() =>{
    //   event.stopPropagation()
    // })
    // _fadeInDownWarn2_rc.addEventListener('click',() =>{
    //   event.stopPropagation()
    // })
    // _fadeInDownWarn_rc.addEventListener('click',() =>{
    //   event.stopPropagation()
    // })
    // _lcse.addEventListener('click',() =>{
    //   event.stopPropagation()
    // })
    // _lcse2.addEventListener('click',() =>{
    //   event.stopPropagation()
    // })
    this.adjustyViewportWt()
    setTimeout(() => {
      this.openDebugger()
    }, 1000)
    this.setMainWrapperHeight()
  },
	methods: {
    // 活动当前路由
    getCurrentPath() {
      const currentPath = this.$route.path;
      return this.correctionSameFlag(currentPath)
    },
    // 矫正和后端字符不一致
    correctionSameFlag (curPath) {
      // 设备列表页面（正常只会在安防、机电、环境3个页面出现，但是为了灵活兼容，其余页面也做了兼容处理）
      switch (curPath) {
        case '/security':
          return 'security'
        case '/electrical':
          return 'electrical'
        case '/environment':
          return 'environment'
        case '/energy':
          return 'energy'
        case '/situation':
          return 'situation'
        default:
          return curPath
      }
    },
    // 悬浮菜单查询
    queryBottomMenus () {
      return new Promise((resolve, reject) => {
        this.$axios.post('/api/bim/getPageList', {}).then(({data}) => {
          console.log(data, 'menus data')
          if (data.status) {
            this.setFloatMenusArr = data.data || []
            this.$store.dispatch('setFloatMenus', {floatMenus: data.data})
            this.autoCalcMenuStyle(data.data.length)
            resolve(data.data)
          } else {
            this.setFloatMenusArr =  []
            console.log('query data failed')
            resolve([])
          }
        }).catch(e => {
          console.log(e)
        })
      })
    },
    autoCalcMenuStyle (length) {
      const odv = document.getElementById('floatMenu_J')
      // 中心圆菜单必须有，其余菜单动态，然后再合并计算总宽度
      const oW = (50 + 20) * (length - 2) + (90 + 20) + 50 * 1
      odv.style.width = oW + 'px'
      odv.style.marginLeft = (-oW/2) + 'px'
    },
    clickHeader () {
      this.show_status = false
    },
    watchRoute () {
      let _urlPathName = this.$route.name
      this.isCurIndex = _urlPathName
    },
    handleClick(tab) {
      // 每次点击tab菜单栏，pageIndex_AlarmList重置为从第一页开始查询
      this.pageIndex_AlarmList = 1
      this.totalPage_AlarmList = 1
      this.currentPage_AlarmList = 0
      this.getAlarmList()
    },
    scrollEvent () {
      this.pageIndex_AlarmList = this.pageIndex_AlarmList + 1
      if (this.currentPage_AlarmList >= this.totalPage_AlarmList) {
        return false
      } else {
        this.getAlarmList()
      }
    },
    getAlarmList () {
      this.$axios.post('/api/digital/getAlarmList', {
        type: (this.activeNameApp == null || this.activeNameApp == 0) ? '' : this.activeNameApp,
        pageIndex: this.pageIndex_AlarmList - 1,
        pageLength: this.pageSize_AlarmList,
      }).then(({data}) => {
        if (data.status) {
          this.alarmListData = data.data
          this.totalPage_AlarmList = data.totalPage // 总共多少页
          this.currentPage_AlarmList = data.currentPage + 1 // 总共多少页
        } else {
          console.log('query data failed')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getAlarmTypeCount () {
      this.$axios.post('/api/digital/getAlarmTypeCount', {
        "processStatus": "2"
      }).then(({data}) => {
        if (data.code == 200) {
          this.alarmTotalCount = data.data.totalCount
          data.data.list.forEach(v => this.alarmTotalResult[v.typeCode] = v.count)
        } else {
          console.log('query data failed')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    setMainWrapperHeight () {
      this.$nextTick(() => {
        // 设置页面的宽度为浏览器可视区域的高度
        let _browserHeight =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let _omainWrapper = document.querySelector('.mainWrapper')
        /**
         * [要求：按1080p全屏的]
         * 由于1080高度的分辨率的浏览器，导航栏+地址栏+工具栏等的高度会占据111px的高度，所剩余只有969px
         * 但是最终嵌入到终端设备是没有导航栏+地址栏+工具栏等的高度的。
         * 所以判断一下，当可视区域高度：小于的1080-111 = 969时候，再减去头部导航60，等于909px，.mainWrapper主体内容最小高度需要加上111px的高度=1020高度
         */
        try{
          if (_browserHeight <= 969) {
            _omainWrapper.style.minHeight = 1020 + 'px'
          } else {
            _omainWrapper.style.minHeight = (_browserHeight - 60) + 'px' // 主体内容高度 = 浏览器可视区域高 - 顶部导航菜单
          }
        }catch(e){
          console.log(e)
        }
      })
    },
    openDebugger () {
      this.$notify({
        title: 'Device Debugger Information',
        customClass: 'debuggerDialogbox',
        dangerouslyUseHTMLString: true,
        message: `<span>Resolution ratio width: ${this.winWidth}px</span><br/>
                  <span>Resolution ratio height: ${this.winHeight}px</span><br/>
                  <span>Browser viewport width: ${this.browserWidth}px</span><br/>
                  <span>Browser viewport height: ${this.browserHeight}px</span>`
      });
    },
    handleEachLayer (num, i) {
      this.layerIndex = i
      setTimeout(() => {
        this.hadHoveredq2 = false
      }, 500)
      window.ue.web.js_call_ue("楼层抽屉", num)
    },
    handleEachLayer_rc (num, i) {
      this.cur_rcValue = num
      this.layerIndex_rc = i
      this.cclickIndex = null
      this.dialogVisible = true
    },
    // 兼容部分设备宽度1440px分辨率不足，导致横向浏览器问题
    adjustyViewportWt () {
      try {
        // 屏幕分辨率的宽
        this.winWidth = window.screen.width
        // 屏幕分辨率的高
        this.winHeight = window.screen.height
        let _odlist = document.querySelectorAll('.indexBox')
        // _odlist[0].style.minWidth = this.winWidth + 'px'
        _odlist[0].style.minWidth = '100%!important'
        if (this.winWidth < 1360) {
          // 最小分辨率宽度必须大于等于底部悬浮菜单块长度
          _odlist[0].style.minWidth = '1360px'
        }
        console.log(`屏幕分辨率宽 ${this.winWidth}px`)
        console.log(`屏幕分辨率高 ${this.winHeight}px`)
        // 获取浏览器可视区域宽高（兼容性比较好，不包括工具栏和滚动条）
        this.browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        console.log(`浏览器可视区域宽 ${this.browserWidth}px`)
        console.log(`浏览器可视区域高 ${this.browserHeight}px`)
      } catch(e){
        console.log(e)
      }
    },
    getTime() {
      setInterval(() => {
          let dateOne ="星期"+"天一二三四五六".charAt(new Date().getDay());
          document.getElementById("date_1").innerHTML = dateOne;
          let date = new Date();//如果date为13位不需要乘1000
          let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
          let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
          let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
          this.nowTime = h + m + s
      }, 1000)
    },
    clickMessage () {
      this.clickCount = this.clickCount + 1
      if (this.clickCount % 2 == 1) {
        this.show_status = true
        this.getAlarmList()
      } else {
        this.show_status = false
      }
    },
		goto (path) {
      this.isCurIndex = path
			this.$router.push({ path })
      this.$store.dispatch('changedTwoSideMenu', {openOrFold: true})
      switch (path) {
        case 'index':
          window.ue.web.js_call_ue('点击菜单栏', '区位')
          break;
        case 'situation':
          window.ue.web.js_call_ue('点击菜单栏', '态势')
          break;
        case 'environment':
          window.ue.web.js_call_ue('点击菜单栏', '环境')
          break;
        case 'electrical':
          window.ue.web.js_call_ue('点击菜单栏', '机电')
          break;
        case 'instrument':
          window.ue.web.js_call_ue('点击菜单栏', '仪器')
          break;
        case 'energy':
          window.ue.web.js_call_ue('点击菜单栏', '能效')
          break;
        case 'security':
          window.ue.web.js_call_ue('点击菜单栏', '安防')
          break;
        case 'business':
          window.ue.web.js_call_ue('点击菜单栏', '运维')
          break;
        case 'robot':
          window.ue.web.js_call_ue('点击菜单栏', '机器人')
          break;
        case 'global':
          window.ue.web.js_call_ue('点击菜单栏', '全局')
          break;
        case 'structure':
          window.ue.web.js_call_ue('点击菜单栏', '结构')
          break;
      }
		},
    clickTo (path) {
      this.isCurIndex = path
      this.$store.dispatch('changedTwoSideMenu', {openOrFold: false})
      switch (path) {
        case 'daolan':
          window.ue.web.js_call_ue('点击菜单栏', '导览')
          break;
        case 'inspection':
          window.ue.web.js_call_ue('点击菜单栏', '巡检')
          break;
        case 'peoples':
          window.ue.web.js_call_ue('点击菜单栏', '人员')
          break;
      }
		},
    clickCt (d) {
      this.isCur = d
      switch (d) {
        case 'N':
          window.ue.web.js_call_ue('点击角度', '北')
          break;
        case 'E':
          window.ue.web.js_call_ue('点击角度', '东')
          break;
        case 'S':
          window.ue.web.js_call_ue('点击角度', '南')
          break;
        case 'W':
          window.ue.web.js_call_ue('点击角度', '西')
          break;
        case 'C':
          window.ue.web.js_call_ue('点击角度', '俯')
          break;
      }
		},
    handleCloseLayer () {
      this.cclickIndex = null
      this.dialogVisible = false
      window.ue.web.js_call_ue('退出漫游', 'null')
    },
    handleChooseLayer (index, id) {
      this.cclickIndex = index
      setTimeout(() => {
        this.dialogVisible = false
      }, 300)
      window.ue.web.js_call_ue(this.cur_rcValue == '1' ? '第一人称漫游' : '第三人称漫游', id)
    },
    showDigitalGo () {
      this.hadHoveredq2_rc = true
    },
    showllayer () {
      this.hadHoveredq2 = true
    },
    RoomChoose(room) {
      this.cclickIndex = null
      this.dialogVisibleNearby = true
      this.handleSpreadByHome(true)
      if (room.length == 1) {
        this.nearbyLayer=[
          {
            label: '继续漫游',
            id: '继续漫游'
          },
          {
            label: room[0],
            id: room[0]
          }
        ]
      } else {
        this.nearbyLayer=[
          {
            label: '继续漫游',
            id: '继续漫游'
          },
          {
            label: room[0],
            id: room[0]
          },
          {
            label: room[1],
            id: room[1]
          }
        ]
      }
      
    },
    handleSpreadByHome(v) {
      v ? window.ue.web.js_call_ue('是否分房间漫游', 'true') : window.ue.web.js_call_ue('是否分房间漫游', 'false')
    },
    handleCloseLayerNearby () {
      this.cclickIndex = null
      this.dialogVisibleNearby = false
      window.ue.web.js_call_ue('退出漫游', 'null')
    },
    handleChooseLayerNearby (index, id) {
      this.cclickIndex = index
      if (id == '继续漫游') {
        setTimeout(() => {
          this.dialogVisibleNearby = false
        }, 300)
        window.ue.web.js_call_ue('继续漫游', 'null')
      } else {
        setTimeout(() => {
          this.dialogVisibleNearby = false
        }, 300)
        window.ue.web.js_call_ue('房间漫游', id)
      }
    },
    FloorRoamEnd() {
      this.cclickIndex = null
      this.dialogVisibleAnother_temp = true
      this.handleSpreadByHome(true)
    },
    handleCloseLayerAnother () {
      this.cclickIndex = null
      this.dialogVisibleAnother_temp = false
      window.ue.web.js_call_ue('退出漫游', 'null')
    },
    handleChooseLayerAnother (index, id) {
      this.cclickIndex = index
      if (id == '继续漫游') {
        setTimeout(() => {
          this.dialogVisibleAnother_temp = false
        }, 300)
        window.ue.web.js_call_ue('重新漫游', 'null')
      } else {
        this.dialogVisibleAnother_temp = false
        this.cclickIndex = null
        this.dialogVisible = true
      }
    },
    handleBTM (e, type) {
      // window.ue.web.js_call_ue("设备显隐",`{"shebei": ${type}, "state":${e}}`)
      window.ue.web.js_call_ue("设备显隐", JSON.stringify({ "shebei": type, "state": e }))
    },
    LayerChoose (state) {
      this.swValue = state.jichu
      this.swValue2 = state.tianhuaban
      this.swValue3 = state.jiaju
      this.swValue4 = state.nuantong
      this.swValue5 = state.qilu
    },
    // 天气控制
    handleWeather () {
      window.ue.web.js_call_ue("天气控制", 'null')
    },
    // ue模拟天气调用此函数
    weatherController (opt) {
      /**
       * state: true/false
       * wea_img: xue|lei|shachen|wu|bingbao|yun|yu|yin|qing
       * tem: 气温度数
       * wea: 天气对应中文描述
       * 参数示例：opt = {state: true, wea_img: 'yun', tem: 20, wea: '多云'}
       */
      if (opt.state) {
        this.queryWeatherInfos()
      } else {
        this.weatherInfos = {
          wea: opt.wea,
          tem: opt.tem + '度',
          wea_img: opt.wea_img,
        }
      }
    },
    handleCloseWarn () {
      this.visibleWarn = false
    },
    showVisibleWarn (id) {
      // this.visibleWarn = true
      console.log('报警设备ID：', id)
      window.ue.web.js_call_ue("报警", id)
      setTimeout(() => {
        this.show_status = false
      }, 800)
    },
    closeEachVisibleWarn () {
      this.visibleWarn = false
      window.ue.web.js_call_ue("首页报警弹窗关闭", 'null')
    },
    queryWeatherInfos () {
      this.$axios.get('/openapi/system/getLocalWeather').then(({data}) => {
        if (data.code == 200) {
          this.weatherInfos = {
            wea: data.data.wea,
            tem: data.data.tem + '度',
            wea_img: data.data.wea_img,
          }
        }else {
          console.log('天气查询失败')
        }
      }).catch(e => {
        console.log(e)
      })
    },
	}
}
</script>

<style>
body.el-popup-parent--hidden{
  overflow: auto;
}
.eplise{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.periods2MenuEach{
  margin-right: 20px;
  display: inline-block;
  position: relative;
  width: 50px;
  height: 95px;
}
.periods2MenuEach .commstyle{
  position: absolute;
  top:0;
}
.centerBIG{
  width: 100px;
}
.periods2MenuEach:last-child{
  margin-right: 0;
}
body{
  height: 100%;
	width:100%;
  /* background: rgba(59, 66, 98, .1) url('./assets/body-bg-composed.png') no-repeat center center;
  background-size:cover; */

  /* background: url('./assets/circleShadow.png') no-repeat center center,
               url('./assets/body-bg-composed.png') no-repeat center center;
  background-size:cover, cover; */

  background: url('./assets/circleShadow.png') no-repeat center center;
  background-size:cover;

	background-attachment: fixed;
	font-size:14px;
	font-family:PingFangSC-Semibold, "Microsoft YaHei", SimHei, "微软雅黑";
  overflow-x: hidden!important;
}
*{
  margin:0;
  padding:0;
}
ul,ol{
  list-style: none;
}
/*clear fix*/
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix:before,
.clearfix:after {
  content: " ";
  display: table;
}
.clearfix:after {
  clear: both;
}
ul,ol,li{
  list-style: none;
}
.mgc{
  margin:0 auto;
}
.rela{
  position: relative;
}
.abs{
  position: absolute;
}
.fixed{
  position: fixed;
}
.txtc{
  text-align: center;
}
.textl{
  text-align: left;
}
.txtr{
  text-align: right;
}
.flex-row {
    display: flex;
    flex-direction: row;
}
.ctbox{
  box-sizing: content-box;
}
.bdbox{
  box-sizing: border-box;
}
.comBoderAndBg {
  background: rgba(5, 16, 60, 0.75);
  border-radius: 4px;
  /* border:1px solid rgba(162, 118, 254, 1); */
}
.pureSetBG {
  background: rgba(9,19,43,0.8)!important;
}
.pureSetBGUpper{
  background: rgba(9,19,43,0.4)!important;
}
.eachCardBox {
  margin-bottom: 10px;
}
/*ring percent style*/

.ring-chart {
	--ring-size: 109;
	--ring-stroke-width: 14;
	--ring-percent: 0;
	/* --ring-color: lightblue; */
  --ring-color: #7592FE;

	width: calc(1px * var(--ring-size));
	height: calc(1px * var(--ring-size));
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;

  margin-top:11px;
  margin-left: 11px;
}

.ring-chart::before {
	box-sizing: border-box;
	content: '';
	border: calc(1px * var(--ring-stroke-width)) solid #244966; /*环底色*/
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 50%;
	z-index: -1;
}

.ring-chart::after {
	counter-reset: ring-percent var(--ring-percent);
	content: counter(ring-percent)'%';
	font: bold 25px sans-serif;
  color: #32C5FF;
	margin-bottom: 10px;
}

.ring-chart svg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  transform: rotate(-90deg);
  position: absolute;
  top: 0;
  left: 0;
}

.ring-chart circle {
  fill: none;
  stroke-width: calc(1px * (var(--ring-stroke-width) * 2) / (var(--ring-size) / 100));
  stroke: #6f7bf2!important;
  stroke-dasharray: 314;
  stroke-dashoffset: calc(314px * ((100 - var(--ring-percent)) / 100));
}
.pointer{
	cursor: pointer;
}
.needHide{
  display: none!important;
}
.cmABSMenu_inclueHideElement{
  height:111px!important;
}
.dzDialogStyle_warn{
  width: 520px!important;
  height: 485px!important;
  background: rgba(9,19,43,.61)!important;
  border-radius: 4px;
  border: 1px solid rgba(117,146,254,.39);
}
.wnlistbox{
  background: #2a3042;
  border-radius: 4px;
  padding: 10px;
}
.wnlistbox .eechli{
  border-bottom: 1px solid #202438;
  height: 30px;
  line-height: 30px;
  width:48%;
  margin-top:3px;
  font-size: 13px;
}
.wnlistbox .eechli:nth-child(even){
  float: right;
}
.nesname{
  color: #fff;
  padding-left: 8px;
  display: inline-block;
  padding-right: 10px;
  width:78px;
  box-sizing: border-box;
}
.wnlistbox .cm_daoTriangle_bg{
  top:3px;
}
.itnes{
  color: #5593bd;
  display: inline-block;
  width:calc(100% - 78px);
}
</style>
<style>
.indexBox .topheaderBox{
  width: calc(100% - 20px);
  height: 66px;
  /* background-image: url('./assets/topBg-left.png') no-repeat left top; */
  /* background-image: url('./assets/topBg-left.png'),
                    url('./assets/topBg-right.png'),
                    url('./assets/repeatLine.png');
  background-repeat: no-repeat, no-repeat, repeat-x;
  background-position: left top, right top, left top; */
}
.topperHeader{
  margin-bottom: 10px;
}
.headerbox{
  width:100%;
  height: 50px;
  text-align: center;
}
.headerbox .repeatXBg{
  height: 10px;
  width: 100%;
  background: url('./assets/sk.png') #1c2b52 no-repeat center bottom;
}
.repeatXBg::after{
  content: ' ';
  display: inline-block;
  height: 1px;
  width: calc((100% - 799px) / 2);
  background: #6b9bfe;
  position: absolute;
  top:10px;
  left: 0;
  z-index: 1;
}
.repeatXBg::before{
  content: ' ';
  display: inline-block;
  height: 1px;
  width: calc((100% - 799px) / 2);
  background: #6b9bfe;
  position: absolute;
  top:10px;
  right: 0;
  z-index: 1;
}
.headerbox img{
  height: 100%;
  width:836px;
  max-height: 40px;
}
.headerbox .headerTitle {
  width:100%;
  height: 50px;
  top:0;
  line-height: 50px;
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  color: #32C5FF;
  font-family: PingFangSC-Semibold;
}
.logobox{
  /* width:13.9%; */
  width:18%;
  max-width:270px;
  height: 32px;
  bottom: 0;
  left: 10px;
}
.logobox .shlogo{
  width:127px;
  height:32px;
}
.logobox .shlogo img{
  width:125px;
  height:32px;
}
.logoDate{
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fff;
  margin-top:10px;
  margin-left: 10px;
}
.logoDate i{
  font-style: normal;
}
.userRight{
  max-width:300px;
  height: 32px;
  bottom:0;
  right: 10px;
  color: #fff;
}
.userRight .loginName{
  text-indent: 5px;
}
.userRight .loginName span{
  display: inline-block;
  width: 60px;
}
.userRight p{
  font-weight: 600;
  font-size: 12px;
font-family: PingFangSC-Semibold,  SC;
margin-top:10px;

}
.userRight .fl.ssImg{
  height: 32px;
}
.userRight .fl img{
  margin-top:2px;
  width:28px;
  height: 28px;
}
.leftMain{
  width:520px;
  margin-left: 10px;
  max-height: 930px;
}
.rightMain {
  width:520px;
  margin-right:10px;
  max-height: 930px;
}
.indexBox{
  /* min-width:1440px; */
  width:100%!important;
}
.mainWrapper{
  min-height: 1050px; /*主兼容1920*1080尺寸*/
}
</style>
<style>
/*2个小控制菜单*/
@-webkit-keyframes smallMenuFade {
	0% {
		opacity: 0;
	}
	50% {
		/* opacity: 0.5; */
		/* transform: translate(279px); */
	}
	100% {
		opacity: 1;
		/* transform: translate(-110px); */
	}
}
@keyframes smallMenuFade {
	0% {
		opacity: 0;
	}
	50% {
		/* opacity: 0.5; */
		/* transform: translate(279px); */
	}
	100% {
		opacity: 1;
		/* transform: translate(-110px); */
	}
}
@-webkit-keyframes smallMenuFadeOut {
	0% {
		opacity: 1;
	}
	50% {
		/* opacity: 0.5; */
		/* transform: translate(279px); */
	}
	100% {
		opacity: 0;
		/* transform: translate(-110px); */
	}
}
@keyframes smallMenuFadeOut {
	0% {
		opacity: 1;
	}
	50% {
		/* opacity: 0.5; */
		/* transform: translate(279px); */
	}
	100% {
		opacity: 0;
		/* transform: translate(-110px); */
	}
}
/*left 反*/
@-webkit-keyframes fadeInRight {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
		/* transform: translate(279px); */
	}
	100% {
		opacity: 0;
		transform: translate(558px);
	}
}
@keyframes fadeInRight {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
		/* transform: translate(279px); */
	}
	100% {
		opacity: 0;
		transform: translate(558px);
	}
}
@-webkit-keyframes fadeInLeft {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
		/* transform: translate(-260px); */
	}
	100% {
		opacity: 0;
		transform: translate(-520px);
	}
}
@keyframes fadeInLeft {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
		/* transform: translate(-260px); */
	}
	100% {
		opacity: 0;
		transform: translate(-520px);
	}
}

@-webkit-keyframes slideInRight {
	0% {
	-webkit-transform:translate3d(100%,0,0);
	transform:translate3d(100%,0,0);
	visibility:visible
}
to {
	-webkit-transform:translateZ(0);
	transform:translateZ(0)
}
}
@keyframes slideInRight {
	0% {
	-webkit-transform:translate3d(100%,0,0);
	transform:translate3d(100%,0,0);
	visibility:visible
}
to {
	-webkit-transform:translateZ(0);
	transform:translateZ(0)
}
}
@-webkit-keyframes slideInLeft {
	0% {
	-webkit-transform:translate3d(-100%,0,0);
	transform:translate3d(-100%,0,0);
	visibility:visible
}
to {
	-webkit-transform:translateZ(0);
	transform:translateZ(0)
}
}
@keyframes slideInLeft {
	0% {
	-webkit-transform:translate3d(-100%,0,0);
	transform:translate3d(-100%,0,0);
	visibility:visible
}
to {
	-webkit-transform:translateZ(0);
	transform:translateZ(0)
}
}
.animate__animated {
	-webkit-animation-duration:2s;
	animation-duration:2s;
	-webkit-animation-duration:var(--animate-duration);
	animation-duration:var(--animate-duration);
	-webkit-animation-fill-mode:both;
	animation-fill-mode:both
}
.animate__slideInLeft {
	-webkit-animation-name:slideInLeft;
	animation-name:slideInLeft
}
.animate__slideInRight {
	-webkit-animation-name:slideInRight;
	animation-name:slideInRight
}
.animate__fadeInRight {
	-webkit-animation-name:fadeInRight;
	animation-name:fadeInRight
}
.animate__fadeInLeft {
	-webkit-animation-name:fadeInLeft;
	animation-name:fadeInLeft
}
.animate__smallMenuFade {
	-webkit-animation-name:smallMenuFade;
	animation-name:smallMenuFade
}
.animate__smallMenuFadeOut {
	-webkit-animation-name:smallMenuFadeOut;
	animation-name:smallMenuFadeOut
}
:root {
	--animate-duration: 1s;
	--animate-delay: 1s;
	--animate-repeat: 1
}
</style>
<style>
/*bottom menu*/
.bottomMenuBox{
  width:1360px;
  bottom:15px;
  left:50%;
  margin-left: -680px;
}
/* .bottomMenuBoxNewVersion{
  width:440px;
  bottom:27px;
  left:50%;
  margin-left: -220px;
} */
.bottomMenuBox .commstyle{
  width:50px;
  height: 50px;
  cursor: pointer;
  background-color: rgba(9,19,43,.8);
  border-radius: 100%;
  margin-right: 40px;
  margin-top:20px;
}
.bottomMenuBox .isCenter{
  width:100px;
  height: 100px;
  cursor: pointer;
  border-radius: 100%;
  margin-right: 40px;
}
.commstyle .btmMenuTxt{
  font-size: 12px;
  bottom: -26px;
  left: 0;
  color: #fff;
  width: 100%;
  text-align: center;
}
.bottomMenuBox .commstyle:last-child{
  margin-right: 0;
}
.bottomMenuBox .commstyle .inImg{
  height:24px;
  width:24px;
  position: absolute;
  top:50%;
  left:50%;
  margin-left: -12px;
  margin-top: -12px;
}
.bottomMenuBox .isCenter .inImg{
  height:100px;
  width:100px;
  position: absolute;
  top:50%;
  left:50%;
  margin-left: -50px;
  margin-top: -50px;
}
.bottomMenuBox .commstyle .inImg img{
  height: 100%;
  width:100%;
}
.bottomMenuBox .isCenter .inImg img{
  height: 100%;
  width:100%;
}
.isCenter span{
  position: absolute;
  font-size: 13px;
  color: #fff;
}
.isCenter .centerBtn{
  width:55px;
  height: 55px;
  border-radius:100%;
  top:23px;
  left:22px;
  text-align: center;
  line-height: 55px;
}
.isCenter span:nth-of-type(1){
  top:5px;
  right: 25px;
  padding: 0 20px;
}
.isCenter span:nth-of-type(2){
  right: 7px;
  top:20px;
  padding: 20px 0;
}
.isCenter span:nth-of-type(3){
  bottom: 3px;
  right:25px;
  padding: 0 20px;
}
.isCenter span:nth-of-type(4){
  left: 6px;
  top:23px;
  padding: 20px 0;
}
.isCenter span.curColr{
  color: #32C5FF;
}
.bottomMenuBox .curBGcolor{
  background-color: rgba(0,145,255,.8);
}
</style>
<!--公共组件-->
<style lang="less" id="sd090">
/* 公共标题竖向平行四边形 */
.cm_verticalTitle_icon{
  height: 22px;
  width: 6px;
  background-color: #00CCFFFF;
  position: relative;
  display: inline-block;
}
.cm_verticalTitle_icon::before{
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 3px 0 0 6px;
  border-color: transparent transparent transparent #00ccff;
  position: absolute;
  top:-3px;
  left: 0;
}
.cm_verticalTitle_icon::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 6px 3px 0;
  border-color: transparent #00ccff transparent transparent;
  position: absolute;
  bottom:-3px;
  left: 0;
}
/* 公共倒三角背景 */
.cm_daoTriangle_bg{
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 9px 5px 0 0;
  border-color: #00ccff transparent transparent transparent;
}
/* 公共倒三角(等腰)背景 */
.cm_daoTriangleDengYao_bg{
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 0;
  border-color: #00ccff transparent transparent transparent;
}
/* 压强转表盘 */
.blockColor{
  position: absolute;
  width: 50%;
  height: 50%;
}
.yi{
  top: 0;
  left: 0;
  background-color: #FF6F6FFF;
  border-radius: 100% 0 0 0;
}
.er{
  top: 0;
  right: 0;
  background-color: #FD9544FF;
  border-radius: 0 100% 0 0;
}
.san{
  bottom: 0;
  right: 0;
  background-color: #32C5FFFF;
  border-radius: 0 0 100% 0;
}
.si{
  bottom: 0;
  left: 0;
  background-color: #2d4863;
  border-radius: 0 0 0 100%;
}
.speedbox{
  position: relative;
  height: 80px;
  width: 80px;
  transform: rotate(-45deg);
}
.cm_speedNeedle_box{
  height: 80px;
  width: 80px;
  position: relative;
}
.needlebox{
  background-color: #283149;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  position: absolute;
  top:10px;
  left: 10px;
}
.needleIconComm {
  height: 23px;
  width:6px;
  position: relative;
  left: 50%;
  margin-left:-3px;
  margin-top:5px;
  transform-origin:3px 23px;
}
.needleIcon::before {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 3px 23px 3px;
  border-color: transparent transparent #00ccff transparent;
  position: absolute;
  top:0;
  left: 0;
}
.needleIcon::after {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #00ccff;
  position: absolute;
  bottom:-4px;
  left: 0;
}
/*单个动画体：instrumentpanel animate*/
// .needleIcon{
//   animation: dialSpin 2s forwards;
// }
// @keyframes dialSpin {
//   0% {
//     transform: rotate(-135deg);
//     }
//   100% {
//       transform: rotate(135deg);
//   }
// }
</style>
<style>
/**综合安防右侧公共3个页面菜单组件样式 */
.toToufu li{
  width:110px;
  height: 40px;
  font-weight: 500;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 40px;
  background: #09132B66;
  border-radius: 4px;
  margin-left: 11px;
  border: 1px solid rgba(9,19,43,0.4000);
  box-sizing: border-box;
  margin-bottom:10px;
  cursor: pointer;
}
.toToufu li:hover{
  border: 1px solid #32C5FF;
  color: #32C5FF;
}
.toSearch{
  background: #09132B99;
  top:267px;
  left: -10px;
  width:520px;
  height: 60px;
}
.toSearch .el-input{
  width:405px;
  margin-left:10px;
  margin-top:10px;
}
.toSearch .el-input .el-input__inner{
  border-top-right-radius:0;
  border-bottom-right-radius:0;
  border:none;
}
.toSearch .el-button--primary{
  width:95px;
  border-top-left-radius:0;
  border-bottom-left-radius:0;
  background: #0091FFFF;
  margin-top:10px;
}
.toTable .el-table__row{
  background: #222c44;
  color: #fff;
  font-size: 13px;
}
.toTable .el-table tbody tr:hover>td { 
     background: none!important;
  }
.toTable .el-table__body tr.current-row>td.el-table__cell{
     background: none!important;
}
.toTable .el-table__header-wrapper .cell{
  color:#00CCFFFF;
}
.toTable .el-table__header thead tr th{
  background:#16203a;
}
.toTable .el-table td.el-table__cell, .toTable .el-table th.el-table__cell.is-leaf{
  border-color:#1d263e!important;
}
.toTable .el-pager li{
  padding: 0 10px;
}
.toTable .el-pagination--small{
  margin-top:17px;
}
.toTable .btn-prev,.toTable .el-pager li,.toTable .btn-next{
  background: none!important;
  color: #fff!important;
}
.toTable .el-pager li.active{
  color: #409eff!important;
}
.toTable .el-pagination__total{
  color: #fff;
}
.toTable .el-table:before{
  background: none!important;
}
</style>
<style>
.parkAndvedioMonBoxL_v2{
  height: 470px!important;
  width:70px!important;
}
.parkAndvedioMonBoxL_v2 .elevatorMenuBox .el-tabs__item.is-active{
  width:auto!important;
}
.parkAndvedioMonBoxL_v2 .el-tabs__item{
  padding: 0!important;
}
.parkAndvedioMonBoxLv2{
  width:118px;
  /* height: 470px; */
  border-right: none!important;
  border-radius: 4px 0px 0px 4px;
}
.cmABSMenuv2{
  border-right: none!important;
}
</style>
<style>
/*公共顶部hover消息盒子*/
.messageBox{
  width:570px;
  padding: 16px 10px;
  background: #1f2947;
  border-radius:5px;
  position: absolute;
  top:60px;
  right:10px;
  display: none;
}
.messageBox::after{
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 10px 8px;
  border-color: transparent transparent #1f2947 transparent;
  position: absolute;
  top: -10px;
  right:92px;
}
.messageBox .el-tabs--card>.el-tabs__header{
  border-bottom: 1px solid #476185;
  background: #1f2947;
}
.messageBox .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: none;
}
.messageBox .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border: none!important;
  background: #32C5FF!important;
}
.messageBox .el-tabs__item.is-active{
  color: #fff!important;
}
.messageBox .el-tabs--card>.el-tabs__header .el-tabs__item{
  border: none;
  border-bottom: 1px solid #476185;
}
.messageBox .el-tabs__item{
  color: #fff;
  background: #121b35;
  margin-right:10px;
  border-top-right-radius:5px;
  border-top-left-radius:5px;
}
.animate__fadeInDownBig {
	-webkit-animation-name:fadeInDownBig;
	animation-name:fadeInDownBig;
  display:block;
}
@keyframes fadeInDownBig {
	0% {
	opacity:0;
	-webkit-transform:translate3d(0,-2000px,0);
	transform:translate3d(0,-2000px,0)
}
to {
	opacity:1;
	-webkit-transform:translateZ(0);
	transform:translateZ(0)
}
}
.mgbList li{
  color: #fff;
  background: #17203a;
  border: 1px solid #17203a;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
.mgbList .emptyDataH3{
  color: #fff;
  line-height: 200px;
  text-align: center;
  font-weight: normal;
}
.mgbList li:hover{
  border: 1px solid #32C5FF;
}
.mgbList li h3{
  border-bottom: 1px solid #32C5FFFF;
  padding-bottom: 8px;
  font-size: 14px;
}
.mgbList li h3 span{
  color: #32C5FFFF;
}
.mgbList li h3 i{
  font-style: normal;
  font-size: 13px;
}
.mgbList li p{
  padding-top: 13px;
}
.mgbList li p i{
  padding-top: 13px;
  font-style: normal;
}
.mgbList li p span{
  padding-right: 15px;
}
.mgbList ul{
  height: 600px;
  overflow-y: scroll;
}
.mgbMenu{
  position: relative;
}
.sct{
  position: absolute;
  top:-5px;
  background: red;
  padding:0 5px;
  display: inline-block;
  z-index: 100;
  font-size: 12px;
  color: #fff;
  text-align: center;
  font-style: normal;
  border-radius: 10px;
}
.sct1{
  left: 80px;
}
.sct2{
  left: 190px;
}
.sct3{
  left: 290px;
}
.sct4{
  left: 400px;
}
.sct5{
  left: 504px;
}
.spiderbox{
  /* height:225px; */
  height:34px;
  width:373px;
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 10px;
}
.spdr1{
  height:225px;width:110px;
  position: relative;
  font-size: 12px;
}
.spdr1menu,.spdr2,.spdr3,.spdr4{
  background: #19203a;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  font-size: 12px;
}
.switchBoxing{
  position: fixed;
  bottom: 0;
  left: 292px;
  z-index: 100;
}
.spdr2,.spdr3,.spdr4{
  height:34px;width:80px;
  /* margin-top: 191px; */
  line-height: 38px;
  color: #fff;
  text-align: center;
  margin-left: 6px;
}
.spdr1close{
  background: #0091FFFF;
  height: 25px;
  text-align: right;
  width:100%;
  line-height: 25px;
  border-radius: 5px 5px 0 0;
}
.spdr1close i{
  margin-right: 6px;
  cursor: pointer;
  color: #fff;
}
.spdr1menu{
  height: 34px;
  line-height: 38px;
  text-align: right;
  width:100%;
  color: #fff;
  text-align: center;
}
</style>
<style>
/**底部fix菜单 */
.spdr1Btns{
  position: fixed;
  bottom: 31px;
  left:10px;
}
.cmABSMenu2new{
  width:110px;
  height: 170px;
  font-size: 12px;
  color: #fff;
  border-right: none;
  background: #19203a;
}
.cmABSMenu2new li{
  margin-bottom: 14px;
}
.cmABSMenu2new ul{
  height: 170px;
  padding: 8px 6px 8px 9px;
  border-radius: 0;
}
.cmABSMenu2new li:last-child{
  margin-bottom: 0;
}
.cmABSMenu2new li div.fl{
  width:calc(100% - 30px);
  text-indent: 23px;
  height: 20px;
  font-size: 12px;
  color: #fff;
}
.cmABSMenu2new li div.fr{
  width:30px;
}
.cmABSMenu2new .ecbBase .fl{
  background: url('./assets/ic1.png') no-repeat left -2px;
  background-size: contain;
}
.cmABSMenu2new .ecbTop .fl{
  background: url('./assets/ic2.png') no-repeat left -2px;
  background-size: contain;
}
.cmABSMenu2new .ecbHome .fl{
  background: url('./assets/ic3.png') no-repeat left -2px;
  background-size: contain;
}
.cmABSMenu2new .ecbWarn .fl{
  background: url('./assets/ic4.png') no-repeat left -2px;
  background-size: contain;
}
.cmABSMenu2new .ecbGas .fl{
  background: url('./assets/ic5.png') no-repeat left -2px;
  background-size: contain;
}
@keyframes fadeInUpBig {
	0% {
	opacity:0;
	-webkit-transform:translate3d(0,2000px,0);
	transform:translate3d(0,2000px,0)
}
to {
	opacity:1;
	-webkit-transform:translateZ(0);
	transform:translateZ(0)
}
}
.animate__fadeInUpBig {
	-webkit-animation-name:fadeInUpBig;
	animation-name:fadeInUpBig
}
</style>
<style>
.el-progress-bar__outer{
  background-color: #05103CFF!important;
}
.el-progress__text{
  color: #32C5FFFF!important;
  font-size: 12px!important;
  margin-left: 15px!important;
}
.cmABSMenu .ecmns{
  height: 111px!important;
  width:34px!important;
}
.cmABSMenu .ecmns span{
  margin-top:30px;
  display: inline-block;
}
.percentVALUES{
  bottom: 65px!important;
  display: inline-block!important;
  width:88px!important;
  margin-left:-44px!important;
  left: 50%!important;
  text-align: center!important;
}
.percentVALUES i{
  font-size:36px!important;
  font-style: normal!important;
  font-weight: bold!important;
}
.percentVALUES sub{
  font-size: 14px!important;
  font-weight: bold!important;
  vertical-align: baseline!important;
}
</style>
<style>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: transparent!important;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #121b32;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #5b72ba;
}
.wnmemoGLSelect{
  width:122px;
  display: inline-block;
  margin-left: 16px;
}
.wnmemoGLSelectIn .el-select-dropdown__item.hover, .wnmemoGLSelectIn .el-select-dropdown__item:hover{
  background: #32C5FF;
}
.wnmemoGLSelectIn.el-select-dropdown{
  background-color: #0091ff;
  border: none;
  color: #fff;
  font-weight: normal!important;
}
.wnmemoGLSelectIn .el-select-dropdown__item{
  color: #fff;
  font-weight: normal!important;
}
.el-popper[x-placement^=top] .popper__arrow:after{
  border-top-color: #0091ff!important;
}
.el-popper[x-placement^=top] .popper__arrow{
  border-top-color: #0091ff!important;
}
.el-popper[x-placement^=bottom] .popper__arrow:after{
  border-bottom-color: #0091ff!important;
}
.el-popper[x-placement^=bottom] .popper__arrow{
  border-bottom-color:#0091ff!important;
}
.wnmemoboxIn .el-textarea__inner {
  background-color:#1e2334;
  border: none;
  resize: none;
  border-radius: 4px;
  height: 93px;
  color: #fff;
  font-size: 13px;
}
.wnmemoboxIn .el-button+.el-button{
  margin-left: 16px;
}
.wnmemoGLSelect .el-input__inner{
  background: #0091FF;
  border: 1px solid #0091FF;
  color: #fff;
}
.wnmemoGLSelect .el-select .el-input .el-select__caret{
  color: #fff;
}
.dzDialogHeader{
  z-index: 1!important;
}
.el-dialog__headerbtn{
  z-index: 2!important;
}
.dzDialogStyle_eqp{
  width: 520px!important;
  height: 495px!important;
  background: rgba(9,19,43,.61)!important;
  border-radius: 4px;
  border: 1px solid rgba(117,146,254,.39);
}
.dzDialogStyle_safe{
  width: 520px!important;
  height: 370px!important;
  background: rgba(9,19,43,.61)!important;
  border-radius: 4px;
  border: 1px solid rgba(117,146,254,.39);
}
.dzDialogStyle_eqpv2{
  height: 425px!important;
}
.eechliv2{
  border-bottom: 1px solid #202438;
  height: 50px;
  width: 48%;
  margin-top: 3px;
  font-size: 13px;
}
.hwcdBoxTAB .el-carousel__button{
  height: 8px;
  width: 8px;
  border-radius: 100%;
}
.hwcdBoxTAB .el-carousel__indicator.is-active button{
  /* background: #5cc9fa; */
}
.needHIDE{
  display: none!important;
}
.loucengBoxing{
  position: fixed;
  width: 80px;
  /* height: 408px; */
  background: #161d37;
  bottom: 31px;
  left: 212px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.loucengBoxing_rc{
  position: fixed;
  width: 80px;
  background: #161d37;
  bottom: 31px;
  left: 126px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.loucengBoxing,.loucengBoxing_rc li{
  text-align: center;
  padding: 3px 0;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
}
.loucengBoxing,.loucengBoxing_rc li.cur{
  color:#32C5FF;
}
.xxstm{
  width: 6px;
  height: 28px;
  background: url(./assets/mod1-bg.png) 100% no-repeat;
}
.xxstxt{
  color: #fff;
  border-bottom: 1px solid #32C5FF;
  height: 30px;
  line-height: 30px;
  width:55px;
  padding-left: 5px;
  font-weight: 500;
  text-indent: 10px;
}
.debuggerDialogbox.el-notification{
  background-color: rgba(5,16,60,.8);
  border: 1px solid #a276fe;
}
.debuggerDialogbox .el-notification__content{
  color: #fff;
  font-size: 13px;
  font-weight: normal;
}
.debuggerDialogbox .el-notification__title{
  color: #fff;
  font-size: 14px;
  font-weight: normal;
}
.el-select-dropdown__item.selected{
  color: #fff!important;
}
.toToufuEnvi li{
  font-size: 11px!important;
}
</style>
<style>
.shezhiBox .el-carousel__indicators{
  height: 24px!important;
  width:140px!important;
  top:6px!important;
  left:87%!important;
}
.shezhiBox .el-carousel__indicator--horizontal{
  padding: 0!important;
  width: 40px!important;
  display: inline-block!important;
}
.shezhiBox .el-carousel__indicator--horizontal button{
  width:40px!important;
  height: 24px!important;
  padding: 0!important;
  color: #36C3FEFF!important;
  font-size: 13px!important;
  display: inline-flex!important;
}
.shezhiBox .el-carousel__indicator--horizontal.is-active button{color: #fff!important;}
.shezhiBox .el-carousel__indicator--horizontal button::before{
  display: inline-block!important;
  height: 24px!important;
  width: 40px!important;
  background: #141d36!important;
  line-height: 24px!important;
  border-radius: 4px!important;
}
.shezhiBox .el-carousel__indicator--horizontal:nth-child(1) button::before{
  content: '用电'!important;
}
.shezhiBox .el-carousel__indicator--horizontal:nth-child(2) {
  margin: 0 8px!important;
}
.shezhiBox .el-carousel__indicator--horizontal:nth-child(2) button::before{
  content: '用水'!important;
}
.shezhiBox .el-carousel__indicator--horizontal:nth-child(3) button::before{
  content: '用气'!important;
}
.shezhiBox .el-carousel__button{
  opacity: 1!important;
}
.hideClass230803 {
  width: 910px;
  margin-left: -455px;
}
/*针对4K屏幕中央方向控制菜单按钮清晰度不够的调整*/
.forBlurFix240117 .centerBIG{
  width: 90px;
  height: 90px;
}
.forBlurFix240117 .isCenter{
  width: 90px;
  height: 90px;
}
.forBlurFix240117 .isCenter .inImg{
  width: 90px;
  height: 90px;
}
.forBlurFix240117 .isCenter .inImg{
  margin-left: -45px;
  margin-top: -45px;
}
.forBlurFix240117 .isCenter span:first-of-type{
  right:20px;
  top: 3px;
}
.forBlurFix240117 .isCenter span:nth-of-type(4){
  top:19px;
  left: 5px;
}
.forBlurFix240117 .isCenter span:nth-of-type(2){
  top:19px;
  right:6px;
}
.forBlurFix240117 .isCenter span:nth-of-type(3){
  right:20px;
  bottom: 4px;
}
</style>
