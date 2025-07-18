<template>
  <div class="flex flex-col items-center">
    <div class="h-3 rounded-lg w-[150px] border border-primary overflow-hidden">
      <div :style="`width: ${percentage}%`" class="h-full bg-primary"></div>
    </div>
    <div>
      <span class="text-sm font-medium text-dark-black">
        {{ current }}
      </span>
      /
      <span class="text-sm font-medium text-gray-1">
        {{ limit }}
      </span>
    </div>
  </div>
  <!--  <div>{{ current }}</div>-->
  <!--  <div>{{ limit }}</div>-->
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  current: string | number;
  limit: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  current: 0,
  limit: 0,
});

const percentage = computed(() => {
  return Math.round((props.current / props.limit) * 100);
});
</script>
