<template>
  <div class="bg-white rounded-xl px-5">
    <slot name="header">
      <header
        v-if="!noHeader"
        :class="headerClass"
        class="flex justify-between gap-3 i-table pt-5"
      >
        <div class="w-fit">
          <slot name="titlePlace">
            <BaseTableHeader v-bind="{ title: title || '', subtitle }" />
          </slot>
        </div>

        <div
          :class="actionsClass"
          class="flex gap-5 2xl:gap-5 flex-wrap w-full justify-end items-center!"
        >
          <slot v-if="showReOrder" name="reOrder"></slot>

          <slot v-if="!noFilter" name="beforeSearch">
            <div class="shrink-0">
              <BaseTableCollapseFilter
                v-if="hasFilter"
                v-model="showFilter"
                :ignored-fields="queryIgnoredFields"
              />
            </div>
          </slot>

          <form
            autocomplete="off"
            class="flex gap-2 justify-end 2xl:gap-5"
            @submit.prevent
          >
            <slot name="search">
              <FormSearchInput
                v-if="!noSearch"
                :class="searchInputClass"
                :disabled="props.disableSearch"
                :model-value="search"
                @update:model-value="onSearch"
              />
            </slot>

            <slot name="afterSearch">
              <RouterLink
                v-if="hasAddButton && addLink && data?.length"
                :to="addLink"
              >
                <BaseButton type="button" variant="info">
                  <div class="flex items-center gap-1">
                    <span class="text-xs text-dark-black font-medium">
                      {{ $t("button.add") }}
                    </span>
                    <i class="icon-plus text-lg"></i>
                  </div>
                </BaseButton>
              </RouterLink>
            </slot>
          </form>
        </div>
      </header>
    </slot>

    <slot name="afterHeader" />

    <CollapseTransition>
      <div v-if="showFilter" class="w-full pt-6">
        <div
          class="flex relative rounded-lg bg-gray-5 p-4 flex-row flex-wrap items-center gap-4"
        >
          <span :style="svgPosition" class="absolute -top-[14px] z-10">
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

    <slot name="tableBody">
      <div :class="wrapperClass" class="w-full max-w-full pt-6">
        <table :id="id" class="w-full c-table overflow-x-auto">
          <Transition mode="out-in" name="fade">
            <thead v-if="!loading && data?.length">
              <tr>
                <th
                  v-for="(h, index) in head"
                  :key="index"
                  :class="[{ 'w-[5%]': h.key === '_index' }, thClass]"
                  class="p-1 py-3 bg-gray-4 first:rounded-l-md last:rounded-r-md !rounded-b-[0px] text-xs text-left last:text-right first:pl-4 last:pr-2 text-dark font-semibold"
                >
                  <div
                    :class="[
                      thClass,
                      {
                        'last:justify-end': index === head.length - 1,
                        'last:!justify-start': thClass === 'last:!text-left',
                      },
                    ]"
                    class="flex-y-center g-0.5"
                  >
                    <div
                      v-if="h.hasSort"
                      class="size-4 mr-0.5 flex-center flex-col"
                    >
                      <button
                        :class="{
                          '!text-blue': ordering === h.key,
                        }"
                        class="icon-sort-up text-lg text-gray-1 transition-300 -mb-2"
                        @click="sortByTop(h)"
                      />
                      <button
                        :class="{
                          '!text-blue': ordering === `-${h.key}`,
                        }"
                        class="icon-sort-up rotate-180 text-lg text-gray-1 transition-300"
                        @click="sortByBottom(h)"
                      />
                    </div>
                    <span
                      :class="{ 'cursor-pointer': h.hasSort }"
                      class="font-medium text-xs text-dark"
                      @click="sortByToggle(h)"
                    >
                      {{ h.title }}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
          </Transition>

          <Transition mode="out-in" name="fade">
            <tbody
              v-if="!loading && data?.length"
              ref="tableBodyRef"
              class="[&_tr:nth-child(2n)]:bg-table-even-row relative"
            >
              <template v-for="(d, index) in data" :key="index">
                <tr
                  :class="[
                    bodyTrClass,
                    'relative hover:bg-table-row-hover! cursor-pointer transition-300 group',
                    hasRowDetail && expandedRow === index
                      ? 'z-20 !rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.13)] !bg-white'
                      : '',
                  ]"
                  :data-row-index="index"
                  @click.stop="$emit('clickToRow', d)"
                >
                  <td
                    v-for="(h, idx) in head"
                    :key="idx"
                    :class="[
                      tdClass,
                      { 'font-medium': idx == 0 },
                      {
                        'first:rounded-l-lg! last:rounded-r-lg!':
                          hasRowDetail && expandedRow === index,
                      },
                    ]"
                    class="py-3 px-2 first:!pl-5 text-sm"
                    @click="hasRowDetail && toggleRowDetail(index)"
                  >
                    <div
                      v-if="props.reOrdering && h.key === 'actions'"
                      class="flex-center size-8! cursor-grab drag-handle"
                    >
                      <i
                        class="icon-menu text-orange text-[20px] transition-300"
                      />
                    </div>
                    <div
                      v-else-if="idx === 0"
                      :class="itemStatus(d)"
                      class="rounded-r-lg w-1 h-8 absolute left-0 top-1/2 -translate-y-1/2"
                    />
                    <slot
                      :data="{ ...d, _index: getIndex(index) }"
                      :name="h.key"
                    >
                      {{
                        h.key === "_index" && !hasCheckbox
                          ? props.reOrdering
                            ? "#"
                            : getIndex(index) + "."
                          : d[h.key]?.length || d[h.key] >= 0
                            ? d[h.key]
                            : "-"
                      }}
                    </slot>
                  </td>
                </tr>

                <CollapseTransition :duration="250">
                  <div
                    v-if="hasRowDetail && expandedRow === index"
                    class="absolute z-10 p-6 w-full !bg-white rounded-bl-lg rounded-br-lg shadow-[0px_12px_32px_0px_rgba(0,0,0,0.13)] inline-flex items-center gap-2"
                  >
                    <td :colspan="head.length" class="w-full!">
                      <slot
                        :data="{ ...d, _index: getIndex(index) }"
                        name="rowDetail"
                      />
                    </td>
                  </div>
                </CollapseTransition>
              </template>
            </tbody>

            <tbody v-else-if="loading">
              <tr v-for="i in pagination?.limit || 10" :key="i" class="pb-4">
                <td
                  v-for="(_, key) in head"
                  :key
                  :class="[tdClass]"
                  class="p-1"
                >
                  <div
                    :class="{ 'w-[5%]': key === 0 }"
                    class="w-full h-8 shimmer rounded"
                  />
                </td>
              </tr>
            </tbody>

            <tbody v-else>
              <tr>
                <td :colspan="head.length">
                  <slot name="empty">
                    <CommonNoData
                      v-if="!data?.length && !loading"
                      class="w-full min-w-full! my-5 shrink-0"
                      v-bind="{
                        title: noData?.title ?? $t('no_data.title'),
                        subtitle: noData?.subtitle ?? $t('no_data.subtitle'),
                        image: noData?.image ?? '/images/no-data/no-data.svg',
                        icon: noData?.icon,
                        addLink,
                        hasActions: noData?.hasAction,
                        text: noData?.addButtonText ?? 'button.add',
                      }"
                      @addLink="$emit('addLink')"
                    />
                  </slot>
                </td>
              </tr>
            </tbody>
          </Transition>
        </table>
      </div>
    </slot>

    <Transition mode="out-in" name="dropdown">
      <div v-if="!noFooter && data?.length" class="flex-center-between py-6">
        <slot name="footer">
          <BaseTableIndicator
            v-if="indicator?.show"
            :colors="indicator?.colors"
          />
        </slot>
        <div class="flex-center-between w-full !justify-end">
          <BasePagination
            v-if="!noPagination"
            ref="pagination"
            :class="{ 'w-max': indicator?.show }"
            :default-page="1"
            :sibling-count="1"
            :total="total"
            show-edges
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script generic="T = Record<string, string | number | unknown>" lang="ts" setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { useRouteQuery } from "@vueuse/router";
import { nextTick, onMounted, reactive, ref, watch } from "vue";

