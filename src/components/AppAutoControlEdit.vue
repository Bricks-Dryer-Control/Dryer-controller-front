<template>
  <v-col class="pa-2">
    <v-card width="400">
      <v-text-field label="Nazwa"
                    :disabled="!isNew"
                    v-model="autoControl.name">
      </v-text-field>
      <v-text-field label="Czas ustawienia"
                    type="time"
                    v-model="timeToSet"
      ></v-text-field>
      <v-text-field label="Różnica sterowania"
                    type="number"
                    v-model="autoControl.controlDifference"
      ></v-text-field>
      <v-text-field label="Minimalny nawiew"
                    type="number"
                    v-model="autoControl.minInFlow"
      ></v-text-field>
      <v-text-field label="Maksymalny nawiew"
                    type="number"
                    v-model="autoControl.maxInFlow"
      ></v-text-field>
      <v-text-field label="Jaki procent nawiewu stanowi przerzut"
                    type="number"
                    suffix="%"
                    v-model="autoControl.percent"
      ></v-text-field>
      <v-text-field label="Przesunięcie przerzutu"
                    type="number"
                    v-model="autoControl.offset"
      ></v-text-field>
    </v-card>
  </v-col>
</template>

<script lang="ts">
  import IAutoControl from '@/types/IAutoControl';
import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class AppAutoControlEdit extends Vue {
    @Prop({required: false}) autoControl!: IAutoControl;
    @Prop({required: true}) isNew!: boolean;

    timeToSet: string = '00:00:20';
  }
</script>

<style>
</style>