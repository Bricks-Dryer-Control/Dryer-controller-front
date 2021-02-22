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
        <v-btn color="primary" @click="Send()"><v-icon>mdi-send</v-icon>Wyślij</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import IChamberStatus from '@/types/IChamberStatus'
  import IAdditionalStatus from '@/types/IAdditionalStatus';

  @Component
  export default class AppAddonOtherControl extends Vue {
    @Prop({required: true}) no!: number;
    @Prop({required: true}) value!: IAdditionalStatus;

    get name(): string {
      return `Went ${this.no}`
    }

    get actual(): number {
      return this.value.actualValue;
    }

    get status(): IChamberStatus {
      return this.value.status;
    }

    toSet: number = 0;

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

    get actualSeted() {
      return this.value.setValue;
    }

    @Watch("actualSeted") 
    actualSetedChanged(newValue: number, oldValue: number) {
      if (newValue !== oldValue)
        this.toSet = newValue;
    }

    Send() {
      this.$emit("send", this.no, this.toSet);
    }

    mounted() {
      this.toSet = this.value.setValue;
    }
  }
</script>
