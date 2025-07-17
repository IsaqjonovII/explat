<template>
  <div class="w-full flex">
    <BaseSidebar />

    <span id="top-element" />
    <div class="w-full min-h-screen grid grid-rows-[min-content_1fr]">
      <BaseHeader
        :user="authStore.user"
        v-bind="{ activeRoute }"
        v-on="{ logout }"
      />
      <div class="h-full w-full px-7 py-5 overflow-y-auto bg-gray-9">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

import { BaseHeader, BaseSidebar } from "@/components/Base";
import { useAuthStore } from "@/modules/auth/store";

const router = useRouter();
const authStore = useAuthStore();

const activeRoute = "/";

const logout = () => {
  authStore.logout();
  router.push({ name: "auth" });
};
</script>
