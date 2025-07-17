<template>
  <div class="flex items-center gap-2">
    <p class="bg-white-2 text-gray-8 w-max px-2 rounded-[5px]">{{ name }}</p>
    <p class="bg-white-2 text-gray-8 w-max px-2 rounded-[5px]">
      {{ bank }} ({{ payment_method }})
    </p>
    <p>
      **** {{ number.toString().slice(0, 4) }}
      <i class="icon-copy text-primary font-semibold" />
    </p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  number: string;
  name: string;
  bank: string;
  payment_method: string;
}

defineProps<Props>();
</script>
