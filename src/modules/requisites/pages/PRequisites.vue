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
        :loading="loading"
        :title="$t('requisites.title')"
        :subtitle="$t('requisites.count', { count: paginationData.total })"
        :total="paginationData.total"
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
          <span>{{ data?.bank }}</span>
        </template>

        <template #requisites="{ data }">
          <CReqisites
            :number="data?.requisite?.number"
            :name="data?.requisite?.name"
            :bank="data?.requisite?.bank"
            :payment_method="data?.requisite?.payment_method"
          />
        </template>

        <template #indicator="{ data }">
          <div class="w-full flex items-start">
            <CLimitIndicator
              :limit="data?.limit?.limit"
              :current="data?.limit?.current"
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

const { t } = useI18n();

const status = useRouteQuery("status", t("conditions.all"));

const loading = ref(false);
const addRequisiteModal = ref(false);
const addRequisite = () => {
  addRequisiteModal.value = true;
};

const tableData = ref([
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    bank: "Сбербанк",
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "test",
    limit: {
      current: 678000,
      limit: 1000000,
    },
  },
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    bank: "Сбербанк",
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "deactivate",
    limit: {
      current: 678000,
      limit: 1000000,
    },
  },
  {
    id: 37351,
    amount: {
      currency: "₽",
      amount: 8600,
      crypto: {
        USDT: {
          amount: 76,
          currency: "USDT",
        },
      },
    },
    bank: "Сбербанк",
    requisite: {
      number: 1234123412341234,
      name: "Х.Алмамедов",
      bank: "Сбербанк",
      payment_method: "TPay",
    },
    device: {
      id: 24133,
      title: "Xiaomi Redmi",
    },
    created_at: "2025-07-17T10:30:00",
    end_at: "2025-07-17T10:30:00",
    status: "activate",
    limit: {
      current: 678000,
      limit: 1000000,
    },
  },
]);

const paginationData = ref({
  total: tableData.value.length,
});

const transactionModal = ref(false);
const transactionModalItem = ref({});

function openTransaction(d: unknown) {
  transactionModal.value = true;
  transactionModalItem.value = d;
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
