<template>
  <v-main class="ma-2 pa-0">
    <v-row style="justify-content: center">
        <v-pagination
        v-model="no"
        :length="6"
      ></v-pagination>
    </v-row>
    <v-row class="pa-2">
      <AppChamberInfo class="ml-2 mb-2"
                      :no="no"
                      :temperature="-20"
                      :humidity="44"
                      :inflow="140"
                      :outflow="280"
                      :throughflow="480"
                      :inflowSet="140"
                      :outflowSet="340"
                      :throughflowSet="380"
                      :status="{working:'waiting', isAuto: true}"
      />
      <AppMaximasControl v-model="maximas"
                         class="ml-2 mb-2"
      />
      <AppChamberControl class="ml-2 mb-2"
      />
      <AppChamberAutoControl class="ml-2 mb-2" />
    </v-row>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppChamberInfo from '@/components/AppChamberInfo.vue';
import AppChamberControl from '@/components/AppChamberControl.vue';
import AppChamberAutoControl from '@/components/AppChamberAutoControl.vue';
import { Route } from 'vue-router';
import { IChamberValues } from '@/types/ChamberValues';

@Component({
  components: {
    AppChamberInfo,
    AppChamberControl,
    AppChamberAutoControl
  },
})
export default class Control extends Vue {
  get no(): number {
    return Number(this.$route.params.chamberNo);
  }

  set no(value) {
    this.$router.push({ name: 'Control', params: { chamberNo: String(value) }})
  }

  maximas: IChamberValues = {
    inFlow: 480,
    outFlow: 480,
    troughFlow: 150
  }
}
</script>
