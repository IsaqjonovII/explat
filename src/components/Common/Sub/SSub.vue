<template>
  <div
    class="size-12 rounded-lg border-white/20 border-2 flex-center"
    :style="`background-color: ${color}; box-shadow: 0px 4px 20px ${color}80;`"
  >
    <i class="text-3xl text-white" :class="icon" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon: string;
  color?: string;
}

defineProps<Props>();
</script>
