<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class MenuDatePicker extends Vue {
    @Prop() value!: number;
    @Prop() label!: string;

    menu = false;
    date!: string;

    @Watch("date")
    dateChanged(newValue:string) {
      this.$emit('input', Date.parse(newValue));
    }

    beforeMount() {
      const dateObj = new Date(this.value);
      const dd = String(dateObj.getDate()).padStart(2, '0')
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
      const yyyy = String(dateObj.getFullYear())
      this.date = `${yyyy}-${mm}-${dd}`;
    }
  }
</script>

<style>
</style>