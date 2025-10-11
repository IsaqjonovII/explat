<template>
  <label
    :class="[
      error
        ? '!bg-red-secondary !border-red'
        : 'focus-within:bg-white focus-within:border-blue-dark',
      {
        'read-only:focus-within:bg-gray-300 read-only:focus-within:border-transparent hover:bg-gray-5':
          readonly,
      },
    ]"
    :for="id"
    class="inline-flex items-center justify-start gap-2 h-10 relative transition-all duration-300 bg-gray-5 rounded-lg border border-transparent overflow-hidden w-full group cursor-text py-2.5 px-3"
    @click="inputEl.focus()"
  >
    <slot name="prefix" />
    <input
      ref="inputEl"
      v-model="value"
      :class="inputClass"
      autocomplete="off"
      class="w-full font-normal text-sm leading-4 text-dark-black placeholder:text-gray-1 bg-transparent flex-grow outline-none disabled:text-gray disabled:hover:cursor-not-allowed caret-blue-dark"
      v-bind="{
        id,
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
      }"
      @blur="$emit('blur')"
      @change="$emit('change')"
      @focus="$emit('focus')"
    />

    <slot name="suffix" />
  </label>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import type { InputProps } from "@/types/components";

defineProps<InputProps>();

interface Emits {
  (event: "blur"): void;

  (event: "focus"): void;

  (event: "change"): void;
}

defineEmits<Emits>();

const value = defineModel<string>();

const inputEl = ref();
defineExpose({ inputEl });
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
