<template>
  <v-content>
    <AppChamberInfo title="Komora 1"
                    :temperature="-20"
                    :humidity="44"
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
