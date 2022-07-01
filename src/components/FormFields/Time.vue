<template>
  <div>
    <div>{{ formfield.prompt }}</div>
    <v-menu
      ref="menu"
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="value"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="value"
          label="Picker in menu"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="menu2"
        v-model="value"
        @change="onChange"
        full-width
        @click:minute="$refs.menu.save(value)"
      ></v-time-picker>
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
