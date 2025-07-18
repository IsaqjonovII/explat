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
          v-model="form.values.bank"
          :options="banks"
          :error="form.$v.value.bank.$error"
          @on-select="form.values.bank = $event"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.name')">
        <FormInput
          v-model="form.values.name"
          :placeholder="$t('add_requisite_modal.placeholder_name')"
          :error="form.$v.value.name.$error"
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
      <FormGroup :label="$t('add_requisite_modal.min_check')">
        <FormInput
          type="number"
          v-model="form.values.min_check"
          :placeholder="$t('add_requisite_modal.placeholder_min_check')"
          :error="form.$v.value.min_check.$error"
        >
          <template #suffix> ₽ </template>
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.max_check')">
        <FormInput
          type="number"
          v-model="form.values.max_check"
          :placeholder="$t('add_requisite_modal.placeholder_max_check')"
          :error="form.$v.value.max_check.$error"
        >
          <template #suffix> ₽ </template>
        </FormInput>
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.orders_count')">
        <FormInput
          type="number"
          v-model="form.values.orders_count"
          :placeholder="$t('add_requisite_modal.placeholder_orders_count')"
          :error="form.$v.value.orders_count.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('add_requisite_modal.payment_method')">
        <FormSelect
          v-model="form.values.payment_method"
          :error="form.$v.value.payment_method.$error"
          label-key="label"
          value-key="value"
          :placeholder="$t('add_requisite_modal.placeholder_payment_method')"
          :options="payment_method"
          @on-select="form.values.payment_method = $event"
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
import { ref } from "vue";

const modelValue = defineModel<boolean>();

const form = useForm(
  {
    device_id: "",
    bank: "",
    name: "",
    card_number: "",
    phone_number: "",
    account_number: "",
    min_check: "",
    max_check: "",
    orders_count: "",
    payment_method: "",
  },
  {
    device_id: { required },
    bank: { required },
    name: { required },
    card_number: { required },
    phone_number: { required },
    account_number: { required },
    min_check: { required },
    max_check: { required },
    orders_count: { required },
    payment_method: { required },
  },
);

const add_requisites = () => {
  form.$v.value.$touch();
};

const banks = ref([
  {
    label: "Сбербанк",
    value: "sber",
  },
  {
    label: "Тинкофф",
    value: "tinkoff",
  },
  {
    label: "Альфабанк",
    value: "alfa",
  },
]);
const payment_method = ref([
  {
    label: "TPay",
    value: "tpay",
  },
  {
    label: "PayPal",
    value: "paypal",
  },
  {
    label: "YandexMoney",
    value: "yandex",
  },
]);
</script>
