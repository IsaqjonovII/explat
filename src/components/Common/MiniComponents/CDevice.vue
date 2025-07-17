<template>
  <div class="flex flex-col">
    <p class="font-semibold">
      <i class="icon-pnone text-primary text-lg font-semibold" />
      {{ title }}
    </p>
    <p>{{ id }} <i class="icon-copy text-primary font-semibold" /></p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  id: number;
  title: string;
}

defineProps<Props>();
</script>
