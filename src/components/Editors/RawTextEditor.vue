<template>
  <div class="bg-white h-full flex flex-col">
    <div class="h-full p-2">
      <v-textarea
        outlined
        dense
        rows="3"
        label="Text"
        v-model="formField.text"
      ></v-textarea>
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
    return {};
  },
  methods: {
    ...mapActions(["addFormField"]),
    submit() {
      this.addFormField(this.formField);
      this.close();
    },
  },
};
</script>
