<template>
  <v-card class="pa-2" width="400px">
    <label>Praca automatyczna</label>
    <v-switch 
      label="Włączona"
      :value="active"
      readonly
    ></v-switch>
    <v-textarea
      label="Program"
      :value="name"
      rows="2"
      no-resize
      readonly
    ></v-textarea>
    <v-textarea
      label="Czas w cyklu"
      :value="time"
      rows="1"
      no-resize
      readonly
    ></v-textarea>
    <v-row 
      align="center"
      justify="space-around"
    >
      <v-btn
        color="secondary"
        :loading="newLoading"
        :disabled="newLoading"
        @click="New"
        ><v-icon>mdi-arrow-up-bold</v-icon>Załaduj</v-btn>
      <v-btn 
        v-if="!active"
        color="primary"
        @click="Start"
        ><v-icon>mdi-play</v-icon>Start</v-btn>
      <v-btn
        v-if="active"
        color="secondary"
        @click="Stop"
        ><v-icon>mdi-stop</v-icon>Stop</v-btn>
    </v-row>
    <AppChamberSetupAutoControl 
      :no="no"
      :show="showNew"
      :name="name"
      :programList="programList"
      @closed="NewClosed"
      @activated="NewActivated"
     />
  </v-card>
</template>

<script lang="ts">
import AutoControlService from '@/services/AutoControlService';
import IAutoControlStart from '@/types/IAutoControlStart';
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import AppChamberSetupAutoControl from './AppChamberSetupAutoControl.vue';

@Component({
  components: {
    AppChamberSetupAutoControl
  }
})
export default class AppChamberAutoControl extends Vue {
  private readonly autoControlService: AutoControlService;
  constructor() {
    super();
    this.autoControlService = new AutoControlService("http://localhost:5000");
  }

  @Prop()
  private name!: string;
  @Prop()
  private time!: string;
  @Prop()
  private active!: boolean;
  @Prop()
  private no!: number;

  private showNew: boolean = false;
  private newLoading: boolean = false;
  private programList: string[] | false = false

  @Watch('no')
  NoChanged() {
    this.showNew = false;
    this.programList = false;
  }

  Start() {
    this.autoControlService.turn(this.no, true);
  }

  Stop() {
    this.autoControlService.turn(this.no, false);
  }

  New() {
    this.newLoading = true;

    this.autoControlService.getList().then(list => {
      this.programList = list;
      this.newLoading = false;
      this.showNew = true;
    });
  }

  NewClosed() {
    this.programList = false;
    this.newLoading = false;
    this.showNew = false;
  }

  NewActivated(name: string, startTime: string) {
    const startInfo: IAutoControlStart = {
      name: name,
      chamberId: this.no,
      startPoint: startTime,
    }

    this.autoControlService.start(startInfo);
  }
}
</script>

<style>
</style>