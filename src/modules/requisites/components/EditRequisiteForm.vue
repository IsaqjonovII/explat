<template>
  <BaseModal
    :title="$t('requisites.edit_requisite')"
    v-model="isOpen"
    @close="handleClose"
    class="max-w-2xl"
  >
    <div v-if="isLoading" class="flex items-center justify-center py-8">
      <div class="loader"></div>
    </div>

    <form v-else @submit.prevent="updateRequisite" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Device Selection -->
        <div>
          <FormLabel :label="$t('requisites.device')" required />
          <FormSelect
            v-model="form.values.device_id"
            :options="devices"
            value-key="value"
            label-key="label"
            :error="form.$v.value.device_id.$error"
            :error-message="form.$v.value.device_id.$errors[0]?.$message"
          />
        </div>

        <!-- Bank Selection -->
        <div>
          <FormLabel :label="$t('requisites.bank')" required />
          <FormSelect
            v-model="form.values.bank_id"
            :options="banks"
            value-key="value"
            label-key="label"
            :error="form.$v.value.bank_id.$error"
            :error-message="form.$v.value.bank_id.$errors[0]?.$message"
          />
        </div>

        <!-- Payment Method -->
        <div>
          <FormLabel :label="$t('requisites.payment_method')" required />
          <FormSelect
            v-model="form.values.payment_method_id"
            :options="payment_method"
            value-key="value"
            label-key="label"
            :error="form.$v.value.payment_method_id.$error"
            :error-message="
              form.$v.value.payment_method_id.$errors[0]?.$message
            "
          />
        </div>

        <!-- Owner Full Name -->
        <div>
          <FormLabel :label="$t('requisites.owner_full_name')" required />
          <FormInput
            v-model="form.values.owner_full_name"
            :error="form.$v.value.owner_full_name.$error"
            :error-message="form.$v.value.owner_full_name.$errors[0]?.$message"
          />
        </div>

        <!-- Phone Number -->
        <div>
          <FormLabel :label="$t('requisites.phone_number')" required />
          <FormInput
            v-model="form.values.phone_number"
            :error="form.$v.value.phone_number.$error"
            :error-message="form.$v.value.phone_number.$errors[0]?.$message"
          />
        </div>

        <!-- Card Number -->
        <div>
          <FormLabel :label="$t('requisites.card_number')" required />
          <FormInput
            v-model="form.values.card_number"
            :error="form.$v.value.card_number.$error"
            :error-message="form.$v.value.card_number.$errors[0]?.$message"
          />
        </div>

        <!-- Account Number -->
        <div>
          <FormLabel :label="$t('requisites.account_number')" required />
          <FormInput
            v-model="form.values.account_number"
            :error="form.$v.value.account_number.$error"
            :error-message="form.$v.value.account_number.$errors[0]?.$message"
          />
        </div>

        <!-- Max Amount -->
        <div>
          <FormLabel :label="$t('requisites.max_amount')" required />
          <FormInput
            v-model="form.values.max_amount"
            type="number"
            :error="form.$v.value.max_amount.$error"
            :error-message="form.$v.value.max_amount.$errors[0]?.$message"
          />
        </div>

        <!-- Status -->
        <div>
          <FormLabel :label="$t('requisites.status')" required />
          <FormSelect
            v-model="form.values.status"
            :options="statusOptions"
            value-key="value"
            label-key="label"
            :error="form.$v.value.status.$error"
            :error-message="form.$v.value.status.$errors[0]?.$message"
          />
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3 pt-6 border-t border-gray-4">
        <BaseButton
          :text="$t('button.cancel')"
          variant="outline"
          @click="handleClose"
          type="button"
        />
        <BaseButton
          :text="$t('requisites.update_requisite')"
          variant="primary"
          :loading="isSubmitting"
          type="submit"
        />
      </div>
    </form>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
