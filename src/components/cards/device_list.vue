<template>
  <div class="eachCardBox clearfix">
    <div class="energyStatistic bdbox commonTitlebox comBoderAndBg" style="width:520px;height:915px;border:none;background:#283353;margin-top:0!important;">
      <div class="main1 flex-row" style="width:500px;">
        <div class="mod1 flex-col"></div>
        <span class="txt1">{{cardTitle}}</span>
        <span class="word1">{{cardSubTitle}}</span>
        <div class="mod2 flex-col" style="margin-left:175px;"></div>
        <div class="mod3 flex-col"></div>
      </div>
      <div class="linerStyle" style="margin-top:5px;margin-left:16px;width:480px;"></div>

      <!--主体内容s-->
      <div class="three3CommBox rela" style="margin-top:15px;">
        <div class="toToufu toToufuEnvi" style="margin-bottom:80px;height:261px;overflow-y: scroll;">
          <ul v-if="deviceTypeList" class="clearfix">
            <li @click="getTypeId('', -1)" class="fl" :class="{'hoverClassT': curTypeIndex == -1}">全部设备</li>
            <li @click="getTypeId(item.typeId, index)" v-for="(item, index) in deviceTypeList" :key="index" class="fl eplise" :title="item.typeName" :class="{'hoverClassT': index == curTypeIndex}">{{item.typeName}}</li>
          </ul>
          <div class="clearfix" style="border-bottom:1px solid #09132B99;margin-bottom:10px;width:480px;margin-left:10px;"></div>
          <ul v-if="spaceList" class="clearfix">
            <li @click="getSpeaceId('', -1)" class="fl" :class="{'hoverClassT': curSpeaceIndex == -1}">全部空间</li>
            <li @click="getSpeaceId(item.spaceId, index)" v-for="(item, index) in spaceList" :key="index" class="fl eplise" :title="item.spaceName" :class="{'hoverClassT': index == curSpeaceIndex}">{{item.spaceName}}</li>
          </ul>
        </div>
        <div class="toSearch clearfix abs">
          <el-input class="fl" v-model="inputSearch" clearable placeholder="请输入设备名称"></el-input>
          <el-button class="fl" type="primary" @click="search(0)" :loading="loading">查询</el-button>
        </div>
        <div class="toTable">
          <el-table
            :highlight-current-row="false"
            v-loading="loading"
            :data="tableData"
            @row-click="showVisibleSafe"
            style="width: 100%;height:475px;overflow-y: scroll;background-color:#1d263e!important;">
            <el-table-column label="序号" width="59">
              <template slot-scope="scope">
                <p>{{scope.$index+1}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="deviceName"
              label="设备名称"
              show-overflow-tooltip
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="systemName"
              width="80"
              align="center"
              show-overflow-tooltip
              label="所属系统">
            </el-table-column>
            <el-table-column
              prop="spaceName"
              align="center"
              show-overflow-tooltip
              label="位置">
            </el-table-column>
            <el-table-column
              prop="location"
              align="center"
              width="50"
              label="定位">
              <template>
                <i class="el-icon-location-outline"></i>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态">
              <template slot-scope="{row}">
                <p v-if="row.status == 'Offline'" style="color:#fff">离线</p>
                <p v-else style="color:#6DD400FF">在线</p>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          small
          @size-change="handleSizeChange"
          @current-change="search"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          style="margin-top:8px;"
          :total="totalPage">
        </el-pagination>
        
        </div>
      </div>
      <!--主体内容d-->

  </div>
  </div>
</template>

<script>
export default {
  name: 'device_list',
  props: {},
  inject: ['getCurrentPath'],
  data () {
    return {
      // loading
      loading: false,
      // 分页参数
      pageIndex: 1,
      totalPage: 0,
      pageSize: 10,
      // 设备table列表数据
      tableData: [],
      // 设备类型集合
      deviceTypeList: [],
      // 空间类型集合
      spaceList: [],
      // 设备类型
      curTypeId: null,
      // 空间类型
      curSpeaceId: null,
      // 输入框值
      inputSearch: '',
      curSpeaceIndex: null,
      curTypeIndex: null,
      // 卡片--标题
      cardTitle: '',
      // 卡片--副标题
      cardSubTitle: '',
      // 卡片--数据接口地址
      apiUrl: '',
      // 卡片--接口参数
      pageType: null,
    }
  },
  async mounted () {
    try {
      await this.matchParmsPageType()
      this.queryDeviceTypeList()
      this.querySpaceList()
      this.search(1)
    } catch(e) {
      console.log(e)
    }
  },
  created () {
    /**
     * 设备列表
     */
  },
  watch: {},
  methods: {
    // 拿当前路由动态匹配出store中params参数pageType
    matchParmsPageType () {
      return new Promise((resolve, reject) => {
        let _arr = this.$store.state.floatMenus.floatMenus
        const _curPath = this.getCurrentPath()
        _arr.find((val, index) => {
          if (val.pageCode == _curPath) {
            const _res = val.cartList.find(v => v.cardCode === this.$options.name)
            this.cardSubTitle = _res.subTitle
            this.cardTitle = _res.title
            this.apiUrl = _res.url
            this.pageType = _res.params.pageType
            resolve(_res.params.pageType)
          }
        })
        
      })
    },
    // 查询设备类型集合
    queryDeviceTypeList () {
      let _params = {
        pageType: this.pageType,
      }
      this.loading = true
      this.$axios.post('/api/bim/getDeviceTypeList', _params).then(({data}) => {
        if (data.code === 200) {
          this.deviceTypeList = data.data || []
        } else {
          this.deviceTypeList = []
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 查询空间集合
    querySpaceList () {
      let _params = {
        pageType: this.pageType,
      }
      this.loading = true
      this.$axios.post('/api/bim/getSpaceList', _params).then(({data}) => {
        if (data.code === 200) {
          this.spaceList = data.data || []
        } else {
          this.spaceList = []
        }
      }).catch(e => {
        console.log(e)
      })
    },
    // 列表查询
    search (pgi) {
      if (pgi) this.pageIndex = pgi
      let _params = {
        pageType: this.pageType,
        spaceId: this.curSpeaceId,
        typeId: this.curTypeId,
        searchKey: this.inputSearch,
        pageIndex: this.pageIndex - 1,
        pageLength: this.pageSize,
      }
      this.loading = true
      this.$axios.post(this.apiUrl, _params).then(({data}) => {
        if (data.code === 200) {
          this.tableData = data.data || []
          this.totalPage = data.rowCount
          this.loading = false
        } else {
          this.tableData = []
          this.totalPage = 0
          this.pageSize = 10
          this.loading = false
          this.$message.error(response.message)
        }
      }).catch(e => {
        this.loading = false
      })
    },
    // 分页器
    handleSizeChange (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.search()
    },
    getTypeId (id, index) {
      this.curTypeId = id
      this.curTypeIndex = index
      this.search(1)
    },
    getSpeaceId (id, index) {
      this.curSpeaceId = id
      this.curSpeaceIndex = index
      this.search(1)
    },
    showVisibleSafe (row) {
      // this.visibleSafe = true
      // window.ue.web.js_call_ue("综合安防设备弹窗", row.deviceCode)
      console.log('设备编号：', row.deviceCode)
      window.ue.web.js_call_ue("定位", row.deviceCode)
    },
  }
}
</script>


<style scoped>
/* 公共设备列表组件样式 */
.energyStatistic{
  padding: 10px;
  width:520px;
  height:270px;
  margin-top: 10px;
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
.pdrBoxPark .comBoderAndBg, .pdrBoxVedio .comBoderAndBg{
    background: rgba(5, 16, 60, 0.48);
    border-radius: 0px 4px 4px 0px;
}
.linerStyle{
  width: 484px;height: 1px;background:#32C5FF;
}
</style>

