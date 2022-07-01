<template>
  <div>
    <div>{{ formfield.prompt }}</div>
    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="(option, index) in formfield.options"
        :key="index"
        :label="option.label"
        :value="option"
      ></v-radio>
    </v-radio-group>
  </div>
</template>
<script>
export default {
  props: ["formfield"],
  data() {
    return {
      radioGroup: 1,
      value: 0,
    };
  },
  methods: {
    onChange(value) {
      this.formfield.value = value;
    },
  },
};
</script>
