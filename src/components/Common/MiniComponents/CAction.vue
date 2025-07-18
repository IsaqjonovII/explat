<template>
  <div class="flex items-center gap-2">
    <BaseDropdown v-model="confirmation" @update:model-value="emit('approve')">
      <template #trigger>
        <BaseButton
          v-if="approve"
          class="!px-2 min-w-[150px] !py-1.5 !text-sm !text-white !bg-green !rounded-lg"
          :text="approve"
        />
      </template>
      <template #body>
        <div class="flex gap-1 flex-col items-start">
          <button class="hover:bg-gray-100 p-1 rounded-[3px] w-full text-left">
            {{ $t("part") }}
          </button>
          <button class="hover:bg-gray-100 p-1 rounded-[3px] w-full text-left">
            {{ $t("reject1") }}
          </button>
        </div>
      </template>
    </BaseDropdown>
    <BaseButton
      @click="rejectModal = true"
      v-if="reject"
      class="!px-2 min-w-[150px] !py-1.5 !text-sm !text-white !bg-red-light !rounded-lg"
      :text="reject"
    />
    <BaseModal :title="$t('reject_info')" v-model="rejectModal">
      <FormGroup :label="$t('rejecting.title')">
        <FormInput
          v-model="form.values.reject_reason"
          :placeholder="$t('rejecting.title_text')"
        />
      </FormGroup>
      <FormGroup :label="$t('rejecting.file')">
        <BaseImageUploader id="reject-file" v-model="form.values.file" />
      </FormGroup>
      <div class="flex gap-2">
        <BaseButton
          @click="rejectModal = false"
          :text="$t('rejecting.cancel')"
          variant="neutral"
          class="flex-1"
        />
        <BaseButton
          :text="$t('rejecting.reject')"
          variant="danger"
          class="flex-1"
        />
      </div>
    </BaseModal>
  </div>
</template>

<script lang="ts" setup>
import {
  BaseButton,
  BaseDropdown,
  FormGroup,
  BaseModal,
  FormInput,
  BaseImageUploader,
} from "@/components/Base";
import { required } from "@vuelidate/validators";
import { ref } from "vue";
import { useForm } from "@/composables/useForm";

interface Props {
  approve?: string;
  reject?: string;
}

const form = useForm(
  {
    reject_reason: "",
    file: "",
  },
  {
    reject_reason: { required },
    file: { required },
  },
);

const emit = defineEmits<{
  (event: "approve"): void;
  (event: "reject"): void;
}>();

const confirmation = ref(false);
const rejectModal = ref(false);

defineProps<Props>();
</script>
