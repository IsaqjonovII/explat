<template>
  <div class="flex items-center gap-2">
    <p class="text-xs leading-5 font-medium text-dark">
      {{ $t("form.pagination.show") }}
    </p>
    <FormSelect
      v-model="value"
      :disabled="disabled"
      direction="bottom"
      selected-option-styles="!px-3 !py-1 bg-gray-5 border-none"
      v-bind="{ options }"
    />
  </div>
</template>

<script lang="ts" setup>
import { FormSelect } from "@/components/Base";

interface Props {
  disabled?: boolean;
}

defineProps<Props>();

const value = defineModel<number>({
  default: 10,
});

const options = [5, 10, 50, 100, 500];
</script>
