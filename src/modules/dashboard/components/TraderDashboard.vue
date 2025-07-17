<template>
  <div>
    <div class="grid grid-cols-4 my-6 gap-5">
      <CCard>
        <div class="flex gap-4 items-center">
          <SSub color="#27C28F" icon="icon-wallet" />
          <div class="flex flex-col">
            <span class="text-xl font-semibold">
              {{ formatMoneyDecimal(FakeTraderDashboard?.received?.total) }}
              {{ FakeTraderDashboard?.currency }}
            </span>
            <span class="text-gray-10">
              {{
                formatMoneyDecimal(
                  FakeTraderDashboard?.received?.crypto?.USDT?.total,
                )
              }}
              {{ FakeTraderDashboard?.received?.crypto?.USDT?.currency }}
            </span>
          </div>
        </div>
        <p class="mt-2.5 text-dark">{{ $t("dashboard.received") }}</p>
      </CCard>
      <CCard>
        <div class="flex gap-4 items-center">
          <SSub color="#EE5253" icon="icon-wallet" />
          <div class="flex flex-col">
            <span class="text-xl font-semibold">
              {{ formatMoneyDecimal(FakeTraderDashboard?.payouts?.total) }}
              {{ FakeTraderDashboard?.currency }}
            </span>
            <span class="text-gray-10">
              {{
                formatMoneyDecimal(
                  FakeTraderDashboard?.payouts?.crypto?.USDT?.total,
                )
              }}
              {{ FakeTraderDashboard?.payouts?.crypto?.USDT?.currency }}
            </span>
          </div>
        </div>
        <p class="mt-2.5 text-dark">{{ $t("dashboard.payouts") }}</p>
      </CCard>
      <CCard>
        <div class="flex gap-4 items-center">
          <SSub color="#C2278D" icon="icon-wallet" />
          <div class="flex flex-col">
            <span class="text-xl font-semibold">
              {{ formatMoneyDecimal(FakeTraderDashboard?.inbound?.total) }}
              {{ FakeTraderDashboard?.currency }}
            </span>
            <span class="text-gray-10">
              {{
                formatMoneyDecimal(
                  FakeTraderDashboard?.inbound?.crypto?.USDT?.total,
                )
              }}
              {{ FakeTraderDashboard?.inbound?.crypto?.USDT?.currency }}
            </span>
          </div>
        </div>
        <p class="mt-2.5 text-dark">{{ $t("dashboard.inbound") }}</p>
      </CCard>
      <CCard>
        <div class="flex gap-4 items-center">
          <SSub color="#FD9459" icon="icon-wallet" />
          <div class="flex flex-col">
            <span class="text-xl font-semibold">
              {{ formatMoneyDecimal(FakeTraderDashboard?.reserve?.total) }}
              {{ FakeTraderDashboard?.currency }}
            </span>
            <span class="text-gray-10">
              {{
                formatMoneyDecimal(
                  FakeTraderDashboard?.reserve?.crypto?.USDT?.total,
                )
              }}
              {{ FakeTraderDashboard?.reserve?.crypto?.USDT?.currency }}
            </span>
          </div>
        </div>
        <p class="mt-2.5 text-dark">{{ $t("dashboard.reserve") }}</p>
      </CCard>
    </div>
    <UserAttendanceChart />
    <div class="flex justify-center mt-6">
      <JustLogo class="h-[150px]" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CCard, SSub, JustLogo } from "@/components/Common";
import { FakeTraderDashboard } from "@/data/fake";
import { formatMoneyDecimal } from "@/utils";
import UserAttendanceChart from "@/modules/dashboard/components/UserAttendanceChart.vue";
</script>
