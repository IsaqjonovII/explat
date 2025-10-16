<template>
  <section>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :loading="isLoading"
        :title="$t('appeals.title')"
        :has-add-button="{
          show: false,
        }"
        :subtitle="$t('appeals.count', { count: pagination?.total || 0 })"
        :total="pagination?.total || 0"
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
        <template #amount>
          <CAmount
            :amount="0"
            :currency="'₽'"
            :crypto="{ amount: 0, currency: '₽' }"
          />
        </template>

        <template #device="{ data }">
          <CDevice :title="'Appeal'" :id="data?.id" />
        </template>

        <template #payment_method="{ data }">
          <CReqisites
            :number="data?.uid"
            :name="'Appeal'"
            :bank="'System'"
            :payment_method="data?.status"
          />
        </template>

        <template #actions="{ data }">
          <CAction
            :approve="$t('approve')"
            :reject="$t('reject')"
            @approve="approve(data)"
            @reject="reject(data)"
          />
        </template>

        <template #date="{ data }">
          <DateTime :date="data?.created_at" :time="data?.created_at" />
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

    <!-- Appeal Details Modal -->
    <AppealDetailsModal
      v-model="appealDetailsModal"
      :appeal-uid="selectedAppealUid"
      @appeal-updated="handleAppealUpdated"
    />
  </section>
</template>

<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import { ref } from "vue";

import { BaseTable } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import { tableHead, tableSettings } from "@/modules/appeals/data/PAppeals";
import { CAmount, CDevice, CReqisites } from "@/components/Common";
import { useI18n } from "vue-i18n";
import DateTime from "@/components/Common/DateTime.vue";
import CAction from "@/components/Common/MiniComponents/CAction.vue";
import { useTableFetch } from "@/composables/useTableFetch";
import type { IAppeal } from "@/modules/appeals/api/appealsApi";
import { appealsApi } from "@/modules/appeals/api/appealsApi";
import AppealDetailsModal from "@/modules/appeals/components/AppealDetailsModal.vue";
import { useCustomToast } from "@/composables/useCustomToast";

const { t } = useI18n();
const { showToast } = useCustomToast();

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
const { tableData, pagination, isLoading, refetch } = useTableFetch<IAppeal>(
  "/explat/appeals/",
  getInitialParams(),
  ["tab"]
);

const approve = async (appeal: IAppeal) => {
  try {
    await appealsApi.approveAppeal(appeal.uid);
    showToast(t("appeals.approved_successfully"), "success");
    refetch(); // Refresh the table
  } catch {
    showToast(t("appeals.approve_failed"), "error");
  }
};

const reject = async (appeal: IAppeal) => {
  try {
    await appealsApi.rejectAppeal(appeal.uid);
    showToast(t("appeals.rejected_successfully"), "success");
    refetch(); // Refresh the table
  } catch {
    showToast(t("appeals.reject_failed"), "error");
  }
};

const appealDetailsModal = ref(false);
const selectedAppealUid = ref<string>("");

function openTransaction(appeal: IAppeal) {
  selectedAppealUid.value = appeal.uid;
  appealDetailsModal.value = true;
}

function handleAppealUpdated(appeal: IAppeal) {
  console.log("Appeal updated:", appeal);
  refetch(); // Refresh the table
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
