<template>
  <section>
    <div class="bg-white px-6 rounded-xl">
      <BaseTable
        :data="tableData"
        :head="tableHead()"
        :has-add-button="{
          title: $t('devices.add'),
          link: '#',
        }"
        @add="addDevice"
        :loading="isLoading"
        :title="$t('devices.title')"
        :subtitle="$t('devices.count', { count: pagination.total })"
        :total="pagination.total"
        :filter="{
          status: devicesFilterStatus(),
          carrier: devicesFilterCarrier(),
          ordering: devicesOrderingOptions(),
        }"
        v-bind="tableSettings()"
        @click-to-row="openDeviceDetails"
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
        <template #name="{ data }">
          {{ data?.name }}
        </template>
        <template #model="{ data }">
          {{ data?.model }}
        </template>
        <template #phone_number="{ data }">
          {{ data?.phone_number }}
        </template>
        <template #battery="{ data }"> {{ data?.battery }}% </template>
        <template #carrier="{ data }"> {{ data?.carrier }}</template>
        <template #status="{ data }">
          <span :class="getStatusClass(data?.status)">
            {{ $t(`devices.status.${data?.status}`) }}
          </span>
        </template>
        <template #is_available="{ data }">
          <span :class="data?.is_available ? 'text-green-600' : 'text-red-600'">
            {{
              data?.is_available
                ? $t("devices.available")
                : $t("devices.unavailable")
            }}
          </span>
        </template>
        <template #actions="{ data }">
          <div class="flex gap-2">
            <BaseButton
              :text="$t('devices.health_check')"
              variant="outline"
              size="sm"
              @click="performHealthCheck(data)"
            />
            <BaseButton
              :text="
                data?.status === 'active'
                  ? $t('devices.deactivate')
                  : $t('devices.activate')
              "
              :variant="data?.status === 'active' ? 'neutral' : 'primary'"
              size="sm"
              @click="toggleDeviceStatus(data)"
            />
            <BaseButton
              :text="$t('devices.delete')"
              variant="danger"
              size="sm"
              @click="deleteDevice(data)"
            />
          </div>
        </template>
        <template #filter>
          <div class="flex gap-5 flex-wrap">
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

    <!-- Device Details Modal -->
    <DeviceDetailsModal
      v-model="deviceDetailsModal"
      :device-uid="selectedDeviceUid"
      @device-loaded="onDeviceLoaded"
    />
  </section>
</template>

<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import { ref } from "vue";

import { BaseTable, BaseButton, BaseModal } from "@/components/Base";
import FilterDateRange from "@/components/Base/Form/DatePicker/FilterDateRange.vue";
import FormFilterLabel from "@/components/Base/Form/Label/FormFilterLabel.vue";
import DeviceDetailsModal from "@/modules/devices/components/DeviceDetailsModal.vue";
import {
  tableHead,
  tableSettings,
  devicesFilterStatus,
  devicesFilterCarrier,
  devicesOrderingOptions,
} from "@/modules/devices/data/PDevices";
import { useI18n } from "vue-i18n";
import { useTableFetch } from "@/composables/useTableFetch";
import type { IDevice } from "@/types/devices";
import { devicesApi } from "@/modules/devices/api/devicesApi";
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
const { tableData, pagination, isLoading, onPageChange, refetch } =
  useTableFetch<IDevice>("/explat/devices/", getInitialParams(), ["tab"]);

const addDeviceOpen = ref(false);
const addDevice = () => {
  addDeviceOpen.value = true;
};

const deviceDetailsModal = ref(false);
const selectedDeviceUid = ref<string>("");

function openDeviceDetails(device: IDevice) {
  selectedDeviceUid.value = device.uid;
  deviceDetailsModal.value = true;
}

function onDeviceLoaded(device: IDevice) {
  console.log("Device loaded:", device);
}

// Device management functions
const deleteDevice = async (device: IDevice) => {
  if (!confirm(t("devices.confirm_delete"))) {
    return;
  }

  try {
    await devicesApi.deleteDevice(device.uid);
    showToast(t("devices.deleted_successfully"), "success");
    refetch();
  } catch (error) {
    console.error("Error deleting device:", error);
    showToast(t("devices.delete_failed"), "error");
  }
};

const toggleDeviceStatus = async (device: IDevice) => {
  try {
    const newStatus = device.status === "active" ? "inactive" : "active";
    await devicesApi.patchDevice(device.uid, { status: newStatus });
    showToast(t("devices.status_updated"), "success");
    refetch();
  } catch (error) {
    console.error("Error updating device status:", error);
    showToast(t("devices.status_update_failed"), "error");
  }
};

const performHealthCheck = async (device: IDevice) => {
  try {
    await devicesApi.healthCheck(device.uid);
    showToast(t("devices.health_check_success"), "success");
    refetch();
  } catch (error) {
    console.error("Error performing health check:", error);
    showToast(t("devices.health_check_failed"), "error");
  }
};

// Status styling function
const getStatusClass = (status: string) => {
  switch (status) {
    case "active":
      return "success_status";
    case "inactive":
      return "canceled_status";
    case "maintenance":
      return "pending_status";
    case "offline":
      return "failed_status";
    default:
      return "";
  }
};
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
