<template>
  <v-main class="ma-2 pa-0">
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
                    :clickable="true"
    />
  </v-main>
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
