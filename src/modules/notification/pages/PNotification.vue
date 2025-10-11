<template>
  <section>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :loading="isLoading"
        :title="$t('notification.title')"
        :subtitle="$t('notification.count', { count: pagination.total })"
        :total="pagination.total"
        :filter="{ status }"
        v-bind="tableSettings()"
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

        <template #date="{ data }">
          <DateTime :date="data?.created_at" :time="data?.created_at" />
        </template>

        <template #body="{ data }">
          <p>💳 {{ data?.body }}</p>
        </template>

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
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import { ref } from "vue";

import { BaseTable } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import {
  tableHead,
  tableSettings,
} from "@/modules/notification/data/PNotification";
import DateTime from "@/components/Common/DateTime.vue";
import { useI18n } from "vue-i18n";
import { useTableFetch } from "@/composables/useTableFetch";
import type { ISMSMessage } from "@/modules/notification/api/notificationApi";

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

// Use the table fetch composable for real API data
const { tableData, pagination, isLoading, onPageChange } =
  useTableFetch<ISMSMessage>(
    "/explat/device-sms-messages/",
    getInitialParams(),
    ["status"]
  );
</script>

<style scoped></style>
