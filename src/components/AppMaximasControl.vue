<template>
  <v-card class="pa-2" width="100px">
    <label>Maksima</label>
    <v-text-field v-model="current.inFlow" 
                  type="number" 
                  label="Nawiew" 
    />
    <v-text-field v-model="current.outFlow" 
                  type="number" 
                  label="Odciąg" 
    />
    <v-text-field v-model="current.troughFlow" 
                  type="number" 
                  label="Przerzut" 
    />
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { IChamberMaximas } from '../types/ChamberMaximas'

  @Component
  export default class AppMaximasControl extends Vue {
    @Prop() value!: IChamberMaximas;

    current: IChamberMaximas = this.value;

    @Watch("current.inFlow")
    currentInFlowChange(value: number, oldValue: number) {
      if (value === NaN || value > 480 || value < 1)
      {
        if (oldValue >= 1 && oldValue <= 480)
          Vue.nextTick(() => this.current.inFlow = oldValue);
        else
          Vue.nextTick(() => this.current.inFlow = 1);
      }
      else
        this.$emit('input', this.current);
    }

    @Watch("current.outFlow")
    currentOutFlowChange(value: number, oldValue: number) {
      if (value === NaN || value > 480 || value < 1)
      {
        if (oldValue >= 1 && oldValue <= 480)
          Vue.nextTick(() => this.current.outFlow = oldValue);
        else
          Vue.nextTick(() => this.current.outFlow = 1);
      }
      else
        this.$emit('input', this.current);
    }

    @Watch("current.troughFlow")
    currentTroughFlowChange(value: number, oldValue: number) {
      if (value === NaN || value > 480 || value < 1)
      {
        if (oldValue >= 1 && oldValue <= 480)
          Vue.nextTick(() => this.current.troughFlow = oldValue);
        else
          Vue.nextTick(() => this.current.troughFlow = 1);
      }
      else
        this.$emit('input', this.current);
    }
  }
</script>

<style>
</style>