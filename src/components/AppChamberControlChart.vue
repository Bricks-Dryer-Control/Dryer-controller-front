<template>
  <v-card class="px-2 appChamberControlChart">
    <apexchart type="line"
                 width="100%"
                 height="240px"
                 :options="tempHumOptions"
                 :series="tempHumSeries"/>
    <apexchart type="line"
                 width="100%"
                 height="160px"
                 :options="actuatorOptions"
                 :series="actuatorSeries"/>
    <apexchart type="rangeBar"
                 width="100%"
                 height="80px"
                 :options="statusOptions"
                 :series="statusSeries"/>
  </v-card>
</template>

<script lang="ts">
  import HistoryService from '@/services/HistoryService';
  import IHistoryResult from '@/types/IHistoryResult';
  import { ApexOptions } from 'apexcharts'
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class AppChamberControlChart extends Vue {
    @Prop() chamberNo!: number;

    private readonly historyService: HistoryService;
    private historyServiceTrigger = setInterval(this.checkHistory, 5000);
    constructor () {
      super();
      this.historyService = new HistoryService('http://localhost:5000');
      this.checkHistory(null);
    }
    
    checkHistory(timer: any) {
      if (this.historyService && Number.isInteger(this.chamberNo)) {
        const now = new Date();
        let hourAgo = new Date(now);
        hourAgo.setHours(now.getHours() - 1);
        this.historyService.getHistory({ no: this.chamberNo, from: now.toISOString(), to: hourAgo.toISOString() })
          .then(this.parseData);
      } else {
        clearInterval(timer);
      }
    }

    beforeDestroy() {
      clearInterval(this.historyServiceTrigger);
    }

    @Watch("chamberNo")
    chamberChanged(newNo: number) {
      clearInterval(this.historyServiceTrigger);
      this.checkHistory(null);
      this.historyServiceTrigger = setInterval(this.checkHistory, 5000);
    }

    parseData(data: IHistoryResult) {
      if (data.no !== this.chamberNo) {
        return;
      }

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
        }];

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

      this.statusSeries = []
    }
    
    tempHumSeries = [{
      name: "Temperatura",
      data: [] as (number | Date)[][]
    },{
      name: "Wilgotność",
      data: [] as (number | Date)[][]
    },{
      name: "Nastawa",
      data: [] as (number | Date)[][]
    }]

    actuatorSeries = [{
      name: "Nawiew",
      data: [] as (number | Date)[][]
    },{
      name: "Odciąg",
      data: [] as (number | Date)[][]
    },{
      name: "Przerzut",
      data: [] as (number | Date)[][]
    },{
      name: "Nast. nawiew",
      data: [] as (number | Date)[][]
    },{
      name: "Nast. odciąg",
      data: [] as (number | Date)[][]
    },{
      name: "Nast. przerzut",
      data: [] as (number | Date)[][]
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
        text: "Historia komory " + String(this.chamberNo)
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