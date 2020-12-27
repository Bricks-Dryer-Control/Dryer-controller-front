<template>
  <v-main class="ma-0 pa-0">
    <v-row class="ma-2">
      <div  v-for="chamber in chambers"
            :key="chamber"
            class="pa-1 ma-0">
        <AppChamberInfo :no="chamber"
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
      </div>
    </v-row>
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
export default class Status extends Vue {
  chambers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
}
</script>
