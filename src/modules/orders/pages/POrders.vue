<template>
  <section>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :loading="isLoading"
        :has-add-button="{
          show: false,
        }"
        :title="$t('orders.title')"
        :subtitle="$t('orders.count', { count: pagination?.count || 0 })"
        :total="pagination?.count || 0"
        :filter="{ status }"
        v-bind="tableSettings()"
        @click-to-row="openTransaction"
      >
        <template #id="{ data }">
          <div class="flex items-center gap-1">
            <span class="text-sm font-medium text-dark-black">
              {{ data?.id }}
              <i class="icon-copy text-primary font-semibold" />
            </span>
          </div>
        </template>
        <template #amount="{ data }">
          <CAmount :amount="data?.amount" :currency="'₽'" />
        </template>

        <template #device="{ data }">
          <CDevice :title="'Device'" :id="data?.id" />
        </template>

        <template #payment_method="{ data }">
          <CReqisites
            :number="data?.external_id"
            :name="'Order'"
            :bank="'System'"
            :payment_method="data?.purpose"
          />
        </template>

        <template #status="{ data }">
          <CBadge :status="data?.status" />
        </template>

        <template #date="{ data }">
          <CDate :date="data?.created_at" :time="data?.created_at" />
        </template>

        <template #filter>
          <div class="flex gap-5">
            <FormFilterLabel :label="$t('filter.status')">
              <FormSelect
                v-model="status"
                :options="orderFilterStatus()"
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
    </div>

    <!-- Order Details Modal -->
    <OrderDetailsModal
      v-model="orderDetailsModal"
      :order-uid="selectedOrderUid"
    />
  </section>
</template>

<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import { ref } from "vue";

import { BaseTable, FormSelect } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import {
  tableHead,
  tableSettings,
  orderFilterStatus,
} from "@/modules/orders/data/POrders";
import {
  CAmount,
  CDevice,
  CReqisites,
  CBadge,
  CDate,
} from "@/components/Common";
import { useI18n } from "vue-i18n";
import { useTableFetch } from "@/composables/useTableFetch";
import type { IOrder } from "@/modules/orders/api/ordersApi";
import OrderDetailsModal from "@/modules/orders/components/OrderDetailsModal.vue";

const { t } = useI18n();

const status = useRouteQuery("status", t("statuses.all_statuses"));

// Prepare initial parameters for API filtering
const getInitialParams = () => {
  const params: Record<string, string> = {};
  if (status.value && status.value !== t("statuses.all_statuses")) {
    params["status"] = status.value;
  }
  return params;
};

// Use the table fetch composable
const { tableData, pagination, isLoading, onPageChange, refetch } =
  useTableFetch<IOrder>("/explat/orders/", getInitialParams(), ["tab"]);

const orderDetailsModal = ref(false);
const selectedOrderUid = ref<string>("");

function openTransaction(order: IOrder) {
  selectedOrderUid.value = order.uid;
  orderDetailsModal.value = true;
}
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
