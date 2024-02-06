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

const dataLine = ref({
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
  jumlah: [21122, 3398, 2140, 2210, 4410, 21420, 0, 1100, 10000, 2300, 1440, 0],
});
</script>

<template>
  <div class="grid lg:grid-cols-3 gap-4">
    <LineChart :data="dataLine" type="tahun" />
    <AreaChart :data="dataLine" type="tahun" />
    <BarChart />
  </div>
</template>
