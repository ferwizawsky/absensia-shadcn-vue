<script setup>
import apexchart from "vue3-apexcharts";
const props = defineProps(["label","value"])


const series = ref(getSeries());
const options = ref(getOption());

watch(
  () => props.data,
  (e) => {
    series.value = getSeries();
    options.value = getOption();
  },
  { deep: true }
);
function getSeries() {
  return [
    {
      name: "Jumlah",
      data: props.data?.data : props.data?.jumlah,
      color: "#445fe3",
    },
  ];
}
function getOption() {
  if (props.type != "tahun")
    return {
      chart: {
        toolbar: {
          show: false,
        },
        type: "area",
      },
      tooltip: {},
      markers: {
        size: 0,
        color: "#445fe3",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      fill: {
        colors: "#445fe3",
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: ["#445fe3"],
        width: 4,
        dashArray: 0,
      },
      legend: {
        show: false,
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "dd MMM",
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    };
  else
    return {
      chart: {
        toolbar: {
          show: false,
        },
        type: "area",
      },
      tooltip: {},
      markers: {
        size: 0,
        color: "#445fe3",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      fill: {
        colors: "#445fe3",
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: ["#445fe3"],
        width: 4,
        dashArray: 0,
      },
      legend: {
        show: false,
      },
      xaxis: {
        type: "category",
        categories: props?.label,
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    };
}
</script>

<template>
  <div>
    <apexchart
      class="w-full"
      type="line"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
