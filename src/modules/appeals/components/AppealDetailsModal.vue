<template>
  <BaseModal
    :title="$t('appeals.details')"
    v-model="isOpen"
    @close="handleClose"
    class="max-w-2xl"
  >
    <div v-if="appeal" class="space-y-6">
      <!-- Appeal Header -->
      <div class="flex items-center justify-between p-4 bg-gray-5 rounded-lg">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center"
          >
            <i class="icon-document text-white text-xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-dark">
              Appeal #{{ appeal.id }}
            </h3>
            <p class="text-sm text-gray-1">{{ appeal.uid }}</p>
          </div>
        </div>
        <div class="text-right">
          <span
            :class="getStatusClass(appeal.status)"
            class="px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ $t(`appeals.status.${appeal.status}`) }}
          </span>
          <p class="text-xs text-gray-1 mt-1">UID: {{ appeal.uid }}</p>
        </div>
      </div>

      <!-- Appeal Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4
            class="text-md font-semibold text-dark border-b border-gray-4 pb-2"
          >
            {{ $t("appeals.basic_info") }}
          </h4>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1">{{ $t("appeals.text") }}:</span>
              <span class="text-sm text-dark">{{ appeal.text }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1">{{ $t("appeals.file") }}:</span>
              <span class="text-sm text-dark">
                {{
                  appeal.file
                    ? $t("appeals.file_attached")
                    : $t("appeals.no_file")
                }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("appeals.action_time") }}:</span
              >
              <span class="text-sm text-dark">
                {{
                  appeal.action_time
                    ? formatDateTime(appeal.action_time)
                    : $t("appeals.no_action_time")
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Status & Actions -->
        <div class="space-y-4">
          <h4
            class="text-md font-semibold text-dark border-b border-gray-4 pb-2"
          >
            {{ $t("appeals.status_actions") }}
          </h4>

          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-1"
                >{{ $t("appeals.status") }}:</span
              >
              <span
                :class="getStatusClass(appeal.status)"
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ $t(`appeals.status.${appeal.status}`) }}
              </span>
            </div>

            <div class="flex gap-2">
              <BaseButton
                :text="$t('approve')"
                variant="success"
                size="sm"
                @click="handleApprove"
                :disabled="appeal.status !== 'in_review'"
              />
              <BaseButton
                :text="$t('reject')"
                variant="danger"
                size="sm"
                @click="handleReject"
                :disabled="appeal.status !== 'in_review'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Instrument Information -->
      <div v-if="appeal.payment_instrument_json" class="space-y-4">
        <h4 class="text-md font-semibold text-dark border-b border-gray-4 pb-2">
          {{ $t("appeals.payment_instrument") }}
        </h4>
        <div class="p-4 bg-gray-5 rounded-lg">
          <pre class="text-sm text-dark">{{
            JSON.stringify(appeal.payment_instrument_json, null, 2)
          }}</pre>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="space-y-4">
        <h4 class="text-md font-semibold text-dark border-b border-gray-4 pb-2">
          {{ $t("appeals.timestamps") }}
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("appeals.created_at") }}:</span
            >
            <span class="text-sm text-dark">{{
              formatDateTime(appeal.created_at)
            }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-1"
              >{{ $t("appeals.updated_at") }}:</span
            >
            <span class="text-sm text-dark">{{
              formatDateTime(appeal.updated_at)
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
import type { IAppeal } from "../api/appealsApi";
import { appealsApi } from "../api/appealsApi";
import { useCustomToast } from "@/composables/useCustomToast";

interface Props {
  modelValue: boolean;
  appealUid?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "appeal-updated": [appeal: IAppeal];
}>();

const { t } = useI18n();
const { showToast } = useCustomToast();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const appeal = ref<IAppeal | null>(null);

const handleClose = () => {
  isOpen.value = false;
  appeal.value = null;
};

const handleApprove = async () => {
  if (!appeal.value) return;

  try {
    const updatedAppeal = await appealsApi.approveAppeal(appeal.value.uid);
    showToast(t("appeals.approved_successfully"), "success");
    appeal.value = updatedAppeal;
    emit("appeal-updated", updatedAppeal);
  } catch {
    showToast(t("appeals.approve_failed"), "error");
  }
};

const handleReject = async () => {
  if (!appeal.value) return;

  try {
    const updatedAppeal = await appealsApi.rejectAppeal(appeal.value.uid);
    showToast(t("appeals.rejected_successfully"), "success");
    appeal.value = updatedAppeal;
    emit("appeal-updated", updatedAppeal);
  } catch {
    showToast(t("appeals.reject_failed"), "error");
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "in_review":
      return "bg-yellow/10 text-yellow";
    case "accepted":
      return "bg-green/10 text-green";
    case "rejected":
      return "bg-red/10 text-red";
    default:
      return "bg-gray-4 text-gray-8";
  }
};

// Watch for modal opening to load appeal details
watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen && props.appealUid) {
      try {
        appeal.value = await appealsApi.getAppeal(props.appealUid);
      } catch {
        showToast(t("appeals.load_failed"), "error");
        handleClose();
      }
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
