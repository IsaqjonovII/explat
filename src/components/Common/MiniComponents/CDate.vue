<template>
  <div>
    <div class="flex items-center gap-1.5">
      <p class="text-sm">{{ $t("dates.created_at") }}</p>
      <p class="text-sm font-semibold text-dark-black">
        {{ dayjs(date).format("DD.MM.YYYY") }}
      </p>
      <span v-if="timeIsReady" class="text-xs text-gray-1">
        {{ time }}
      </span>
      <span v-else class="text-sm text-gray-1">
        {{ dayjs(time).format("HH:mm") }}
      </span>
    </div>
    <div class="flex items-center mt-1 gap-1.5">
      <p class="text-sm">{{ $t("dates.end_at") }}</p>
      <p class="text-sm font-semibold text-dark-black">
        {{ dayjs(pending_date).format("DD.MM.YYYY") }}
      </p>
      <span v-if="pendingIsReady" class="text-xs text-gray-1">
        {{ pending_time }}
      </span>
      <span v-else class="text-sm text-gray-1">
        {{ dayjs(pending_time).format("HH:mm") }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";

interface Props {
  date: string;
  time: string;
  timeIsReady?: boolean;
  pendingIsReady?: boolean;
  pending_date?: string;
  pending_time?: string;
}

defineProps<Props>();
</script>