import {
  BaseModal,
  BaseButton,
  FormInput,
  FormSelect,
  FormLabel,
} from "@/components/Base";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import type { IRequisite } from "../api/requisitesApi";
import { requisitesApi } from "../api/requisitesApi";
import { devicesApi } from "@/modules/devices/api/devicesApi";
import { useCustomToast } from "@/composables/useCustomToast";

interface Props {
  modelValue: boolean;
  requisite?: IRequisite | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "requisite-updated": [];
}>();

const { t } = useI18n();
const { showToast } = useCustomToast();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const form = useForm(
  {
    device_id: "",
    bank_id: "",
    payment_method_id: "",
    owner_full_name: "",
    card_number: "",
    phone_number: "",
    account_number: "",
    max_amount: "",
    status: "",
  },
  {
    device_id: { required },
    bank_id: { required },
    payment_method_id: { required },
    owner_full_name: { required },
    card_number: { required },
    phone_number: { required },
    account_number: { required },
    max_amount: { required },
    status: { required },
  }
);

const banks = ref<{ label: string; value: string }[]>([]);
const payment_method = ref<{ label: string; value: string }[]>([]);
const devices = ref<{ label: string; value: string }[]>([]);
const isLoading = ref(false);
const isSubmitting = ref(false);

const statusOptions = [
  { label: t("conditions.activated"), value: "activated" },
  { label: t("conditions.deactivated"), value: "deactivated" },
  { label: t("conditions.testing"), value: "testing" },
];

// Load form data
onMounted(async () => {
  try {
    isLoading.value = true;

    // Load banks
    const banksData = await requisitesApi.getBanks();
    banks.value = banksData.map((bank) => ({
      label: bank.name,
      value: bank.id.toString(),
    }));

    // Load payment methods
    const paymentMethodsData = await requisitesApi.getPaymentMethods();
    payment_method.value = paymentMethodsData.map((method) => ({
      label: method.name,
      value: method.id.toString(),
    }));

    // Load devices
    const devicesData = await devicesApi.getDevices();
    devices.value = devicesData.results.map((device) => ({
      label: device.name || `Device ${device.id}`,
      value: device.id.toString(),
    }));
  } catch (error) {
    console.error("Error loading form data:", error);
    showToast(t("requisites.load_form_data_failed"), "error");
  } finally {
    isLoading.value = false;
  }
});

// Watch for requisite prop changes to populate form
watch(
  () => props.requisite,
  (requisite) => {
    if (requisite) {
      form.values.device_id = requisite.device_id.toString();
      form.values.bank_id = requisite.bank_id.toString();
      form.values.payment_method_id = requisite.payment_method_id.toString();
      form.values.owner_full_name = requisite.owner_full_name;
      form.values.card_number = requisite.card_number;
      form.values.phone_number = requisite.phone_number;
      form.values.account_number = requisite.account_number;
      form.values.max_amount = requisite.max_amount.toString();
      form.values.status = requisite.status;
    }
  },
  { immediate: true }
);

const handleClose = () => {
  isOpen.value = false;
  form.$reset();
};

const updateRequisite = async () => {
  form.$v.value.$touch();

  if (form.$v.value.$invalid) {
    return;
  }

  if (!props.requisite) return;

  try {
    isSubmitting.value = true;

    const requisiteData = {
      device_id: parseInt(form.values.device_id),
      bank_id: parseInt(form.values.bank_id),
      payment_method_id: parseInt(form.values.payment_method_id),
      owner_full_name: form.values.owner_full_name,
      card_number: form.values.card_number,
      phone_number: form.values.phone_number,
      account_number: form.values.account_number,
      max_amount: parseInt(form.values.max_amount),
      status: form.values.status as "activated" | "deactivated" | "testing",
    };

    await requisitesApi.updateRequisite(props.requisite.uid, requisiteData);

    showToast(t("requisites.updated_successfully"), "success");
    emit("requisite-updated");
    handleClose();
  } catch (error) {
    console.error("Error updating requisite:", error);
    showToast(t("requisites.update_failed"), "error");
  } finally {
    isSubmitting.value = false;
  }
};
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