import {
  BaseButton,
  BasePagination,
  BaseTableCollapseFilter,
  BaseTableHeader,
  BaseTableIndicator,
  FormSearchInput,
} from "@/components/Base";
import { CommonNoData } from "@/components/Common";
import type { TableHead, TableProps } from "@/types/components";
import { debounce } from "@/utils/time";
import Sortable from "sortablejs";

const props = withDefaults(
  defineProps<
    {
      disableSearch?: boolean;
    } & TableProps<T>
  >(),
  {
    disableSearch: false,
    total: 0,
    hasFilter: true,
    id: "custom-table",
    noData: {
      hasAction: false,
    },
    showReOrder: false,
    reOrdering: false,
  }
);

const emit = defineEmits([
  "clickToRow",
  "checked",
  "sort",
  "rowOrderChange",
  "addLink",
]);
const showFilter = defineModel<boolean>("showFilter");

// --- DRAGGABLE ROWS LOGIC ---
const tableBodyRef = ref<HTMLElement | null>(null);
const sortableInstance = ref<Sortable | null>(null);

watch(
  () => props.reOrdering,
  async (val) => {
    await nextTick();
    if (val && tableBodyRef.value) {
      // Enable sortable
      sortableInstance.value = Sortable.create(tableBodyRef.value, {
        handle: ".drag-handle",
        animation: 150,
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        onEnd: () => {
          // Emit new order of data
          const newOrder = Array.from(tableBodyRef.value!.children).map(
            (tr) => {
              const idx = (tr as HTMLElement).getAttribute("data-row-index");
              return props.data?.[Number(idx)];
            }
          );
          emit("rowOrderChange", newOrder);
        },
      });
    } else {
      // Destroy sortable
      sortableInstance.value?.destroy();
      sortableInstance.value = null;
    }
  }
);

