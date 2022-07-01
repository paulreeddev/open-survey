<template>
  <div class="p-3 px-5">
    <TextArea
      :formfield="formfield"
      v-if="formfield.dataType.abbrevation == 'TA'"
    />
    <TextBox
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'TB'"
    />
    <CheckBox
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'CB'"
    />
    <CheckBoxList
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'CBL'"
    />
    <Date
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'DT'"
    />
    <RadioButton
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'RB'"
    />
    <Select
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'SL'"
    />
    <Time
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'TM'"
    />
    <RawText
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'RT'"
    />
    <ImageDisplay
      :formfield="formfield"
      v-else-if="formfield.dataType.abbrevation == 'IM'"
    />
  </div>
</template>
<script>
import TextArea from "./TextArea.vue";
import TextBox from "./TextBox.vue";
import CheckBox from "./CheckBox.vue";
import CheckBoxList from "./CheckBoxList.vue";
import Date from "./Date.vue";
import RadioButton from "./RadioButton.vue";
import Select from "./Select.vue";
import Time from "./Time.vue";
import RawText from "./RawText.vue";
import ImageDisplay from "./ImageDisplay.vue";

export default {
  name: "form-field",
  props: ["formfield"],
  components: {
    TextArea,
    TextBox,
    CheckBox,
    CheckBoxList,
    Date,
    RadioButton,
    Select,
    Time,
    RawText,
    ImageDisplay,
  },
};
</script>
