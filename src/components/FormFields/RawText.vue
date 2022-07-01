<template>
  <div>{{ formfield.text }}</div>
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
