<template>
  <div class="h-screen w-screen">
    <div class="h-full w-full flex flex-col" v-if="user.email">
      <div
        class="h-20 w-full bg-[#0747A6] flex items-center justify-between px-8"
      >
        <router-link to="/">
          <img
            src="../assets/open-survey-logo-white.png"
            alt="logo"
            class="h-16 mt-2"
        /></router-link>
        <div class="flex text-white">
          <div class="flex flex-col items-end mx-3 text-sm">
            <div>{{ user.email }}</div>
            <div>{{ user.name }}</div>
          </div>
          <v-menu v-model="showMenu" absolute offset-y style="max-width: 600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab color="white" v-bind="attrs" v-on="on" small depressed>
                AB
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="logout">
                <v-list-item-title>Log out</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <router-view />
    </div>
    <div v-else class="flex justify-center items-center h-full">
      <v-progress-circular
        :size="80"
        :width="7"
        large
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  created() {
    this.getUser();
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["logout", "getUser"]),
  },
};
</script>
