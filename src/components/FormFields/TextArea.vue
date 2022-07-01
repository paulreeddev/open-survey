<template>
  <div>
    <div>{{ formfield.prompt }}</div>
    <v-textarea v-model="value" @change="onChange" outlined></v-textarea>
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
