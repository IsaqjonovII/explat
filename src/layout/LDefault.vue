<template>
  <div class="w-full flex">
    <BaseSidebar />

    <span id="top-element" />
    <div class="w-full min-h-screen grid grid-rows-[min-content_1fr]">
      <BaseHeader v-bind="{ activeRoute }" v-on="{ logout }" />
      <div class="h-full w-full px-7 py-5 overflow-y-auto bg-gray-9">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

import { BaseHeader, BaseSidebar } from "@/components/Base";
import { useAuth } from "@/modules/auth";

const router = useRouter();
const { logout: authLogout } = useAuth();

const activeRoute = "/";

const logout = () => {
  authLogout();
};
</script>
