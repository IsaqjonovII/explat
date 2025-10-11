<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { BaseButton } from "@/components/Base";
import { nonClearableKeys } from "@/data/table";

const emit = defineEmits(["clearFilter", "click"]);

defineProps<{
  activeCount: number;
}>();

const show = defineModel<boolean>();

const router = useRouter();
const route = useRoute();

const handleClearFilter = async () => {
  const query = { ...route.query };
  for (const key in query) {
    if (nonClearableKeys.includes(key)) {
      continue;
    }
    delete query[key];
  }
  await router.push({ query });
  emit("clearFilter");
  show.value = false;
};

const handleClick = () => {
  show.value = !show.value;
};

const buttonClasses = computed(() => ({
  "bg-gray": !show.value,
  "bg-primary/20 text-primary": show.value,
}));
</script>

<template>
  <div class="flex flex-row gap-5">
    <transition name="slide-left">
      <BaseButton
        v-if="show"
        class="bg-yellow/10 text-yellow hover:bg-yellow/20"
        icon="icon-filter-x text-lg"
        icon-position="left"
        size="sm"
        text="button.clear_filter"
        variant="info"
        @click="handleClearFilter"
      />
    </transition>

    <button
      id="filterButton"
      :class="[
        buttonClasses,
        { '!text-blue !bg-blue/10': show || activeCount },
      ]"
      class="w-10 h-10 bg-gray-5 text-gray-1 relative transition-all duration-300 rounded-md flex-center"
      type="button"
      @click="handleClick"
    >
      <transition name="fade">
        <span
          v-if="!show && activeCount"
          class="absolute top-[-5px] right-[-5px] rounded-full bg-red text-white size-4 flex items-center justify-center text-xs font-medium"
        >
          {{ activeCount }}
        </span>
      </transition>

      <i v-if="!show" class="icon-filter text-xl leading-5" />
      <i v-else class="icon-x-mark text-xl leading-5 text-blue" />
    </button>
  </div>
</template>
