<script setup>
import { useOption } from "@/stores/option";
import { defineAsyncComponent } from "vue";

// const HelloWorld = defineAsyncComponent(() =>
//   import("./components/HelloWorld.vue")
// );
useOption().url = import.meta.env.VITE_API;
useOption().name = import.meta.env.VITE_NAME;
</script>

<template>
  <RouterView />
</template>
