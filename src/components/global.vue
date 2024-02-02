<template>
  <div class="indexBox">
    <div class="indexBoxInner rela">
      

      <div class="mainWrapper clearfix">
        <div class="professionalBox" v-show="professionalBoxVisible">
          <h3>专业</h3>
          <ul>
            <li>
              <span>建筑</span>
              <el-switch
                @change="((e) => handleBTM(e, '建筑'))"
                :width="30"
                v-model="swValue"
                active-color="#00ccff"
                inactive-color="#dddfe6">
              </el-switch>
            </li>
            <li>
              <span>家具</span>
              <el-switch
                @change="((e) => handleBTM(e, '家具'))"
                :width="30"
                v-model="swValue2"
                active-color="#00ccff"
                inactive-color="#dddfe6">
              </el-switch>
            </li>
            <li>
              <span>暖通</span>
              <el-switch
                @change="((e) => handleBTM(e, '暖通'))"
                :width="30"
                v-model="swValue3"
                active-color="#00ccff"
                inactive-color="#dddfe6">
              </el-switch>
            </li>
            <li>
              <span>特气</span>
              <el-switch
                @change="((e) => handleBTM(e, '特气'))"
                :width="30"
                v-model="swValue4"
                active-color="#00ccff"
                inactive-color="#dddfe6">
              </el-switch>
            </li>
            <li>
              <span>给排水</span>
              <el-switch
                @change="((e) => handleBTM(e, '给排水'))"
                :width="30"
                v-model="swValue5"
                active-color="#00ccff"
                inactive-color="#dddfe6">
              </el-switch>
            </li>
            <li>
              <span>仪器</span>
              <el-switch
                @change="((e) => handleBTM(e, '仪器'))"
                :width="30"
                v-model="swValue6"
                active-color="#00ccff"
                inactive-color="#dddfe6">
              </el-switch>
            </li>
            <li>
              <span>物联</span>
              <el-switch
                @change="((e) => handleBTM(e, '物联'))"
                :width="30"
                v-model="swValue7"
                active-color="#00ccff"
                inactive-color="#dddfe6">
              </el-switch>
            </li>
          </ul>
        </div>
        
        <div class="zcarouselbox" v-show="professionalBoxVisible_right">
          <a @click="prevButton"><i class="el-icon-arrow-up"></i></a>
          <a @click="nextButton"><i class="el-icon-arrow-down"></i></a>
          <div class="mainEp">
            <ul id="mainEp_J">
              <li :class="{'cur': i == layerIndexUI}" v-for="(v, i) in elevatorMaps2" :key="i" @click="handleEachLayer(v.id, i)">{{v.label}}</li>
            </ul>
          </div>
        </div>

        <!--全局搜索框-->
        <el-button v-show="professionalBoxVisible_right" class="blobalBTN" type="primary" @click="handleGlobalReturn">返回</el-button>
        <div v-show="professionalBoxVisible_right" id="globalSearch_j" class="globalSearch">
          <div class="gsh-input clearfix rela">
            <div class="gshbg fl"></div>
            <h3 class="fl">设备列表</h3>
            <div class="gshInputbox clearfix fr">
              <el-input @focus="(getBlured = true)" v-model="gshKeyword" class="fl" clearable placeholder="请输入需要搜索的内容"></el-input>
              <el-button class="fl" type="primary" @click="onSearch" :loading="isloading">搜索</el-button>
            </div>
            <div v-show="getBlured" class="gshLine"></div>
          </div>
          <div v-show="getBlured" class="gsh-type" style="overflow-y: scroll;overflow-x:hidden;margin-top:10px;">
            <ul class="gshtypeUL clearfix">
              <li :class="{'isActived': curTag1 == ''}" class="eplise fl" title="全部设备" @click="queryRoomList('')">全部设备</li>
              <li :class="{'isActived': curTag1 == item.systemCode}" v-for="(item, index) in systemList" :key="index" @click="queryRoomList(item.systemCode)" class="eplise fl" :title="item.systemName">{{item.systemName}}</li>
            </ul>
            <div class="gshLine2"></div>
            <ul class="gshtypeUL mgtop clearfix">
              <span v-if="roomList.length == 0" style="text-align: center;line-height: 60px;color: #909399;display: inline-block;width: 100%;font-size:12px;">暂无数据</span>
              <li v-if="roomList.length > 1" :class="{'isActived': curTag2 == ''}" class="eplise fl" @click="whileClickRoom('')">全部空间</li>
              <li :class="{'isActived': curTag2 == item.spaceId}" v-for="(item, index) in roomList" @click="whileClickRoom(item.spaceId)" :key="index" class="eplise fl" :title="item.spaceName">{{item.spaceName}}</li>
            </ul>
          </div>
          <div v-show="getBlured" style="width:100%;background:#09132B;height:10px;margin-top:10px;"></div>
          <div v-show="getBlured" class="gsh-list">
            <div class="gsh-lmain">
              <ul>
                <li @click="globalLocat(item.deviceCode)" v-for="(item, index) in deviceList" :key="index">
                  <div style="color:#32C5FF;font-size:14px;padding:12px 0 8px 0;border-bottom:1px solid #32C5FF;">
                    设备编号：<span>{{item.deviceCode}}</span>
                  </div>
                  <div class="clearfix" style="color:#fff;font-size:12px;padding:10px 0 13px 0;">
                    <span class="fl eplise gshlname">名称： {{item.deviceName}}</span>
                    <span class="fl eplise gshladdr">地址：{{item.spaceName}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
          
      </div>

      <!--fixed bar Menu-->
      <div class="fixedbarMenu fixed bdbox" v-show="!vshowFlag">
        <div class="cmABSMenu cmABSMenu_inclueHideElement bdbox clearfix needHIDE">
            <div class="ecmns fr bdbox" @click="handleOpenFold('open')"><span>展开</span></div>
            <div class="ecmns fr bdbox needHide" @click="showDigitalGo">数字巡检</div>
            <div class="ecmns fr bdbox needHide" @click="handleBackHome">返回主体</div>
        </div>

        <ul class="pureIconMenu bdbox rela needHide">
          <li><img src="../assets/ic1.png"></li>
          <li><img src="../assets/ic2.png"></li>
          <li><img src="../assets/ic3.png"></li>
          <li><img src="../assets/ic4.png"></li>
          <li><img src="../assets/ic5.png"></li>
        </ul>

        <div class="pureElevatorMenu bdbox needHide">
          <p class="pureElevatorMtxt">楼层</p>
          <div class="pureElevatorMenuIn">
            <el-tabs @tab-click="handleEachLayer" tab-position="left" style="height: 200px;">
              <el-tab-pane v-for="item in elevatorMaps" :key="item.id" :label="item.label"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>

      <!--dialog(固定8个楼层)-->
      <!-- <el-dialog
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
      </el-dialog> -->

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

      
      <!-- <div v-show="vshowFlag" class="spdr3 switchBoxing" @click="handleOpenFold('close')">
      收起6
    </div>
    <div v-show="!vshowFlag" class="spdr4 switchBoxing" @click="handleOpenFold('open')">
      展开6
    </div> -->

      


    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import imgDefault from '../assets/fmenu.png'
import imgRight from '../assets/fmenu-right.png'
import imgBottom from '../assets/fmenu-btm.png'
import imgLeft from '../assets/fmenu-left.png'
import imgtop from '../assets/fmenu-top.png'
export default {
  name: 'index',
  data () {
    return {
      professionalBoxVisible_right: false,
      professionalBoxVisible: false,
      getBlured: false,
      gshKeyword: '',
      layerIndex: null,
      layerIndexUI: null,
      valueRobot1: true,
      percentage1: 0,
      percentage2: 0,
      percentage3: 0,
      percentage4: 0,
      percentage5: 0, // v2 end
      swValue3Gas: true,
      dialogVisibleAnother_gas: false, // new add
      spreadByHome: true,
      dialogVisibleAnother: false,
      cclickIndex: null,
      dialogVisibleNearby: false,
      dialogVisibleAnother_temp: false,
      hoverStatus: null,
      hoverStatus2: null,
      dialogVisible: false,
      vshowFlag: false, // 左右2侧折叠菜单默认打开
      curIMGSrc: imgDefault,
      srcMap: {
        default: imgDefault,
        right: imgRight,
        bottom: imgBottom,
        left: imgLeft,
        top: imgtop,
      },
      swValue: false,
      swValue2: false,
      swValue3: false,
      swValue4: false,
      swValue5: false,
      swValue6: false,
      swValue7: false,
      openStatus: false,
      closeStatus: false,
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
      nearbyLayer: [
        {
          label: '继续漫游',
          id: '继续漫游'
        },
        {
          label: 'F15_仪器实验室',
          id: 'F15_仪器实验室'
        },
        {
          label: 'F15_天平室',
          id: 'F15_天平室',
        }
      ],
      elevatorMaps:[
        {
          label: 'F-1',
          id: '1'
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
        }
      ],
      elevatorMaps2:[
        {
          label: '1F',
          id: '1F'
        },
        {
          label: 'MF',
          id: 'MF'
        },
        {
          label: '2F',
          id: '2F',
        },
        {
          label: '3F',
          id: '3F',
        },
        {
          label: '4F',
          id: '4F',
        },
        {
          label: 'RF',
          id: 'RF',
        },
      ],
      curTag1: '',
      curTag2: '',
      roomList: [],
      systemList: [],
      deviceList: [],
      isloading: false,
    }
  },
  created () {
    this.querySystemList()
    this.queryRoomList('')
  },
  mounted () {
    window.vue_global = this
    this.handleOpenFold('open')
    this.setMainWrapperHeight()
     document.addEventListener('click',() =>{
      this.getBlured = false
    })
    const _lcse2 = document.getElementById('globalSearch_j');
    _lcse2.addEventListener('click',() =>{
      event.stopPropagation()
    })
    if (this.$store.state.twosidemenu.openOrfold == true) {
      this.professionalBoxVisible_right = true
      this.professionalBoxVisible = true
    }
  },
  watch: {
    '$store.state.twosidemenu.openOrfold' () {
      if (this.$store.state.twosidemenu.openOrfold == false) {
        this.professionalBoxVisible_right = false
        this.professionalBoxVisible = false
      } else {
        this.professionalBoxVisible_right = true
        this.professionalBoxVisible = true
      }
    }
  },
  methods: {
    // 查询大分类(系统类型)
    querySystemList () {
      let _params = {
        byDevice: true,
      }
      this.$axios.post('/api/iot/system/list', _params).then(({data}) => {
        if (data.code == 200) {
          this.systemList = data.data
        } else {
          console.log('query data failed')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    whileClickRoom (spaceId) {
      this.curTag2 = spaceId

      this.queryDeviceList({
        systemCode: this.curTag1,
        spaceId: this.curTag2,
        searchKey: this.gshKeyword
      })

    },
    // 查询小分类(房间列表)
    queryRoomList (systemCode) {
      this.curTag1 = systemCode
      console.log(this.curTag1, 'curTag1')
      let _params = {
        systemCode
      }
      this.$axios.post('/api/iot/space/roomList', _params).then(({data}) => {
          if (data.code == 200) {
            this.roomList = data.data
          } else {
            console.log('query data failed')
          }
        }).catch(e => {
          console.log(e)
        })
        this.curTag2 = ''
        this.queryDeviceList({
          systemCode: this.curTag1,
          spaceId: this.curTag2,
          searchKey: this.gshKeyword
        })
    },
    // 列表查询(设备列表)
    queryDeviceList () {
      this.isloading = true
      let _params = {
        systemCode: this.curTag1,
        spaceId: this.curTag2,
        searchKey: this.gshKeyword,
      }
      this.$axios.post('/api/iot/device/list', _params).then(({data}) => {
          this.isloading = false
          if (data.code == 200) {
            this.deviceList = data.data
          } else {
            console.log('query data failed')
          }
        }).catch(e => {
          this.isloading = false
          console.log(e)
        })
    },
    handleGlobalReturn () {
      this.$router.push({ path: '/index' })
      window.ue.web.js_call_ue("返回首页", "null")
    },
    globalLocat (code) {
      console.log('设备编号：', code)
      window.ue.web.js_call_ue("定位", code)
    },
    onSearch () {
      this.getBlured = true
      this.queryDeviceList({
        systemCode: this.curTag1,
        spaceId: this.curTag2,
        searchKey: this.gshKeyword
      })
    },
    handleBTM (e, type) {
      // window.ue.web.js_call_ue("设备显隐",`{"shebei": ${type}, "state":${e}}`)
      window.ue.web.js_call_ue("设备显隐", JSON.stringify({ "major": type, "state": e }))
    },
    LayerChoose (state) {
      this.swValue = state.jianzhu
      this.swValue2 = state.jiaju
      this.swValue3 = state.nuantong
      this.swValue4 = state.teqi
      this.swValue5 = state.jipaishui
      this.swValue6 = state.yiqi
      this.swValue7 = state.wulian
    },
    LayerHide (n) {
      this.professionalBoxVisible = Boolean(n)
    },
    setMainWrapperHeight () {
      this.$nextTick(() => {
        // 设置页面的宽度为浏览器可视区域的高度
        let _browserHeight =  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        let _omainWrapper = document.querySelector('.mainWrapper')
        /**
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
    format(percentage) {
      return `${percentage}/100`;
    },
    handleCloseLayerAnother_gas () {
      this.dialogVisibleAnother_gas = false
      window.ue.web.js_call_ue("关闭设备弹窗", 'null')
    },
    handleSwitch (v, type) {
      switch (type) {
        case 'base':
          window.ue.web.js_call_ue('设备显隐', JSON.stringify({"shebei": "基础", "state": v}))
          break;
        case 'top':
          window.ue.web.js_call_ue('设备显隐', JSON.stringify({"shebei": "天花板", "state": v}))
          break;
        case 'desk':
          window.ue.web.js_call_ue('设备显隐', JSON.stringify({"shebei": "家具", "state": v}))
          break;
        case 'gas':
          window.ue.web.js_call_ue('设备显隐', JSON.stringify({"shebei": "暖通", "state": v}))
          break;
        case 'route':
          window.ue.web.js_call_ue('设备显隐', JSON.stringify({"shebei": "气路", "state": v}))
          break;
      }
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
    FloorRoamEnd() {
      this.cclickIndex = null
      this.dialogVisibleAnother_temp = true
      this.handleSpreadByHome(true)
    },
    handleEachLayer (num, i) {
      this.layerIndexUI = i
      this.moveByIndex(i)
      window.ue.web.js_call_ue("楼层抽屉", num)
    },
    prevButton () {
      this.layerIndex = this.layerIndex - 1
      if (this.layerIndex <= 0) this.layerIndex = 0
      this.moveByIndex(this.layerIndex)
    },
    nextButton () {
      this.layerIndex = this.layerIndex + 1
      if (this.layerIndex >= 5) this.layerIndex = 5
      this.moveByIndex(this.layerIndex)
    },
    // 通过当前点击的楼层索引，来位移
    moveByIndex (index) {
      let obj = document.getElementById('mainEp_J')
      let _moveNum = 0
      if (index >= 5) {
        index = 5
      }
      _moveNum = -70 * (index)
      obj.style.transform = `translateY(${_moveNum}px)`
      obj.style.transition = 'all .2s ease-in-out'
    },
    showDigitalGo () {
      // this.cclickIndex = null
      // this.dialogVisible = true
    },
    handleCloseLayer () {
      this.cclickIndex = null
      this.dialogVisible = false
      window.ue.web.js_call_ue('退出漫游', 'null')
    },
    handleCloseLayerNearby () {
      this.cclickIndex = null
      this.dialogVisibleNearby = false
      window.ue.web.js_call_ue('退出漫游', 'null')
    },
    handleCloseLayerAnother () {
      this.cclickIndex = null
      this.dialogVisibleAnother_temp = false
      window.ue.web.js_call_ue('退出漫游', 'null')
    },
    // handleChooseLayer (index, id) {
    //   this.cclickIndex = index
    //   setTimeout(() => {
    //     this.dialogVisible = false
    //   }, 300)
    //   window.ue.web.js_call_ue('楼层漫游', id)
    // },
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
    handleBackHome () {
      window.ue.web.js_call_ue('返回主体', 'null')
    },
    handleBTMenu (s) {
      window.ue.web.js_call_ue('点击菜单栏', s)
    },
    overShow1 () {
      this.hoverStatus = 1
    },
    outHide1 () {
      this.hoverStatus = 0
    },
    overShow2 () {
      this.hoverStatus2 = 1
    },
    outHide2 () {
      this.hoverStatus2 = 0
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
    switchFoldOnlyTwoSide (v) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.indexBox .topheaderBox{
  width: calc(100% - 20px);
  height: 66px;
  /* background-image: url('../assets/topBg-left.png') no-repeat left top; */
  /* background-image: url('../assets/topBg-left.png'),
                    url('../assets/topBg-right.png'),
                    url('../assets/repeatLine.png');
  background-repeat: no-repeat, no-repeat, repeat-x;
  background-position: left top, right top, left top; */
}
/*main body style*/
.businessInfo{
  padding: 10px;
  height: 260px;
  width:520px;
  /* background: url(../assets/businessInfo-bg.png) 100% no-repeat; */
}
.commonTitlebox .main1{
  width: 500px;
  height: 28px;
}
.commonTitlebox .main1 .mod1{
    width: 6px;
    height: 28px;
    background: url(../assets/mod1-bg.png) 100% no-repeat;
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
    background: url(../assets/mod2-bg.png) 100% no-repeat;
    margin: 10px 0 0 184px;
}
.commonTitlebox .main1 .mod3 {
        width: 27px;
    height: 8px;
    background: url(../assets/mod3-bg.png) 0px 0px no-repeat;
    margin: 7px 0 0 8px;
}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
.bg-ywxxIMG{
  height: 184px;
  width:184px;
}
.businessInfo-main{
  padding-top:15px;
}
.businessInfo-main .subC{
  width:190px;
  height: 40px;
}
.businessInfo-main .cd1{
  top:30px;
  left:18px;
  border-top:1px solid #111B3F;
}
.businessInfo-main .cd2{
  top:139px;
  left:18px;
  border-bottom:1px solid #111B3F;
}
.businessInfo-main .cd3{
  top:30px;
  right:18px;
  border-top:1px solid #111B3F;
}
.businessInfo-main .cd4{
  top:139px;
  right:18px;
  border-bottom:1px solid #111B3F;
}
.businessInfo-main .subC .thtxt{
  width:111px;
  height: 40px;
  color: #fff;
  line-height: 40px;
  font-size: 12px;
  font-weight: bold;
}
.businessInfo-main .cd1 .thtxt{
  background: url('../assets/lefttop-triangle.png') rgba(9, 19, 43, 0.6) no-repeat left top;
}
.businessInfo-main .cd2 .thtxt{
  background: url('../assets/leftbot-triangle.png') rgba(9, 19, 43, 0.6) no-repeat left bottom;
}
.businessInfo-main .cd3 .thtxt{
  background: url('../assets/righttop-triangle.png') rgba(9, 19, 43, 0.6) no-repeat right top;
}
.businessInfo-main .cd4 .thtxt{
  background: url('../assets/rightbot-triangle.png') rgba(9, 19, 43, 0.6) no-repeat right bottom;
}
.businessInfo-main .cd1 .thtxt,.businessInfo-main .cd2 .thtxt{
  top:0;
  left:0;
  padding-left: 6px;
}
.businessInfo-main .cd3 .thtxt,.businessInfo-main .cd4 .thtxt{
  top:0;
  right:0;
  padding-right: 6px;
}
.businessInfo-main .subC i{
  height: 10px;
  width:10px;
  border-radius: 100%;
  background: rgba(9, 19, 43, 0.6);
  display: inline-block;
}
.businessInfo-main .cd1 i{
  top:-5px;
  right: 0;
}
.businessInfo-main .cd2 i{
  bottom:-5px;
  right: 0;
}
.businessInfo-main .cd3 i{
  top:-5px;
  left: 0;
}
.businessInfo-main .cd4 i{
  bottom:-5px;
  left: 0;
}
.businessInfo-main .subC h3{
  font-size: 16px;
font-family: DFGothic-EB-WIN-RKSJ-H, DFGothic-EB-WIN-RKSJ;
font-weight: bold;
color: #32C5FF;
line-height: 40px;
}
.businessInfo-main .cd1 h3,.businessInfo-main .cd2 h3{
  top:0;
  left:121px;
}
.businessInfo-main .cd3 h3,.businessInfo-main .cd4 h3{
  top:0;
  right:121px;
}
.deviceWatch{
  padding: 10px;
  width:520px;
  height: 170px;
}
.deviceWatchv2{
  height: 390px;
}
.visitStatistic{
  padding: 10px;
  width:520px;
  height: 220px;
  margin-top: 10px;
}
.deviceWatchMain ul li{
  width:211px;
  height: 40px;
  margin-top:12px;
  padding: 10px;
  border-top: 1px solid rgba(5, 16, 60, 0.6);
  background: url('../assets/lefttop-triangle.png') rgba(9, 19, 43, 0.4) no-repeat left top;
}
.deviceWatchMain ul li:after{
  contain: ' ';
  display: inline-block;
  width:10px;
  height: 10px;
  background: rgba(5, 16, 60, 0.58);
  border-radius: 100%;
  position: absolute;
  top:-4px;
  right:-4px;
}
.deviceWatchMain ul li span{
  font-size: 12px;
font-family: SourceHanSansCN-Bold, SourceHanSansCN;
font-weight: bold;
color: #FFFFFF;
}
.deviceWatchMain ul li h3{
  font-size: 16px;
font-family: DFGothic-EB-WIN-RKSJ-H, DFGothic-EB-WIN-RKSJ;
font-weight: bold;
color: #32C5FF;
}
.visitStatistic-main .vs-ml{
  width:361px;
}
.visitStatistic-main .vs-ml .emain{
  width:115px;
  height: 80px;
}
.visitStatistic-main .vs-ml .esmall{
  width:115px;
  height: 60px;
}
.esmallbox {
  width:100%;
  width:238px;
}
.esmall .estitle {
  height: 20px;
  text-indent: 13px;
  color: #fff;
  line-height: 20px;
  font-size: 12px;
  background: url('../assets/lefttop-triangle.png') no-repeat left top;
}
.esmall .esvalue {
  height: 40px;
  color: #32C5FF;
  background: rgba(9, 19, 43, 0.6);
  line-height: 40px;
  font-weight: bold;
  border-top: 1px solid rgba(5, 16, 60, 0.6);
}
.esmall .esvalue::after{
  content: " ";
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 100%;
  background: rgba(5, 16, 60, 0.58);
  position: absolute;
  top:-4px;
  right:-4px;
  border: 1px solid rgba(5, 16, 60, 0.6);
  box-sizing: border-box;
}
.emainbox .emain{
  width:115px;
  margin-right: 8px;
}
.emainbox .emain:last-child{
  margin-right: 0;
}
.emainbox{
  width:361px;
}
.emainbox .emain .embooking{
  color: #fff;
  font-size: 12px;
  background: #05103C;
  opacity: 0.81;
}
.emainbox .emain .emvalue{
  height: 40px;
  color: #32C5FF;
  line-height: 40px;
  font-weight: bold;
  background: rgba(9, 19, 43, 0.4);
}
.emainbox .emain .emtitle{
    height: 20px;
    text-indent: 13px;
    color: #fff;
    line-height: 20px;
    font-size: 12px;
    border-bottom: 1px solid rgba(5, 16, 60, 0.6);
    background: url('../assets/lefttop-triangle.png') rgba(9, 19, 43, 0.4) no-repeat left top;
}
.vs-mr{
  width:132px;
  height: 132px;
  margin-top:25px;
}
.vs-mr  .vsmrname{
  bottom: 32px;
  left: 37%;
  font-size: 12px;
  color: #32C5FF;
}
  .vs-mr .aboveRings{
    width:129px;
    height: 129px;
    border:1px solid #7592FE;
    top:0;
    left: 0;
    border-radius: 100%;
  }
.vs-mr .aboveRings::after{
  position: absolute;
  content: " ";
  display: inline-block;
  width: 10px;
  height: 10px;
  bottom: 11px;
  right:15px;
  background: #31C7FE;
  border-radius: 100%;
}
.vs-mr .aboveRings::before{
  position: absolute;
  content: " ";
  display: inline-block;
  height: 6px;
  width:6px;
  top:11px;
  left: 20px;
  background: #6567F7;
  border-radius: 100%;
}
.vs-mrv2{
  width:162px;
  height: 162px;
  margin-top:25px;
}
.vs-mrv2  .vsmrname{
  bottom: 42px;
  left: 40%;
  font-size: 12px;
  color: #32C5FF;
}
  .vs-mr .aboveRingsv2{
    width:159px;
    height: 159px;
    border:1px solid #7592FE;
    top:0;
    left: 0;
    border-radius: 100%;
  }
.vs-mr .aboveRingsv2::after{
  position: absolute;
  content: " ";
  display: inline-block;
  width: 10px;
  height: 10px;
  bottom: 20px;
  right:15px;
  background: #31C7FE;
  border-radius: 100%;
}
.vs-mr .aboveRingsv2::before{
  position: absolute;
  content: " ";
  display: inline-block;
  height: 6px;
  width:6px;
  top:19px;
  left: 20px;
  background: #6567F7;
  border-radius: 100%;
}
.energyStatistic{
  padding: 10px;
  width:520px;
  height:270px;
  margin-top: 10px;
}
.safeStatus{
  width:440px;
  padding: 10px;
  border: none;
}
.menuBtn3box{
  width:100%;
}
.menuBtn3box li.dsd2{
  width:131px;
  background: rgba(9, 19, 43, 0.4);
  margin-right: 12px;
  margin-top:10px;
}
.menuBtn3box li.dsd2:last-child{
  margin-right: 0;
}
.menuBtn3box li.dsd2 p{
  color: #fff;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-indent: 10px;
  border-left:3px solid #FF3A3B
}
.menuBtn3box li.dsd2:nth-child(2) p{
  border-left:3px solid #03FF1C
}
.menuBtn3box li.dsd2:nth-child(3) p{
  border-left:3px solid #FEEF08
}
.menuBtn3box li.dsd2 h3{
  border-top:1px solid #05103C;
  height: 38px;
  line-height: 38px;
  color: #32C5FF;
}
.cmABSMenu{
  width:42px;
  height: 301px;
  left:-42px;
  top:0;
  font-size: 12px;
  color: #fff;
  border-right:8px solid rgba(9, 19, 43, 0.6);
}
.fixedbarMenu .cmABSMenu{
  left:0;
  height: 260px;
  top:0;
}
.cmABSMenu .ecmns{
  width:34px;
  padding: 13px 11px;
  background: rgba(9, 19, 43, 0.7);
  border-radius: 4px 0px 0px 4px;
  cursor: pointer;
  line-height: 13px;
  margin-bottom: 10px;
}
.environmentWatch{
  width:440px;
  height: 170px;
  padding: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: none;
  margin-top:10px;
  background: rgba(9, 19, 43, 0.6);
}
.cmABSMenu2{
  width:118px;
  height: 180px;
  left:-118px;
  top:0;
  font-size: 12px;
  color: #fff;
  border-right: 8px solid rgba(9, 19, 43, 0.8);
}
.cmABSMenu2 li{
  margin-bottom: 14px;
}
.cmABSMenu2 ul{
  height: 170px;
  padding: 8px 6px 8px 9px;
  background: rgba(9, 19, 43, 0.6);
  border-radius: 4px 0px 0px 4px;
}
.cmABSMenu2 li:last-child{
  margin-bottom: 0;
}
.cmABSMenu2 li div.fl{
  width:calc(100% - 30px);
  text-indent: 23px;
  height: 20px;
  font-size: 12px;
  color: #fff;
}
.cmABSMenu2 li div.fr{
  width:30px;
}
.cmABSMenu2 .ecbBase .fl{
  background: url('../assets/ic1.png') no-repeat left top;
  background-size: contain;
}
.cmABSMenu2 .ecbTop .fl{
  background: url('../assets/ic2.png') no-repeat left top;
  background-size: contain;
}
.cmABSMenu2 .ecbHome .fl{
  background: url('../assets/ic3.png') no-repeat left top;
  background-size: contain;
}
.cmABSMenu2 .ecbWarn .fl{
  background: url('../assets/ic4.png') no-repeat left top;
  background-size: contain;
}
.cmABSMenu2 .ecbGas .fl{
  background: url('../assets/ic5.png') no-repeat left top;
  background-size: contain;
}
.parkAndvedioMonitorBox{
  margin-top:10px;
  width:558px;
}
.parkAndvedioMonBoxL{
  width:118px;
  /* height: 470px; */
  border-right: 8px solid rgba(9, 19, 43, 0.8);
  border-radius: 4px 0px 0px 4px;
}
.parkAndvedioMonBoxLIN{
  padding: 10px;
  padding-bottom: 23px;
  background: rgba(9, 19, 43, 0.6);
  border-radius: 4px 0px 0px 4px;
}
.layerTxt {
  font-weight: 500;
  color: #00CCFF;
  font-style: normal;
  font-size: 24px;
}
.elevatorMenuBox{
  /* height: 416px; */
}
.elevatorMenuBox .sli{
  height: 28px;
  width:90px;
  background: rgba(9, 19, 43, 0.4);
  border-radius: 5px;
  line-height: 28px;
  text-align: center;
  color: #fff;
}
.pdrBoxPark .comBoderAndBg, .pdrBoxVedio .comBoderAndBg{
    background: rgba(5, 16, 60, 0.48);
    border-radius: 0px 4px 4px 0px;
}
.pdrBoxPark .visitStatistic, .pdrBoxVedio .visitStatistic{
  width: 440px;
  border: none;
}
.pdrBoxPark .visitStatistic-main .vs-ml .emain{
  width:87px;
}
.pdrBoxPark .emainbox .emain{
  margin-right: 4px;
}
.pdrBoxPark .emainbox .emain .emtitle{
  text-indent: 10px;
}
.pdrBoxPark .emainbox .emain .emvalue{
  height: 60px;
  line-height: 60px;
}
.pdrBoxPark .emainbox{
  width: 271px;
}
.pdrBoxPark .visitStatistic-main .vs-ml{
  width: 271px;
}
.pdrBoxPark .emainbox .emain:last-child{
  margin-right:0;
}
.pdrBoxPark .visitStatistic{
  height: 195px;
}
.pdrBoxVedio .visitStatistic{
  height: 264px;
}
.vedioPalyBox{
  width:414px;
}
.vedioPalyBox li:nth-child(2),.vedioPalyBox li:nth-child(5){
  margin: 19px 15px 0 15px;
}
.vedioPalyBox li{
  margin-top:19px;
}

.fixedbarMenu{
  width:42px;
  min-height: 950px;
  top:60px;
  right:0;
}
.pureIconMenu li{
  width:24px;
  height: 24px;
  margin-left: 5px;
  margin-bottom: 9px;
}
.pureIconMenu li img{
  width:100%;
  height: 100%;
  cursor: pointer;
}
.pureElevatorMenu{
  width:42px;
  background: rgba(9, 19, 43, 0.7);
  border-radius: 4px 0px 0px 4px;
  border-right: 8px solid rgba(9, 19, 43, 0.6);
}
.pureElevatorMtxt{
  width:20px;
  color: #fff;
  margin:0 auto;
  padding: 7px 0;
  font-size: 12px;
  text-align: center;
}
.pureIconMenu{
  width:42px;
  padding-top:5px;
  padding-bottom: 5px;
  background: rgba(9, 19, 43, 0.7);
  margin-bottom: 10px;
  border-right: 8px solid rgba(9, 19, 43, 0.6);
  border-radius: 4px 0px 0px 4px;
}
.pureIconMenu::after{
  content: ' ';
  position: absolute;
  width:8px;
  height: 10px;
  background: rgba(9, 19, 43, 0.7);
  bottom: -10px;
  right:-8px;
}
.pureElevatorMenuIn{
  border-top:1px solid #00CCFF;
  padding-top: 10px;
  padding-bottom: 10px;
}
#hoverOpacityBox1,#hoverOpacityBox2{
  opacity: 0;
}
.echrMainBingBox{
  width: 110px;
  height: 110px;
  top:50%;
  left:50%;
  margin-top:-55px;
  margin-left:-55px;
}
.echrMainBingBoxv2{
  width: 140px;
  height: 140px;
  top:50%;
  left:50%;
  margin-top:-70px;
  margin-left:-70px;
}
</style>
<style>
.elevatorMenuBox .el-tabs--left{
  height: 392px!important;
}
.elevatorMenuBox .el-tabs--left .el-tabs__header.is-left{
  margin-right: 0;
}
.elevatorMenuBox .el-tabs__header{
  margin:0;
  width: 100%;
}
.elevatorMenuBox .el-tabs__content{
  display: none;
}
.elevatorMenuBox .el-tabs__nav-prev,.elevatorMenuBox .el-tabs__nav-next{
  display: none;
}
.elevatorMenuBox .el-tabs__item.is-active{
  width: 90px;
  height: 28px;
  background: rgba(9, 19, 43, 0.4);
  border-radius: 5px;
  backdrop-filter: blur(10px);
  color: #fff;
  text-align: center;
  line-height: 28px;
}
.elevatorMenuBox .el-tabs--left .el-tabs__item.is-left{
  text-align: center;
}
/*If show fluid-barLine style*/
/* .elevatorMenuBox .el-tabs--left .el-tabs__active-bar.is-left, .elevatorMenuBox .el-tabs--left .el-tabs__nav-wrap.is-left::after{
  right: 0;
}
.elevatorMenuBox .el-tabs__nav-wrap::after{
  width:0!important;
}
.elevatorMenuBox .el-tabs__active-bar{
  width: 100%!important;
  background: rgba(9, 19, 43, 0.4);
  border-radius: 5px;
  backdrop-filter: blur(10px);
  z-index:-1;
} */
.elevatorMenuBox .el-tabs--left .el-tabs__active-bar.is-left, .elevatorMenuBox .el-tabs--left .el-tabs__nav-wrap.is-left::after{
  width:0;
}
.elevatorMenuBox .el-tabs--left .el-tabs__nav-wrap.is-left.is-scrollable{
  padding: 0;
}
.elevatorMenuBox .el-tabs__item{
  color: #fff;
  height: 28px;
  line-height: 28px;
}

.elevatorMenuBox.pureElevatorMenuIn .el-tabs__item.is-active{
    width: 30px;
    height: 28px;
    background: rgba(9, 19, 43, 0.4);
    border-radius: 5px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: #fff;
    text-align: center;
    line-height: 28px;
}
.pureElevatorMenuIn .el-tabs__item{
  padding: 0!important;
  width:30px!important;
  margin-left:2px!important;
  color: #fff;
}
.pureElevatorMenuIn .el-tabs__nav-wrap{
  width:42px;
}
/* .pureElevatorMenuIn .el-tabs--left{
  height: 500px!important;
} */
.pureElevatorMenuIn .el-tabs--left .el-tabs__item.is-left{
  text-align: center;
  font-size: 12px;
}
.pureElevatorMenuIn .el-tabs__item.is-active{
  background: rgba(9, 19, 43, 0.4);
  color: #fff;
  border-radius: 5px;
}
.pureElevatorMenuIn .el-tabs__nav-next,.pureElevatorMenuIn .el-tabs__nav-prev{
  text-indent: -10px;
}
/*dialog style*/
.dzDialogStyle{
  width:520px!important;
  height: 270px!important;
  /* background: url('../assets/dialogTopBg.png') #23304e no-repeat left top!important; */
  background: rgba(9, 19, 43, 0.61)!important;
  border-radius: 4px;
  border: 1px solid rgba(117, 146, 254, 0.39);
}
.dzDialogStyleNearby .el-dialog__body{
  margin-top:52px;
}
.spreadByHomecheck{
  padding-left: 121px;
}
.spreadByHomecheck .el-checkbox__label{
  color: #fff;
}
.dzDialogHeader {
  height: 40px;
  width:calc(100% - 20px);
  margin:0 auto;
  top:0;
  line-height: 40px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  font-family: PingFangSC-Semibold, PingFang SC;
  z-index: 1;
}
.dzDialogHeader .fl{
  width:16px;
  height: 40px;
  background: url(../assets/mod1-bg.png) 100% no-repeat;
  background-position: left 10px;
  background-size: 6px 23px;
}
.dzDialogHeader .rightBBar{
  width: calc(100% - 40px);
  float: left;
  height: 40px;
  border-bottom: 1px solid #32C5FF;
}
.dzDialogStyle .el-dialog__headerbtn{
  top:12px;
  z-index: 2;
}
.inBoxitems{
  width: 140px;
  height: 49px;
  border-radius: 4px;
  background: #3F4A6A;
  backdrop-filter: blur(10px);
  line-height: 49px;
  text-align: center;
  color: #32C5FF;
  float: left;
  margin-right:10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.inBoxitems.cur{
  background: url('../assets/dialogContentTopBg.png') #3F4A6A no-repeat top left;
}
.dzDialogStyleNearbyGas .el-dialog__body{
  margin-top:0;
}
.hhGasBG {
  height: 26px;
  text-indent: 10px;
  color: #fff;
  font-size: 12px;
  line-height: 26px;
  width:100%;
  background: url('../assets/lefttop-triangle.png') no-repeat left top;
}
</style>
<style>
/*new index start*/
.mabboxT-l-top {
  margin-top:13px;
}
.mabboxT-l-top-each{
  width:167px;
  border-top: 1px solid rgba(5,16,60,0.6000);
}
.mabboxT-l-top-each .txtss{
  height:33px;width:70px;
  line-height: 33px;
  font-size: 12px;
  color:#fff;
  background-color: #09132B66;
  text-align: center;
}
.mabboxT-l-top-each .nums{
  color:#32C5FFFF;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  width:calc(100% - 70px);
  height:33px;
  line-height: 33px;
}
.mabboxT-l{
  width:355px;
  margin-left:16px;
}
.el-progress-bar__outer{
  background-color: #05103CFF!important;
}
.el-progress__text{
  color: #32C5FFFF!important;
  font-size: 12px!important;
  margin-left: 15px!important;
}
.esname{
  font-size: 12px;
  color: #32C5FFFF;
  width:62px;
  display: inline-block;
}
.esnameBar{
  width:310px;
}
.esnameBar .el-progress-bar{
  width:250px;
}
.mabboxT-l-topBT p{
  margin-bottom: 10px;
}
.mabboxB {
  height: 100px;
  padding: 18px 13px;
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
.mabboxB-r{
  position: relative;
}
.mabboxB-r .drBar{
  width:19px;
  height: 0px;
  background: linear-gradient(180deg, #49CEEF 0%, #32C5FF 100%);
  position: absolute;
  bottom: 0;
  left: 22px;
  transition:height 2.8s;
  z-index: 10;
}
.mabboxB-r .drBar:nth-child(2){
  left:113px;
  background: linear-gradient(180deg, #426DD8 0%, #426DD8 100%);
}
.mabboxB-r .drBar:nth-child(3){
  left:210px;
  background: linear-gradient(225deg, #2856D6 0%, #2753CE 100%);
}
.xuLineBar{
  height: 1px;
  width: 100%;
  background: #2d4d86;
  left: 0;
  z-index: 9;
}
.xuLineBar.nnt1{
  bottom: 100%;
}
.xuLineBar.nnt2{
  bottom: 75%;
}
.xuLineBar.nnt3{
  bottom: 50%;
}
.xuLineBar.nnt4{
  bottom: 25%;
}
.xuLineBar.nnt5{
  bottom: 0!important;
}
.bttTitle{
  bottom: -41px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}
/* .indexL2{
  width:570px!important;
  height: 300px!important;
} */
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
.nandBox-r{
  width:calc(100% - 200px);
}
.nandBox-r .no{width:40px;float: left;}
.nandBox-r .time{width:110px;float: left;}
.nandBox-r .name{width:110px;float: left;}
.nandBox-r .status{width:40px;float: left;}
.nandBox-r .op{width:40px;float: left;}
.gxgTitle{
  height:27px;border-bottom: 1px solid rgba(5,16,60,0.6000);color:#fff;line-height:27px;font-size: 12px;font-weight:500;
}
.gxgTitle .nnames{
  text-indent:10px;
  font-weight: 700;
}
.hhadBg{
  background: url('../assets/temper_03.png') no-repeat top left;
  background-size: 15px 20px;
}
.hhadBg span{
  color: #fff;
  font-weight: bold;
  margin-left: 20px;
}
.hqbox p{
font-size: 20px;
font-weight: bold;
color: #32C5FF;
line-height: 52px;
text-indent: 20px;
}
.speedpEach {
  margin-top:10px!important;
}
.nn3name{
  top:30px;
  left:89px;
  font-size: 12px;
  color:#32C5FFFF;
  width: 59px;
}
.mgrer{margin-right:56px;margin-top:10px;}
.mktitles::after{
  content: ' ';
  height: 10px;
  width: 10px;
  background: #03FF1CFF;
  display: inline-block;
  border-radius: 100%;
  margin-left: 15px;
}
.b2bBotombox li:nth-child(2) .mktitles::after{
  background: #fff;
}
.b2bBotombox li:nth-child(3) .mktitles::after{
  background: #03FF1CFF;
}
.b2bBotombox li:nth-child(4) .mktitles::after{
  background: #03FF1CFF;
}
.b2bBotombox li:nth-child(5) .mktitles::after{
  background: #FF3A3BFF;
}
.b2bBotombox li{
  float: left;
  margin-left: 10px;
}
</style>
<!--机器人页面-->
<style scoped>
.robotMainTL {
  width:110px;
  height:110px;
}
.robotMainTL img{
  height: 100%;
  width: 100%;
}
.robotMainTR{
  width:284px;
  height:180px;
  background: #09132B99;
  border-radius: 4px;
}
.robotMainT{
  margin-top:14px;
}
.robotMainTR{
  padding:8px 6px;
}
.robotMainTRt-a{
  margin-bottom:8px;
}
.robotMainTRt-a-l{
  width:90px;border-bottom:1px solid #05103C99;
}
.robotMainTRt-a-l p i{
  top:2px;
}
.robotMainTRt-a-l p span{
  font-size: 12px;color:#fff;padding-left:7px;font-weight:bold;
}
.robotMainTRt-a-l .sseip{
  padding:7px 0;
  color: #32C5FFFF;
}
.robotMainTRt-a-r{
  width:170px;border-bottom:1px solid #05103C99;
}
.robotMainTRt-a-r i{
  top:2px;
}
.robotMainTRt-a-r span{
  font-size: 12px;color:#fff;padding-left:7px;font-weight:bold;
}
.robotMainTRt-a-r .bvbs{
  padding:7px 0;
}
.robotMainTRt-a-r .bvbs span{
  color:#32C5FFFF;font-weight:400;
}
.robotMainTRt-a-r{
  width:170px;
}
.robotMainTRt-a-r p i{
  top:2px;
}
.robotMainTRt-a-r p span{
  font-size: 12px;color:#fff;padding-left:7px;font-weight:bold;
}
.robotMainTRt-a-r .mnass{
  padding:5px 0;
}
.robotMainTRt-a-r .mnass span{
  color:#32C5FFFF;font-weight:400;
}
.robotMainB{
  width:490px;height:60px;background:#1f2942;margin-left:10px;margin-top:6px;
}
.robotMainB span{
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding-top:5px;
  padding-right:10px;
}
.robotMainB img{
  width:30px;
  height: 27px;
}
.robotMainB div.clearfix{
  margin-right:8px;
  margin-top:15px;
  margin-left:15px;
}
</style>
<style>
.zcarouselbox{
  height: 400px;
  position: fixed;
  top:50%;
  margin-top:-200px;
  right: 20px;
}
.zcarouselbox a{
  width:50px;
  height: 50px;
  border-radius: 100%;
  text-align: center;
  border-radius: 100%;
  line-height: 50px;
  background-color: #243047;
  color: #fff;
  display: inline-block;
  position: absolute;
  cursor: pointer!important;
}
.zcarouselbox a:active{
  color: #2eb0e7;
}
.zcarouselbox a i {
  font-size: 16px;
  font-weight: bold;
}
.zcarouselbox a:nth-of-type(1){
  top:0;
}
.zcarouselbox a:nth-of-type(2){
  bottom:0;
}
.zcarouselbox .mainEp{
  height: 260px;
  width:50px;
  overflow: hidden;
  margin-top: 70px;
}
.zcarouselbox .mainEp li{
  width:50px;
  height: 50px;
  border-radius: 100%;
  text-align: center;
  border-radius: 100%;
  line-height: 50px;
  background-color: #243047;
  color: #fff;
  margin-bottom: 20px;
  cursor: pointer;
}
.zcarouselbox .mainEp li.cur{
  background-color: #09142b;
  color: #2eb0e7;
}
.professionalBox{
  height: 400px;
  width: 100px;
  position: fixed;
  top:50%;
  margin-top: -200px;
  left: 20px;
  background: rgba(9, 19, 43, 0.60);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
}
.professionalBox h3{
  height: 32px;
  background: rgba(9, 19, 43, 0.61);
  line-height: 32px;
  color: #fff;
  font-size: 14px;
  text-indent: 10px;
}
.professionalBox ul{
  margin-top: 20px;
}
.professionalBox ul li{
  margin-bottom: 30px;
}
.professionalBox ul li span{
  width: 52px;
  display: inline-block;
  font-size: 13px;
  text-indent: 10px;
  color: #fff;
}
.globalSearch{
  width: 600px;
  position: absolute;
  top:0;
  right:100px;
  background: rgba(9,19,43,0.61);
  border-radius: 4px;
}
.globalSearch .gshbg{
  width: 6px;
  height: 28px;
  background: url(../assets/mod1-bg.png) 100% no-repeat;
  margin-left:10px;
}
.gshInputbox{
  width:380px;
  height: 34px;
  margin-right:14px;
}
.gsh-input{
  padding: 6px 0;
}
.gsh-input h3{
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
  line-height: 34px;
}
.gsh-input .gshLine{
  width:560px;height:1px;border-top:1px solid #32C5FF;position:absolute;bottom:0;left:25px;
}
.gsh-type{
  width: 560px;
  height: 221px;
  margin-left: 26px;
}
.gsh-type .gshLine2{
  width:560px;height:1px;border-top:1px solid #32C5FF;
}
.gshtypeUL li{
  width: 94px;
  height: 40px;
  font-weight: 500;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 40px;
  background: #09132B66;
  border-radius: 4px;
  border: 1px solid rgba(9,19,43,.4);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-left: 11px;
  margin-bottom: 10px;
  cursor: pointer;
}
.gshtypeUL li:hover{
  border: 1px solid rgba(50, 197, 255, 1);
color: #32C5FF;
}
.gshtypeUL.mgtop li{
  margin-bottom: 0;
  margin-top: 10px;
}
.gshInputbox .el-input{
  width:312px;
  height: 34px;
  background: rgba(9, 19, 43, 0.2);
  border: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.gshInputbox .el-input__inner{
  width:312px;
  height: 34px;
  background: rgba(9, 19, 43, 0.2);
  border: none;
  padding: 0;
  padding-left: 10px;
  color:#fff;
}
.gshInputbox .el-button{
  width:68px;
  height:34px;
  background: rgba(26, 145, 246, 1);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  line-height: 34px;
  padding: 0;
}
.gsh-list{
  padding: 8px 10px 8px 8px;
}
.gsh-lmain{
  background: rgba(9,19,43,0.6);
  width: 580px;
  height: 574px;
  border-radius: 4px;
}
.gsh-lmain ul{
  height: 564px;
  overflow-y: scroll;overflow-x:hidden;
}
.gsh-lmain li {
  width:520px;
  padding: 0 10px;
  background: rgba(9,19,43,0.4);
  border-radius: 4px;
  border: 1px solid rgba(9,19,43,0.4);
  backdrop-filter: blur(4px);
  margin-left: 20px;
  margin-top:10px;
}
.gsh-lmain li:hover{
  border: 1px solid #32C5FF;
}
.gsh-lmain .gshlname{
  width:40%;
  display: inline-block;
}
.gsh-lmain .gshladdr{
  width:60%;
  display: inline-block;
}
.blobalBTN{
  width:90px;
  height: 46px;
  color: #fff;
  position: absolute;
  top:0;
  right: 0;
  background: rgba(9, 19, 43, 0.60);
  border: none;
}
.gshtypeUL li.isActived{
  border: 1px solid rgba(50, 197, 255, 1);
color: #32C5FF;
}
</style>