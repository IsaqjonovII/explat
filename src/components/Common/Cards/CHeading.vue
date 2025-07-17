<template>
  <div
    class="flex-shrink-0 items-center mt-6 flex justify-between p-4 bg-white rounded-xl relative"
  >
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>
