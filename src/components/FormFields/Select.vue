<template>
  <div>
    <div>{{ formfield.prompt }}</div>
    <v-select
      v-model="value"
      @change="onChange"
      :items="formfield.options"
      item-text="label"
      outlined
    ></v-select>
  </div>
</template>
<script>
export default {
  props: ["formfield"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onChange(value) {
      this.formfield.value = value;
    },
  },
};
</script>
