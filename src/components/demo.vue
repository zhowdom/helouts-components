<template>
  <div class="demo-wrap">
    <!--left-->
    <abnormal_index_ranking v-if="$store.state.floatMenus.floatMenus && ifShowCarad('abnormal_index_ranking', 'left')" />
    <access_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('access_situation', 'left')" />
    <alarm_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('alarm_statistics', 'left')" />
    <business_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('business_situation', 'left')" />
    <device_list v-if="$store.state.floatMenus.floatMenus && ifShowCarad('device_list', 'left')" />
    <device_ranking v-if="$store.state.floatMenus.floatMenus && ifShowCarad('device_ranking', 'left')" />
    <electricity_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('electricity_statistics', 'left')" />
    <energy_ranking v-if="$store.state.floatMenus.floatMenus && ifShowCarad('energy_ranking', 'left')" />
    <energy_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('energy_situation', 'left')" />
    <energy_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('energy_statistics', 'left')" />
    <env_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('env_situation', 'left')" />
    <env_status_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('env_status_statistics', 'left')" />
    <env_year_total v-if="$store.state.floatMenus.floatMenus && ifShowCarad('env_year_total', 'left')" />
    <equipment_assist v-if="$store.state.floatMenus.floatMenus && ifShowCarad('equipment_assist', 'left')" />
    <equipment_overview v-if="$store.state.floatMenus.floatMenus && ifShowCarad('equipment_overview', 'left')" />
    <equipment_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('equipment_situation', 'left')" />
    <gas_ratio v-if="$store.state.floatMenus.floatMenus && ifShowCarad('gas_ratio', 'left')" />
    <gas_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('gas_statistics', 'left')" />
    <packing_lot v-if="$store.state.floatMenus.floatMenus && ifShowCarad('packing_lot', 'left')" />
    <packing_record v-if="$store.state.floatMenus.floatMenus && ifShowCarad('packing_record', 'left')" />
    <power_ratio v-if="$store.state.floatMenus.floatMenus && ifShowCarad('power_ratio', 'left')" />
    <room_access_control v-if="$store.state.floatMenus.floatMenus && ifShowCarad('room_access_control', 'left')" />
    <room_status v-if="$store.state.floatMenus.floatMenus && ifShowCarad('room_status', 'left')" />
    <security_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('security_situation', 'left')" />
    <visit_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('visit_statistics', 'left')" />
    <water_ratio v-if="$store.state.floatMenus.floatMenus && ifShowCarad('water_ratio', 'left')" />
    <water_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('water_statistics', 'left')" />

    <!--right-->
    <abnormal_index_ranking v-if="$store.state.floatMenus.floatMenus && ifShowCarad('abnormal_index_ranking', 'right')" />
    <access_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('access_situation', 'right')" />
    <alarm_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('alarm_statistics', 'right')" />
    <business_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('business_situation', 'right')" />
    <device_list v-if="$store.state.floatMenus.floatMenus && ifShowCarad('device_list', 'right')" />
    <device_ranking v-if="$store.state.floatMenus.floatMenus && ifShowCarad('device_ranking', 'right')" />
    <electricity_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('electricity_statistics', 'right')" />
    <energy_ranking v-if="$store.state.floatMenus.floatMenus && ifShowCarad('energy_ranking', 'right')" />
    <energy_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('energy_situation', 'right')" />
    <energy_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('energy_statistics', 'right')" />
    <env_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('env_situation', 'right')" />
    <env_status_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('env_status_statistics', 'right')" />
    <env_year_total v-if="$store.state.floatMenus.floatMenus && ifShowCarad('env_year_total', 'right')" />
    <equipment_assist v-if="$store.state.floatMenus.floatMenus && ifShowCarad('equipment_assist', 'right')" />
    <equipment_overview v-if="$store.state.floatMenus.floatMenus && ifShowCarad('equipment_overview', 'right')" />
    <equipment_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('equipment_situation', 'right')" />
    <gas_ratio v-if="$store.state.floatMenus.floatMenus && ifShowCarad('gas_ratio', 'right')" />
    <gas_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('gas_statistics', 'right')" />
    <packing_lot v-if="$store.state.floatMenus.floatMenus && ifShowCarad('packing_lot', 'right')" />
    <packing_record v-if="$store.state.floatMenus.floatMenus && ifShowCarad('packing_record', 'right')" />
    <power_ratio v-if="$store.state.floatMenus.floatMenus && ifShowCarad('power_ratio', 'right')" />
    <room_access_control v-if="$store.state.floatMenus.floatMenus && ifShowCarad('room_access_control', 'right')" />
    <room_status v-if="$store.state.floatMenus.floatMenus && ifShowCarad('room_status', 'right')" />
    <security_situation v-if="$store.state.floatMenus.floatMenus && ifShowCarad('security_situation', 'right')" />
    <visit_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('visit_statistics', 'right')" />
    <water_ratio v-if="$store.state.floatMenus.floatMenus && ifShowCarad('water_ratio', 'right')" />
    <water_statistics v-if="$store.state.floatMenus.floatMenus && ifShowCarad('water_statistics', 'right')" />
    
  </div>
