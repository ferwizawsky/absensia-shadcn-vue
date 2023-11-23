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
  <div>
    <link
      href="https://fonts.gogleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <RouterView />
  </div>
</template>
<style>
body {
  font-family: "Poppins", sans-serif;
}
</style>
