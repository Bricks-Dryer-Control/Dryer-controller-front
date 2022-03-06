<template>
  <v-card width="400">
    <v-card-title>Ustawienia</v-card-title>
    <v-card-text>
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
                    v-model.number="autoControl.controlDifference"
      ></v-text-field>
      <v-text-field v-if="false"
                    label="Minimalny nawiew"
                    type="number"
                    v-model.number="autoControl.minInFlow"
      ></v-text-field>
      <v-text-field v-if="false"
                    label="Maksymalny nawiew"
                    type="number"
                    v-model.number="autoControl.maxInFlow"
      ></v-text-field>
      <v-text-field v-if="false"
                    label="Jaki procent nawiewu stanowi przerzut"
                    type="number"
                    suffix="%"
                    v-model.number="autoControl.percent"
      ></v-text-field>
      <v-text-field v-if="false"
                    label="Przesunięcie przerzutu"
                    type="number"
                    v-model.number="autoControl.offset"
      ></v-text-field>
    </v-card-text>
  </v-card>
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