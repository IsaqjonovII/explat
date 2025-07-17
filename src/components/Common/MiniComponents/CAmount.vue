<template>
  <div>
    <p class="text-base font-semibold">
      {{ formatMoneyDecimal(amount) }} {{ currency }}
    </p>
    <p class="text-xs text-gray-1">
      {{ formatMoneyDecimal(crypto.amount) }} {{ crypto.currency }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { formatMoneyDecimal } from "@/utils";

interface Props {
  amount: number;
  currency: string;
  crypto: {
    amount: number;
    currency: string;
  };
}

defineProps<Props>();
</script>
