<template>
  <div>
    <div>{{ formfield.prompt }}</div>
    <v-text-field
      v-model="value"
      @change="onChange"
      hide-details
      outlined
    ></v-text-field>
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
