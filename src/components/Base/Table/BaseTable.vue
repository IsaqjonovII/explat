<template>
  <div class="bg-white rounded-xl">
    <slot name="header">
      <header
        v-if="!noHeader"
        :class="headerClass"
        class="flex justify-between pt-6 gap-3"
      >
        <div>
          <h2
            :class="titleClass"
            class="whitespace-nowrap text-xl leading-[23px] font-bold text-dark"
          >
            {{ title }}
          </h2>
          <p
            :class="subtitleClass"
            class="text-xs font-normal text-gray-neutral mt-1.5 whitespace-nowrap"
          >
            {{ subtitle }}
          </p>
        </div>
        <div
          :class="actionsClass"
          class="flex gap-5 2xl:gap-5 flex-wrap w-full justify-end"
        >
          <div v-if="!noFilter" class="shrink-0">
            <BaseTableCollapseFilter v-model="showFilter" :filter />
          </div>

          <form autocomplete="off" class="flex gap-2 justify-end 2xl:gap-5">
            <Input
              v-if="!noSearch"
              :class="searchInputClass"
              :model-value="search"
              :placeholder="$t('search')"
              class="!min-w-[215px] max-w-[150px] !h-10"
              input-class="placeholder:font-medium text-sm"
              prefix-class="pl-2.5 text-xl text-gray !py-0"
              suffix-class="pr-2"
              @update:model-value="onSearch"
            >
              <template #prefix>
                <span class="icon-search text-gray-1 text-2xl"></span>
              </template>
              <template #suffix>
                <button
                  :class="{ '!opacity-100 !visible': search?.length }"
                  class="icon-x-mark text-dark text-xl transition-200 hover:text-red opacity-0 invisible"
                  @click="clearSearch"
                />
              </template>
            </Input>
            <slot name="afterSearch" />
          </form>
          <BaseButton
            v-if="hasAddButton"
            class="!py-0 h-[40px] !px-6"
            @click="
              hasAddButton.link ? router.push(hasAddButton.link) : $emit('add')
            "
          >
            <div class="flex items-center gap-1">
              <span class="text-xs text-white leading-5 font-medium">
                {{ hasAddButton.title }}
              </span>
              <i class="icon-plus text-lg"></i>
            </div>
          </BaseButton>
        </div>
      </header>
    </slot>
    <CollapseTransition>
      <div v-if="showFilter" class="w-full pt-6">
        <div
          class="flex relative rounded-lg bg-white-1 p-4 flex-row flex-wrap items-center gap-4"
        >
          <span :style="svgPosition" class="absolute -top-[14px] z-50">
            <svg
              fill="none"
              height="17"
              viewBox="0 0 26 17"
              width="26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 0L25.9904 16.5H0.00961876L13 0Z" fill="#F3F5F4" />
            </svg>
          </span>
          <slot name="filter"></slot>
        </div>
      </div>
    </CollapseTransition>

    <slot name="users">
      <div :class="wrapperClass" class="w-full max-w-full pt-6">
        <table class="w-full c-table overflow-x-auto">
          <thead>
            <Transition mode="out-in" name="fade">
              <tr v-if="!loading && data?.length">
                <th
                  v-for="(h, index) in head"
                  :key="index"
                  :class="[{ 'w-[5%]': h.key === '_index' }, thClass]"
                  class="p-1 py-3 bg-white-1 font-[Arial] first:rounded-l-md last:rounded-r-md !rounded-b-[0px] text-xs text-left last:text-right first:pl-4 last:pr-2 text-gray font-semibold"
                >
                  <div
                    :class="[
                      { 'last:justify-end': index === head.length - 1 },
                      {
                        'last:!justify-start':
                          thClass?.includes('last:!text-left'),
                      },
                    ]"
                    class="flex-y-center g-0.5"
                  >
                    <CheckBox
                      v-if="index === 0 && hasCheckbox"
                      v-model="checkAllValue"
                      :checked="allIds?.length === data?.length"
                    />
                    <div
                      v-if="h.hasSort"
                      class="flex-center flex-col gap-0.5 w-4 h-4 mr-0.5"
                    >
                      <button
                        :class="{
                          '!text-yellow-dark': ordering === h.key,
                        }"
                        class="icon-triangle-top text-[4px] text-gray-1 transition-300"
                        @click="sortByTop(h)"
                      />
                      <button
                        :class="{
                          '!text-yellow-dark': ordering === `-${h.key}`,
                        }"
                        class="icon-triangle-bottom text-[4px] text-gray-1 transition-300"
                        @click="sortByBottom(h)"
                      />
                    </div>
                    <span
                      :class="{ 'cursor-pointer': h.hasSort }"
                      class="font-medium text-xs text-gray-0"
                      @click="sortByToggle(h)"
                    >
                      {{ h.title }}</span
                    >
                  </div>
                </th>
              </tr>
            </Transition>
          </thead>

          <Transition mode="out-in" name="fade">
            <tbody v-if="!loading" class="divide-y pl-4 divide-gray-3">
              <template v-if="data?.length">
                <tr
                  v-for="(d, index) in data"
                  :key="index"
                  :class="[bodyTrClass]"
                  class="relative cursor-pointer hover:bg-gray-7 duration-100"
                  @click.stop="$emit('clickToRow', d)"
                >
                  <td
                    v-for="(h, idx) in head"
                    :key="idx"
                    :class="[tdClass]"
                    class="py-3 px-2 first:!pl-5 text-sm"
                  >
                    <div
                      v-if="idx === 0 && hasCheckbox"
                      class="flex-y-center gap-1"
                    >
                      <CheckBox
                        :checked="allIds?.includes(d?.id)"
                        @change="changeIds(d?.id)"
                      />
                      <p class="font-medium text-dark">
                        {{ getIndex(index) }}.
                      </p>
                    </div>
                    <div
                      v-if="idx === 0"
                      :class="itemStatus(d)"
                      class="w-0.5 h-8 absolute left-0 top-1/2 -translate-y-1/2"
                    />
                    <slot
                      :data="{ ...d, _index: getIndex(index) }"
                      :name="h.key"
                    >
                      {{
                        h.key === "_index" && !hasCheckbox
                          ? getIndex(index) + "."
                          : d[h.key]
                      }}
                    </slot>
                  </td>
                </tr>
              </template>
            </tbody>
          </Transition>
        </table>

        <Transition mode="out-in" name="fade">
          <div v-if="loading">
            <div
              v-for="i in pagination?.limit || 10"
              :key="i"
              class="flex items-center py-6"
            >
              <div class="w-1 h-8 shimmer rounded"></div>
              <div class="w-4 h-4 shimmer rounded ml-2"></div>
              <div class="w-10 h-10 shimmer rounded-full ml-8 2xl:ml-16"></div>
              <div class="ml-1 space-y-1 flex flex-col">
                <div class="h-5 w-[131px] rounded shimmer"></div>
                <div class="h-4 w-[104px] rounded shimmer"></div>
              </div>
              <div class="mx-auto 2xl:ml-[240px] space-y-1 flex flex-col">
                <div class="h-5 w-[131px] rounded shimmer"></div>
                <div class="h-4 w-[104px] rounded shimmer"></div>
              </div>
              <div class="ml-auto 2xl:ml-[260px] space-y-1 flex flex-col">
                <div class="h-5 w-[141px] rounded shimmer"></div>
                <div class="h-4 w-[94px] rounded shimmer ml-auto"></div>
              </div>
            </div>
          </div>
          <div
            v-else-if="!data?.length"
            :class="{ 'py-5': data?.length }"
            class="w-full flex-center"
          >
            <slot name="empty">
              <CommonNodata
                class="w-full my-5"
                v-bind="{
                  ...noData,
                  title: noData?.title || $t('no_data.title'),
                }"
              />
            </slot>
          </div>
        </Transition>
      </div>
    </slot>

    <Transition mode="out-in" name="dropdown">
      <div v-if="!noFooter && data?.length" class="flex-center-between py-6">
        <div>
          <slot name="footer" />
        </div>
        <div class="flex justify-between items-center w-full">
          <BaseTableIndicator
            v-if="indicator?.show"
            :colors="indicator?.colors"
          />
          <BasePagination
            v-if="!noPagination"
            ref="pagination"
            :class="{ 'w-max': indicator?.show }"
            :total
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { useRouteQuery } from "@vueuse/router";
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { RouteLocationRaw, useRouter } from "vue-router";

