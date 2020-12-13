<template>
  <v-card width="180px" 
          min-height="300px" 
          :color="backGroundColor"
          @click="onClick">
    <v-row class="text-center">
      <v-col cols="12">
        Komora {{no}}<br>
        <v-icon :color="status.working !== 'off' ? '#9C27B0' : '#424242'">{{ status.isAuto? 'mdi-alpha-a-circle' : 'mdi-circle' }}</v-icon>
        <v-icon :color="status.working === 'queued' ? '#9C27B0' : '#424242'">mdi-alarm</v-icon>
        <v-icon :color="status.working === 'working' ? '#9C27B0' : '#424242'">mdi-arrow-split-horizontal</v-icon>
        <v-icon :color="status.working === 'addon' ? '#9C27B0' : '#424242'">mdi-svg</v-icon>
      </v-col>
    </v-row>
    <v-row>
      <apexchart type="bar"
                 width="100%"
                 height="280px"
                 :options="tempHumOptions"
                 :series="tempHumSeries"/>
    </v-row>
    <v-row>
      <apexchart type="bar"
                 width="90%"
                 height="180"
                 :options="actuatorsOptions"
                 :series="actuatorsSeries"/>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { ApexOptions } from 'apexcharts';
  import { IChamberStatus } from '../types/ChamberStatus'

  @Component
  export default class AppChamberInfo extends Vue {
    @Prop() no!: number;
    @Prop() temperature!: number;
    @Prop() humidity!: number;
    @Prop() inflow!: number;
    @Prop() outflow!: number;
    @Prop() throughflow!: number;
    @Prop() inflowSet!: number;
    @Prop() outflowSet!: number;
    @Prop() throughflowSet!: number;
    @Prop() status!: IChamberStatus;

    onClick() {
      this.$router.push({ name: 'Control', params: { chamberNo: String(this.no) }})
    }

    get backGroundColor() {
      switch (this.status.working) {
        case 'off':
          return '#BDBDBD';
        case 'waiting':
          return '#FFFFFF';
        case 'queued':
          return '#FFF9C4';
        case 'working':
          return '#E8F5E9';
        case 'addon':
          return '#E1BEE7';
        default:
          return '#FF0000';
      }
    }

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

    actuatorsOptions: ApexOptions = {
      chart: {
        id: this.groupId + '_2',
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
          },
          colors: {
            backgroundBarColors: ['#EF5350', '#42A5F5', "#FFEB3B"]
          }
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        style: {
          colors: ['#212121'],
          fontSize: "18px"
        },
      },
      xaxis: {
        categories: ['Nawiew', 'Odciąg', 'Przerzut'],
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
      yaxis:  {
        show: true,
        min: 0,
        max: 480,
        tickAmount: 6,
        tooltip: {
          enabled: false
        }
      },
      legend: {
        show: false
      },
      colors: ['#00000040', '#00000040', '#FFFFFFA0'],
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
    }

    get actuatorsSeries() {
      return [
        {name: "Wrtość aktualna", data: [ this.inflow, this.outflow, this.throughflow ]},
        {name: "Wrtość aktualna", data: [ this.inflow, this.outflow, this.throughflow ]},
        {name: "Wrtość ustawiona", data: [ this.inflowSet, this.outflowSet, this.throughflowSet ]},
      ]
    }
  }
</script>
