<template>
  <div class="flex-center flex-col py-12 min-w-full">
    <span class="flex-center size-[104px] bg-brand/20 rounded-full">
      <i :class="icon ?? 'icon-files'" class="text-6xl text-brand" />
    </span>

    <p
      v-if="title"
      :class="titleClass"
      class="text-xl leading-130 font-medium text-dark-800 text-center mx-auto mt-5"
    >
      {{ title }}
    </p>
    <p
      v-if="subtitle"
      :class="subtitleClass"
      class="text-base leading-130 font-normal text-gray-700 text-center mx-auto mt-2"
    >
      {{ subtitle }}
    </p>

    <div class="mt-5">
      <slot v-if="hasActions" name="actions">
        <BaseButton
          v-if="!addLink"
          icon="icon-plus"
          :text="text"
          variant="info"
          @click="$emit('addLink')"
        />

        <RouterLink v-else :to="addLink">
          <BaseButton icon="icon-plus" :text="text" variant="info" />
        </RouterLink>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseButton } from "@/components/Base";

interface Props {
  subtitle?: string;
  subtitleClass?: string;
  title: string;
  icon?: string;
  titleClass?: string;
  addLink?: string;
  hasActions?: boolean;
  text?: string;
}

withDefaults(defineProps<Props>(), {
  title: "",
  hasActions: true,
  text: "button.add",
});

defineEmits(["add", "addLink"]);
</script>
