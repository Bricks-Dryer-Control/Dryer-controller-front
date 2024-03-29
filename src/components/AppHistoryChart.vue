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
        <!-- <apexchart type="rangeBar"
                    width="100%"
                    height="80px"
                    :options="statusOptions"
                    :series="statusSeries"/> -->
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component} from 'vue-property-decorator'
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
      this.start = Date.parse(this.$route.params.startDay);
      this.finish = Date.parse(this.$route.params.endDay);
      this.chamberNo = Number(this.$route.params.chamberNo);
      
      this.historyService.getHistory({
        no: this.chamberNo,
        from: this.$route.params.startDay,
        to: this.$route.params.endDay,
      }).then(this.parseData);
    }

    start: number;
    finish: number;
    chamberNo: number;

    change() {
      const start = new Date(this.start);
      const finish = new Date(this.finish);

      this.$router.push({ name: 'History', params: { chamberNo: String(this.chamberNo), startDay: this.formatDate(start), endDay: this.formatDate(finish) }});
      this.historyService.getHistory({
        no: this.chamberNo,
        from: this.getUtc(start),
        to: this.getUtc(new Date(this.finish + 24 * 60 * 60 * 1000)),
      }).then(this.parseData);
    }

    getUtc(date: Date): string {
      const splited = date.toISOString().split(/\D/);
      return new Date(Number(splited[0]), Number(splited[1]) - 1, Number(splited[2])).toISOString();
    }

    formatDate(date: Date): string {
      return date.toISOString().slice(0,10);
    }

    parseData(data: IHistoryResult) {
      const temps = data.sensors.map(v => [v.time, v.temperature]);
      const hums = data.sensors.map(v => [v.time, v.humidity]);
      const inFlows = data.status.map(v => [v.time, v.inFlowPosition]);
      const outFlows = data.status.map(v => [v.time, v.outFlowPosition]);
      const throughFlows = data.status.map(v => [v.time, v.throughFlowPosition]);
      const inFlowSets = data.status.map(v => [v.time, v.inFlowSet]);
      const outFlowSets = data.status.map(v => [v.time, v.outFlowSet]);
      const throughFlowSets = data.status.map(v => [v.time, v.throughFlowSet]);
      
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
      data: [] as number[][]
    },{
      name: "Wilgotność",
      data: [] as number[][]
    },{
      name: "Nastawa",
      data: [] as number[][]
    }]

    actuatorSeries = [{
      name: "Nawiew",
      data: [] as number[][]
    },{
      name: "Odciąg",
      data: [] as number[][]
    },{
      name: "Przerzut",
      data: [] as number[][]
    },{
      name: "Nast. nawiew",
      data: [] as number[][]
    },{
      name: "Nast. odciąg",
      data: [] as number[][]
    },{
      name: "Nast. przerzut",
      data: [] as number[][]
    }]

    statusSeries = [{
      name: "Włączony",
      data: [] as { x: string; y: number[]; }[],
    },{
      name: "Automat",
      data: [] as { x: string; y: number[]; }[],
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
        labels: { datetimeUTC: false },
        type: 'datetime',
        tooltip: {
          enabled: false
        }
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
      },
      tooltip: {
        x: {
          format: "MM-dd HH:mm"
        },
        y: [{
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y.toFixed(1) + " °C" ;
            }
            return y;
          }},{
          formatter: function (y) {
            if(typeof y !== "undefined") {
              return  y.toFixed(1) + " %" ;
            }
            return y;
        }}]
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
        labels: { datetimeUTC: false },
        type: 'datetime',
        tooltip: {
          enabled: false
        }
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
      },
      tooltip: {
        x: {
          format: "MM-dd HH:mm"
        },
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
        labels: { datetimeUTC: false },
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
      },
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