<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import dayjs from "dayjs";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import DateRangePicker from "@/components/Base/Form/DatePicker/DateRangePicker.vue";

interface Props {
  startDateKey: string;
  endDateKey: string;
}

const props = withDefaults(defineProps<Props>(), {
  startDateKey: "start_date",
  endDateKey: "end_date",
});

const { t } = useI18n();

const dateFrom = useRouteQuery<string>(props.startDateKey, "");
const dateTo = useRouteQuery<string>(props.endDateKey, "");

const activeDate = ref();
const isActive = ref(false);
const isClear = ref(false);

const today = new Date();
today.setHours(0, 0, 0, 0);
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);
const firstDayOfWeek = new Date();
const dayOfWeek = firstDayOfWeek.getDay();
const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday as start of the week
firstDayOfWeek.setDate(firstDayOfWeek.getDate() - mondayOffset);
firstDayOfWeek.setHours(0, 0, 0, 0);
const oneMonthAgo = new Date();
oneMonthAgo.setDate(1);
oneMonthAgo.setHours(0, 0, 0, 0);

const dateTable = [
  {
    id: 1,
    name: t("today"),
    date: dayjs(today).format("YYYY-MM-DD"),
    toDate: dayjs(today).format("YYYY-MM-DD"),
  },
  {
    id: 2,
    name: t("yesterday"),
    date: dayjs(yesterday).format("YYYY-MM-DD"),
    toDate: dayjs(yesterday).format("YYYY-MM-DD"),
  },
  {
    id: 3,
    name: t("week"),
    date: dayjs(firstDayOfWeek).format("YYYY-MM-DD"),
    toDate: dayjs(new Date().setDate(firstDayOfWeek.getDate() + 6)).format(
      "YYYY-MM-DD",
    ),
  },
  {
    id: 4,
    name: t("month"),
    date: dayjs(oneMonthAgo).format("YYYY-MM-DD"),
    toDate: dayjs(
      new Date(today.getFullYear(), today.getMonth() + 1, 0),
    ).format("YYYY-MM-DD"),
  },
  {
    id: 5,
    name: t("year"),
    date: dayjs(new Date(today.getFullYear(), 0, 1)).format("YYYY-MM-DD"),
    toDate: dayjs(new Date(today.getFullYear(), 11, 31)).format("YYYY-MM-DD"),
  },
  {
    id: 6,
    name: "date_create",
  },
];

const date = computed(() => {
  return {
    start: new Date(dateFrom.value),
    end: new Date(dateTo.value),
  };
});

function upDateRangePick(value: {
  start: Date | undefined;
  end: Date | undefined;
}) {
  isActive.value = true;
  isClear.value = false;
  activeDate.value = null;
  dateFrom.value = value.start ? dayjs(value.start).format("YYYY-MM-DD") : "";
  dateTo.value = value.end ? dayjs(value.end).format("YYYY-MM-DD") : "";
}
function selectDateType(item: number) {
  isActive.value = false;
  activeDate.value = item;
  dateFrom.value = dateTable[item].date;
  dateTo.value = dateTable[item].toDate;
  isClear.value = true;
}
</script>

<template>
  <div class="flex gap-1 items-center p-1 rounded-xl bg-gray-9">
    <div
      v-for="(item, key) in dateTable"
      :key="key"
      class="cursor-pointer transition-300"
    >
      <div
        v-if="item?.name != 'date_create'"
        class="p-2 text-xs font-medium leading-130 text-dark text-center rounded-lg"
        :class="{
          'bg-white': dateFrom === item.date && dateTo === item.toDate,
        }"
        @click="selectDateType(key)"
      >
        {{ item?.name }}
      </div>
      <div v-else>
        <DateRangePicker
          :model-value="date"
          :start-value="new Date(dateFrom)"
          :end-value="new Date(dateTo)"
          :is-clear="isClear"
          :placeholder="t(item.name)"
          v-bind="{ isActive }"
          @update:model-value="upDateRangePick"
          @clear-data="upDateRangePick({ start: null, end: null })"
        />
      </div>
    </div>
  </div>
</template>
