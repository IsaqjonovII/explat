<template>
  <div>
    <BaseDropdown
      ref="profileDropdown"
      :show="show"
      body-class="overflow-visible !border-[#E5EAEE]"
      head-class="cursor-pointer"
      @toggle="handleToggle"
    >
      <template #trigger>
        <div class="flex gap-3">
          <div class="flex items-end flex-col">
            <p class="font-semibold">
              {{ user?.full_name }}
            </p>
            <p class="text-gray-10">{{ $t("roles." + user?.role) }}</p>
          </div>
          <BaseAvatar
            avatar-class="!w-[50px] !h-[50px] object-cover"
            :image="user?.avatar_url || '/images/default-avatar.png'"
          />
        </div>
      </template>
      <template #body>
        <div class="bg-white rounded-md profile-dropdown">
          <router-link
            :to="{ name: 'Dashboard' }"
            class="flex flex-col gap-1 border-t border-[#E5EAEE]"
            @click="reloadPage"
          >
            <div
              class="text-sm !px-4 py-2 w-full transition-all duration-300 cursor-pointer text-gray-700 hover:bg-red-50 hover:text-red-500"
              @click="$emit('logout')"
            >
              <span class="mx-4">{{ $t("logout") }}</span>
            </div>
          </router-link>
        </div>
      </template>
    </BaseDropdown>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { defineComponent, ref } from "vue";

import BaseAvatar from "@/components/Base/Avatar/BaseAvatar.vue";
import BaseDropdown from "@/components/Base/Dropdown/BaseDropdown.vue";
import type { IAuthUser } from "@/types/auth";

defineComponent({
  name: "HeaderProfile",
});

interface Props {
  user?: IAuthUser;
  isAuth?: boolean;
  profileItems?: {
    title: string;
    class?: string;
    icon?: string;
    event?: string;
  }[];
}

defineProps<Props>();
const show = ref(false);

function handleToggle(val: boolean, e: Event) {
  if (e?.relatedTarget?.id === "lang-switcher") {
    return;
  }
  show.value = val;
}

const profileDropdown = ref<HTMLElement | null>(null);
onClickOutside(profileDropdown, () => {
  show.value = false;
});

const reloadPage = () => {
  window.location.reload();
};
</script>

<style scoped>
.profile-dropdown {
  box-shadow: 0 0 50px rgba(82, 63, 105, 0.15);
}
</style>
