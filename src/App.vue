<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-row>
        <v-btn class="mr-2" to="/Status">Status</v-btn>
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
      <Footer />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from '@/components/AppFooter.vue'

export default Vue.extend({
  name: 'App',
  components: { Footer }
});
</script>
