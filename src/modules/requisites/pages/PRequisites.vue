<template>
  <section>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :hasAddButton="{
          title: $t('add_requisite'),
        }"
        @add="addRequisite"
        :loading="isLoading"
        :title="$t('requisites.title')"
        :subtitle="$t('requisites.count', { count: pagination.total })"
        :total="pagination.total"
        :filter="{ status }"
        v-bind="tableSettings()"
        @click-to-row="openTransaction"
        @page-change="onPageChange"
      >
        <template #id="{ data }">
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium text-dark-black">
              {{ data?.id }}
              <i class="icon-copy text-primary font-semibold" />
            </span>
          </div>
        </template>
        <template #balance="{ data }">
          <CAmount
            :amount="data?.amount?.amount"
            :currency="data?.amount?.currency"
            :crypto="{
              amount: data?.amount?.crypto?.USDT?.amount,
              currency: data?.amount?.crypto?.USDT?.currency,
            }"
          />
        </template>

        <template #bank_method="{ data }">
          <span>{{ data?.bank?.name }}</span>
        </template>

        <template #requisites="{ data }">
          <CReqisites
            :number="data?.card_number"
            :name="data?.owner_full_name"
            :bank="data?.bank?.name"
            :payment_method="data?.payment_method?.name"
          />
        </template>

        <template #indicator="{ data }">
          <div class="w-full flex items-start">
            <CLimitIndicator
              :limit="data?.max_amount"
              :current="data?.min_amount"
            />
          </div>
        </template>

        <template #actions="{ data }">
          <BaseButton
            class="min-w-[200px]"
            :variant="data?.status"
            :text="$t('conditions.' + data?.status)"
          />
        </template>

        <template #filter>
          <div class="flex gap-5">
            <FormFilterLabel :label="$t('filter.condition')">
              <FormSelect
                v-model="status"
                :options="RequisitesFilterStatus()"
                value-key="key"
                option-styles="hover:bg-gray-6"
                selected-option-styles="border-none rounded-lg bg-white"
                class="min-w-64"
              />
            </FormFilterLabel>
            <FormFilterLabel :label="$t('interval_of_time')">
              <FilterDateRange
                class="bg-white"
                start-date-key="created_at__gte"
                end-date-key="created_at__lte"
              />
            </FormFilterLabel>
          </div>
        </template>
      </BaseTable>
      <AddRequisiteForm v-model="addRequisiteModal" />
    </div>
    <!--    <InfoModal-->
    <!--      :data="transactionModalItem"-->
    <!--      :modal-value="transactionModal"-->
    <!--      @close="transactionModal = false"-->
    <!--    />-->
  </section>
</template>

<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import { ref } from "vue";

import { BaseButton, BaseTable, FormSelect } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import AddRequisiteForm from "@/modules/requisites/components/AddRequisiteForm.vue";
import {
  tableHead,
  tableSettings,
  RequisitesFilterStatus,
} from "@/modules/requisites/data/PRequisites";
import { CAmount, CReqisites, CLimitIndicator } from "@/components/Common";
import { useI18n } from "vue-i18n";
import { useTableFetch } from "@/composables/useTableFetch";
import type { IRequisite } from "@/modules/requisites/api/requisitesApi";
import { onMounted, onUnmounted } from "vue";

const { t } = useI18n();

const status = useRouteQuery("status", t("conditions.all"));

// Prepare initial parameters for API filtering
const getInitialParams = () => {
  const params: Record<string, string> = {};
  if (status.value && status.value !== t("conditions.all")) {
    params["status"] = status.value;
  }
  return params;
};

// Use the table fetch composable for real API data
const { tableData, pagination, isLoading, onPageChange, refetch } =
  useTableFetch<IRequisite>(
    "/explat/payment-instruments/",
    getInitialParams(),
    ["status"]
  );

const addRequisiteModal = ref(false);
const addRequisite = () => {
  addRequisiteModal.value = true;
};

const transactionModal = ref(false);
const transactionModalItem = ref({});

function openTransaction(d: unknown) {
  transactionModal.value = true;
  transactionModalItem.value = d;
}

// Listen for refresh events from the form
const handleRequisiteCreated = () => {
  refetch();
};

onMounted(() => {
  window.addEventListener("requisite-created", handleRequisiteCreated);
});

onUnmounted(() => {
  window.removeEventListener("requisite-created", handleRequisiteCreated);
});
</script>

<style scoped>
.success_status {
  color: #16cc53 !important;
  background: #e3f9ea !important;
}

.pending_status {
  background: rgba(223, 189, 64, 0.12) !important;
  color: #dfbd40 !important;
}

.canceled_status {
  background: rgba(44, 45, 51, 0.12) !important;
  color: #2c2d33 !important;
}

.failed_status {
  background: rgba(229, 46, 48, 0.12);
  color: #e52e30 !important;
}
</style>
