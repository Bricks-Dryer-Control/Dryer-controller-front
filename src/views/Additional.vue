<template>
  <v-main class="ma-0 pa-0">
    <v-row class="pa-0" style="justify-content: center">
      <AppAddonRoofControl class="px-2 ma-2"
                          name="Dach 1"
                          :roofActual="360"
                          :roofStatus="{working: 'working', isAuto: false}"
                          :throughActual="120"
                          :throughStatus="{working: 'working', isAuto: false}">
      </AppAddonRoofControl>
      <AppAddonRoofControl class="px-2 ma-2" 
                          name="Dach 2"
                          :roofActual="240"
                          :roofStatus="{working: 'working', isAuto: false}"
                          :throughActual="0"
                          :throughStatus="{working: 'queued', isAuto: false, queuePosition: 1 }">
      </AppAddonRoofControl>
      <AppAddonRoofControl class="px-2 ma-2" 
                          name="Dach 3"
                          :roofActual="0"
                          :roofStatus="{working: 'waiting', isAuto: false}"
                          :throughActual="480"
                          :throughStatus="{working: 'waiting', isAuto: false}">
      </AppAddonRoofControl>
      <AppAddonRoofControl class="px-2 ma-2" 
                          name="Dach 4"
                          :roofActual="480"
                          :roofStatus="{working: 'waiting', isAuto: false}"
                          :throughActual="0"
                          :throughStatus="{working: 'waiting', isAuto: false}">
      </AppAddonRoofControl>
      <AppAddonOtherControl class="px-2 ma-2" 
                            name="Went 1"
                            :actual="120"
                            :status="{working: 'waiting', isAuto: false}">
      </AppAddonOtherControl>
      <AppAddonOtherControl class="px-2 ma-2" 
                            name="Went 2"
                            :actual="240"
                            :status="{working: 'waiting', isAuto: false}">
      </AppAddonOtherControl>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import AppAddonRoofControl from '@/components/AppAddonRoofControl.vue'
import AppAddonOtherControl from '@/components/AppAddonOtherControl.vue'

@Component({
  components: {
    AppAddonRoofControl,
    AppAddonOtherControl,
  }
})
export default class Additional extends Vue {
  
}
</script>
