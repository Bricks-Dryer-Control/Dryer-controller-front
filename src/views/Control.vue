<template>
  <div class="ma-2 pa-0">
    <v-row style="justify-content: center">
        <v-pagination
          class="pt-4"
          v-model="no"
          :length="chamberCount"
      ></v-pagination>
    </v-row>
    <v-row class="pa-2" style="justify-content: center">
      <AppChamberInfo class="ml-2 mb-2"
                      :chamberInfo="chamberInfo"
      />
      <AppChamberControl class="ml-2 mb-2"
                         :currentSetValues="newSetActuators"
                         :currentIsOn="newIsOn"
                         @send="Send"
                         @sendListening="SendListening"
      />
      <AppChamberAutoControl class="ml-2 mb-2" 
                             :no="no"
                             :name="chamberInfo.autoControlStatus.name"
                             :time="formatedTime"
                             :active="chamberInfo.status.isAuto" />
      <AppChamberControlChart 
        :chamberNo="no"
        class="ml-2 mb-2" />
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import AppChamberInfo from '@/components/AppChamberInfo.vue';
import AppChamberControl from '@/components/AppChamberControl.vue';
import AppChamberAutoControl from '@/components/AppChamberAutoControl.vue';
import AppChamberControlChart from '@/components/AppChamberControlChart.vue';
import IChamberValues from '@/types/IChamberValues';
import ChamberService from '@/services/ChamberService';
import IChamberInfo from '@/types/IChamberInfo';

@Component({
  components: {
    AppChamberInfo,
    AppChamberControl,
    AppChamberAutoControl,
    AppChamberControlChart
  },
})
export default class Control extends Vue {
  private readonly chamberService: ChamberService = new ChamberService('http://localhost:5000');
  private chamberServiceTrigger = setInterval(this.checkStatus, 1000);
  private chamberInfo: IChamberInfo = this.chamberService.ActualState[this.no - 1];
  private newSetActuators: IChamberValues = this.chamberInfo.setActuators;
  private newIsOn: boolean = this.chamberInfo.status.isActive;
  
  checkStatus(timer: any) {
    if (this.chamberService && Number.isInteger(this.no)) {
      this.chamberService.getChamber(this.no).then(value => {
        this.chamberInfo = value;
      });
    } else {
      clearInterval(timer);
    }
  }

  get no(): number {
    return Number(this.$route.params.chamberNo);
  }
  set no(value) {
    this.$router.push({ name: 'Control', params: { chamberNo: String(value) }})
  }

  get chamberCount(): number {
    return ChamberService.Count;
  }

  get formatedTime() {
    return this.chamberInfo.autoControlStatus.currentTime.split(".")[0];
  }

  maximas: IChamberValues = {
    inFlow: 480,
    outFlow: 480,
    throughFlow: 150
  }

  Send(values: IChamberValues)
  {
    this.chamberService.setChamber(this.no, values).then(value => {
      this.chamberInfo = value;
    });
  }

  SendListening(value: boolean) {
      this.chamberService.setListening(this.no, value);
  }

  @Watch("no")
  noChanged(newValue: number) {
    this.chamberInfo = this.chamberService.ActualState[newValue - 1];
    this.newSetActuators = this.chamberInfo.setActuators;
    this.newIsOn = this.chamberInfo.status.isActive;
  }

  beforeDestroy() {
    clearInterval(this.chamberServiceTrigger);
  }
}
</script>
