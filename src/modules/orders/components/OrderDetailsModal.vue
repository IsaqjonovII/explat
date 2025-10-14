<template>
  <BaseModal
    :title="$t('orders.details')"
    v-model="isOpen"
    @close="handleClose"
    class="max-w-2xl"
  >
    <div v-if="order" class="space-y-6">
      <!-- Order Header -->
      <div class="flex items-center justify-between p-4 bg-gray-5 rounded-lg">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center"
          >
            <i class="icon-document text-white text-xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-dark">
              Order #{{ order.id }}
            </h3>
            <p class="text-sm text-gray-1">{{ order.external_id }}</p>
          </div>
        </div>
        <div class="text-right">
          <span
            :class="getStatusClass(order.status)"
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ $t(`orders.status.${order.status}`) }}
          </span>
          <p class="text-xs text-gray-1 mt-1">UID: {{ order.uid }}</p>
        </div>
      </div>

      <!-- Order Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4
            class="text-md font-semibold text-dark border-b border-gray-4 pb-2"
          >
            {{ $t("orders.basic_info") }}
          </h4>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("orders.amount") }}:</span
              >
              <span class="text-sm font-medium text-dark"
                >{{ order.amount }} ₽</span
              >
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("orders.purpose") }}:</span
              >
              <span class="text-sm text-dark">{{ order.purpose }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("orders.order_ttl") }}:</span
              >
              <span class="text-sm text-dark">{{ order.order_ttl }}s</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("orders.external_id") }}:</span
              >
              <div class="flex items-center gap-2">
                <span class="text-sm font-mono text-dark">{{
                  order.external_id
                }}</span>
                <i
                  class="icon-copy text-primary cursor-pointer hover:text-blue transition-300"
                  @click="copyToClipboard(order.external_id)"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Status & Timing -->
        <div class="space-y-4">
          <h4
            class="text-md font-semibold text-dark border-b border-gray-4 pb-2"
          >
            {{ $t("orders.status_timing") }}
          </h4>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("orders.status") }}:</span
              >
              <span
                :class="getStatusClass(order.status)"
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ $t(`orders.status.${order.status}`) }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("orders.perform_time") }}:</span
              >
              <span class="text-sm text-dark">
                {{
                  order.perform_time
                    ? formatDateTime(order.perform_time)
                    : $t("orders.not_performed")
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="space-y-4">
        <h4 class="text-md font-semibold text-dark border-b border-gray-4 pb-2">
          {{ $t("orders.timestamps") }}
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("orders.created_at") }}:</span
            >
            <span class="text-sm text-dark">{{
              formatDateTime(order.created_at)
            }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("orders.updated_at") }}:</span
            >
            <span class="text-sm text-dark">{{
              formatDateTime(order.updated_at)
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
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { BaseModal, BaseButton } from "@/components/Base";
import { useI18n } from "vue-i18n";
import { formatDateTime } from "@/utils/functions/common";
import type { IOrder } from "../api/ordersApi";
import { useCustomToast } from "@/composables/useCustomToast";

interface Props {
  modelValue: boolean;
  orderUid?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const { t } = useI18n();
const { showToast } = useCustomToast();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const order = ref<IOrder | null>(null);

const handleClose = () => {
  isOpen.value = false;
  order.value = null;
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
    case "created":
      return "bg-blue/10 text-blue";
    case "performed":
      return "bg-green/10 text-green";
    case "expired":
      return "bg-red/10 text-red";
    default:
      return "bg-gray-4 text-gray-8";
  }
};

// Watch for modal opening to load order details
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen && props.orderUid) {
      // In a real implementation, you would load order details here
      // For now, we'll just show the modal
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
