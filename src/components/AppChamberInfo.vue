<template>
  <v-card :id="'statuscard' + chamberInfo.no"
          width="180px" 
          min-height="300px" 
          :color="backGroundColor"
          @click="onClick">
    <v-row class="text-center">
      <v-col cols="12">
        Komora {{chamberInfo.no}}<br>
        <v-icon :color="workingStatus !== 'off' ? '#9C27B0' : '#424242'">{{ isAuto? 'mdi-alpha-a-circle' : 'mdi-circle' }}</v-icon>
        <v-icon :color="workingStatus === 'working' ? '#9C27B0' : '#424242'">mdi-arrow-split-horizontal</v-icon>
        <v-icon :color="workingStatus === 'addon' ? '#9C27B0' : '#424242'">mdi-svg</v-icon>
        <v-icon :color="workingStatus === 'queued' ? '#9C27B0' : '#424242'">mdi-alarm</v-icon>
        <span v-if="workingStatus === 'queued'">{{queuePosition}}</span>
        <v-icon v-if="workingStatus === 'error'" color='#FF0000'>mdi-alert</v-icon>
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
  import IChamberInfo from '@/types/IChamberInfo'

  @Component
  export default class AppChamberInfo extends Vue {
    @Prop() chamberInfo!: IChamberInfo;
    @Prop({default: false}) clickable!: boolean;

    onClick(event: Event) {
      if (this.clickable)
        this.$router.push({ name: 'Control', params: { chamberNo: String(this.chamberInfo.no) }});
      else
        event.stopImmediatePropagation();
    }

    get workingStatus() {
      return this.chamberInfo.status.working;
    }

    get isAuto() {
      return this.chamberInfo.status.isAuto;
    }

    get queuePosition() {
      const pos = this.chamberInfo.status.queuePosition;

      return pos ? pos : 0;
    }

    get backGroundColor() {
      switch (this.workingStatus) {
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
        case 'error':
        default:
          return '#FF9999';
      }
    }

    tempHumOptions: ApexOptions = {
      chart: {
        id: this.groupId + '_1',
        animations: {
          enabled: false
        },
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
        formatter: (value, { seriesIndex, dataPointIndex, w }) => String(seriesIndex > 0 ? '  ' + Number(value).toFixed(1) + '%' : (Number(value) - 40).toFixed(1) + '°C  '),
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
          },
          decimalsInFloat: 0
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
          },
          decimalsInFloat: 0
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
        {name: 'Temp', data: [ this.chamberInfo.temperature + 40 ]},
        {name: 'Wilg', data: [ this.chamberInfo.humidity ]},
      ]
    }

    actuatorsOptions: ApexOptions = {
      chart: {
        id: this.groupId + '_2',
        animations: {
          enabled: false
        },
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
      const actual = this.chamberInfo.actualActuators;
      const setted = this.chamberInfo.setActuators;

      return [
        {name: "Wrtość aktualna", data: [ actual.inFlow, actual.outFlow, actual.throughFlow ]},
        {name: "Wrtość aktualna", data: [ actual.inFlow, actual.outFlow, actual.throughFlow ]},
        {name: "Wrtość ustawiona", data: [ setted.inFlow, setted.outFlow, setted.throughFlow ]},
      ]
    }
  }
</script>