</template>

<script>
import abnormal_index_ranking from './cards/abnormal_index_ranking.vue'
import access_situation from './cards/access_situation.vue'
import alarm_statistics from './cards/alarm_statistics.vue'
import business_situation from './cards/business_situation.vue'
import device_list from './cards/device_list.vue'
import device_ranking from './cards/device_ranking.vue'
import electricity_statistics from './cards/electricity_statistics.vue'
import energy_ranking from './cards/energy_ranking.vue'
import energy_situation from './cards/energy_situation.vue'
import energy_statistics from './cards/energy_statistics.vue'
import env_situation from './cards/env_situation.vue'
import env_status_statistics from './cards/env_status_statistics.vue'
import env_year_total from './cards/env_year_total.vue'
import equipment_assist from './cards/equipment_assist.vue'
import equipment_overview from './cards/equipment_overview.vue'
import equipment_situation from './cards/equipment_situation.vue'
import gas_ratio from './cards/gas_ratio.vue'
import gas_statistics from './cards/gas_statistics.vue'
import packing_lot from './cards/packing_lot.vue'
import packing_record from './cards/packing_record.vue'
import power_ratio from './cards/power_ratio.vue'
import room_access_control from './cards/room_access_control.vue'
import room_status from './cards/room_status.vue'
import security_situation from './cards/security_situation.vue'
import visit_statistics from './cards/visit_statistics.vue'
import water_ratio from './cards/water_ratio.vue'
import water_statistics from './cards/water_statistics.vue'

export default {
  data () {
    return {
      currentCaradPool: []
    }
  },
  inject: ['getCurrentPath'],
  components: {
    abnormal_index_ranking,
    access_situation,
    alarm_statistics,
    business_situation,
    device_list ,
    device_ranking ,
    electricity_statistics ,
    energy_ranking ,
    energy_situation ,
    energy_statistics ,
    env_situation ,
    env_status_statistics ,
    env_year_total ,
    equipment_assist ,
    equipment_overview ,
    equipment_situation ,
    gas_ratio ,
    gas_statistics ,
    packing_lot ,
    packing_record ,
    power_ratio ,
    room_access_control ,
    room_status ,
    security_situation ,
    visit_statistics ,
    water_ratio ,
    water_statistics ,
  },
  mounted () {},
  created () {},
  watch: {},
  methods: {
    ifShowCarad (name, position) {
      // 拿到当前路由地址
      let _path = this.getCurrentPath()
      let _targetItem = (this.$store.state.floatMenus.floatMenus || []).find((v, i) => v.pageCode === _path)
      this.currentCaradPool = _targetItem.cartList
      return this.currentCaradPool.some(v => v.cardCode == name && v.position == position)
    },
  }
}
</script>

