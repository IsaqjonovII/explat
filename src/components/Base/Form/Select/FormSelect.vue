<template>
  <DropdownMenu v-model:open="isOpen">
    <!--  SELECTED OPTION  -->
    <DropdownMenuTrigger>
      <div
        :class="[
          selectedOptionStyles,
          error ? '!border-red' : 'focus-within:border-blue',
          { 'focus-within:border-gray-100 !cursor-not-allowed': disabled },
        ]"
        class="px-3 py-2 h-10 text-sm transition-all border border-gray-300 cursor-pointer flex items-center justify-between gap-5 rounded-lg"
        tabindex="1"
      >
        <div class="flex items-center">
          <slot name="prefix" />
          <template v-if="!hasPrefix">
            <p
              v-if="!modelValue"
              :class="{ '!text-gray': disabled }"
              class="text-gray line-clamp-1 select-none"
              tabindex="1"
            >
              {{ $t(placeholder) }}
            </p>
            <slot v-else :value="modelValue" name="selectedOption">
              <p
                :class="{ '!text-gray': disabled }"
                class="select-none text-dark"
                tabindex="1"
              >
                {{
                  (modelValue as IndexedTSelectOption)[labelKey] || modelValue
                }}
              </p>
            </slot>
          </template>
        </div>
        <div class="flex-y-center">
          <div v-if="hasPrefix">
            <p
              v-if="!modelValue"
              :class="{ '!text-gray': disabled }"
              class="text-gray select-none"
              tabindex="1"
            >
              {{ placeholder }}
            </p>
            <p
              v-else
              :class="{ '!text-gray': disabled }"
              class="select-none text-dark"
              tabindex="1"
            >
              {{ (modelValue as IndexedTSelectOption)[labelKey] || modelValue }}
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
    <DropdownMenuContent>
      <slot name="options">
        <DropdownMenuItem
          v-for="(option, idx) in options"
          :key="idx"
          :class="[{ 'bg-gray-5 font-medium': isActive(option) }, optionStyles]"
          class="transition-200 cursor-pointer hover:bg-gray-5 text-sm text-dark px-3 group last:rounded-b-md first:rounded-t-md rounded-sm"
          @click="onSelect(option)"
        >
          <slot :index="idx" :option="option" name="option">
            <div :class="optionBorder" class="py-1">
              {{ (option as IndexedTSelectOption)[labelKey] || option }}
            </div>
          </slot>
        </DropdownMenuItem>
      </slot>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import type { TSelectOption } from "@/components/Base/Form/Select/Select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useToggle from "@/composables/useToggle";

interface Props {
  options: TSelectOption[];
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
}

type IndexedTSelectOption = Extract<TSelectOption, Record<string, object>>;

const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "id",
  placeholder: "Роль",
  optionBorder: true,
  options: () => [
    {
      name: "Наблюдатель",
      id: 1,
    },
    {
      name: "Модератор ",
      id: 2,
    },
  ],
});

interface Emits {
  (e: "on-toggle", value: boolean): void;

  (e: "load"): void;

  (e: "on-select", value: TSelectOption): void;
}

const modelValue = defineModel<TSelectOption | unknown>({ required: true });
const emit = defineEmits<Emits>();

const { isOpen, toggle } = useToggle();

function toggleSelect() {
  toggle();
  emit("on-toggle", isOpen.value);
}

function findOption(option: TSelectOption): unknown {
  return props.options.find((o: TSelectOption) => {
    if (typeof o === "object" && o != null) {
      return o[props.valueKey] == option;
    }
    return o == option;
  });
}

function onSelect(option: TSelectOption) {
  modelValue.value = findOption(option);
  emit("on-select", option);
  toggleSelect();
}

function isActive(option: TSelectOption) {
  return (
    option == modelValue.value ||
    option[props.valueKey as keyof typeof option] == modelValue.value ||
    (typeof modelValue.value == "object" &&
      option[props.valueKey as keyof typeof option] ==
        (modelValue.value as IndexedTSelectOption)[props.valueKey])
  );
}
</script>
