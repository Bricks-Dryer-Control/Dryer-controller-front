<template>
    <v-card width="800">
      <v-card-title>Punkty sterowania</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-list>
              <v-subheader>PUNKTY</v-subheader>
              <v-list-item-group v-model="current">
                <v-list-item v-for="(p, i) in points"
                            :key = i>
                  <v-list-item-content>
                    <v-list-item-title v-text="getTime(p.timeSeconds)"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
        
            <v-btn @click="add">Dodaj</v-btn>
            <v-btn @click="remove">Usuń</v-btn>
          </v-col>
          <v-col v-if="current">
            <v-text-field label="Czas"
                          type="time"
                          v-model="currentTime"
            ></v-text-field>
            <v-text-field label="Nastawa temperatury"
                          type="number"
                          v-model.number="current.temperature"
            ></v-text-field>
            <v-text-field label="Nastawa nawiew"
                          type="number"
                          v-model.number="current.inFlow"
            ></v-text-field>
            <v-text-field label="Nastawa odciąg"
                          type="number"
                          v-model.number="current.outFlow"
            ></v-text-field>
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
    current?: IAutoControlItem;

    add() {
      if (this.current) {
        const newOne = Object.assign({}, this.current);
        this.points.push(newOne);
        this.points.sort((a, b) => a.timeSeconds - b.timeSeconds);
      }
    }

    remove() {
      if (this.current) {
        const i = this.points.indexOf(this.current);
        if (i > 0) {
          this.points.splice(i);
        }
      }
    }

    get currentTime(): string {
      if (this.current === undefined)
        return "";
      return new Date(this.current.timeSeconds * 1000).toISOString().substr(11, 8);
    }

    set currentTime(time: string) {

    }

    getTime(seconds: number): string {
      return new Date(seconds * 1000).toISOString().substr(11, 8);
    }

    @Watch('points')
    pointsChanged(newPoints: IAutoControlItem[]) {
      if (!newPoints[0]) {
        newPoints.push({ 
          timeSeconds: 0,
          temperature: 0,
          inFlow: 0,
          outFlow: 0,
          throughFlow: 0
        });
      }
      this.current = newPoints[0];
    }

    beforeMount() {
      this.pointsChanged(this.points)
    }
  }
</script>

<style>
</style>