<template>
  <div>
    <TextAreaEditor
      :formField="formField"
      :close="close"
      v-if="formField.dataType.abbrevation == 'TA'"
    />
    <TextBoxEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'TB'"
    />
    <CheckBoxEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'CB'"
    />
    <CheckBoxListEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'CBL'"
    />
    <DateEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'DT'"
    />
    <RadioButtonEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'RB'"
    />
    <SelectEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'SL'"
    />
    <TimeEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'TM'"
    />
    <RawTextEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'RT'"
    />
    <ImageEditor
      :formField="formField"
      :close="close"
      v-else-if="formField.dataType.abbrevation == 'IM'"
    />
  </div>
</template>
<script>
import TextAreaEditor from "./TextAreaEditor.vue";
import TextBoxEditor from "./TextBoxEditor.vue";
import CheckBoxEditor from "./CheckBoxEditor.vue";
import CheckBoxListEditor from "./CheckBoxListEditor.vue";
import DateEditor from "./DateEditor.vue";
import RadioButtonEditor from "./RadioButtonEditor.vue";
import SelectEditor from "./SelectEditor.vue";
import TimeEditor from "./TimeEditor.vue";
import RawTextEditor from "./RawTextEditor.vue";
import ImageEditor from "./ImageEditor.vue";

export default {
  name: "data-type-editor",
  props: ["formField", "close"],
  components: {
    TextAreaEditor,
    TextBoxEditor,
    CheckBoxEditor,
    CheckBoxListEditor,
    DateEditor,
    RadioButtonEditor,
    SelectEditor,
    TimeEditor,
    RawTextEditor,
    ImageEditor,
  },
};
</script>
