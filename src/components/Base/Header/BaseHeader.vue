<template>
  <header
    class="w-full bg-white py-4 px-7 z-20 flex items-center justify-between sticky top-0 shadow-header"
  >
    <CBalance
      v-if="
        user?.role !== 'admin' &&
        user?.role !== 'merchant' &&
        user?.role !== 'superadmin'
      "
      class="shrink-0"
    />
    <nav class="flex w-full h-full items-center gap-5 justify-end">
      <slot name="before-links" />
      <ul class="flex gap-x-2">
        <li v-for="(link, index) in links" :key="index">
          <RouterLink
            :class="{ 'bg-gray-200 !text-blue-500': link.to === activeRoute }"
            :to="link.to"
            class="text-slate-700 px-3 py-2 inline-block text-sm transition-all duration-200 hover:bg-gray-200 rounded-md"
          >
            <span>{{ link.title }}</span>
          </RouterLink>
        </li>
      </ul>
      <div class="flex items-center gap-4 divide-x divide-[#F6F8FA]">
        <!--        <LanguageSwitche class="pr-4" variant="transparent"/>-->
        <!--        <Notifications v-if="authStore.hasUser" class="px-4" />-->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <!-- <span class="text-sm text-gray-600">{{ $t("welcome") }},</span>
            <span class="text-sm font-medium text-dark">{{
              user?.name || "User"
            }}</span>
            <span
              class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
              {{ user?.role }}
            </span> -->
          </div>
          <div class="flex items-center gap-2">
            {{ $t("course") }}
            <div class="bg-gray-100 rounded-lg text-dark text-xl px-2 p-1">
              {{ garantex?.amount }}
              {{ garantex?.currency }}
            </div>
          </div>
        </div>

        <BaseHeaderProfile
          :is-auth="!!user"
          class="pl-4"
          @logout="$emit('logout')"
        />
      </div>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import BaseHeaderProfile from "@/components/Base/Header/details/BaseHeaderProfile.vue";
import { CBalance } from "@/components/Common";
import { ref } from "vue";
import { useAuth } from "@/modules/auth";

interface Props {
  links?: { title: string; to: string }[];
  activeRoute?: string;
}

defineProps<Props>();
const { user } = useAuth();

interface Emits {
  (event: "logout"): void;
}

const garantex = ref({
  amount: 92.3,
  currency: "₽",
});

defineEmits<Emits>();
</script>
