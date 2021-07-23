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
        :value="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        @input="dateChanged"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="date"
      @input="menuChanged"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class MenuDatePicker extends Vue {
    @Prop() value!: number;
    @Prop() label!: string;

    menu = false;
    date!: string;

    dateChanged(newValue: string) {
      this.$emit('input', Date.parse(newValue));
    }

    menuChanged(newDate: string) {
      this.menu = false;
      this.date = newDate;
      this.dateChanged(newDate);
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