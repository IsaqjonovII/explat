<template>
  <div>
    <BaseDropdown
      v-model="show"
      body-class="overflow-visible !border-[#E5EAEE]"
      head-class="cursor-pointer"
    >
      <template #head>
        <div class="flex items-center gap-3">
          <div class="h-max flex flex-col justify-center">
            <span
              class="font-semibold text-dark-black text-right leading-130 !break-all max-w-[400px] line-clamp-1"
            >
              {{ user?.name || "adminName" }}
            </span>
            <span class="text-sm text-gray-1 text-right">
              {{ $t(`roles.${user?.role || "admin"}`) }}
            </span>
          </div>
          <BaseAvatar
            :image="'/images/default/avatar.svg'"
            avatar-class="w-9 h-9 rounded-full object-cover"
          />
          <span
            :class="{ '!rotate-90': show }"
            class="icon-chevron -rotate-90 text-2xl text-gray-neutral transition-300"
          />
        </div>
      </template>
      <template #body>
        <BaseButton
          class="!border-none !w-full"
          icon="icon-logout"
          size="sm"
          text="button.logout"
          variant="danger"
          @click="toggle"
        />
      </template>
    </BaseDropdown>

    <ConfirmModal
      v-model="isOpen"
      :description="$t('auth.logout.info')"
      :title="$t('auth.logout.title')"
      confirm-button-text="button.logout"
      @confirm="handleLogout"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import { BaseAvatar, BaseButton, BaseDropdown } from "@/components/Base";
import ConfirmModal from "@/components/Common/Modal/ConfirmModal.vue";
import useToggle from "@/composables/useToggle";
import { IAuthUser } from "@/types/auth";
import { useAuth } from "@/modules/auth";

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

const { isOpen, toggle } = useToggle();
const { logout, user } = useAuth();
const router = useRouter();

const show = ref(false);

function handleLogout() {
  logout();
}
</script>

<style scoped>
.profile-dropdown {
  box-shadow: 0 0 50px rgba(82, 63, 105, 0.15);
}
</style>
