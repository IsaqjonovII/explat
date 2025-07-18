<template>
  <section>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :has-add-button="{
          title: $t('devices.add'),
        }"
        @add="addDevice"
        :loading="loading"
        :title="$t('devices.title')"
        :subtitle="$t('devices.count', { count: paginationData.total })"
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
        <template #number="{ data }">
          {{ data?.number }}
        </template>
        <template #battery="{ data }"> {{ data?.battery }}% </template>
        <template #network="{ data }"> {{ data?.network }}</template>
        <template #filter>
          <div class="flex gap-5">
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
      <BaseModal :title="$t('devices.add')" v-model="addDeviceOpen">
        <figure class="bg-primary p-5">
          <img src="/images/qr-code.png" alt="qr" />
        </figure>
        <p class="text-center">ASdle19uh2aAD2d23dasd424f8eisdkh244wie</p>
        <BaseButton :text="$t('copy')" />
      </BaseModal>
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

import { BaseTable, BaseButton, BaseModal } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import { tableHead, tableSettings } from "@/modules/devices/data/PDevices";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const status = useRouteQuery("status", t("statuses.all_statuses"));

const loading = ref(false);
const addDeviceOpen = ref(false);
const addDevice = () => {
  addDeviceOpen.value = true;
};

const tableData = ref([
  {
    id: 37351,
    model: "Xiaomi Redmi 6 pro",
    number: "+998915491765",
    battery: 56,
    network: "Beeline",
  },
  {
    id: 37352,
    model: "Samsung Galaxy S20",
    number: "+998901938455",
    battery: 89,
    network: "Beeline",
  },
  {
    id: 37351,
    model: "Xiaomi Redmi 6 pro",
    number: "+998915491765",
    battery: 56,
    network: "Beeline",
  },
  {
    id: 37352,
    model: "Samsung Galaxy S20",
    number: "+998901938455",
    battery: 89,
    network: "Beeline",
  },
  {
    id: 37351,
    model: "Xiaomi Redmi 6 pro",
    number: "+998915491765",
    battery: 56,
    network: "Beeline",
  },
  {
    id: 37352,
    model: "Samsung Galaxy S20",
    number: "+998901938455",
    battery: 89,
    network: "Beeline",
  },
  {
    id: 37351,
    model: "Xiaomi Redmi 6 pro",
    number: "+998915491765",
    battery: 56,
    network: "Beeline",
  },
  {
    id: 37352,
    model: "Samsung Galaxy S20",
    number: "+998901938455",
    battery: 89,
    network: "Beeline",
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
