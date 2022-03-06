<template>
  <v-card class="px-2 appChamberControlChart">
    <apexchart type="line"
                 width="100%"
                 height="240px"
                 :options="tempOptions"
                 :series="tempSeries"/>
    <apexchart type="line"
                 width="100%"
                 height="160px"
                 :options="actuatorOptions"
                 :series="actuatorSeries"/>
  </v-card>
</template>

<script lang="ts">
  import IAutoControlItem from '@/types/IAutoControlItem';
import { ApexOptions } from 'apexcharts'
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'

  @Component
  export default class AppChamberControlChart extends Vue {
    @Prop() points!: IAutoControlItem[];

    beforeMount() {
      this.updateData(this.points);
    }

    @Watch('points')
    updateData(data: IAutoControlItem[]) {
      const inFlows = data.map(d => [d.timeSeconds*1000, d.inFlow]);
      const outFlows = data.map(d => [d.timeSeconds*1000, d.outFlow]);
      const throughFlows = data.map(d => [d.timeSeconds*1000, d.throughFlow]);
      const temps = data.map(d => [d.timeSeconds*1000, d.temperature]);

      this.actuatorSeries = [{
        name: "Nawiew",
        data: inFlows
      },{
        name: "Odciąg",
        data: outFlows
      },{
        name: "Przerzut",
        data: throughFlows
      }]

      this.tempSeries = [{
        name: "Temperatura",
          data: temps
        }];
    }

    tempSeries = [{
      name: "Temperatura",
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
    }]

    tempOptions: ApexOptions = {
      chart: {
        id: 'AutoTemp',
        group: 'Auto',
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
        text: "Nastawa temperatury"
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
        showForSingleSeries: true,
        position: 'right',
      },
      colors: ["#FF0000A0"],
      stroke: {
        width: [3],
        dashArray:[0]
      }
    }

    actuatorOptions: ApexOptions = {
      chart: {
        id: 'AutoActuator',
        group: "Auto",
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
      colors: ["#FF0000FF", "#0000FFFF", "#FFA500FF"],
      stroke: {
        width: [2, 2, 2],
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