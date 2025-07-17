<template>
  <div class="flex-y-center gap-3">
    <BaseAvatar :image="image" size="md" />
    <div class="flex-col flex gap-1">
      <span
        class="text-sm font-medium leading-130 text-dark-black flex-y-center gap-2"
      >
        {{ name }}
        <BaseTooltip
          v-if="!isVerified"
          :text="$t('user_status.unverified')"
          position="top"
        >
          <i class="icon-unverified">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </i>
        </BaseTooltip>
      </span>
      <span class="text-xs leading-130 text-gray-1">
        {{ formatPhoneNumber(phone) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BaseAvatar } from "@/components/Base";
import BaseTooltip from "@/components/Base/Tooltip/BaseTooltip.vue";
import { formatPhoneNumber } from "@/utils/functions/common";

interface Props {
  image: string;
  name: string;
  phone: string;
  isVerified?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: "Verify",
  isVerified: true,
});
</script>
