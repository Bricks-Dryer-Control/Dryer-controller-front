<template>
  <v-card :id="'otherControl_' + name"
          width="180px" 
          min-height="300px">
          <v-card-title>{{name}}</v-card-title>
    <v-row class="text-center ma-0" :style="{backgroundColor: color}">
      <v-col cols="12" class="pa-0">
        <v-icon :color="status.working !== 'off' ? '#9C27B0' : '#424242'">{{ status.isAuto ? 'mdi-alpha-a-circle' : 'mdi-circle' }}</v-icon>
        <v-icon :color="status.working === 'working' ? '#9C27B0' : '#424242'">mdi-arrow-split-horizontal</v-icon>
        <v-icon :color="status.working === 'addon' ? '#9C27B0' : '#424242'">mdi-svg</v-icon>
        <v-icon :color="status.working === 'queued' ? '#9C27B0' : '#424242'">mdi-alarm</v-icon>
        <span v-if="status.working === 'queued'">{{ status.queuePosition }}</span>
      </v-col>
      <v-col cols="3" class="pr-0">{{actual}}</v-col>
      <v-col cols="9" class="pl-0">
        <v-slider :value="actual"
                  min="0"
                  max="480"
                  thumb-label
                  hide-details
                  readonly>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <v-slider v-model="toSet"
                  class="pb-0"
                  min="0"
                  max="480"
                  hide-details>
        </v-slider>
        <v-text-field v-model="toSet"
                      class="pt-0"
                      type="number">
        </v-text-field>
        <v-btn color="primary"><v-icon>mdi-send</v-icon>Wyślij</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { ApexOptions } from 'apexcharts';
  import IChamberStatus from '@/types/IChamberStatus'
  import IChamberInfo from '@/types/IChamberInfo'

  @Component
  export default class AppAddonOtherControl extends Vue {
    @Prop() name!: string;
    @Prop() actual!: number;
    @Prop() status!: IChamberStatus;

    toSet: number = this.actual;

    get color(): string {
      switch (this.status.working) {
        case 'off':
          return '#BDBDBD';
        case 'waiting':
          return '#FFFFFF';
        case 'queued':
          return '#FFF9C4';
        case 'working':
          return '#E8F5E9';
        case 'addon':
          return '#E1BEE7';
        default:
          return '#FF0000';
      }
    }
  }
</script>
