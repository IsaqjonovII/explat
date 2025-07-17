<template>
  <div class="flex justify-between flex-1">
    <BasePaginationSize v-model="itemsPerPage" />

    <Pagination v-slot="{ page }" v-model:page="currentPage" v-bind="props">
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <BaseButton
          class="!size-10"
          icon="icon-chevron text-lg"
          size="sm"
          text=""
          variant="neutral"
          @click="handlePrev"
        />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <BaseButton
              :text="item.value"
              :variant="item.value === page ? 'primary' : 'neutral'"
              class="size-10 p-0"
            />
          </PaginationListItem>
          <BaseButton
            v-else
            :key="'pagination-keys' + index"
            class="!size-10"
            icon="icon-dots text-lg text-dark"
            size="sm"
            text=""
            variant="neutral"
          />
        </template>

        <BaseButton
          class="!size-10"
          icon="icon-chevron text-lg rotate-180 block"
          size="sm"
          text=""
          variant="neutral"
          @click="handleNext"
        />
      </PaginationList>
    </Pagination>
  </div>
</template>

<script lang="ts" setup>
import {
  Pagination,
  PaginationList,
  PaginationListItem,
} from "@/components/ui/pagination";
import { BaseButton } from "@/components/Base";
import { useRouteQuery } from "@vueuse/router";
import BasePaginationSize from "@/components/Base/Pagination/BasePaginationSize.vue";

type Props = {
  defaultPage: number;
  siblingCount?: number;
  total: number;
  showEdges?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  siblingCount: 1,
  showEdges: false,
});

const currentPage = useRouteQuery("page", props.defaultPage, {
  transform: Number,
});
const itemsPerPage = useRouteQuery("limit", 10, {
  transform: Number,
});

function handlePrev() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function handleNext() {
  if (currentPage.value < props.total / itemsPerPage.value) {
    currentPage.value += 1;
  }
}
</script>
