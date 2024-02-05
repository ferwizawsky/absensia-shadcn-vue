<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/ui/inkia/Navbar.vue";
</script>
<template>
  <div>
    <Navbar />
    <div
      class="max-w-[1280px] mx-auto pt-4 min-h-[70vh] bg-background pb-20 text-xs transition-all duration-500"
    >
      <RouterView />
    </div>
  </div>
</template>
