<template>
  <label
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    :style="{ minHeight: computedSize, '--btn-size': computedBtnSize }"
    class="transition group inline-flex items-center relative select-none min-h-[16px]"
  >
    <input
      :checked="modelValue === value"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      type="radio"
      v-bind="{ name: name || '', value, disabled: disabled || false }"
      @change="handleChange"
    />
    <span
      :class="[computedBtnStyles]"
      :style="{ width: computedSize, height: computedSize }"
      class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 before:opacity-0 before:bg-blue-primary relative border-2 rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-1 peer-disabled:before:bg-white"
    />
    <slot>
      <span
        :class="[
          modelValue === value ? activeStyles : labelStyles || 'text-gray-700',
        ]"
        class="font-normal text-sm leading-130 transition-300"
      >
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  modelValue: string | number | object;
  value?: string | number | object;
  label?: string | number | object;
  name?: string | number;
  disabled?: boolean;
  size?: string | number;
  btnStyles?: string;
  labelStyles?: string;
  activeClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 16,
  activeClass: "text-blue",
  labelStyles: "",
  btnStyles:
    " group-hover:border-blue-primary peer-checked:border-primary peer-checked:border-4",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | object | boolean): void;
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", props.value ?? target.value);
};

const computedSize = computed(() => props.size + "px");

const computedBtnSize = computed(() => +props.size * 0.5 + "px");

const computedBtnStyles = computed(() => {
  const baseStyles = props.disabled
    ? "peer-checked:before:!bg-gray-100"
    : props.btnStyles;
  return `${baseStyles} ${
    props.modelValue === props.value ? "peer-checked:border-blue" : ""
  }`;
});

const activeStyles = computed(() => props.activeClass || "text-blue");
</script>
