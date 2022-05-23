<template>
  <v-card class="px-2" width="320px">
    <label>Kontrola</label>
    <v-switch label="Włączona"
              :value="currentIsOn"
              readonly
    />
    <v-row>
      <v-col 
        class="py-0">
        <v-text-field
                      v-model="newValues.inFlow"
                      type="number"
                      label="Nawiew"
        />
      </v-col>
    </v-row>
    <v-slider v-model="newValues.inFlow"
              min="0"
              max="480"
              :color="inColor[0]"
              :thumb-color="inColor[1]"
              :track-color="inColor[2]"
    />
    <v-row>
      <v-col 
        class="py-0">
        <v-text-field
                      v-model="newValues.outFlow"
                      type="number"
                      label="Odciąg"
        />
      </v-col>
    </v-row>
    <v-slider v-model="newValues.outFlow"
              :min="outFlowMin"
              :max="outFlowMax"
              :color="outColor[0]"
              :thumb-color="outColor[1]"
              :track-color="outColor[2]"
    />
    <v-row>
      <v-col 
        class="py-0">
        <v-text-field
                      v-model="newValues.throughFlow"
                      type="number"
                      label="Przerzut"
        />
      </v-col>
    </v-row>
    <v-slider v-model="newValues.throughFlow"
              min="0"
              max="480"
              :color="throughColor[0]"
              :thumb-color="throughColor[1]"
              :track-color="throughColor[2]"
    />
    <v-row 
      align="center"
      justify="space-around"
    >
      <v-btn @click="Clear">
        <v-icon>mdi-refresh</v-icon>Wyczyść
      </v-btn>
      <v-btn color="primary"
             @click="Send"
      >
        <v-icon>mdi-send</v-icon>Zastosuj
      </v-btn>
    </v-row>
    
    <v-row 
      align="center"
      justify="space-around"
      class="pa-2 my-4"
    >
      <v-btn v-if="!currentIsOn"
             color="primary"
             @click="$emit('sendListening', true)"
      >Włącz</v-btn>
      <v-btn v-if="currentIsOn"
             color="seconadary"
             @click="$emit('sendListening', false)"
      >Wyłącz</v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import IChamberValues from '@/types/IChamberValues'

  @Component
  export default class AppChamberControl extends Vue {
    @Prop() currentSetValues!: IChamberValues;
    @Prop() outFlowOffset!: number;
    @Prop() currentIsOn!: boolean;

    newValues: IChamberValues = { inFlow: 0, outFlow: 0, throughFlow: 0 };
    maxValues: IChamberValues = { inFlow: 480, outFlow: 480, throughFlow: 150 };

    get outFlowMin() {
      return -this.outFlowOffset;
    }

    get outFlowMax() {
      return 480 - this.outFlowOffset;
    }

    private inColor = ['red lighten-2', 'red', 'red lighten-4'];
    private outColor = ['blue lighten-2', 'blue', 'blue lighten-4'];
    private throughColor = ['yellow lighten-2', 'yellow', 'yellow lighten-4'];

    @Watch("currentSetValues")
    currentSetValuesChanged(newValue: IChamberValues) {
      this.newValues = { ...newValue };
      this.newValues.outFlow -= this.outFlowOffset;
    }

    Clear() {
      if (this.currentSetValues) {
        this.newValues = { ...this.currentSetValues };
        this.newValues.outFlow -= this.outFlowOffset;
      }
    }

    Send() {
      let values = {...this.newValues}
      values.outFlow += this.outFlowOffset;

      this.$emit("send", values);
    }

    mounted() {
      this.Clear();
    }
  }
</script>

<style>
</style>