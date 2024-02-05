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
  <div class="text-foreground bg-accent">
    <link
      href="https://fonts.gogleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <Loading />
    <NotifBar />
    <RouterView />
  </div>
</template>
<style>
body {
  font-family: "Poppins", sans-serif;
}
</style>
