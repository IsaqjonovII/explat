<template>
  <div class="flex items-center gap-5">
    <h2 class="font-semibold text-2xl">{{ $t("dashboard.balance") }}</h2>
    <h2
      class="font-semibold bg-primary/20 p-1 px-2 rounded-lg text-primary text-xl"
    >
      {{ formatMoneyDecimal(dashboardData?.balance?.total) }}
      {{ dashboardData?.balance?.currency }}
    </h2>
    <h2>
      {{ formatMoneyDecimal(dashboardData?.balance?.crypto.USDT.total) }}
      {{ dashboardData?.balance?.crypto.USDT.currency }}
    </h2>
  </div>
</template>
<script setup lang="ts">
import { formatMoneyDecimal } from "@/utils";
import { FakeDashboard } from "@/data/fake";

const dashboardData = FakeDashboard;
</script>
