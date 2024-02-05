<script setup>
import apexchart from "vue3-apexcharts";
const chartOptions = {
  chart: {
    id: "chart1",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};
const series = [
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
];
</script>

<template>
  <div>
    <apexchart
      class="w-full"
      type="area"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
