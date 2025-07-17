<template>
  <div
    :class="[sizeClasses, avatarClass]"
    class="rounded-full relative overflow-hidden after:absolute after:inset-0 after:rounded-full after:border after:border-solid after:border-white/16 shrink-0"
  >
    <!--    <BaseShimmer v-bind="{ loading }" width="100%" height="100%">-->
    <img
      v-if="image && loaded"
      :src="image"
      @error="imageLoadError"
      alt="avatar-image"
      class="w-full h-full object-cover"
    />
    <div class="h-full flex-center" v-else>
      <i class="icon-user text-3xl font-light text-gray-neutral" />
    </div>

    <!--    </BaseShimmer>-->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import type { TClassName } from "@/types/common";

interface Props {
  image?: string;
  size?: "xs" | "sm" | "md" | "lg";
  avatarClass?: TClassName;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm",
  avatarClass: undefined,
  image: undefined,
});
const loaded = ref(true);
const imageLoadError = () => {
  loaded.value = false;
};

const sizeClasses = computed(() => {
  const size = props.size;
  return {
    "w-8 h-8": size === "sm",
    "w-10 h-10": size === "md",
    "w-[120px] h-[120px]": size === "lg",
  };
});
</script>
