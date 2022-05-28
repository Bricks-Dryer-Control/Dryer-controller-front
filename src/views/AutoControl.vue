<template>
  <div class="ma-2 py-2 px-8">
    <v-row style="justify-content: center">
      <h1>Sterowanie automatyczne</h1>
    </v-row>
    <v-row>
      <v-col>
        <v-container>
          <v-select
              class="mr-2"
              :items="autoControlList"
              v-model="choosedName"
              label="Wybierz sterowanie"
            ></v-select>
          <v-btn 
              class="px-4 mr-2"
              color="primary"
              @click="Create">Nowe</v-btn>
          <v-btn 
              class="px-4 mr-2"
              color="primary"
              :disabled="!show || isNew"
              @click="Copy">Kopia</v-btn>
          <v-btn 
              class="px-4 mr-2"
              color="secondary"
              @click="Import">Import</v-btn>
        </v-container>
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
    <v-row v-if="show"
           style="justify-content: center">
      <AppChamberAutoControlChart :points="autoControl.sets">
      </AppChamberAutoControlChart>
    </v-row>
    <v-row v-if="show">
      <v-col>
        <v-btn color="success"
               :style="{left: '50%', transform:'translateX(-50%)'}"
               @click="Save">Zapisz</v-btn>
        <v-btn color="error"
               :style="{left: '50%', transform:'translateX(-50%)'}"
               :disabled="isNew"
               @click="Remove">Usuń</v-btn>
      </v-col>
    </v-row>
    <AppAutoControlImport 
      v-model="importDialog"
      @import="ImportFile" />
  </div>
</template>

<script lang="ts">
import AppAutoControlEdit from "@/components/AppAutoControlEdit.vue";
import AppAutoControlImport from "@/components/AppAutoControlImport.vue";
import AppAutoControlPoints from "@/components/AppAutoControlPoints.vue";
import AppChamberAutoControlChart from "@/components/AppChamberAutoControlChart.vue";
import AutoControlService from "@/services/AutoControlService";
import IAutoControl from "@/types/IAutoControl";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component({
  components: { AppAutoControlEdit, AppAutoControlPoints, AppChamberAutoControlChart, AppAutoControlImport },
})
export default class AutoControl extends Vue {
  private readonly autoControlService: AutoControlService;
  public autoControlList: string[] = [];
  public choosedName: string = '';
  public autoControl: IAutoControl = this.NewAutoControl();
  public isNew: boolean = false;
  public show: boolean = false;
  public importDialog: boolean = false;

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

  Save() {
    this.autoControlService.sendOne(this.autoControl)
      .then(() => this.$router.go(0));
  }

  Remove() {
    this.autoControlService.delete(this.choosedName)
      .then(() => this.$router.go(0));
  }

  NewAutoControl(): IAutoControl
  {
    return {
      name: '',
      timeToSetSeconds: 0,
      temperatureDifference: 5,
      controlDifference: 10,
      controlType: 1,
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

  Import() {
    this.importDialog = true;
  }

  ImportFile(name: string, path: string) {
    this.autoControlService.import({name, path})
      .then(() => this.Refresh());
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
