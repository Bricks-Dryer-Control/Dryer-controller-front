<template>
  <div>
    <AppHistoryChart />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import AppHistoryChart from '@/components/AppHistoryChart.vue'

@Component({
  components: {
    AppHistoryChart
  }
})
export default class History extends Vue {
  
}
</script>
