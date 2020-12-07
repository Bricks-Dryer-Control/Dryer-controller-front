<template>
  <v-card width="180px" min-height="300px">
    <v-row class="text-center">
      <v-col cols="12">
        {{title}}
      </v-col>
    </v-row>
    <v-row>
      <apexchart type="bar"
                 width="100%"
                 height="280px"
                 :options="tempHumOptions"
                 :series="tempHumSeries"/>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { ApexOptions } from 'apexcharts';

  @Component
  export default class AppChamberInfo extends Vue {
    @Prop({default: ''}) title!: string;
    @Prop() temperature!: number;
    @Prop() humidity!: number;

    tempHumOptions: ApexOptions = {
      chart: {
        id: this.groupId + '_1',
        animations: {
          enabled: false
        },
        group: this.groupId,
        parentHeightOffset: 0,
        redrawOnParentResize: false,
        redrawOnWindowResize: false,
        toolbar: {
          show:false
        },
        selection: {
          enabled: false
        },
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "bottom",
          }
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#C62828', '#1565C0']
        },
        formatter: (value, { seriesIndex, dataPointIndex, w }) => String(seriesIndex > 0 ? value + '%' : (value - 40) + '°C')
      },
      xaxis: {
        categories: ['Temp', 'Wilg'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      },
      yaxis: [
        {
          show: true,
          min: 0,
          max: 160,
          seriesName: 'Temp',
          tickAmount: 8,
          tooltip: {
            enabled: false
          },
          labels: {
            formatter: (val) => String(val - 40)
          }
        },
        {
          show: true,
          min: 0,
          max: 100,
          seriesName: 'Wilg',
          opposite: true,
          tickAmount: 4,
          tooltip: {
            enabled: false
          }
        }
      ],
      legend: {
        show: false
      },
      colors: ['#EF9A9A', '#90CAF9'],
      states: {
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          filter: {
            type: 'none',
            value: 0
          }
        },
      },
      tooltip: {
        enabled: false
      }
    }

    get groupId() {
      return 'dsafxvczvsac'
    }

    get tempHumSeries() {
      return [
        {name: 'Temp', data: [ this.temperature + 40 ]},
        {name: 'Wilg', data: [ this.humidity ]},
      ]
    }
  }
</script>
