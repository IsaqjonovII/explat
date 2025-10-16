<template>
  <BaseModal
    wrpClass="min-w-[600px]"
    :title="$t('add_requisite')"
    v-model="modelValue"
  >
    <div class="grid grid-cols-2 gap-5">
      <FormGroup :label="$t('add_requisite_modal.device_id')">
        <FormInput
          v-model="form.values.device_id"
          :placeholder="$t('add_requisite_modal.placeholder_device_id')"
          :error="form.$v.value.device_id.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.bank')">
        <FormSelect
          label-key="label"
          value-key="value"
          :placeholder="$t('banks.choose_bank')"
          v-model="form.values.bank_id"
          :options="banks"
          :error="form.$v.value.bank_id.$error"
          @on-select="form.values.bank_id = $event"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.name')">
        <FormInput
          v-model="form.values.owner_full_name"
          :placeholder="$t('add_requisite_modal.placeholder_name')"
          :error="form.$v.value.owner_full_name.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.card_number')">
        <FormInput
          v-maska="'#### #### #### ####'"
          v-model="form.values.card_number"
          :placeholder="$t('add_requisite_modal.placeholder_card_number')"
          :error="form.$v.value.card_number.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.phone_number')">
        <FormInput
          v-maska="'+#################'"
          v-model="form.values.phone_number"
          :placeholder="$t('add_requisite_modal.placeholder_phone_number')"
          :error="form.$v.value.phone_number.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.account_number')">
        <FormInput
          type="number"
          v-model="form.values.account_number"
          :placeholder="$t('add_requisite_modal.placeholder_account_number')"
          :error="form.$v.value.account_number.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.max_check')">
        <FormInput
          type="number"
          v-model="form.values.max_amount"
          :placeholder="$t('add_requisite_modal.placeholder_max_check')"
          :error="form.$v.value.max_amount.$error"
        >
          <template #suffix> ₽ </template>
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.payment_method')">
        <FormSelect
          v-model="form.values.payment_method_id"
          :error="form.$v.value.payment_method_id.$error"
          label-key="label"
          value-key="value"
          :placeholder="$t('add_requisite_modal.placeholder_payment_method')"
          :options="payment_method"
          @on-select="form.values.payment_method_id = $event"
        />
      </FormGroup>
    </div>
    <div class="flex gap-4 mt-5 w-full">
      <BaseButton
        :text="$t('rejecting.cancel')"
        variant="neutral"
        class="flex-1"
      />
      <BaseButton
        @click="add_requisites"
        :text="$t('add_requisite')"
        :loading="isLoading"
        class="flex-1"
      />
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import {
  BaseModal,
  FormInput,
  FormGroup,
  BaseButton,
  FormSelect,
} from "@/components/Base";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";
import { ref, onMounted } from "vue";
import {
  requisitesApi,
  type IBank,
  type IPaymentMethod,
} from "../api/requisitesApi";
import { useCustomToast } from "@/composables/useCustomToast";
import { devicesApi } from "@/modules/devices/api/devicesApi";

const modelValue = defineModel<boolean>();
const { showToast } = useCustomToast();

const form = useForm(
  {
    device_id: "",
    bank_id: "",
    owner_full_name: "",
    card_number: "",
    phone_number: "",
    account_number: "",
    max_amount: "",
    payment_method_id: "",
  },
  {
    device_id: { required },
    bank_id: { required },
    owner_full_name: { required },
    card_number: { required },
    phone_number: { required },
    account_number: { required },
    max_amount: { required },
    payment_method_id: { required },
  }
);

const banks = ref<{ label: string; value: string }[]>([]);
const payment_method = ref<{ label: string; value: string }[]>([]);
const devices = ref<{ label: string; value: string }[]>([]);
const isLoading = ref(false);

// Load banks and payment methods from API
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
    showToast("error", "Failed to load form data");
  } finally {
    isLoading.value = false;
  }
});

const add_requisites = async () => {
  form.$v.value.$touch();

  if (form.$v.value.$invalid) {
    return;
  }

  try {
    isLoading.value = true;

    const requisiteData = {
      device_id: parseInt(form.values.device_id),
      bank_id: parseInt(form.values.bank_id),
      payment_method_id: parseInt(form.values.payment_method_id),
      owner_full_name: form.values.owner_full_name,
      card_number: form.values.card_number,
      phone_number: form.values.phone_number,
      account_number: form.values.account_number,
      max_amount: parseInt(form.values.max_amount),
    };

    await requisitesApi.createRequisite(requisiteData);

    showToast("success", "Requisite created successfully");
    modelValue.value = false;

    // Reset form
    form.$reset();

    // Emit event to refresh the list
    window.dispatchEvent(new CustomEvent("requisite-created"));
  } catch (error) {
    console.error("Error creating requisite:", error);
    showToast("error", "Failed to create requisite");
  } finally {
    isLoading.value = false;
  }
};
</script>
