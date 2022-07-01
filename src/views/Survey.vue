<template>
  <div class="h-screen w-screen flex flex-col bg-gray-100 overflow-hidden">
    <div class="h-full w-full flex justify-center overflow-hidden">
      <div class="h-full w-full flex flex-col max-w-6xl overflow-hidden">
        <div class="h-20 w-full flex justify-between items-center px-5 py-3">
          <div class="flex items-center">
            <router-link target="_blank" :to="'/survey/' + currentSurvey.slug">
              <v-btn icon class="ml-2">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </router-link>
            <div class="text-4xl">{{ currentSurvey.title }}</div>
            <span
              v-if="currentSurvey.status"
              class="ml-2 bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
              >Not Active</span
            >
            <span
              v-else
              class="ml-2 bg-green-300 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-300 dark:text-green-900"
              >Active</span
            >
          </div>
          <div class="flex">
            <v-btn color="primary" depressed @click="submit" :loading="loading">
              Save
            </v-btn>
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="ml-2">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-if="currentSurvey.status"
                  @click="activateSurvey"
                >
                  <v-list-item-title>Activate</v-list-item-title>
                </v-list-item>
                <v-list-item v-else @click="deactivateSurvey">
                  <v-list-item-title>Deactivate</v-list-item-title>
                </v-list-item>
                <v-list-item @click="removeSurvey">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div class="h-20 w-full flex justify-center items-center px-5 py-3">
          <div class="flex bg-gray-300 text-sm p-1 rounded-lg">
            <div
              class="p-2 px-5 cursor-pointer"
              @click="selectTab('editor')"
              :class="{
                'bg-white rounded-md shadow-xl': selectedTab == 'editor',
              }"
            >
              Editor
            </div>
            <div
              class="p-2 px-5 cursor-pointer"
              @click="selectTab('preview')"
              :class="{
                'bg-white rounded-md shadow-xl': selectedTab == 'preview',
              }"
            >
              Preview
            </div>
            <div
              class="p-2 px-5 cursor-pointer"
              @click="selectTab('answers')"
              :class="{
                'bg-white rounded-md shadow-xl': selectedTab == 'answers',
              }"
            >
              Answers
            </div>
          </div>
        </div>
        <div
          class="h-full w-full flex justify-start overflow-hidden"
          v-if="selectedTab != 'answers'"
        >
          <div class="w-72 h-full pt-4" v-if="selectedTab == 'editor'">
            <div
              v-for="(dataType, index) in dataTypes"
              :key="index"
              @click="selectDataType(dataType)"
              :class="{
                'border-blue-600 border-2 border-l-4 bg-white':
                  dataType.selected && showAddForm,
              }"
              class="w-full h-12 rounded-lg mb-0 flex items-center px-5 cursor-pointer hover:border-2 hover:border-l-4"
            >
              {{ dataType.name }}
            </div>
          </div>
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
            </div>
          </div>
        </div>
        <div
          class="h-full w-full flex justify-center overflow-hidden text-lg"
          v-else
        >
          Coming Soon
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
    this.getSurvey(this.$route.params.id);
    console.log(this.currentSurvey);
  },
  data() {
    return {
      showAddForm: false,
      selectedDataType: {},
      selectedFormField: null,
      selectedTab: "editor",
      dataTypes: [
        {
          abbrevation: "TB",
          name: "Text Box",
          selected: true,
        },
        {
          abbrevation: "TA",
          name: "Text Area",
          selected: false,
        },
        {
          abbrevation: "DT",
          name: "Date",
          selected: false,
        },
        {
          abbrevation: "TM",
          name: "Time",
          selected: false,
        },
        {
          abbrevation: "SL",
          name: "Select",
          selected: false,
        },
        {
          abbrevation: "RB",
          name: "Radio Button",
          selected: false,
        },
        {
          abbrevation: "CB",
          name: "Check Box",
          selected: false,
        },
        {
          abbrevation: "CBL",
          name: "Check Box List",
          selected: false,
        },
        {
          abbrevation: "RT",
          name: "Raw Text",
          selected: false,
        },
        {
          abbrevation: "IM",
          name: "Image",
          selected: false,
        },
      ],
      loading: false,
      errors: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters(["formfields", "currentSurvey"]),
  },
  methods: {
    // "updateSurvey"
    ...mapActions([
      "deleteFormField",
      "getSurvey",
      "deleteSurvey",
      "saveSurvey",
      "showMessage",
    ]),
    selectDataType(dataType) {
      this.selectedDataType = dataType;
      // this.selectedFormField.dataType = this.selectedDataType;
      if (
        dataType.abbrevation == "TB" ||
        dataType.abbrevation == "TA" ||
        dataType.abbrevation == "TM" ||
        dataType.abbrevation == "DT" ||
        dataType.abbrevation == "CB"
      ) {
        this.selectedFormField = {
          dataType: dataType,
          prompt: "",
          description: "",
          required: false,
        };
      } else if (
        dataType.abbrevation == "SL" ||
        dataType.abbrevation == "RB" ||
        dataType.abbrevation == "CBL"
      ) {
        this.selectedFormField = {
          dataType: dataType,
          prompt: "",
          description: "",
          required: false,
          options: [
            {
              label: "Option 1",
              selected: false,
            },
          ],
        };
      } else if (dataType.abbrevation == "RT") {
        this.selectedFormField = {
          dataType: dataType,
          text: "",
        };
      } else if (dataType.abbrevation == "IM") {
        this.selectedFormField = {
          dataType: dataType,
          url: "",
          altText: "",
        };
      }

      this.showAddForm = true;
      this.dataTypes.forEach((dt) => {
        dt.selected = false;
      });
      dataType.selected = true;
    },
    editFormField(formField) {
      this.selectedFormField = formField;
      this.showAddForm = true;
      this.dataTypes.forEach((dt) => {
        if (dt.abbrevation == formField.dataType.abbrevation) {
          dt.selected = true;
        } else {
          dt.selected = false;
        }
      });
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
    close() {
      this.showAddForm = false;
    },
    submit() {
      this.loading = true;
      this.saveSurvey(this.currentSurvey)
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
    },
    activateSurvey() {
      this.currentSurvey.active = true;
    },
    deactivateSurvey() {
      this.currentSurvey.active = false;
    },
    removeSurvey() {
      this.deleteSurvey(this.currentSurvey.id);
      this.$router.push("/surveys");
    },
  },
};
</script>
