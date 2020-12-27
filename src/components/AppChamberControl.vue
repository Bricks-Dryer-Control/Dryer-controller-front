<template>
  <v-card class="px-2" width="380px">
    <label>Kontrola</label>
    <v-switch label="Włączona"
    />
    <v-row>
      <v-col 
        class="py-0"
        cols="7">
        <v-text-field
                      v-model="newValues.inFlow"
                      type="number"
                      label="Nawiew"
        />
      </v-col>
      <v-col 
        class="py-0"
        cols="4">
        <v-text-field
                      v-model="maxValues.inFlow"
                      type="number"
                      label="Max auto"
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
        class="py-0"
        cols="7">
        <v-text-field
                      v-model="newValues.outFlow"
                      type="number"
                      label="Odciąg"
        />
      </v-col>
      <v-col 
        class="py-0"
        cols="4">
        <v-text-field
                      v-model="maxValues.outFlow"
                      type="number"
                      label="Max auto"
        />
      </v-col>
    </v-row>
    <v-slider v-model="newValues.outFlow"
              min="0"
              max="480"
              :color="outColor[0]"
              :thumb-color="outColor[1]"
              :track-color="outColor[2]"
    />
    <v-row>
      <v-col 
        class="py-0"
        cols="7">
        <v-text-field
                      v-model="newValues.troughFlow"
                      type="number"
                      label="Przerzut"
        />
      </v-col>
      <v-col 
        class="py-0"
        cols="4">
        <v-text-field
                      v-model="maxValues.troughFlow"
                      type="number"
                      label="Max auto"
        />
      </v-col>
    </v-row>
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
  import { IChamberValues } from '@/types/IChamberValues'

  @Component
  export default class AppChamberControl extends Vue {
    newValues: IChamberValues = {
      inFlow: 0,
      outFlow: 0,
      throughFlow: 0
    }
    
    maxValues: IChamberValues = {
      inFlow: 480,
      outFlow: 480,
      throughFlow: 150
    }

    private inColor = ['red lighten-2', 'red', 'red lighten-4'];
    private outColor = ['blue lighten-2', 'blue', 'blue lighten-4'];
    private troughColor = ['yellow lighten-2', 'yellow', 'yellow lighten-4'];
  }
</script>

<style>
</style>