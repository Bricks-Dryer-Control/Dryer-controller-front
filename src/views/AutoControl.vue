<template>
  <div class="ma-2 py-2 px-8">
    <v-row style="justify-content: center">
      <h1>Sterowanie automatyczne</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-select
            :items="autoControlList"
            v-model="choosedName"
            label="Wybierz sterowanie"
          ></v-select>
        <v-btn @click="Create">Nowe</v-btn>
        <v-btn :disabled="!show || isNew"
               @click="Copy">Kopia</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="show"
           style="justify-content: center">
      <AppAutoControlEdit :autoControl="autoControl"
                          :isNew="isNew"
                          @refresh="Refresh">
      </AppAutoControlEdit>
      <AppAutoControlPoints :points="autoControl.sets">
      </AppAutoControlPoints>
    </v-row>
  </div>
</template>

<script lang="ts">
import AppAutoControlEdit from "@/components/AppAutoControlEdit.vue";
import AppAutoControlPoints from "@/components/AppAutoControlPoints.vue";
import AutoControlService from "@/services/AutoControlService";
import IAutoControl from "@/types/IAutoControl";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { AppAutoControlEdit, AppAutoControlPoints },
})
export default class AutoControl extends Vue {
  private readonly autoControlService: AutoControlService;
  private autoControlList: string[] = [];
  private choosedName: string = '';
  private autoControl: IAutoControl = this.NewAutoControl();
  private isNew: boolean = false;
  private show: boolean = false;

  constructor() {
    super();
    this.autoControlService = new AutoControlService("http://localhost:5000");
  }

  mounted() {
    this.Refresh();
    this.choosedName = '';
    this.show = false;
  }

  Refresh() {
    this.autoControlService.getList().then(v => this.autoControlList = v);
  }

  Create() {
    this.isNew = true;
    this.autoControl = this.NewAutoControl();
    this.show = true;
  }

  Copy() {
    this.autoControl.name = '';
    this.isNew = true;
  }

  NewAutoControl(): IAutoControl
  {
    return {
      name: '',
      timeToSetSeconds: 0,
      temperatureDifference: 5,
      controlDifference: 10,
      controlType: 4,
      kp: 0,
      ki: 0,
      minInFlow: 0,
      maxInFlow: 480,
      minOutFlow: 0,
      maxOutFlow: 480,
      percent: 0,
      offset: 0,
      sets: [{
        timeSeconds: 0,
        temperature: 0,
        inFlow: 0,
        outFlow: 0,
        throughFlow: 0
        }]
    }
  }

  @Watch("choosedName")
  choosedNameChanged(newName?: string)
  {
    this.isNew = false;
    this.show = false;
    if (newName !== undefined)
      this.autoControlService.getOne(newName).then(v => {
        this.autoControl = v
        this.show = true;
      });
  }
}
</script>
