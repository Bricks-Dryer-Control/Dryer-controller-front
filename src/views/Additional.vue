<template>
  <div class="ma-0 pa-0">
    <v-row class="pa-0" style="justify-content: center">
      <AppAddonRoofControl v-for="(roof, i) in additionalInfo.roofs"
                           :key="'roof' + i"
                           class="px-2 ma-2"
                           :no="i + 1"
                           :values="roof"
                           @send="sendRoof">
      </AppAddonRoofControl>
      <AppAddonOtherControl v-for="(went, i) in additionalInfo.wents"
                            :key="'went' + i"
                            class="px-2 ma-2" 
                            :no="i + 1"
                            :value="went"
                            @send="sendWent">
      </AppAddonOtherControl>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import AppAddonRoofControl from '@/components/AppAddonRoofControl.vue'
import AppAddonOtherControl from '@/components/AppAddonOtherControl.vue'
import AdditionalService from '@/services/AdditionalService'
import IAdditionalInfo from '@/types/IAdditionalInfo'

@Component({
  components: {
    AppAddonRoofControl,
    AppAddonOtherControl,
  }
})
export default class Additional extends Vue {
  private readonly additionalService: AdditionalService;
  private readonly additionalServiceTrigger = setInterval(this.checkStatus, 1000);
  private additionalInfo: IAdditionalInfo;

  constructor() {
    super();
    this.additionalService = new AdditionalService('http://localhost:5000');
    this.additionalInfo = this.additionalService.ActualState;
  }
  
  checkStatus(timer: any) {
    if (this.additionalService) {
      this.additionalService.getStatus().then(value => {
        this.additionalInfo = value;
      });
    } else {
      clearInterval(timer);
    }
  }

  sendRoof(no: number, toRoof: boolean) {
    this.additionalService.setRoof(no, toRoof).then(value => {
        this.additionalInfo = value;
      });
  }

  sendWent(no: number, toSet: number) {
    this.additionalService.setWent(no, toSet).then(value => {
        this.additionalInfo = value;
      });
  }

  beforeDestroy() {
    clearInterval(this.additionalServiceTrigger);
  }
}
</script>
