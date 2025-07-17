<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuContentProps } from "radix-vue";

type Props = {
  content?: DropdownMenuContentProps;
};

defineProps<Props>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuContent v-bind="content">
      <slot name="body" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
