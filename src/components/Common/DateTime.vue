<template>
  <div>
    <p class="text-sm font-normal text-dark-black">
      {{ dayjs(date).format("DD.MM.YYYY") }}
    </p>
    <span v-if="timeIsReady" class="text-xs text-gray-1">
      {{ time }}
    </span>
    <span v-else class="text-xs text-gray-1">
      {{ dayjs(time).format("HH:mm") }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

interface Props {
  date: string;
  time: string;
  timeIsReady?: boolean;
}

defineProps<Props>();
</script>
