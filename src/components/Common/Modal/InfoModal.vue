<template>
  <BaseModal
    :model-value="modalValue"
    :title="t('transaction_modal_info.title')"
    @close="$emit('close')"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">
          {{ $t("transaction_modal_info.type") }}
        </span>
        <span class="leading-130 font-medium">{{
          $t(`transactions_all_types.${data?.transaction_type}`)
        }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-xs text-gray-1">
          {{ $t("transaction_modal_info.time") }}
        </span>
        <div>
          <span class="text-sm font-medium text-dark-black">
            {{ dayjs(data?.created_at).format("DD.MM.YYYY") }} </span
          >,
          <span class="text-sm font-medium text-gray-1">
            {{ dayjs(data?.created_at).format("HH:mm") }}
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("user") }}</span>
        <BaseTableUser
          :image="data?.account?.avatar?.[EImageSize.SMALL]"
          :name="data?.account.full_name"
          :phone="data?.account?.phone"
          class="!gap-2"
        />
      </div>
      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{
          $t("transaction_modal_info.id")
        }}</span>
        <span class="leading-130 font-medium">{{ data?.id }}</span>
      </div>

      <div class="flex flex-col gap-1.5">
        <span class="text-xs text-gray-1">{{
          $t("transaction_modal_info.amount")
        }}</span>
        <span class="leading-130 font-medium">
          {{ formatMoneyDecimal(data?.amount) }} UZS
        </span>
      </div>

      <div class="flex flex-col gap-1.5">
        <span class="text-xs text-gray-1">{{ $t("source") }}</span>
        <UserSource
          :source="data?.account?.device?.source"
          :src="data?.account?.device?.logo"
          :type="data?.account?.device?.device_type"
        />
      </div>

      <div class="flex flex-col gap-1">
        <span class="text-xs text-gray-1">{{ $t("status") }} </span>
        <BaseBadge
          :color="data?.status"
          :status="$t(`statuses.${data?.status}`)"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

import { BaseBadge } from "@/components/Base";
import BaseModal from "@/components/Base/Modal/BaseModal.vue";
import User from "@/components/Base/Table/Details/BaseTableUser.vue";
import BaseTableUser from "@/components/Base/Table/Details/BaseTableUser.vue";
import UserSource from "@/modules/user/components/UserSource.vue";
import { EImageSize } from "@/types/common";

import { formatMoneyDecimal } from "../../../utils";

const { t } = useI18n();

interface Props {
  modalValue: boolean;
  data: object;
}

defineProps<Props>();
</script>
