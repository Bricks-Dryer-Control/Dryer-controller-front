<template>
  <div>
    <v-row>
      <v-col cols="4">
        <MenuDatePicker v-model="start"
                        label="Start">
        </MenuDatePicker>
      </v-col>
      <v-col cols="4">
        <MenuDatePicker v-model="finish"
                        label="Koniec">
        </MenuDatePicker>
      </v-col>
      <v-col cols="2">
        <v-text-field type="number"
                      v-model="chamberNo"
                      label="Komora">
        </v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn block color="primary"
               @click="change">
                  <v-icon>mdi-send</v-icon>Zmień
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <apexchart type="line"
                    width="100%"
                    height="480px"
                    :options="tempHumOptions"
                    :series="tempHumSeries"/>
        <apexchart type="line"
                    width="100%"
                    height="480px"
                    :options="actuatorOptions"
                    :series="actuatorSeries"/>
        <apexchart type="rangeBar"
                    width="100%"
                    height="80px"
                    :options="statusOptions"
                    :series="statusSeries"/>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  import { ApexOptions } from 'apexcharts'
  import MenuDatePicker from '@/components/MenuDatePicker.vue'
  import HistoryService from '@/services/HistoryService'
import IHistoryResult from '@/types/IHistoryResult'

  @Component({
    components: {
      MenuDatePicker
    }
  })
  export default class AppHistoryChart extends Vue {
    private readonly historyService: HistoryService;
    constructor () {
      super();
      this.historyService = new HistoryService('http://localhost:5000');
    }

    start = Date.parse(this.$route.params.startDay);
    finish = Date.parse(this.$route.params.endDay);
    chamberNo = Number(this.$route.params.chamberNo);


    change() {
      this.$router.push({ name: 'History', params: { chamberNo: String(this.chamberNo), startDay: String(this.start), endDay: String(this.finish) }});
      this.historyService.getHistory({
        no: this.chamberNo,
        from: new Date(this.start),
        to: new Date(this.finish),
      }).then(this.parseData);
    }

    parseData(data: IHistoryResult) {
      const temps = data.sensors.map(v => [v.timeUtc, v.value.temperature]);
      const hums = data.sensors.map(v => [v.timeUtc, v.value.humidity]);
      const inFlows = data.status.map(v => [v.timeUtc, v.value.inFlowPosition]);
      const outFlows = data.status.map(v => [v.timeUtc, v.value.outFlowPosition]);
      const throughFlows = data.status.map(v => [v.timeUtc, v.value.throughFlowPosition]);
      const inFlowSets = data.status.map(v => [v.timeUtc, v.value.inFlowSet]);
      const outFlowSets = data.status.map(v => [v.timeUtc, v.value.outFlowSet]);
      const throughFlowSets = data.status.map(v => [v.timeUtc, v.value.throughFlowSet]);

      this.tempHumSeries = [{
        name: "Temperatura",
          data: temps
        },{
          name: "Wilgotność",
          data: hums
        }/*,{
          name: "Nastawa",
          data: [
            [ new Date('2020-01-01 00:00:00'), 25 ],
            [ new Date('2020-01-01 01:00:00'), 35 ],
            [ new Date('2020-01-01 01:30:00'), 35 ]
          ]
      }*/];

      this.actuatorSeries = [{
        name: "Nawiew",
        data: inFlows
      },{
        name: "Odciąg",
        data: outFlows
      },{
        name: "Przerzut",
        data: throughFlows
      },{
        name: "Nast. nawiew",
        data: inFlowSets
      },{
        name: "Nast. odciąg",
        data: outFlowSets
      },{
        name: "Nast. przerzut",
        data: throughFlowSets
      }]

      this.statusSeries = [/*{
        name: "Włączony",
        data: [
          {x: "Status", y: [new Date('2020-01-01 00:00:00').getTime(),  new Date('2020-01-01 01:00:00').getTime()]},
        ],
      },{
        name: "Automat",
        data: [
          {x: "Status", y: [new Date('2020-01-01 00:20:00').getTime(),  new Date('2020-01-01 01:20:00').getTime()]},
        ],
      }*/]
    }

    tempHumSeries = [{
      name: "Temperatura",
      data: [
        [ new Date('2020-01-01 00:00:00'), 20 ],
        [ new Date('2020-01-01 01:00:00'), 40 ],
        [ new Date('2020-01-01 01:30:00'), 30 ]
      ]
    },{
      name: "Wilgotność",
      data: [
        [ new Date('2020-01-01 00:00:00'), 40 ],
        [ new Date('2020-01-01 01:00:00'), 80 ],
        [ new Date('2020-01-01 01:30:00'), 90 ]
      ]
    },{
      name: "Nastawa",
      data: [
        [ new Date('2020-01-01 00:00:00'), 25 ],
        [ new Date('2020-01-01 01:00:00'), 35 ],
        [ new Date('2020-01-01 01:30:00'), 35 ]
      ]
    }]

    actuatorSeries = [{
      name: "Nawiew",
      data: [
        [ new Date('2020-01-01 00:00:00'), 250],
        [ new Date('2020-01-01 01:00:00'), 350],
        [ new Date('2020-01-01 01:30:00'), 350]
      ]
    },{
      name: "Odciąg",
      data: [
        [ new Date('2020-01-01 00:00:00'), 250],
        [ new Date('2020-01-01 01:00:00'), 35],
        [ new Date('2020-01-01 01:30:00'), 480]
      ]
    },{
      name: "Przerzut",
      data: [
        [ new Date('2020-01-01 00:00:00'), 0],
        [ new Date('2020-01-01 01:00:00'), 0],
        [ new Date('2020-01-01 01:30:00'), 125]
      ]
    },{
      name: "Nast. nawiew",
      data: [
        [ new Date('2020-01-01 00:00:00'), 260],
        [ new Date('2020-01-01 01:00:00'), 340],
        [ new Date('2020-01-01 01:30:00'), 350]
      ]
    },{
      name: "Nast. odciąg",
      data: [
        [ new Date('2020-01-01 00:00:00'), 240],
        [ new Date('2020-01-01 01:00:00'), 30],
        [ new Date('2020-01-01 01:30:00'), 420]
      ]
    },{
      name: "Nast. przerzut",
      data: [
        [ new Date('2020-01-01 00:00:00'), 0],
        [ new Date('2020-01-01 01:00:00'), 0],
        [ new Date('2020-01-01 01:30:00'), 115]
      ]
    }]

    statusSeries = [{
      name: "Włączony",
      data: [
        {x: "Status", y: [new Date('2020-01-01 00:00:00').getTime(),  new Date('2020-01-01 01:00:00').getTime()]},
      ],
    },{
      name: "Automat",
      data: [
        {x: "Status", y: [new Date('2020-01-01 00:20:00').getTime(),  new Date('2020-01-01 01:20:00').getTime()]},
      ],
    }]

    tempHumOptions: ApexOptions = {
      chart: {
        id: 'ChamberHistoryTempHum',
        group: 'ChamberHistory',
        animations: {
          enabled: false
        },
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: "Historia komory"
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        seriesName: "Temperatura",
        min: -40,
        max: 120,
        labels: {
          minWidth: 20
        },
        tickAmount: 4,
      },
      legend: {
        position: 'right',
      },
      colors: ["#FF0000A0", "#0000FFA0", "#FFA500FF"],
      stroke: {
        width: [3, 3, 2],
        dashArray:[0, 0, 3]
      }
    }
    actuatorOptions: ApexOptions = {
      chart: {
        id: 'ChamberHistoryActuator',
        group: "ChamberHistory",
        animations: {
          enabled: false
        },
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        min: 0,
        max: 480,
        labels: {
          minWidth: 20
        },
        tickAmount: 6
      },
      legend: {
        position: 'right',
      },
      colors: ["#FF000080", "#0000FF80", "#FFA50080", "#FF0000FF", "#0000FFFF", "#FFA500FF"],
      stroke: {
        width: [3, 3, 3, 2, 2, 2],
        dashArray:[0, 0, 0, 3, 3, 3]
      }
    }

    statusOptions: ApexOptions = {
      chart: {
        id: 'ChamberHistoryStatus',
        group: 'ChamberHistory',
        animations: {
          enabled: false
        },
        stacked: false,
        zoom: {
          type: 'x',
          enabled: true
        },
        toolbar: {
          autoSelected: 'zoom'
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '90%',
          rangeBarGroupRows: true,
          rangeBarOverlap: true
        }
      },
      colors: ["#FF000088", "#0000FF88"],
      fill: {
        type: 'solid'
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        labels: {
          show: false,
          minWidth: 20
        },
        show: false
      },
      legend: {
        show: false
      }
    }
  }
</script>

<style>
@media only screen and (max-width: 1819px){
  .appChamberControlChart {
    width: 976px;
  }
}
@media only screen and (min-width: 1820px){
  .appChamberControlChart {
    width: 800px;
  }
}
</style>