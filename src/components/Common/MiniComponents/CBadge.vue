<template>
  <div
    class="w-max px-2 text-[16px] py-0.5 rounded-[6px]"
    :class="{
      'bg-green text-white': status === 'success',
      'bg-yellow-dark text-white': status === 'pending',
      'bg-red-light text-white': status === 'canceled',
    }"
  >
    {{ $t(`statuses.${status}`) }}
  </div>
</template>

<script lang="ts" setup>
type TStatus = "success" | "pending" | "canceled";

interface Props {
  status: TStatus;
}

defineProps<Props>();
</script>
