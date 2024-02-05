import { createApp } from "vue";
import { createPinia } from "pinia";
// import VueApexCharts from "vue3-apexcharts";

import "./style.css";
import App from "./App.vue";
import router from "@/router";

const pinia = createPinia();
const app = createApp(App);

// app.use(VueApexCharts);
app.use(router);
app.use(pinia);
app.mount("#app");
