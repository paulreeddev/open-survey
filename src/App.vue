<template>
  <v-app>
    <v-main>
      <router-view />
      <v-snackbar v-model="snackbar">
        {{ snackbarMessage }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["snackbar", "snackbarMessage"]),
  },
};
</script>
