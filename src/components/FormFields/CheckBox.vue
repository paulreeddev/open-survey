<template>
  <div>
    <v-checkbox v-model="value" :label="formfield.prompt"></v-checkbox>
  </div>
</template>
<script>
export default {
  props: ["formfield"],
  data() {
    return {
      value: false,
    };
  },
};
</script>
