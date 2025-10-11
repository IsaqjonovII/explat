<script lang="ts" setup>
import { cn } from "@/lib/utils";
import {
  DropdownMenuItem,
  type DropdownMenuItemProps,
  useForwardProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  DropdownMenuItemProps & { class?: HTMLAttributes["class"]; inset?: boolean }
>();
defineEmits<{ (e: "click"): void }>();
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuItem
    :class="
      cn(
        'relative flex cursor-default select-none items-center gap-2 px-2 py-1.5 text-sm outline-none transition-300 focus:bg-gray-5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50  [&>svg]:size-4 [&>svg]:shrink-0 rounded-md',
        inset && 'pl-8',
        props.class
      )
    "
    v-bind="forwardedProps"
    @click="$emit('click')"
  >
    <slot />
  </DropdownMenuItem>
</template>
