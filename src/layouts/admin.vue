<script setup>
import { RouterView } from "vue-router";
import Topbar from "@/components/Topbar.vue";
import Navbar from "@/components/Navbar.vue";
import { onMounted } from "vue";
import { useOption } from "@/stores/option";

const option = useOption();

onMounted(() => {
  //   option.getStudent();
  //   option.getKelas();
  // console.log("test");
  // console.log(option.listUser);
});
</script>
<template>
  <div>
    <div
      class="fixed top-0 left-0 w-full z-30 flex justify-between items-center px-4 p-4"
    >
      <div class="">FIOEP</div>
      <ul
        class="fer-menu bg-base-200 lg:fer-menu-horizontal fer-rounded-box space-x-2"
      >
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </a>
        </li>
        <li>
          <a class="fer-active rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            User Data
            <!-- <span class="fer-badge fer-badge-xs fer-badge-success"></span> -->
          </a>
        </li>
      </ul>
    </div>

    <div
      class="max-w-[1024px] mx-auto pt-20 relative min-h-screen pb-20 text-xs"
    >
      <RouterView />
    </div>
  </div>
</template>
