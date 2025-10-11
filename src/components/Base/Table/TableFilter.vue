<template>
  <div
    :class="$attrs['class']"
    class="grid grid-cols-3 xl:grid-cols-4 gap-4 w-full"
  >
    <FormGroup
      v-for="field in fields"
      :key="field.key"
      :for-text="field.key"
      :label="`form.label.${field.key}`"
    >
      <template v-if="field.type === 'withApi'">
        <FormSelectInfinitive
          :id="field.key"
          v-model="form[field.key]"
          :api="field.api"
          :disabled="!field.api"
          :default-value-key="field.defaultValueKey"
          :label-key="field.labelKey || 'label'"
          :placeholder="`form.placeholder.${field.key}`"
          :save-name="field.saveName"
          :selected-option-styles="
            field.selectedOptionStyles || 'bg-white border-white'
          "
          :value-key="field.valueKey || 'value'"
          trigger-class="bg-white"
        />
      </template>
      <template v-else>
        <FormSelect
          :id="field.key"
          v-model="form[field.key] as TSelectOption"
          :label-key="field.labelKey || 'label'"
          :options="field.options"
          :placeholder="`form.placeholder.${field.key}`"
          :selected-option-styles="
            field.selectedOptionStyles || 'bg-white border-white'
          "
          :value-key="field.valueKey || 'value'"
        />
      </template>
    </FormGroup>
  </div>
</template>

<script lang="ts" setup>
import { FormGroup, FormSelect, FormSelectInfinitive } from "@/components/Base";
import type { TableFilterProps } from "@/types/components";
import { TSelectOption } from "../Form/Select/Select";

defineProps<TableFilterProps>();
const form = defineModel<Record<string, string>>({
  required: true,
});
</script>
