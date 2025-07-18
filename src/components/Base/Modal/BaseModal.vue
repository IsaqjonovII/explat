<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogContent :class="wrpClass" class="sm:max-w-[425px]">
      <DialogHeader>
        <slot name="header">
          <DialogTitle>{{ title }}</DialogTitle>
          <DialogDescription>
            {{ description }}
          </DialogDescription>
        </slot>
      </DialogHeader>

      <slot />
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ModalProps } from "@/types/components";

defineProps<ModalProps>();
const isOpen = defineModel<boolean>({ required: true });
</script>
