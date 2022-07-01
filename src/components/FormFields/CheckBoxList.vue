<template>
  <div>
    <div>{{ formfield.prompt }}</div>
    <v-checkbox
      hide-details
      v-for="(option, index) in formfield.options"
      :key="index"
      v-model="option.selected"
      @change="onChange(option)"
      :label="option.label"
    ></v-checkbox>
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
      console.log(this.formfield, this.formfield.options);
      var selectedValues = [];
      this.formfield.options.forEach(function (option) {
        if (option.selected) {
          selectedValues.push(option.label);
        }
      });
      this.formfield.value = JSON.stringify(selectedValues);
    },
  },
};
</script>
