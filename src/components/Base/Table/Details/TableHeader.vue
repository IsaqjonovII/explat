<template>
  <header class="flex-center-between gap-4" :class="$attrs['class']">
    <div>
      <h2
        :class="titleClass"
        class="whitespace-nowrap leading-[23px] font-medium text-dark text-xl"
      >
        {{ noTranslation ? title : $t(title) }}
      </h2>
      <p
        :class="subtitleClass"
        class="text-xs font-normal text-gray-1 mt-1.5 whitespace-nowrap"
      >
        {{ noTranslation ? subtitle : $t(subtitle) }}
      </p>
    </div>

    <slot v-if="$slots['right']" name="right" />
  </header>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  subtitle?: string;
  titleClass?: string;
  subtitleClass?: string;
  noTranslation?: boolean;
};

withDefaults(defineProps<Props>(), {
  subtitle: "",
  subtitleClass: "",
  titleClass: "",
  noTranslation: false,
});
</script>
