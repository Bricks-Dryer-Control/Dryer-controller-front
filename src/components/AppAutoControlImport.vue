<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5">
          Import programu z starej wersji
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Nowa nazwa"
            v-model="name"></v-text-field>
          <v-text-field
            label="Ścieżka do pliku"
            v-model="path"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="secondary"
            text
            @click="dialog = false"
          >
            Zamknij
          </v-btn>

          <v-btn
            color="primary"
            text
            @click="Import"
          >
            Importuj
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class AppAutoControlImport extends Vue {
    @Prop()
    private value!: boolean

    private dialog: boolean = false;
    private name: string = '';
    private path: string = '';

    @Watch('value')
    ValueChanged(value: boolean) {
      this.dialog = value;
    }

    @Watch('dialog')
    DialogChanged(value: boolean) {
      this.$emit('input', value);
    }

    Import() {
      this.$emit('import', this.name, this.path);
      this.dialog = false;
    }
  }
</script>

<style>
</style>