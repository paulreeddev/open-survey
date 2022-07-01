<template>
  <div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
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
                    Create Survey
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      @click="close"
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
                    <v-form @submit.prevent="submit" class="px-3">
                      <div v-if="requestData.image_url" class="relative">
                        <img
                          :src="requestData.image_url"
                          :alt="requestData.title"
                          class="w-full object-cover"
                        />
                        <div class="absolute right-0 top-0">
                          <label
                            for="file-upload"
                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>
                              <v-icon>mdi-pencil</v-icon>
                              <!-- <v-btn fab x-small depressed for="file-upload1">
                              </v-btn> -->
                            </span>
                            <input
                              @change="onImageChoose"
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                      <div v-else>
                        <label class="block text-sm font-medium text-gray-700">
                          Cover photo
                        </label>
                        <div
                          class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                        >
                          <div class="space-y-1 text-center">
                            <svg
                              class="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            <div
                              class="flex justify-center text-sm text-gray-600"
                            >
                              <label
                                for="file-upload"
                                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  @change="onImageChoose"
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  class="sr-only"
                                />
                              </label>
                            </div>
                            <p class="text-xs text-gray-500">
                              PNG, JPG, GIF up to 2MB
                            </p>
                          </div>
                        </div>
                      </div>

                      <v-text-field
                        class="mt-4"
                        v-model="requestData.title"
                        label="Title"
                        :error-messages="getErrorMessage('title')"
                        placeholder="e.g. VS Code Survey"
                        outlined
                      ></v-text-field>
                      <v-textarea
                        outlined
                        v-model="requestData.description"
                        class="mt-4"
                        :error-messages="getErrorMessage('description')"
                        name="input-7-4"
                        label="Description"
                      ></v-textarea>
                      <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="requestData.expire_date"
                            label="Expire Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            :error-messages="getErrorMessage('expire_date')"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="requestData.expire_date"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                      <v-switch
                        v-model="requestData.status"
                        label="Active"
                      ></v-switch>
                      <v-alert
                        dense
                        outlined
                        type="error"
                        dismissible
                        v-if="errorMessage"
                        class="mx-7"
                      >
                        {{ errorMessage }}
                      </v-alert>
                      <v-btn
                        class="w-full"
                        color="primary"
                        type="submit"
                        large
                        :loading="loading"
                        >Submit</v-btn
                      >
                    </v-form>
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
import { mapActions } from "vuex";
export default {
  props: ["close"],
  data() {
    return {
      menu2: false,
      requestData: {
        title: "",
        slug: "",
        survey_questions_JSON: "[]",
        status: false,
        description: null,
        image: null,
        image_url: null,
        expire_date: null,
      },
      loading: false,
      errors: null,
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions(["saveSurvey"]),
    onImageChoose(ev) {
      const file = ev.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        // The field to send on backend and apply validations
        this.requestData.image = reader.result;

        // The field to display here
        this.requestData.image_url = reader.result;
      };
      reader.readAsDataURL(file);
    },
    submit() {
      console.log(this.requestData);
      //   let action = "created";
      //   if (requestData.value.id) {
      //     action = "updated";
      //   }
      this.loading = true;
      this.saveSurvey({ ...this.requestData })
        .then(({ data }) => {
          this.loading = false;
          // store.commit("notify", {
          //   type: "success",
          //   message: "The survey was successfully " + action,
          // });
          this.$router.push({
            name: "survey",
            params: { id: data.data.id },
          });
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
    getErrorMessage(name) {
      if (this.errors) {
        if (this.errors.title && name == "title") {
          return this.errors.title;
        } else if (this.errors.description && name == "description") {
          return this.errors.description[0];
        } else if (this.errors.expire_date && name == "expire_date") {
          return this.errors.expire_date[0];
        } else {
          return "";
        }
      }
    },
  },
};
</script>
