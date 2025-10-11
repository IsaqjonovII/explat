<template>
  <DropdownMenu v-model:open="isOpen">
    <!--  SELECTED OPTION  -->
    <DropdownMenuTrigger class="!p-0">
      <div
        :class="[
          selectedOptionStyles,
          {
            'focus-within:border-gray-2 opacity-60 !cursor-not-allowed':
              disabled,
            '!border-blue bg-gray-5': isOpen,
            'border-red bg-red/10': error,
          },
        ]"
        class="px-3 py-2 text-sm transition-all border border-gray-300 cursor-pointer flex items-center justify-between gap-5 rounded-lg bg-white focus-within:!border-blue focus-within:!bg-gray-5"
        tabindex="1"
      >
        <div class="flex items-center">
          <slot name="prefix" />
          <template v-if="!hasPrefix">
            <p
              v-if="!value"
              class="text-gray-1 line-clamp-1 select-none"
              tabindex="1"
            >
              {{ $t(placeholder) }}
            </p>
            <slot v-else :value="value" name="selectedOption">
              <p class="select-none text-dark" tabindex="1">
                {{ (value as IndexedTSelectOption)[labelKey] || value }}
              </p>
            </slot>
          </template>
        </div>
        <div class="flex-y-center">
          <div v-if="hasPrefix">
            <p v-if="!value" class="text-gray-1 select-none" tabindex="1">
              {{ placeholder }}
            </p>
            <p v-else class="select-none text-dark" tabindex="1">
              {{ (value as IndexedTSelectOption)[labelKey] || value }}
            </p>
          </div>
          <slot :show="isOpen" name="chevron">
            <span
              :class="[{ 'rotate-90': isOpen }]"
              class="text-gray-1 icon-chevron -rotate-90 text-xl transition-all duration-200 inline-block shrink-0"
            >
            </span>
          </slot>
        </div>
      </div>
    </DropdownMenuTrigger>

    <!--  OPTIONS  -->
    <DropdownMenuContent class="w-full flex flex-col gap-0.5">
      <slot name="options">
        <template v-if="options?.length">
          <DropdownMenuItem
            v-for="(option, idx) in options"
            :key="idx"
            :class="[
              {
                'bg-gray-5 font-medium': isActive(option),
              },
              optionStyles,
            ]"
            class="transition-200 cursor-pointer hover:bg-gray-5 text-sm text-dark px-3 group last:rounded-b-md first:rounded-t-md rounded-sm"
            @click="onSelect(option)"
          >
            <slot :index="idx" :option="option" name="option">
              <div :class="optionBorder" class="py-1">
                {{ (option as IndexedTSelectOption)[labelKey] || option }}
              </div>
            </slot>
          </DropdownMenuItem>
        </template>

        <template v-else>
          <p class="p-4 text-center text-sm font-medium">
            {{ t("common.noData.title") }}
          </p>
        </template>
      </slot>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useInfiniteScroll } from "@vueuse/core";

import type { TSelectOption } from "@/components/Base/Form/Select/Select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useToggle from "@/composables/useToggle";
import { useI18n } from "vue-i18n";
import { SelectService } from "./formSelect.service";

interface Props {
  modelValue: TSelectOption;
  api: string;
  labelKey?: string;
  valueKey?: string;
  placeholder?: string;
  direction?: "top" | "bottom";
  selectedOptionStyles?: string;
  optionStyles?: string;
  optionBorder?: boolean;
  dark?: boolean;
  error?: boolean;
  disabled?: boolean;
  hasPrefix?: boolean;
  defaultValueKey?: string;
  saveName?: string;
}

type IndexedTSelectOption = Extract<TSelectOption, Record<string, unknown>>;

const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "id",
  placeholder: "Select option",
  optionBorder: true,
  defaultValueKey: "id",
});

interface Emits {
  (e: "on-toggle", value: boolean): void;
  (e: "update:modelValue", value: boolean): void;
  (e: "load"): void;
  (e: "on-select", value: TSelectOption): void;
}

const emit = defineEmits<Emits>();

const { t } = useI18n();
const { isOpen } = useToggle();

const options = ref<TSelectOption[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const currentPage = ref(1);
const value = ref<TSelectOption | null>(null);

const loadOptions = async (page = 1, reset = false) => {
  if (loading.value || (!hasMore.value && page > 1)) return;

  try {
    loading.value = true;
    const response = await SelectService.getOptions(props.api, {
      page,
      limit: 20,
    });

    if (reset) {
      options.value = response.results || [];
    } else {
      options.value = [...options.value, ...(response.results || [])];
    }

    hasMore.value = response.next !== null;
    currentPage.value = page;
  } catch (error) {
    console.error("Error loading options:", error);
  } finally {
    loading.value = false;
  }
};

const loadMore = () => {
  if (hasMore.value && !loading.value) {
    loadOptions(currentPage.value + 1);
  }
};

// Set up infinite scroll
const target = ref<HTMLElement>();
useInfiniteScroll(
  target,
  () => {
    loadMore();
  },
  { distance: 10 }
);

function toggleSelect(newValue = isOpen.value) {
  isOpen.value = newValue;
  emit("on-toggle", isOpen.value);

  if (isOpen.value && options.value.length === 0) {
    loadOptions(1, true);
  }
}

function findOption(option: TSelectOption) {
  return options.value.find((o) => o == option || o[props.valueKey] == option);
}

function onSelect(option: TSelectOption) {
  value.value = option;
  emit("update:modelValue", option[props.valueKey] ?? option);
  emit("on-select", option);
  toggleSelect(false);
}

function isActive(option: TSelectOption) {
  return (
    option == value.value ||
    option[props.valueKey as keyof typeof option] == value.value ||
    (typeof value.value == "object" &&
      option[props.valueKey as keyof typeof option] ==
        value.value[props.valueKey])
  );
}

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = findOption(newValue);
  },
  { immediate: true }
);

onMounted(() => {
  if (props.defaultValueKey && props.modelValue) {
    loadOptions(1, true);
  }
});
</script>
