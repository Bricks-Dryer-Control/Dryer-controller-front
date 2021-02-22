<template>
  <v-card :id="'roofControl_' + name"
          width="180px" 
          min-height="300px">
          <v-card-title>{{name}}</v-card-title>
    <v-row class="text-center ma-0" :style="{backgroundColor: getColor(throughStatus)}">
      <v-col cols="12" class="pa-0">
        Przerzut<br>
        <v-icon :color="throughStatus.working !== 'off' ? '#9C27B0' : '#424242'">{{ throughStatus.isAuto ? 'mdi-alpha-a-circle' : 'mdi-circle' }}</v-icon>
        <v-icon :color="throughStatus.working === 'working' ? '#9C27B0' : '#424242'">mdi-arrow-split-horizontal</v-icon>
        <v-icon :color="throughStatus.working === 'addon' ? '#9C27B0' : '#424242'">mdi-svg</v-icon>
        <v-icon :color="throughStatus.working === 'queued' ? '#9C27B0' : '#424242'">mdi-alarm</v-icon>
        <span v-if="throughStatus.working === 'queued'">{{ throughStatus.queuePosition }}</span>
      </v-col>
      <v-col cols="3" class="pr-0">{{throughActual}}</v-col>
      <v-col cols="9" class="pl-0">
        <v-slider :value="throughActual"
                  min="0"
                  max="480"
                  thumb-label
                  hide-details
                  readonly>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="text-center ma-0" :style="{backgroundColor: getColor(roofStatus)}">
      <v-col cols="12" class="pa-0">
        Dach<br>
        <v-icon :color="roofStatus.working !== 'off' ? '#9C27B0' : '#424242'">{{ roofStatus.isAuto ? 'mdi-alpha-a-circle' : 'mdi-circle' }}</v-icon>
        <v-icon :color="roofStatus.working === 'working' ? '#9C27B0' : '#424242'">mdi-arrow-split-horizontal</v-icon>
        <v-icon :color="roofStatus.working === 'addon' ? '#9C27B0' : '#424242'">mdi-svg</v-icon>
        <v-icon :color="roofStatus.working === 'queued' ? '#9C27B0' : '#424242'">mdi-alarm</v-icon>
        <span v-if="roofStatus.working === 'queued'">{{ roofStatus.queuePosition }}</span>
      </v-col>
      <v-col cols="3" class="pr-0">{{roofActual}}</v-col>
      <v-col cols="9" class="pl-0">
        <v-slider :value="roofActual"
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
        <v-btn-toggle
          rounded
          mandatory
        >
          <v-btn small color="purple lighten-3" v-model="toRoof">Dach</v-btn>
          <v-btn small color="purple lighten-3" :value="!toRoof">Przerzut</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
          <v-btn color="primary" @click="Send()"><v-icon>mdi-send</v-icon>Wyślij</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import IChamberStatus from '@/types/IChamberStatus'
  import IAdditionalRoofInfo from '@/types/IAdditionalRoofInfo';

  @Component
  export default class AppAddonRoofControl extends Vue {
    @Prop({required: true}) no!: number;
    @Prop({required: true}) values!: IAdditionalRoofInfo;

    toRoof: boolean = true;

    get roofActual(): number {
      return this.values.roof.actualValue;
    }

    get roofStatus(): IChamberStatus {
      return this.values.roof.status;
    }

    get throughActual(): number {
      return this.values.through.actualValue;
    }

    get throughStatus(): IChamberStatus {
      return this.values.through.status;
    }

    get name(): string {
      return `Dach ${this.no}`
    }

    getColor(status: IChamberStatus): string {
      switch (status.working) {
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

    get isRoofSeted() {
      return this.values.roof.setValue != 0;
    }

    @Watch("isRoofSeted")
    isRoofSetedsChanged(newValue: boolean, oldValue: boolean) {
      if (newValue !== oldValue)
        this.toRoof = newValue;
    }

    Send() {
      this.$emit('send', this.no, this.toRoof)
    }

    mounted() {
      this.toRoof = this.values.roof.setValue != 0;
    }
  }
</script>