onMounted(() => {
  if (props.reOrdering && tableBodyRef.value) {
    sortableInstance.value = Sortable.create(tableBodyRef.value, {
      handle: ".drag-handle",
      animation: 150,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      onEnd: () => {
        const newOrder = Array.from(tableBodyRef.value!.children).map((tr) => {
          const idx = (tr as HTMLElement).getAttribute("data-row-index");
          return props.data?.[Number(idx)];
        });
        emit("rowOrderChange", newOrder);
      },
    });
  }
});

const ordering = useRouteQuery<undefined | string>("ordering", undefined);
const search = useRouteQuery<string>("search", "");

const pagination = ref();
const svgPosition = reactive({ left: "0px", right: "auto" });

function getIndex(index: number) {
  if (pagination.value?.page && pagination.value?.limit) {
    return (pagination.value?.page - 1) * pagination.value?.limit + index + 1;
  } else {
    pagination.value = {
      page: 1,
      limit: 10,
    };
    return (pagination.value?.page - 1) * pagination.value?.limit + index + 1;
  }
}

const itemStatus = (row: Record<string, unknown>) => {
  if (!props.indicator?.key || !props.indicator?.show) return "";
  const nestedKeys = props.indicator?.key?.split(".");
  const lastKey = nestedKeys?.pop();
  const nestedObj = nestedKeys?.reduce((a, prop) => a[prop], row);

  return props.indicator.colors.find(
    (item) => item.value === nestedObj[lastKey as keyof typeof nestedObj]
  )?.color;
};

const recalculateSvgPosition = () => {
  const filterButton = document.getElementById("filterButton");
  if (filterButton) {
    const buttonRect = filterButton.getBoundingClientRect();
    const parentRect = document.body?.getBoundingClientRect() || {
      left: 0,
    };
    const svgWidth = 26;

    const buttonCenter =
      buttonRect.left - (parentRect.left + 315 || 0) + buttonRect.width / 2;
    svgPosition.left = `${buttonCenter - svgWidth / 2}px`;
  }
};

onMounted(() => {
  recalculateSvgPosition();
  window.addEventListener("resize", recalculateSvgPosition);

  return () => {
    window.removeEventListener("resize", recalculateSvgPosition);
  };
});

function onSearch(value: string) {
  debounce("searching-table-data", () => {
    search.value = value;
    if (pagination.value) {
      pagination.value.page = 1; // Reset pagination to the first page
    }
  });
}

watch(showFilter, (newValue) => {
  if (newValue && pagination.value) {
    pagination.value.page = 1; // Reset pagination to the first page
  }
});

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

const expandedRow = ref<number | null>(null);

function toggleRowDetail(index: number) {
  expandedRow.value = expandedRow.value === index ? null : index;
}
</script>

<style scoped>
.sortable-ghost {
  background-color: #e595001f;
  transition: background-color 0.3s ease;
}

.sortable-drag {
  cursor: grabbing;
  transition: transform 0.3s ease;
}
</style>
