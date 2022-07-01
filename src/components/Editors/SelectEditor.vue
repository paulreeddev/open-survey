<template>
  <div class="bg-white h-full flex flex-col">
    <div class="h-full p-2">
      <v-text-field
        label="Prompt *"
        dense
        placeholder="Placeholder"
        outlined
        v-model="formField.prompt"
      ></v-text-field>
      <v-textarea
        outlined
        dense
        rows="3"
        label="Description"
        v-model="formField.description"
      ></v-textarea>
      Options
      <div
        v-for="(option, index) in formField.options"
        :key="index"
        class="flex items-center my-3"
      >
        <v-btn
          fab
          elevation="0"
          x-small
          class="mr-2"
          @click="removeOption(index)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-text-field
          label="Option"
          hide-details=""
          dense
          outlined
          v-model="option.label"
        ></v-text-field>
      </div>
      <v-text-field
        label="Option"
        dense
        @keyup.enter="addOption"
        outlined
        v-model="newOption"
      ></v-text-field>
      <v-checkbox label="Required" v-model="formField.required"></v-checkbox>
    </div>
    <div
      @click="submit"
      class="w-full flex justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer p-3 rounded-lg text-white"
    >
      ADD
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["formField", "close"],
  data() {
    return {
      newOption: "",
    };
  },
  methods: {
    ...mapActions(["addFormField"]),
    submit() {
      this.addFormField(this.formField);
      this.close();
    },
    addOption() {
      this.formField.options.push({
        label: this.newOption,
        selected: false,
      });
      this.newOption = "";
    },
    removeOption(index) {
      this.formField.options.splice(index, 1);
    },
  },
};
</script>
