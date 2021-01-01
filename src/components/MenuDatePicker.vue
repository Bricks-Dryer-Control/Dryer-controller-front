<template>
<v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
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
      no-title
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(date)"
      >
        OK
      </v-btn>
    </v-date-picker>
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

    _date: number = this.value;
    get date() {
      const dateObj = new Date(this._date);
      const dd = String(dateObj.getDate()).padStart(2, '0')
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
      const yyyy = String(dateObj.getFullYear())

      return `${yyyy}-${mm}-${dd}`
    }
    set date(value: string) {
      const numValue = Date.parse(value);

      this._date = numValue;
      this.$emit('input', numValue);
    }

    beforeMount() {
      this._date = this.value;
    }
  }
</script>

<style>
</style>