<script setup>
import { defineAsyncComponent, ref } from "vue";

const LineChart = defineAsyncComponent(() =>
  import("@/components/dashboard/LineChart.vue")
);
const BarChart = defineAsyncComponent(() =>
  import("@/components/dashboard/BarChart.vue")
);
const AreaChart = defineAsyncComponent(() =>
  import("@/components/dashboard/AreaChart.vue")
);

const data = ref({
  tanggal: "Jan - Des 2024",
  label: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ],
  value: [21122, 3398, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});
</script>

<template>
  <div class="grid lg:grid-cols-3 gap-4">
    <LineChart :label="data.label" :value="data.value" />
    <AreaChart />
    <BarChart />
  </div>
</template>
