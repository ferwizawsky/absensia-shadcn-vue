<script setup>
import { useNotif } from "@/stores/notif.js";

const notif = useNotif();

function getClass(params) {
  let tmp = "";
  switch (params.type) {
    case "info":
      tmp = "bg-blue-100 text-blue-700";
      break;
    case "danger":
      tmp = "bg-rose-100 text-rose-700";
      break;
    case "success":
      tmp = "bg-green-100 text-green-700";
      break;
    case "warning":
      tmp = "bg-yellow-100 text-yellow-700";
      break;
    default:
      break;
  }
  return tmp;
}
</script>
<template>
  <!-- This is an example component -->
  <div class="max-w-lg mx-auto fixed top-3 right-3 z-10">
    <TransitionGroup name="list" tag="ul">
      <li
        v-for="item in notif.listNotif"
        :key="item"
        :class="getClass(item.option)"
        class="flex rounded-lg p-4 mb-4 text-sm"
        role="alert"
      >
        <div>{{ item.text }}</div>
      </li>
    </TransitionGroup>
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
