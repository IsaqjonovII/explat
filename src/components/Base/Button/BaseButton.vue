<template>
  <button
    :class="[buttonStyles, $attrs.class]"
    class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-white transition-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-dark focus-visible:ring-offset-1 disabled:pointer-events-none [&_.icon]:pointer-events-none [&_.icon]:size-5 [&_.icon]:shrink-0 dark:focus-visible:ring-blue-dark active:scale-[.98] disabled:cursor-not-allowed select-none relative disabled:opacity-60 disabled:!bg-gray-3"
    v-bind="{ disabled, type, id }"
    @click="handleClick"
  >
    <slot>
      <span
        :class="[buttonTextStyles, mainClass]"
        class="opacity-100 text-center pointer-events-none"
      >
        <template v-if="String(text)?.length">
          {{ t(text) }}
        </template>

        <i v-if="!!icon" :class="icon" />
      </span>
    </slot>
    <Transition mode="out-in" name="fade">
      <span
        v-if="loading"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 !inline-block w-max h-max loading transition-300"
      >
        <svg
          class="animate-spin"
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            :class="loaderPathClass"
            d="M18.6705 10C19.4048 10 20.0091 10.5978 19.9118 11.3256C19.7101 12.8333 19.1663 14.2813 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433284 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C5.71875 0.833744 7.16671 0.289884 8.6744 0.0882432C9.40217 -0.00909153 10 0.595234 10 1.32949C10 2.06375 9.39999 2.64679 8.67774 2.77904C7.69697 2.95865 6.75831 3.33706 5.92155 3.89617C4.71433 4.70281 3.77341 5.84932 3.21779 7.19071C2.66217 8.53211 2.51679 10.0081 2.80004 11.4322C3.0833 12.8562 3.78246 14.1642 4.80912 15.1909C5.83578 16.2175 7.14383 16.9167 8.56784 17.2C9.99186 17.4832 11.4679 17.3378 12.8093 16.7822C14.1507 16.2266 15.2972 15.2857 16.1038 14.0784C16.6629 13.2417 17.0414 12.303 17.221 11.3223C17.3532 10.6 17.9363 10 18.6705 10Z"
          />
        </svg>
      </span>
    </Transition>
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type {
  TButtonSizes,
  TButtonVariants,
} from "@/components/Base/Button/BaseButton";
import type { TClassName } from "@/types/common";
import type { ButtonEmits, ButtonProps } from "@/types/components";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  text: "Button",
  iconPosition: "right",
  icon: "",
  mainClass: "",
  type: "button",
  id: "button",
});

const emit = defineEmits<ButtonEmits>();
const { t } = useI18n();

const variants: Record<TButtonVariants, TClassName> = {
  primary: "bg-blue-dark text-white hover:bg-blue ",
  danger: "bg-red/10 text-red hover:bg-red/20 disabled:text-gray-1",
  outline: "border border-gray-3 text-dark hover:bg-gray-5",
  neutral: "bg-gray-5 hover:bg-gray-4 text-dark disabled:text-gray-1",
  info: "bg-blue/10 text-blue hover:bg-blue/20 disabled:text-gray-1",
  test: "bg-yellow-dark/10 text-yellow-dark hover:bg-yellow-dark hover:text-white  disabled:text-gray-1",
  activate:
    "bg-green/10 text-green hover:bg-green hover:text-white disabled:text-gray-1",
  deactivate:
    "bg-red/10 text-red hover:text-white hover:bg-red disabled:text-gray-1",
};

const sizes: Record<TButtonSizes, TClassName> = {
  sm: "py-2 !px-4 text-xs font-medium rounded-md h-10",
  md: "py-2.5 px-6 font-medium text-base rounded-lg",
  lg: "p-1.5 font-medium text-base rounded-lg bg-gray-5 border-none",
};

const loaderPathClass = computed(() => {
  if (["outline-primary"].includes(props.variant)) {
    return "fill-blue";
  } else if (["gray"].includes(props.variant)) {
    return "fill-gray-100";
  } else if (["secondary"].includes(props.variant)) {
    return "fill-blue-800";
  } else if (["outline-dark"].includes(props.variant)) {
    return "fill-dark";
  }
  return "fill-white";
});

const buttonTextStyles = computed(() => ({
  "!opacity-0 !invisible": props.loading,
  "flex-center justify-center gap-1": props.text,
  "flex-row-reverse": props.iconPosition === "left",
}));

const buttonStyles = computed(() => [
  variants[props.variant],
  sizes[props.size],
  { "!pointer-events-none": props.loading },
]);

function handleClick(e: MouseEvent) {
  if (props.loading || props.disabled) {
    e.stopPropagation();
    return;
  }
  emit("click", e);
}
</script>
