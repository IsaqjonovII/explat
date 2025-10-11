<template>
  <label
    :class="{ '!border-red': error }"
    class="grid grid-rows-1-max rounded-lg overflow-hidden border border-transparent transition-300 focus-within:border-blue-500 focus-within:bg-transparent"
  >
    <textarea
      v-model="modelValue"
      class="w-full h-full peer border-none outline-none resize-none p-3 font-normal text-sm leading-4 text-dark caret-blue placeholder:text-gray-1 caret-blue-primary bg-gray-5 transition-300"
      v-bind="{ placeholder, max, min, id }"
      @blur="$emit('blur')"
      @input="handleInput"
    />
    <span
      v-if="showMax && max"
      class="text-right block peer-focus:opacity-0 opacity-100 pr-2 pb-1 text-sm font-normal text-gray pointer-events-none"
    >
      {{ modelv?.length }}/{{ max }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import { defineComponent, watch } from "vue";

defineComponent({
  name: "FormTextarea",
});

interface Props {
  placeholder?: string;
  max?: number;
  min?: number;
  showMax?: boolean;
  error?: boolean;
  id: string;
}

type Emits = {
  (e: "blur"): void;
};
const props = defineProps<Props>();
defineEmits<Emits>();

const modelValue = defineModel<string>({ required: true });

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  modelValue.value = target.value;
};

watch(
  () => modelValue.value,
  () => {
    if (props?.max && modelValue.value?.length > props?.max) {
      modelValue.value = modelValue.value?.slice(0, props?.max);
      return;
    }
  }
);
</script>
