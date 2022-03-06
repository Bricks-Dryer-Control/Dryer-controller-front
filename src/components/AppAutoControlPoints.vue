<template>
    <v-card width="400">
      <v-card-title>Punkty sterowania</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-select
              :items="pointItems"
              label="Punkt"
              v-model="currentIndex"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="add">Dodaj</v-btn>
          </v-col>
          <v-col>
            <v-btn  :disabled="currentIndex===0"
                    color="error"
                    @click="remove">Usuń</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Czas: Godzina"
                          type="number"
                          v-model.number="currentHour"
                          :disabled="currentIndex===0"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Czas: Minuta"
                          type="number"
                          v-model.number="currentMinute"
                          :disabled="currentIndex===0"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Czas: Sekunda"
                          type="number"
                          v-model.number="currentSecond"
                          :disabled="currentIndex===0"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Nastawa temperatury"
                          type="number"
                          v-model.number="current.temperature"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Nastawa nawiew"
                          type="number"
                          v-model.number="current.inFlow"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Nastawa odciąg"
                          type="number"
                          v-model.number="current.outFlow"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Nastawa przerzut"
                          type="number"
                          v-model.number="current.throughFlow"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
</template>

<script lang="ts">
import IAutoControlItem from '@/types/IAutoControlItem';
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class AppAutoControlPoints extends Vue {
    @Prop({required: true}) points!: IAutoControlItem[];
    currentIndex : number = 0;
    currentHour: number = 0;
    currentMinute: number = 0;
    currentSecond: number = 0;
    
    get pointItems(): object[] {
      let result = this.points.map((p, i) => { return {
        text: this.getTime(p.timeSeconds),
        value: i
      }});
      result.sort((a, b) => this.points[a.value].timeSeconds - this.points[b.value].timeSeconds);
      return result;
    }

    get current(): IAutoControlItem {
      return this.points[this.currentIndex];
    }

    add() {
      if (this.current) {
        const newOne = Object.assign({}, this.current);
        this.points.push(newOne);
      }
    }

    remove() {
      if (this.currentIndex > 0) {
          this.points.splice(this.currentIndex);
      }
    }

    getTime(seconds: number): string {
      let hour: number | string = Math.floor(seconds / 3600);
      let minute: number | string = Math.floor((seconds % 3600) / 60);
      let second: number | string = Math.floor(seconds % 60);

      if (hour < 10) hour = `0${hour}`;
      if (minute < 10) minute = `0${minute}`;
      if (second < 10) second = `0${second}`;

      return `${hour}:${minute}:${second}`
    }

    get newPoint(): IAutoControlItem {
      return { 
        timeSeconds: 0,
        temperature: 0,
        inFlow: 0,
        outFlow: 0,
        throughFlow: 0
      };
    }

    @Watch('points')
    pointsChanged(newPoints: IAutoControlItem[]) {
      if (!newPoints[0]) {
        newPoints.push(this.newPoint);
      } else if (newPoints[0].timeSeconds !== 0) {
        newPoints.splice(0, 0, this.newPoint)
      }
    }

    @Watch('currentHour')
    @Watch('currentMinute')
    @Watch('currentSecond')
    timeInputChanged() {
      let result = 3600 * this.currentHour + 60 * this.currentMinute + this.currentSecond;
      if (result < 0)
        result = 0;

      this.current.timeSeconds = result;
    }

    @Watch('current.timeSeconds')
    timeSecondsChanged(newTime: number)
    {
      const hour = Math.floor(newTime / 3600);
      const minute = Math.floor((newTime % 3600) / 60);
      const second = Math.floor(newTime % 60);

      if (hour !== this.currentHour) {
        this.currentHour = hour;
      }
      if (minute !== this.currentMinute) {
        this.currentMinute = minute;
      }
      if (second !== this.currentSecond) {
        this.currentSecond = second;
      }
    }

    beforeMount() {
      this.pointsChanged(this.points)
    }
  }
</script>

<style>
</style>