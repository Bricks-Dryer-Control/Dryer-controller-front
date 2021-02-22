<template>
  <v-row align="center">
    <v-col class="py-0" cols="2">
      <v-text-field :value="status.turnedOn"
                    label="Włączonych komór"
                    type="number"
                    readonly /> 
    </v-col>
    <v-col class="py-0" cols="2">
      <v-text-field :value="status.workingNow"
                    label="Działających komór"
                    type="number"
                    readonly /> 
    </v-col>
    <v-col class="py-0" cols="2">
      <v-text-field :value="status.inQueue"
                    label="Komór w kolejce"
                    type="number"
                    readonly /> 
    </v-col>
    <v-col class="py-0" cols="2">
      <v-switch :value="status.direction"
                label="Czujnik kierunku"
                readonly />
    </v-col>
    <v-col class="py-0" cols="4">
      <v-btn large
        block 
        color="error"
        @click="Stop">
        
        STOP<br>Awaryjny
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonService from '@/services/CommonService';
import ICommonStatus from '@/types/ICommonStatus';

@Component({
  components: {
    
  },
})
export default class Footer extends Vue {
  private readonly commonService: CommonService;
  private readonly commonServiceTrigger = setInterval(this.checkStatus, 1000);
  private status: ICommonStatus;

  constructor() {
    super();
    this.commonService = new CommonService('http://localhost:5000');
    this.status = this.commonService.ActualState;
  }
  
  checkStatus(timer: any) {
    if (this.commonService) {
      this.commonService.getStatus().then(value => {
        this.status = value;
      });
    } else {
      clearInterval(timer);
    }
  }

  Stop() {
    this.commonService.sendStopAll().then(value => {
      this.status = value;
    });
  }

  beforeDestroy() {
    clearInterval(this.commonServiceTrigger)
  }
}
</script>
