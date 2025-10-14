<template>
  <BaseModal
    :title="$t('devices.add')"
    v-model="isOpen"
    @close="handleClose"
    class="max-w-2xl"
  >
    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup :label="$t('devices.name')">
          <FormInput
            v-model="form.values.name"
            :placeholder="$t('devices.name')"
            :error="form.$v.value.name.$error"
          />
        </FormGroup>

        <FormGroup :label="$t('devices.phone_number')">
          <FormInput
            v-model="form.values.phone_number"
            :placeholder="$t('devices.phone_number')"
            :error="form.$v.value.phone_number.$error"
          />
        </FormGroup>

        <FormGroup :label="$t('devices.status')">
          <FormSelect
            v-model="form.values.status"
            :options="statusOptions"
            :error="form.$v.value.status.$error"
            label-key="label"
            value-key="value"
          />
        </FormGroup>
      </div>

      <div class="flex gap-3 mt-6">
        <BaseButton
          :text="$t('rejecting.cancel')"
          variant="outline"
          @click="handleClose"
          class="flex-1"
        />
        <BaseButton
          :text="$t('devices.add')"
          type="submit"
          :loading="isLoading"
          class="flex-1"
        />
      </div>
    </form>
  </BaseModal>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  BaseModal,
  BaseButton,
  FormInput,
  FormGroup,
  FormSelect,
} from "@/components/Base";
import { useForm } from "@/composables/useForm";
import { required } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import { useCustomToast } from "@/composables/useCustomToast";
import { devicesApi } from "../api/devicesApi";

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  "device-created": [device: any];
}>();

const { t } = useI18n();
const { showToast } = useCustomToast();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isLoading = ref(false);

const form = useForm(
  {
    name: "",
    phone_number: "",
    status: "active",
  },
  {
    name: { required },
    phone_number: { required },
    status: { required },
  }
);

const statusOptions = [
  { label: t("devices.status.active"), value: "active" },
  { label: t("devices.status.inactive"), value: "inactive" },
];

const handleSubmit = async () => {
  form.$v.value.$touch();

  if (form.$v.value.$invalid) {
    return;
  }

  try {
    isLoading.value = true;

    const deviceData = {
      name: form.values.name,
      phone_number: form.values.phone_number,
      status: form.values.status,
    };

    const newDevice = await devicesApi.createDevice(deviceData);

    showToast("success", t("devices.device_created_successfully"));
    emit("device-created", newDevice);
    handleClose();
  } catch (error) {
    console.error("Error creating device:", error);
    showToast("error", t("devices.error_creating_device"));
  } finally {
    isLoading.value = false;
  }
};

const handleClose = () => {
  form.values.name = "";
  form.values.phone_number = "";
  form.values.status = "active";
  form.$v.value.$reset();
  isOpen.value = false;
};
</script>
