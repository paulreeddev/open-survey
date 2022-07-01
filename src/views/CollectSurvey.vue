<template>
  <div class="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
    <div class="h-full w-full flex justify-center overflow-hidden">
      <div class="h-full w-full flex flex-col max-w-6xl overflow-hidden">
        <div class="h-full w-full flex justify-start overflow-hidden">
          <div class="w-full h-full flex justify-center items-start py-4">
            <div
              class="h-full flex flex-col bg-white shadow-md overflow-hidden sm:rounded-lg w-full max-w-2xl"
            >
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ currentSurvey.title }}
                </h3>
                <p class="mt-1 w max-w-2xl text-sm text-gray-500">
                  {{ currentSurvey.description }}
                </p>
              </div>
              <div
                class="h-full flex flex-col border-y border-gray-200 bg-gray-50 overflow-auto overflow-y-scroll"
              >
                <div
                  v-for="(formfield, index) in formfields"
                  :key="index"
                  class="odd:bg-white even:bg-transparent"
                >
                  <div class="flex items-center">
                    <DynamicFormField :formfield="formfield" class="w-full" />
                    <div v-if="selectedTab == 'editor'">
                      <v-btn
                        x-small
                        fab
                        depressed
                        @click="editFormField(formfield)"
                      >
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn
                        x-small
                        fab
                        depressed
                        class="mt-2"
                        @click="deleteFormField(formfield)"
                      >
                        <v-icon color="red">mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <!-- {{ formfield }} -->
                </div>
              </div>
              <div class="p-3">
                <v-btn color="primary" :loading="loading" @click="submit"
                  >Submit</v-btn
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showAddForm"
      class="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="showAddForm = false"
      ></div>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <div class="pointer-events-auto w-screen max-w-md">
              <div class="flex h-full overflow-hidden bg-white shadow-xl">
                <div
                  class="flex flex-col overflow-y-auto py-6 px-4 sm:px-6 w-full"
                >
                  <div class="flex items-start justify-between">
                    <h2
                      class="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Edit {{ selectedDataType.name }}
                    </h2>
                    <div class="ml-3 flex h-7 items-center">
                      <button
                        @click="showAddForm = false"
                        type="button"
                        class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Close panel</span>
                        <!-- Heroicon name: outline/x -->
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="mt-8 h-full w-full overflow-hidden">
                    <div class="flow-root h-full overflow-hidden">
                      <data-type-editor
                        :formField="selectedFormField"
                        :close="close"
                        class="h-full overflow-auto overflow-y-scroll"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DataTypeEditor from "@/components/Editors/DataTypeEditor.vue";
import DynamicFormField from "@/components/FormFields/DynamicFormField.vue";
export default {
  components: { DataTypeEditor, DynamicFormField },
  name: "survey",
  created() {
    this.getSurveyBySlug(this.$route.params.slang);
  },
  data() {
    return {
      showAddForm: false,
      selectedDataType: {},
      selectedFormField: null,
      selectedTab: "preview",
      loading: false,
      errors: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters(["formfields", "currentSurvey"]),
  },
  methods: {
    ...mapActions(["getSurveyBySlug", "showMessage", "saveSurveyAnswer"]),
    close() {
      this.showAddForm = false;
    },
    submit() {
      var answers = [];
      this.formfields.forEach((formfield) => {
        answers.push({
          formfield_id: formfield.id,
          prompt: formfield.prompt,
          value: formfield.value,
        });
        console.log(formfield.id, formfield.value);
      });
      console.log(this.currentSurvey.id);
      var JSONAnswers = JSON.stringify(answers);
      this.saveSurveyAnswer(JSONAnswers)
        .then(({ data }) => {
          this.loading = false;
          this.showMessage("Survey saved successfully");
          console.log("it is done!!!");
        })
        .catch((err) => {
          this.loading = false;
          if (err.response.data) {
            this.errors = err.response.data.errors;
            this.errorMessage = err.response.data.message;
            if (!this.errorMessage) {
              this.errorMessage = err.response.data.error;
            }
          } else {
            this.errorMessage = err.message;
          }

          console.log(err);
        });
      // this.loading = true;
    },
  },
};
</script>