import { BaseButton } from "@/components/Base";
import CheckBox from "@/components/Base/Form/Checkbox/CheckBox.vue";
import Input from "@/components/Base/Form/Input/FormInput.vue";
import BasePagination from "@/components/Base/Pagination/BasePagination.vue";
import BaseTableCollapseFilter from "@/components/Base/Table/Details/BaseTableCollapseFilter.vue";
import BaseTableIndicator from "@/components/Base/Table/Details/BaseTableIndicator.vue";
import CommonNodata from "@/components/Common/NoData/CommonNodata.vue";
import { TClassName } from "@/types/common";
import { debounce } from "@/utils/functions/common";

import type { TableHead, TableStatusIndicator } from "./BaseTable";

interface Props {
  filter?: Record<string, unknown>;
  head: TableHead[];
  hasAddButton?: {
    title: string;
    link: RouteLocationRaw | boolean;
  };
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  thClass?: string;
  bodyTrClass?: TClassName;
  tdClass?: TClassName;
  wrapperClass?: TClassName;
  data: Record<string, unknown>[];
  noSearch?: boolean;
  noHeader?: boolean;
  loading?: boolean;
  total?: number;
  noPagination?: boolean;
  noFooter?: boolean;
  headerClass?: TClassName;
  titleClass?: TClassName;
  subtitleClass?: TClassName;
  searchValue?: string;
  searchInputClass?: string;
  actionsClass?: string;
  hasCheckbox?: boolean;
  trigger?: boolean;
  beforeSearchClass?: TClassName;
  indicator?: TableStatusIndicator;
  noFilter?: boolean;
  noData?: {
    title: string;
    subtitle: string;
    image: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  total: 0,
});

