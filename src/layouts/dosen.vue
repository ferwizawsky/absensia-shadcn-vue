<script setup>
import { RouterView } from "vue-router";
import Topbar from "@/components/Topbar.vue";
import Navbar from "@/components/Navbar.vue";
import { onMounted } from "vue";
import { useOption } from "@/stores/option";

const option = useOption();

onMounted(() => {
  option.getStudent();
  option.getKelas();
  // console.log("test");
  // console.log(option.listUser);
});
</script>
<template>
  <div>
    <div></div>
    <Topbar />
    <Navbar />

    <div class="max-w-lg mx-auto pt-20 relative min-h-screen pb-20 text-xs">
      <RouterView />
    </div>
  </div>
</template>
