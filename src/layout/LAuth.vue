<template>
  <div class="grid grid-cols-10">
    <div
      class="relative flex-center-between col-span-6 flex-col py-12 overflow-y-scroll max-h-screen bg-white gap-4"
    >
      <div class="h-[calc(100%-100px)] flex-center w-full max-w-sm shrink-0">
        <slot />
      </div>
    </div>

    <div
      class="col-span-4 px-10 h-svh bg-dark bg-image relative flex flex-col justify-center"
    >
      <img class="w-full" alt="logo svg" src="/images/logo/logo.png" />
      <p class="text-white text-center mt-0 text-xl">{{ $t("title") }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.bg-image {
  /* background-image: url("/images/auth/banner.avif"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
