<template>
  <div class="flex-shrink-0 p-6 bg-white rounded-xl relative">
    <div class="mb-5">
      <h4 class="text-xl text-dark font-semibold mb-1">{{ $t("graph") }}</h4>
    </div>

    <div v-if="!loading">
      <div class="h-[280px]">
        <apexchart
          :options="options"
          :series="series"
          type="line"
          height="280"
        />
      </div>
    </div>

    <div
      v-else
      class="absolute inset-0 flex items-center justify-center bg-white"
    >
      <span>Loading...</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import ApexChart from "vue3-apexcharts";
import dayjs from "dayjs";

defineExpose();
defineOptions({ components: { apexchart: ApexChart } });

const loading = ref(true);
const data = ref([
  { period: "2025-07-01", DAU: 100, WAU: 400, MAU: 900 },
  { period: "2025-07-02", DAU: 130, WAU: 420, MAU: 910 },
  { period: "2025-07-03", DAU: 80, WAU: 390, MAU: 920 },
  { period: "2025-07-04", DAU: 140, WAU: 410, MAU: 930 },
  { period: "2025-07-05", DAU: 120, WAU: 415, MAU: 940 },
]);

onMounted(() => {
  setTimeout(() => (loading.value = false), 1000);
});

const series = computed(() => [
  {
    name: "DAU",
    data: data.value.map((el) => el.DAU),
  },
  {
    name: "WAU",
    data: data.value.map((el) => el.WAU),
  },
  {
    name: "MAU",
    data: data.value.map((el) => el.MAU),
  },
]);

const options = computed(() => ({
  chart: {
    id: "attendance-line",
    type: "line",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 4,
  },
  xaxis: {
    categories: data.value.map((el) => dayjs(el.period).format("MMM D")),
    labels: {
      style: {
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        fontSize: "12px",
      },
    },
  },
  legend: {
    position: "bottom",
    fontSize: "12px",
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
}));
</script>
