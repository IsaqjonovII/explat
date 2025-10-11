<template>
  <div
    class="flex-center-between bg-gray-5 border border-gray-7 rounded-lg backdrop-blur min-w-[355px]"
  >
    <div class="flex-y-center pl-3 py-2 mr-5">
      <img :alt="type" :src="images[type]" />
      <div class="ml-2">
        <h2 class="text-primary font-normal text-xs leading-130">
          {{ title }}
        </h2>
      </div>
    </div>

    <span
      class="icon-x-mark mr-3 my-4 text-lg text-gray hover:text-red cursor-pointer transition-300"
      @click="closeToast"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCustomToast } from "@/composables/useCustomToast";

interface Props {
  type: "success" | "error" | "warning" | "info";
  title: string;
  id: string;
}

const props = defineProps<Props>();

const { dismissToast } = useCustomToast();

const images = computed(() => {
  return {
    success: "/svg/toast/success.svg",
    error: "/svg/toast/error.svg",
    warning: "/svg/toast/warning.svg",
    info: "/svg/toast/info.svg",
  };
});

function closeToast() {
  dismissToast(props.id);
}
</script>

<style>
.toast {
  box-shadow: 0px 8px 20px rgba(18, 28, 37, 0.16);
}
</style>
