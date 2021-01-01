<template>
  <div class="ma-2 pa-0">
    <v-row style="justify-content: center">
        <v-pagination
        v-model="no"
        :length="24"
      ></v-pagination>
    </v-row>
    <v-row class="pa-2" style="justify-content: center">
      <AppChamberInfo class="ml-2 mb-2"
                      :chamberInfo="chamberInfo"
                      :status="{working:'waiting', isAuto: true}"
      />
      <AppChamberControl class="ml-2 mb-2" />
      <AppChamberAutoControl class="ml-2 mb-2" />
      <AppChamberControlChart class="ml-2 mb-2" />
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppChamberInfo from '@/components/AppChamberInfo.vue';
import AppChamberControl from '@/components/AppChamberControl.vue';
import AppChamberAutoControl from '@/components/AppChamberAutoControl.vue';
import AppChamberControlChart from '@/components/AppChamberControlChart.vue';
import { Route } from 'vue-router';
import { IChamberValues } from '@/types/IChamberValues';
import Status from './Status.vue';

@Component({
  components: {
    AppChamberInfo,
    AppChamberControl,
    AppChamberAutoControl,
    AppChamberControlChart
  },
})
export default class Control extends Vue {
  get no(): number {
    return Number(this.$route.params.chamberNo);
  }

  set no(value) {
    this.$router.push({ name: 'Control', params: { chamberNo: String(value) }})
  }

  get chamberInfo() {
    return Status.chambers[this.no - 1];
  }

  maximas: IChamberValues = {
    inFlow: 480,
    outFlow: 480,
    throughFlow: 150
  }
}
</script>
