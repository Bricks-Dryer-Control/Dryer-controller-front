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
            <v-btn color="primary"
                   @click="add">Dodaj</v-btn>
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
                          @change="saveCurrent"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Czas: Minuta"
                          type="number"
                          v-model.number="currentMinute"
                          :disabled="currentIndex===0"
                          @change="saveCurrent"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Czas: Sekunda"
                          type="number"
                          v-model.number="currentSecond"
                          :disabled="currentIndex===0"
                          @change="saveCurrent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="timeNotDistinct">
          <v-col>
            <v-alert
              outlined
              light
              type="error"
            >Podany czas już w użyciu</v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Nastawa temperatury"
                          type="number"
                          v-model.number="current.temperature"
                          @change="saveCurrent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Nastawa nawiew"
                          type="number"
                          v-model.number="current.inFlow"
                          @change="saveCurrent"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Nastawa odciąg"
                          type="number"
                          v-model.number="current.outFlow"
                          @change="saveCurrent"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Nastawa przerzut"
                          type="number"
                          v-model.number="current.throughFlow"
                          @change="saveCurrent"
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
import bsearch from 'binary-search-bounds'

  @Component
  export default class AppAutoControlPoints extends Vue {
    @Prop({required: true}) points!: IAutoControlItem[];
    currentIndex : number = 0;
    currentHour: number = 0;
    currentMinute: number = 0;
    currentSecond: number = 0;
    current: IAutoControlItem = this.newPoint;
    timeNotDistinct: boolean = false;
    
    get pointItems(): {text: string, value: number}[] {
      return this.points.map((p, i) => { return {
        text: this.getTime(p.timeSeconds),
        value: i
      }});
    }

    add() {
      if (this.current) {
        const newOne = Object.assign({}, this.current);
        this.currentIndex = this.points.push(newOne) - 1;
      }
    }

    remove() {
      const toRemoveIndex= this.currentIndex

      if (toRemoveIndex> 0) {
          this.currentIndex = toRemoveIndex - 1;
          this.points.splice(toRemoveIndex, 1);
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

    saveCurrent() {
      if (!this.current)
        return;

      const currentIndex = this.currentIndex;
      const prev = currentIndex > 0 ? this.points[currentIndex - 1] : undefined
      const next = currentIndex < this.points.length - 1 ? this.points[currentIndex + 1] : undefined
      const prevOk = !prev || prev.timeSeconds <= this.current.timeSeconds
      const nextOk = !next || next.timeSeconds >= this.current.timeSeconds
      const changedElement = Object.assign({}, this.current);

      if (prevOk && nextOk) {
        Vue.set(this.points, currentIndex, changedElement);
        this.currentIndexChanged(this.currentIndex)
      } else {
        this.points.splice(currentIndex, 1);
        const newIndex = bsearch.le(this.points, changedElement, (a, b) => a.timeSeconds - b.timeSeconds) + 1;

        if (newIndex === this.points.length) {
          this.points.push(changedElement);
        } else {
          this.points.splice(newIndex, 0, changedElement);
        }

        this.currentIndex = newIndex;
      }

      this.timeNotDistinct = (prev && prev.timeSeconds === this.current.timeSeconds) 
                          || (next && next.timeSeconds === this.current.timeSeconds)
                          || false;
    }

    @Watch('currentIndex')
    currentIndexChanged(newIndex: number) {
      this.current = Object.assign(this.current, this.points[newIndex]);
    }

    @Watch('points')
    pointsChanged(newPoints: IAutoControlItem[]) {
      if (!newPoints[0]) {
        newPoints.push(this.newPoint);
      } else if (newPoints[0].timeSeconds !== 0) {
        newPoints.splice(0, 0, this.newPoint)
      }

      let lastTime = 0;
      for (const el of newPoints) {
        if (el.timeSeconds < lastTime) {
          newPoints.sort((a, b) => a.timeSeconds - b.timeSeconds);
          return;
        }

        lastTime = el.timeSeconds;
      }

      this.currentIndexChanged(this.currentIndex);
    }

    @Watch('currentHour')
    @Watch('currentMinute')
    @Watch('currentSecond')
    timeInputChanged() {
      if (!this.current)
        return;

      let result = 3600 * this.currentHour + 60 * this.currentMinute + this.currentSecond;
      if (result < 0)
        result = 0;

      this.current.timeSeconds = result;
      this.timeSecondsChanged(result);
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