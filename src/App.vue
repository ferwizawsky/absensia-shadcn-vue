<script setup>
import { useOption } from "@/stores/option";
import { defineAsyncComponent } from "vue";
// import Loading from "@/components/ui/Loading.vue";
// import NotifBar from "@/components/ui/NotifBar.vue";

const Loading = defineAsyncComponent(() =>
  import("@/components/ui/Loading.vue")
);
const NotifBar = defineAsyncComponent(() =>
  import("@/components/ui/NotifBar.vue")
);
useOption().url = import.meta.env.VITE_API;
useOption().name = import.meta.env.VITE_NAME;
</script>

<template>
  <div>
    <Loading />
    <NotifBar />
    <RouterView />
  </div>
</template>
