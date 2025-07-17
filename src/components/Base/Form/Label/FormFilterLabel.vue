<template>
  <div
    :class="labelClass"
    class="text-xs font-normal leading-130 text-dark-black flex flex-col gap-2"
  >
    {{ label }}
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { TClassName } from "@/types/common";

interface Props {
  label?: string;
  labelClass?: TClassName;
}

defineProps<Props>();
</script>
