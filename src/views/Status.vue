<template>
  <div class="ma-0 pa-0">
    <v-row class="ma-2">
      <div  v-for="chamber in mychambers"
            :key="chamber.no"
            class="pa-1 ma-0">
        <AppChamberInfo class="my-3"
                        :chamberInfo="chamber"
                        :clickable="true"
        />
      </div>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppChamberInfo from '@/components/AppChamberInfo.vue';
import IChamberInfo from '@/types/IChamberInfo';
import ChamberService from '@/services/ChamberService';

@Component({
  components: {
    AppChamberInfo,
  },
})
export default class Status extends Vue {
  private readonly chamberService: ChamberService;
  private readonly chamberServiceTrigger = setInterval(this.checkStatuses, 1000);
  private mychambers: IChamberInfo[];

  constructor() {
    super();
    this.chamberService = new ChamberService('http://localhost:5000');
    this.mychambers = this.chamberService.ActualState;
  }
  
  checkStatuses(timer: any) {
    if (this.chamberService) {
      this.chamberService.getAllChambers().then(value => {
        this.mychambers = value;
      });
    } else {
      clearInterval(timer);
    }
  }

  beforeDestroy() {
    clearInterval(this.chamberServiceTrigger)
  }
}
</script>
