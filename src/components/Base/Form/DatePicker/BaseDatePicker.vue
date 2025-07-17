<template>
  <div class="c-date-picker relative w-[177px] h-[42px]">
    <VueDatePicker
      ref="datePicker"
      v-model="value"
      class="h-full"
      auto-apply
      format="dd.MM.yyyy"
      :month-change-on-scroll="false"
      :text-input-options="{
        enterSubmit: true,
        openMenu: false,
        format: 'dd.MM.yyyy',
      }"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :max-date="formatMaxDate"
      :min-date="minDate"
      :format-locale="formatLocale"
      @update:model-value="onChangeValue"
    >
      <template #dp-input="{ value }">
        <div class="relative">
          <FormInput
            v-maska="'##.##.####'"
            v-bind="{ error }"
            class="absolute w-full h-full top-0 left-0 pr-[14px] !text-dark-400"
            inputClass="!text-dark-400"
            :model-value="value"
            :placeholder="placeholder"
            @update:model-value="value.start = $event as string"
            @blur="emit('blur')"
          />
          <i
            v-if="!value"
            class="icon-calendar absolute top-1/2 -translate-y-1/2 text-gray right-3 text-xl h-5 flex items-center"
          ></i>

          <button
            v-else
            class="icon-x-mark text-xl transition-300 hover:text-red absolute top-1/2 -translate-y-1/2 text-gray right-2.5"
            @click.stop="clearValue"
          />
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import "@vuepic/vue-datepicker/dist/main.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import { enUS, ru, uz, uzCyrl } from "date-fns/locale";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import FormInput from "@/components/Base/Form/Input/FormInput.vue";

interface Props {
  modelValue: string;
  error?: boolean;
  maxDate?: string;
  minDate?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

interface Emits {
  (event: "blur"): void;

  (event: "update:modelValue", value?: string): void;
}

const emit = defineEmits<Emits>();

const { locale } = useI18n();

const value = ref();

const formatLocale = computed(() => {
  const locales = {
    uz: uz,
    uzc: uzCyrl,
    kaa: uz,
    ru: ru,
    en: enUS,
  };

  return locales[locale.value as keyof typeof locales];
});

const datePicker = ref();

const showMenu = ref(false);

const formatMaxDate = computed(() => {
  if (props?.maxDate) {
    return new Date(props.maxDate);
  } else {
    return new Date();
  }
});

const onChangeValue = (value: string) => {
  emit("update:modelValue", value);

  showMenu.value = false;
};

const clearValue = () => {
  value.value = undefined;
  emit("update:modelValue", undefined);
};

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  },
  {
    immediate: true,
  }
);
</script>

<style>
.c-date-picker .dp__overlay_container {
  height: 288px !important;
}

.c-date-picker .dp__input {
  padding: 8px 12px !important;
}

.c-date-picker .dp__input_wrap svg {
  display: none !important;
}
</style>
