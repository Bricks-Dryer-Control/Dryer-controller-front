<template>
  <v-content>
    <AppChamberInfo :no="1"
                    :temperature="-20"
                    :humidity="44"
                    :inflow="140"
                    :outflow="280"
                    :throughflow="480"
                    :inflowSet="140"
                    :outflowSet="340"
                    :throughflowSet="380"
                    :status="{working:'waiting', isAuto: true}"
    />
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppChamberInfo from '@/components/AppChamberInfo.vue'; // @ is an alias to /src

@Component({
  components: {
    AppChamberInfo,
  },
})
export default class Status extends Vue {}
</script>
