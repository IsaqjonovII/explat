<template>
  <label
    :class="[{ '!cursor-not-allowed': disabled }, $attrs.class]"
    :for="id"
    class="cursor-pointer flex-y-center gap-4 w-max"
  >
    <div
      :class="[
        modelValue ? 'bg-blue' : 'bg-gray-3',
        { '!cursor-not-allowed': disabled },
      ]"
      class="flex relative w-11 h-6 rounded-[48px] cursor-pointer transition-200"
    >
      <input
        :checked="modelValue"
        autocomplete="off"
        class="absolute w-px h-px opacity-0 peer"
        type="checkbox"
        v-bind="{ disabled, id }"
        @input="modelValue = !modelValue"
      />
      <span
        :class="
          modelValue ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'
        "
        class="absolute size-5 rounded-full top-0.5 left-0.5 transition-all duration-200 peer-disabled:bg-gray-500 peer-disabled:translate-x-0"
      />
    </div>
    <slot>
      <span
        :class="[{ 'text-gray': disabled }, labelClass]"
        class="text-dark text-sm font-normal leading-130 select-none"
      >
        {{ label }}
      </span>
    </slot>
  </label>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";

import type { TClassName } from "@/types/common";

interface Props {
  disabled?: boolean;
  label?: string;
  labelClass?: TClassName;
  id: string;
}

defineComponent({
  name: "FormToggle",
});

withDefaults(defineProps<Props>(), {
  label: "",
  labelClass: "",
  disabled: false,
  id: "form-input-toggle",
});
const modelValue = defineModel<boolean>({ required: true });
</script>
