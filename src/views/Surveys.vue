<template>
  <div class="h-full w-full flex justify-center">
    <div class="h-full w-full flex flex-col max-w-6xl">
      <div class="h-20 w-full flex justify-between items-center px-5">
        <div class="text-4xl">Forms</div>
        <v-btn color="primary" depressed @click="showAddForm = true">
          <v-icon left> mdi-plus </v-icon>
          Create New
        </v-btn>
      </div>
      <div class="h-full w-full flex-wrap flex justify-start items-start">
        <div
          v-for="(item, index) in surveys"
          :key="index"
          class="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md mx-5 my-3"
        >
          <a href="#">
            <img
              class="rounded-t-lg p-3"
              :src="item.image_url"
              :alt="item.title"
            />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {{ item.title }}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700">
              {{ item.description }}
            </p>
            <router-link
              :to="'surveys/' + item.id"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 text-white cursor-pointer"
            >
              <span class="text-white">Editor</span>

              <svg
                class="ml-2 -mr-1 w-4 h-4 fill-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <CreateSurvey v-if="showAddForm" :close="close"></CreateSurvey>
  </div>
</template>
<script>
import CreateSurvey from "@/components/CreateSurvey.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Surveys",
  components: {
    CreateSurvey,
  },
  created() {
    this.getSurveys();
  },
  data() {
    return {
      showAddForm: false,
    };
  },
  computed: {
    ...mapGetters(["surveys"]),
  },
  methods: {
    ...mapActions(["getSurveys"]),
    close() {
      this.showAddForm = false;
    },
  },
};
</script>
