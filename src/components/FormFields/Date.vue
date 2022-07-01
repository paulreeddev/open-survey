<template>
  <div>
    <div>{{ formfield.prompt }}</div>
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="value"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        @change="onChange"
        v-model="value"
        @input="menu2 = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: ["formfield"],
  data() {
    return {
      value: "",
      menu2: false,
    };
  },
  methods: {
    onChange(value) {
      this.formfield.value = value;
    },
  },
};
</script>
