<template>
  <v-main class="ma-0 pa-0">
    <v-row class="ma-2">
      <div  v-for="chamber in mychambers"
            :key="chamber.no"
            class="pa-1 ma-0">
        <AppChamberInfo :chamberInfo="chamber"
                        :clickable="true"
        />
      </div>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppChamberInfo from '@/components/AppChamberInfo.vue'; // @ is an alias to /src
import { IChamberInfo } from '@/types/IChamberInfo';

@Component({
  components: {
    AppChamberInfo,
  },
})
export default class Status extends Vue {
  public static chambers: IChamberInfo[] = [ 
    {no: 1, temperature: 20, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'off', isAuto: false}},
    {no: 2, temperature: 70, humidity: 90, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'off', isAuto: true}},
    {no: 3, temperature: 30, humidity: 50, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 210, outFlow: 310, throughFlow: 110}, status: {working: 'waiting', isAuto: false}},
    {no: 4, temperature: 80, humidity: 100, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: true}},
    {no: 5, temperature: 40, humidity: 60, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 280, outFlow: 380, throughFlow: 180}, status: {working: 'queued', isAuto: false, queuePosition: 1}},
    {no: 6, temperature: 90, humidity: 0, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'queued', isAuto: true, queuePosition: 2}},
    {no: 7, temperature: 50, humidity: 70, actualActuators: {inFlow: 480, outFlow: 480, throughFlow: 480}, setActuators: {inFlow: 480, outFlow: 480, throughFlow: 480}, status: {working: 'working', isAuto: false}},
    {no: 8, temperature: 100, humidity: 10, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'working', isAuto: true}},
    {no: 9, temperature: 60, humidity: 80, actualActuators: {inFlow: 0, outFlow: 0, throughFlow: 0}, setActuators: {inFlow: 0, outFlow: 0, throughFlow: 0}, status: {working: 'addon', isAuto: false}},
    {no: 10, temperature: 120, humidity: 20, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'addon', isAuto: true}},
    {no: 11, temperature: -20, humidity: 30, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 12, temperature: -10, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 13, temperature: 0, humidity: 50, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 14, temperature: 21.11, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 15, temperature: 22.21, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 16, temperature: 23.31, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 17, temperature: 24.41, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 18, temperature: 25.51, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 19, temperature: 20, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 20, temperature: 20, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 21, temperature: 20, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 22, temperature: 20, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 23, temperature: 20, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
    {no: 24, temperature: 20, humidity: 40, actualActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, setActuators: {inFlow: 220, outFlow: 340, throughFlow: 140}, status: {working: 'waiting', isAuto: false}},
  ];

  get mychambers() {
    return Status.chambers;
  }
}
</script>