const emit = defineEmits(["clickToRow", "checked", "sort"]);
const router = useRouter();

const search = useRouteQuery<string>("search", "");

function onSearch(value: string) {
  debounce("table-search", () => {
    search.value = value;
  });
}

const showFilter = useRouteQuery<boolean>("showFilter", false, {
  transform: Boolean,
});

function clearSearch() {
  search.value = "";
}

const pagination = ref();

function getIndex(index: number) {
  const page = pagination.value?.page || 1;
  const limit = pagination.value?.limit || 10;
  return (page - 1) * limit + index + 1;
}

const itemStatus = (row) => {
  if (!props.indicator?.key || !props.indicator?.show) return "";
  const nestedKeys = props.indicator?.key?.split(".");
  const lastKey = nestedKeys?.pop();
  const nestedObj = nestedKeys?.reduce((a, prop) => a[prop], row);
  return props.indicator.colors.find(
    (item) => item.value === nestedObj[lastKey as keyof typeof nestedObj],
  )?.color;
};

// Checkbox
const allIds = ref([]);
const checkAllValue = ref(false);

function checkAll() {
  if (allIds?.value?.length === props?.data?.length) {
    allIds.value = [];
  } else {
    allIds.value = props?.data?.map((item) => item?.id);
  }
}

function changeIds(id: number) {
  if (allIds?.value?.includes(id)) {
    allIds.value = allIds.value.filter((item) => item !== id);
  } else {
    allIds.value = [...allIds.value, id];
  }
}

const svgPosition = reactive({ left: "0px", right: "auto" });

const recalculateSvgPosition = () => {
  const filterButton = document.getElementById("filterButton");
  if (filterButton) {
    const buttonRect = filterButton.getBoundingClientRect();
    const parentRect = document.body?.getBoundingClientRect() || {
      left: 0,
    };
    const svgWidth = 26;

    const buttonCenter =
      buttonRect.left - (parentRect.left + 316 || 0) + buttonRect.width / 2;
    svgPosition.left = `${buttonCenter - svgWidth / 2}px`;
  }
};

onMounted(() => {
  recalculateSvgPosition();

  window.addEventListener("resize", recalculateSvgPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", recalculateSvgPosition);
});

watch(
  () => checkAllValue.value,
  () => checkAll(),
);

watch(
  () => allIds.value,
  () => {
    emit("checked", allIds.value);
  },
);

watch(
  () => props.trigger,
  () => {
    allIds.value = [];
    checkAllValue.value = false;
  },
);

// Filter header sort
const ordering = useRouteQuery<undefined | string>("ordering", undefined);

async function sortByTop(row: TableHead) {
  if (ordering.value === row.key) {
    ordering.value = undefined;
  } else {
    ordering.value = row.key;
  }
  emit("sort");
}

async function sortByBottom(row: TableHead) {
  if (ordering.value === `-${row.key}`) {
    ordering.value = undefined;
  } else {
    ordering.value = `-${row.key}`;
  }
  emit("sort");
}

async function sortByToggle(row: TableHead) {
  if (!row.hasSort) return;
  if (ordering.value === row.key) {
    ordering.value = `-${row.key}`;
  } else if (ordering.value === `-${row.key}`) {
    ordering.value = undefined;
  } else {
    ordering.value = row.key;
  }
  emit("sort");
}
</script>

<style>
/* Indicator styles */
.green::before,
.red::before,
.yellow::before,
.gray::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 32px;
  width: 2px;
  border-radius: 0 4px 4px 0;
}

.green::before {
  background-color: #49b97d;
}

.red::before {
  background-color: #ee5253;
}

.gray::before {
  background-color: #d3d5dc;
}

.yellow::before {
  background-color: #ff8c01;
}
</style>
