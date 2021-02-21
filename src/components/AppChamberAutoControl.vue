<template>
  <v-card class="pa-2" width="400px">
    <label>Praca automatyczna</label>
    <v-switch label="Włączona"
    />
    <v-text-field
          label="Czas w cyklu do ustawienia"
          value="00:00:00"
          type="time"
          step=1
        ></v-text-field>
    <v-text-field
          label="Aktualny czas w cyklu"
          value="00:00:00"
          type="time"
          step=1
          readonly
        ></v-text-field>
    <v-btn 
        class="mb-2"
        block
        color="primary"
      >
        <v-icon>mdi-send</v-icon>Ustaw
    </v-btn>
    <label>Etapy</label>
    <v-list 
      class="overflow-y-auto"
      style="max-height: 160px;"
      readonly 
    >
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          disabled
          color="black"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-row 
      class="mt-2"
      align="center"
      justify="space-around"
    >
      <v-btn>
        <v-icon>mdi-refresh</v-icon>Wyczyść
      </v-btn>
      <v-btn color="amber">
        <v-icon>mdi-download</v-icon>Załaduj
      </v-btn>
      <v-btn color="primary">
        <v-icon>mdi-plus</v-icon>Dodaj
      </v-btn>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import IChamberValues from '@/types/IChamberValues'

  @Component
  export default class AppChamberAutoControl extends Vue {
    selectedItem = 1;
    items = [
      {text: 'Nazwa etapu 1'},
      {text: 'Nazwa etapu 2'},
      {text: 'Nazwa etapu 3'},
      {text: 'Nazwa etapu 4'},
    ];
  }
</script>

<style>
</style>