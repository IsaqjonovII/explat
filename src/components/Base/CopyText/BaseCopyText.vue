<template>
  <div class="flex-y-center gap-1 relative w-fit" @click="copyToClipboard">
    <p :class="[textClass]" class="text-sm text-dark">
      {{ text }}
    </p>

    <button
      class="icon-copy active:scale-95 bg-gray-4 p-0.5 rounded text-gray-1 hover:bg-gray-5 transition-colors duration-200"
      @click="copyToClipboard"
    />

    <Transition mode="out-in" name="dropdown">
      <span
        v-if="isCopied"
        class="text-sm text-white bg-dark/80 backdrop-blur-sm rounded-lg px-2 py-1 absolute-x -top-8"
      >
        {{ t("copied") }}
      </span>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
  text: string;
  textClass?: string;
};

const props = defineProps<Props>();

const { t } = useI18n();

const isCopied = ref(false);

const timeoutId = ref<number | null>(null);

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.text).then(() => {
    if (timeoutId.value) clearTimeout(timeoutId.value);
    isCopied.value = true;

    timeoutId.value = setTimeout(() => {
      isCopied.value = false;
    }, 1200);
  });
};
</script>
