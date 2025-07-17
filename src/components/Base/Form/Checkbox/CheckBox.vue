<template>
  <label
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    :for="id"
    class="group inline-flex items-center relative select-none"
  >
    <span class="mr-2 !text-gray-13 flex-y-center gap-1">
      <slot name="label">
        <span
          :class="[labelStyles]"
          class="font-medium !text-gray-13 letter-3 leading-130 text-sm"
        >
          {{ label }}
        </span>
      </slot>
    </span>
    <input
      :key="checked"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      type="checkbox"
      v-bind="{ disabled, checked, value, name, id }"
      @change="handleChange"
    />
    <span
      :class="[
        {
          'peer-checked:-rotate-90 peer-checked:after:opacity-100 peer-checked:after:rotate-[138deg] after:transition-all after:duration-200 after:absolute after:left-2 after:top-1 after:w-2 after:h-3 after:border-r-[2.2px] after:border-b-[2.2px] after:rotate-[0deg] after:opacity-0':
            !partial,
        },
        {
          '-rotate-90 after:transition-all after:duration-200 after:absolute after:left-[9px] after:top-1 after:w-2 after:h-3 after:border-l-[2.2px] after:opacity-0 !border-[red] !bg-blue':
            partial,
        },
        {
          'border-red': error,
          'group-hover:border-blue': !disabled,
        },
        checkboxStyles,
      ]"
      class="shrink-0 duration-200 ease-in-out inline-block h-6 w-6 rounded bg-transparent border-2 border-gray-100 peer-checked:!border-yellow after:border-dark-black peer-checked:bg-yellow peer-disabled:border-gray-100 peer-disabled:after:border-gray-100"
    />
  </label>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import { TClassName } from "@/types/common";

interface Props {
  modelValue?: string | number | boolean;
  label?: string;
  id?: string;
  name?: string;
  value?: string | number | boolean;
  disabled?: boolean;
  error?: boolean;
  labelStyles?: TClassName;
  checked?: boolean;
  partial?: boolean;
  checkboxStyles?: TClassName;
  infoIcon?: boolean;
  infoText?: string;
}

const props = withDefaults(defineProps<Props>(), {});

watch(
  () => props.modelValue,
  (value) => {
    vm.value = value;
  }
);

const vm = ref([]);

const emit = defineEmits(["update:modelValue", "change"]);
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", props.value ? target?.value : target?.checked);
  emit("change", !props.value);
};
</script>
