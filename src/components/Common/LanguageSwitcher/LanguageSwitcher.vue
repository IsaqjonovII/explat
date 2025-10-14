<template>
  <BaseDropdown :content="{ class: 'flex flex-col gap-0.5' }">
    <template #trigger>
      <div
        class="!cursor-pointer hover:[&>*]:!text-primary [&>*]:!transition-all [&>*]:!duration-300 flex items-center justify-center p-2 hover:bg-gray-5 rounded-md transition-300 h-12"
      >
        <i class="icon-language text-secondary align-middle" />
        <span class="text-xs text-secondary transition-300 px-2">
          {{ currentLanguage?.name }}
        </span>

        <button
          class="icon-chevron !cursor-pointer leading-3 font-bold text-secondary transition-transforms transition-300 -rotate-90 align-middle"
        />
      </div>
    </template>

    <template #body>
      <DropdownMenuItem
        v-for="(lang, index) in languages"
        :key="index"
        class="w-full cursor-pointer flex items-center justify-between gap-4 transition-300 py-2 hover:bg-gray-5"
        :class="{ 'bg-gray-5': lang?.code === currentLanguage?.code }"
        @click="changeLocale(lang?.code)"
      >
        <span
          :class="{ 'font-semibold': lang?.code === currentLanguage?.code }"
          class="text-sm font-normal text-dark"
        >
          {{ lang.name }}
        </span>
        <span
          v-if="lang?.code === currentLanguage?.code"
          class="icon-tick text-sm leading-5 text-blue"
        />
      </DropdownMenuItem>
    </template>
  </BaseDropdown>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { BaseDropdown } from "@/components/Base";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getCookie, setCookie } from "@/utils/browser";

const languages = [
  {
    name: "O'zbekcha",
    code: "uz",
  },
  {
    name: "English",
    code: "en",
  },
  {
    name: "Русский",
    code: "ru",
  },
];

const locale = getCookie("locale");

const currentLanguage = computed(() =>
  languages.find((lang) => lang.code === locale)
);

function changeLocale(_locale: string) {
  if (locale !== _locale) {
    setCookie("locale", _locale);
    window.location.reload();
  }
}
</script>
