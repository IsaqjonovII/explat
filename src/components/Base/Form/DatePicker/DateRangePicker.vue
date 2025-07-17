<template>
  <div class="c-date-picker relative w-[200px]">
    <VueDatePicker
      ref="datePicker"
      v-model="value"
      multi-calendars
      multi-calendars-solo
      :format-locale="formatLocale"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :month-change-on-scroll="false"
      :text-input-options="{
        enterSubmit: true,
        openMenu: false,
        format: 'dd.MM.yyyy',
      }"
      :year-range="yearRange"
      auto-apply
      format="dd.MM.yyyy"
      range
      @update:model-value="onChangeValue"
      @range-end="$emit('on-change')"
    >
      <template #dp-input="{ value }">
        <div class="relative">
          <FormInput
            v-maska="'##/##/#### - ##/##/####'"
            :input-class="'placeholder:text-gray-5'"
            :model-value="value"
            :placeholder="`${$t('dd_mm_yyyy')} - ${$t('dd_mm_yyyy')}`"
            class="absolute w-full bg-white h-full top-0 left-0 !pr-8"
            v-bind="{ error }"
            @blur="emit('blur')"
            @update:model-value="value.start = $event as string"
          />
          <i
            v-if="!value"
            class="icon-calendar absolute top-1/2 -translate-y-1/2 text-gray right-2.5 text-xl h-5 flex items-center"
          ></i>

          <button
            v-else
            class="icon-x-mark text-xl text-gray hover:text-red absolute top-1/2 -translate-y-1/2 text-gray right-2.5"
            @click.stop="$emit('clearData')"
          />
        </div>
      </template>
    </VueDatePicker>
  </div>
</template>

<script lang="ts" setup>
import "@vuepic/vue-datepicker/dist/main.css";

import VueDatePicker from "@vuepic/vue-datepicker";
import { enUS, ru, uz, uzCyrl } from "date-fns/locale";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import FormInput from "@/components/Base/Form/Input/FormInput.vue";

interface Props {
  modelValue: unknown;
  error?: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (event: "blur"): void;

  (
    event: "update:modelValue",
    value: {
      start?: string;
      end?: string;
    },
  ): void;
}

const emit = defineEmits<Emits>();

const { locale } = useI18n();

const value = ref();

const yearRange = [new Date().getFullYear() - 100, new Date().getFullYear()];

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

const onChangeValue = (value: string[]) => {
  emit("update:modelValue", {
    start: value?.[0],
    end: value?.[1],
  });

  showMenu.value = false;
};

// const clearValue = () => {
//   value.value = undefined;
//   emit("update:modelValue", {
//     start: undefined,
//     end: undefined,
//   });
// };

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      value.value = [props.modelValue?.start, props.modelValue?.end];
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style>
.c-date-picker .dp__theme_light {
  --dp-primary-color: #dfbd40;
  --dp-hover-color: #f2f2f2;
  --dp-primary-text-color: #fff;
  --dp-text-color: #1f1f24;
}
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
