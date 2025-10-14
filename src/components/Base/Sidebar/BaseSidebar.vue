<template>
  <div
    :class="[isOpen ? 'w-64' : 'w-20']"
    class="h-screen transition-300 shrink-0"
  />
  <div
    :class="[isOpen || hovered ? 'w-64' : 'w-20']"
    class="h-screen transition-300 fixed flex flex-col justify-between z-30 overflow-hidden bg-blue-dark"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="z-20 h-full">
      <div
        class="w-full px-4 py-5 flex items-center justify-center border-b border-solid border-white/10 bg-transparent"
      >
        <div
          :class="{ 'opacity-0 invisible scale-0': !isOpen && !hovered }"
          class="relative overflow-hidden transition-300 w-52"
        >
          <RouterLink to="/">
            <!-- <BaseLogo/> -->
            <img
              alt="Explat Logo"
              class="aspect-[15/3] max-h-7 object-contain"
              src="/images/logo/logo.png"
            />
          </RouterLink>
        </div>
        <div
          class="cursor-pointer bg-primary/10 rounded-l size-7 flex items-center justify-center transition-300"
          @click="toggleSidebar"
        >
          <span
            :class="{ '!rotate-180': !isOpen }"
            class="flex items-center transition-300"
          >
            <i class="icon-double-arrow text-primary text-lg" />
          </span>
        </div>
      </div>

      <div class="flex flex-col py-5 overflow-y-auto flex-1 h-full">
        <div v-for="(menuItem, index) in menu" :key="index">
          <div v-if="menuItem?.meta?.includes(authStore?.role)">
            <div
              v-if="menuItem?.space"
              class="w-[calc(100%-20px)] ml-auto h-px bg-white/10 my-4"
            />
            <RouterLink
              v-if="!menuItem?.sub?.length"
              :class="{
                '!bg-blue/10': createRoutePattern(
                  menuItem.route.toString()
                ).test(location),
              }"
              :to="menuItem?.route"
              class="py-3 px-5 hover:bg-blue/10 transition-300 flex items-center group gap-3 h-12 group"
              @click="openMenu(index)"
            >
              <i
                :class="[
                  'group-hover:!text-blue',
                  menuItem?.svgIcon,
                  {
                    '!text-blue': createRoutePattern(
                      menuItem.route.toString()
                    ).test(location),
                  },
                ]"
                class="text-xl text-gray-100 group-hover:!text-blue transition-300"
              />
              <CollapseTransition :duration="300" dimension="width">
                <p
                  v-if="isOpen || hovered"
                  :class="{
                    'font-semibold': createRoutePattern(menuItem.route).test(
                      location
                    ),
                  }"
                  class="text-sm text-white font-normal whitespace-nowrap"
                >
                  {{ $t(menuItem?.heading) }}
                </p>
              </CollapseTransition>
            </RouterLink>
            <!-- Todo: refactor class binding -->
            <div
              v-else
              :class="[
                index === openIndex || isActiveSub(menuItem?.sub)
                  ? 'bg-white/10'
                  : '',
              ]"
              class="transition-300 cursor-pointer"
            >
              <div
                class="py-3 px-5 flex hover:bg-primary/10 transition-300 items-center justify-between gap-3 h-12 group"
                @click="openMenu(index)"
              >
                <div class="flex items-center gap-3">
                  <i
                    :class="[
                      menuItem?.svgIcon,
                      {
                        '!text-blue':
                          location === menuItem?.route ||
                          isActiveSub(menuItem?.sub),
                      },
                    ]"
                    class="text-xl text-gray-100 group-hover:!text-blue transition-300"
                  />
                  <CollapseTransition :duration="300" dimension="width">
                    <p
                      v-if="isOpen || hovered"
                      :class="{ 'font-semibold': isActiveSub(menuItem?.sub) }"
                      class="text-sm text-white font-normal whitespace-nowrap"
                    >
                      {{ $t(menuItem?.heading) }}
                    </p>
                  </CollapseTransition>
                </div>
                <i
                  v-if="isOpen || hovered"
                  :class="[
                    {
                      '!-rotate-90 text-blue ': index !== openIndex,
                    },
                  ]"
                  class="icon-chevron rotate-90 text-xl leading-5 transition-300 text-gray-0"
                />
              </div>
              <CollapseTransition>
                <div
                  v-if="
                    (menuItem?.sub?.length && index === openIndex && isOpen) ||
                    (index === openIndex && !isOpen && hovered)
                  "
                >
                  <RouterLink
                    v-for="(subMenuItem, idx) in menuItem?.sub"
                    :key="idx"
                    :to="subMenuItem?.route"
                    class="p-3 pl-10 transition-300 flex items-center gap-3 h-12 text-gray-700 group"
                  >
                    <span
                      :class="{
                        '!text-white': location === subMenuItem?.route,
                      }"
                      class="group-hover:bg-white transition-300 w-3 h-[2px] bg-gray-0"
                    />
                    <CollapseTransition :duration="300" dimension="width">
                      <p
                        v-if="isOpen || hovered"
                        :class="{
                          '!text-white font-semibold':
                            location === subMenuItem?.route,
                        }"
                        class="text-sm font-normal text-gray-0 group-hover:text-white transition-300 whitespace-nowrap"
                      >
                        {{ $t(subMenuItem?.heading) }}
                      </p>
                    </CollapseTransition>
                  </RouterLink>
                </div>
              </CollapseTransition>
            </div>
          </div>
        </div>
        <a
          href="/parser.png"
          download
          v-if="authStore?.role == 'trader'"
          class="w-[calc(100%-20px)] ml-auto h-px bg-white/10 my-4"
        >
          <div class="flex items-center cursor-pointer gap-2 mt-2">
            <i class="icon-download text-white text-2xl" />
            <span class="text-white text-sm">
              {{ $t("menu.sidebar.download") }}
            </span>
          </div>
        </a>
      </div>
    </div>

    <div v-if="false" class="p-5">
      <RouterLink
        class="whitespace-nowrap text-xs underline hover:opacity-80 transition-300 text-gray-200"
        to="/"
      >
        {{ $t("privacy_policy") }}
      </RouterLink>
      <p class="whitespace-nowrap text-xs text-gray-200 mt-2.5">
        {{ $t("version") }} {{ CONFIG.APP_VERSION }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { CONFIG } from "@/config";
import { type IMenu, menu } from "@/config/menu";
import { useAuthStore } from "@/modules/auth/store";

const authStore = useAuthStore()?.user;
const openIndex = ref<number>();
const isOpen = ref(true);
const hovered = ref(false);
const route = useRoute();

const location = computed(() => route.path);

function openMenu(index?: number) {
  if (openIndex.value === index) {
    openIndex.value = undefined;
  } else {
    openIndex.value = index;
  }
}

function checkIndexActive() {
  menu.forEach((el, index) => {
    if (el?.sub?.length) {
      el?.sub?.forEach((elSub) => {
        if (elSub?.route === location.value) {
          openIndex.value = index;
        }
      });
    }
  });
}

onMounted(() => {
  setTimeout(() => {
    checkIndexActive();
  }, 100);
});

watch(location, () => {
  checkIndexActive();
});

function isActiveSub(arr?: IMenu[]) {
  return arr?.some((el) => {
    const routePattern = new RegExp(
      `^${el.route.toString()?.replace(/:\w+/g, "\\w+")}`
    );
    return (
      routePattern.test(location.value) ||
      location.value.startsWith(el.route.toString())
    );
  });
}

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;

  if (!isOpen.value) {
    hovered.value = false;
    isOpen.value = false;
  }
};

function createRoutePattern(route: string): RegExp {
  const escapedRoute = route.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
  const dynamicSegmentPattern = escapedRoute.replace(/:\w+/g, "\\w+");
  return new RegExp(`(^|/)${dynamicSegmentPattern}(\\/\\w+)*\\/?$`);
}
</script>
