<template>
  <v-card class="pa-2" width="380px">
    <label>Kontrola</label>
    <v-switch label="Włączona"
    />
    <v-text-field v-model="newValues.inFlow"
                  type="number"
                  label="Nawiew"
    />
    <v-slider v-model="newValues.inFlow"
              min="0"
              max="480"
              :color="inColor[0]"
              :thumb-color="inColor[1]"
              :track-color="inColor[2]"
    />
    <v-text-field v-model="newValues.outFlow"
                  type="number"
                  label="Odciąg"
    />
    <v-slider v-model="newValues.outFlow"
              min="0"
              max="480"
              :color="outColor[0]"
              :thumb-color="outColor[1]"
              :track-color="outColor[2]"
    />
    <v-text-field v-model="newValues.troughFlow"
                  type="number"
                  label="Przerzut"
    />
    <v-slider v-model="newValues.troughFlow"
              min="0"
              max="480"
              :color="troughColor[0]"
              :thumb-color="troughColor[1]"
              :track-color="troughColor[2]"
    />
    <v-row 
      align="center"
      justify="space-around"
    >
      <v-btn>
        <v-icon>mdi-refresh</v-icon>Wyczyść
      </v-btn>
      <v-btn
        color="primary"
      >
        <v-icon>mdi-send</v-icon>Zastosuj
      </v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { IChamberValues } from '@/types/ChamberValues'

  @Component
  export default class AppChamberControl extends Vue {
    newValues: IChamberValues = {
      inFlow: 0,
      outFlow: 0,
      troughFlow: 0
    }

    private inColor = ['red lighten-2', 'red', 'red lighten-4'];
    private outColor = ['blue lighten-2', 'blue', 'blue lighten-4'];
    private troughColor = ['yellow lighten-2', 'yellow', 'yellow lighten-4'];
  }
</script>

<style>
</style>