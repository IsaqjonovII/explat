<template>
  <BaseModal
    :title="$t('devices.details')"
    v-model="isOpen"
    @close="handleClose"
    class="max-w-2xl"
  >
    <div v-if="device" class="space-y-6">
      <!-- Device Header -->
      <div class="flex items-center justify-between p-4 bg-gray-5 rounded-lg">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center"
          >
            <i class="icon-phone text-white text-xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-dark">{{ device.name }}</h3>
            <p class="text-sm text-gray-1">{{ device.model }}</p>
          </div>
        </div>
        <div class="text-right">
          <span
            :class="getStatusClass(device.status)"
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ $t(`devices.status.${device.status}`) }}
          </span>
          <p class="text-xs text-gray-1 mt-1">ID: {{ device.id }}</p>
        </div>
      </div>

      <!-- Device Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4
            class="text-md font-semibold text-dark border-b border-gray-4 pb-2"
          >
            {{ $t("devices.basic_info") }}
          </h4>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1">{{ $t("devices.uid") }}:</span>
              <div class="flex items-center gap-2">
                <span class="text-sm font-mono text-dark">{{
                  device.uid
                }}</span>
                <i
                  class="icon-copy text-primary cursor-pointer hover:text-blue transition-300"
                  @click="copyToClipboard(device.uid)"
                ></i>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("devices.phone_number") }}:</span
              >
              <span class="text-sm text-dark">{{ device.phone_number }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("devices.carrier") }}:</span
              >
              <span class="text-sm text-dark">{{ device.carrier }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("devices.user_id") }}:</span
              >
              <span class="text-sm text-dark">{{ device.user_id }}</span>
            </div>
          </div>
        </div>

        <!-- Status & Performance -->
        <div class="space-y-4">
          <h4
            class="text-md font-semibold text-dark border-b border-gray-4 pb-2"
          >
            {{ $t("devices.status_performance") }}
          </h4>

          <div class="space-y-3">
            <!-- Battery Level -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("devices.battery") }}:</span
              >
              <div class="flex items-center gap-2">
                <div class="w-16 bg-gray-4 rounded-full h-2">
                  <div
                    class="h-2 rounded-full transition-all duration-300"
                    :class="getBatteryColor(device.battery)"
                    :style="{ width: `${device.battery}%` }"
                  ></div>
                </div>
                <span class="text-sm font-medium text-dark"
                  >{{ device.battery }}%</span
                >
              </div>
            </div>

            <!-- Availability -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("devices.availability") }}:</span
              >
              <span
                :class="device.is_available ? 'text-green' : 'text-red'"
                class="text-sm font-medium"
              >
                {{
                  device.is_available
                    ? $t("devices.available")
                    : $t("devices.unavailable")
                }}
              </span>
            </div>

            <!-- Last Health Check -->
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("devices.last_healthcheck") }}:</span
              >
              <span class="text-sm text-dark">{{
                formatDateTime(device.healthcheck_at)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Location Information -->
      <div class="space-y-4">
        <h4 class="text-md font-semibold text-dark border-b border-gray-4 pb-2">
          {{ $t("devices.location") }}
        </h4>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("devices.latitude") }}:</span
            >
            <span class="text-sm font-mono text-dark">{{
              device.latitude
            }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("devices.longitude") }}:</span
            >
            <span class="text-sm font-mono text-dark">{{
              device.longitude
            }}</span>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="space-y-4">
        <h4 class="text-md font-semibold text-dark border-b border-gray-4 pb-2">
          {{ $t("devices.timestamps") }}
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("devices.created_at") }}:</span
            >
            <span class="text-sm text-dark">{{
              formatDateTime(device.created_at)
            }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("devices.updated_at") }}:</span
            >
            <span class="text-sm text-dark">{{
              formatDateTime(device.updated_at)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="flex items-center justify-center py-8">
      <div class="loader"></div>
    </div>

    <!-- Actions -->
    <template #footer>
      <div class="flex justify-end gap-3">
        <BaseButton
          :text="$t('button.close')"
          variant="outline"
          @click="handleClose"
        />
        <BaseButton
          :text="$t('devices.refresh')"
          @click="refreshDevice"
          :loading="isRefreshing"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { BaseModal, BaseButton } from "@/components/Base";
import { useI18n } from "vue-i18n";
import { formatDateTime } from "@/utils/functions/common";
import type { IDevice } from "@/types/devices";
import { useCustomToast } from "@/composables/useCustomToast";
import { devicesApi } from "../api/devicesApi";

interface Props {
  modelValue: boolean;
  deviceUid?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "device-loaded": [device: IDevice];
}>();

const { t } = useI18n();
const { showToast } = useCustomToast();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const device = ref<IDevice | null>(null);
const isRefreshing = ref(false);

// Load device details when modal opens
const loadDeviceDetails = async () => {
  if (!props.deviceUid) return;

  try {
    isRefreshing.value = true;
    const deviceData = await devicesApi.getDevice(props.deviceUid);
    device.value = deviceData;
    emit("device-loaded", deviceData);
  } catch (error) {
    console.error("Error loading device details:", error);
    showToast("error", t("devices.error_loading_details"));
  } finally {
    isRefreshing.value = false;
  }
};

const refreshDevice = () => {
  loadDeviceDetails();
};

const handleClose = () => {
  isOpen.value = false;
  device.value = null;
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    showToast("success", t("common.copied"));
  } catch (error) {
    console.error("Failed to copy:", error);
    showToast("error", t("common.copy_failed"));
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green/10 text-green";
    case "inactive":
      return "bg-gray-4 text-gray-8";
    case "maintenance":
      return "bg-yellow/10 text-yellow";
    case "offline":
      return "bg-red/10 text-red";
    default:
      return "bg-gray-4 text-gray-8";
  }
};

const getBatteryColor = (battery: number) => {
  if (battery > 50) return "bg-green";
  if (battery > 20) return "bg-yellow";
  return "bg-red";
};

// Watch for modal opening to load device details
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.deviceUid) {
      loadDeviceDetails();
    }
  }
);
</script>

<style scoped>
.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2e77e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
