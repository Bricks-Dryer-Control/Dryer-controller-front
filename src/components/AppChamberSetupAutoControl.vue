<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5">
          Ustaw program dla komory {{no}}
        </v-card-title>

        <v-card-text>
          <v-textarea
            label="Program"
            :value="curName"
            rows="2"
            no-resize
            readonly
          ></v-textarea>
          <v-autocomplete
            v-model="curName"
            :items="items"
            label="Program"
          ></v-autocomplete>
          <v-row>
            <v-col>
              <v-text-field label="Godzina"
                            type="number"
                            v-model.number="currentHour"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Minuta"
                            type="number"
                            v-model.number="currentMinute"
              ></v-text-field>
            </v-col>
          </v-row>
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
            @click="SendSetup"
          >
            Ustaw
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class AppChamberSetupAutoControl extends Vue {
    @Prop()
    private show!: boolean
    @Prop()
    private no!: number
    @Prop()
    private name!: string
    @Prop()
    programList!: string[] | false

    private dialog: boolean = false;
    private curName: string = '';
    private curTimeSec: number = 0;
    private currentHour: number = 0;
    private currentMinute: number = 0;

    get items() {
      return this.programList ? this.programList : [];
    }

    @Watch('show')
    Show(value: boolean) {
      if (value) {
        if (!this.programList || this.programList.length < 1)
          throw 'No data'

        this.curName = this.name;
        if (!this.programList.find(n => n === this.curName))
          this.curName = this.programList[0];
        this.curTimeSec = 0;

        this.dialog = true;
      }
    }

    SendSetup() {
      if (!this.programList || !this.programList.find(n => n === this.curName))
        throw 'Wrong program name'
      if (this.curTimeSec < 0)
        throw 'Negative time'

      const d = Math.floor(this.curTimeSec / (60 * 60 * 24))
      const h = Math.floor(this.curTimeSec / (60 * 60) % 24);
      const m = Math.floor((this.curTimeSec / 60) % 60);
      const s = Math.floor(this.curTimeSec % 60);

      const hh = h < 10 ? ("0" + h) : String(h);
      const mm = m < 10 ? ("0" + m) : String(m);
      const ss = s < 10 ? ("0" + s) : String(s);
      const fTime = `${d}.${hh}:${mm}:${ss}`

      this.$emit('activated', this.curName, fTime);
      this.dialog = false;
    }

    @Watch('dialog')
    Close(value :boolean) {
      if (!value)
        this.$emit('closed')
    }

    @Watch('currentHour')
    @Watch('currentMinute')
    timeInputChanged() {
      let result = 3600 * this.currentHour + 60 * this.currentMinute;
      if (result < 0)
        result = 0;

      this.curTimeSec = result;
      this.timeSecondsChanged(result);
    }

    @Watch('curTimeSec')
    timeSecondsChanged(newTime: number)
    {
      const hour = Math.floor(newTime / 3600);
      const minute = Math.floor((newTime % 3600) / 60);

      if (hour !== this.currentHour) {
        this.currentHour = hour;
      }
      if (minute !== this.currentMinute) {
        this.currentMinute = minute;
      }
    }
  }
</script>

<style>
</style>