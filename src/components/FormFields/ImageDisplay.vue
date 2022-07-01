<template>
  <div>
    <img :src="formfield.url" :alt="formfield.altText" />
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
};
</script>
