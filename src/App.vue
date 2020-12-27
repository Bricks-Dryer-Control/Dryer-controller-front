<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-row>
        <v-btn class="mr-2" to="/">Status</v-btn>
        <v-btn class="mr-2" to="/Control">Kontrola komory</v-btn>
        <v-btn class="mr-2" to="/Additional">Dodatkowe</v-btn>
        <v-btn class="mr-2" to="/History">Historia</v-btn>
        <v-btn class="mr-2" to="/Errors">Stany błędów</v-btn>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>

    <v-footer class="py-0" app>
      <v-row align="center">
        <v-col class="py-0" cols="2">
          <v-text-field value="25"
                        label="Włączonych komór"
                        type="number"
                        readonly /> 
        </v-col>
        <v-col class="py-0" cols="2">
          <v-text-field value="0"
                        label="Działających komór"
                        type="number"
                        readonly /> 
        </v-col>
        <v-col class="py-0" cols="2">
          <v-text-field value="0"
                        label="Komór w kolejce"
                        type="number"
                        readonly /> 
        </v-col>
        <v-col class="py-0" cols="2">
          <v-switch value="true"
                    label="Czujnik kierunku"
                    readonly />
        </v-col>
        <v-col class="py-0" cols="4">
          <v-btn large
            block 
            color="error">
            
            STOP<br>Awaryjny
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'App'
});
</script>
