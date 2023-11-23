<script setup>
import { useNotif } from "~/stores/notif.js";

const notif = useNotif();
</script>
<template>
  <!-- This is an example component -->
  <div
    :class="
      notif.loading ? 'top-1/2 -translate-y-3/4' : '-top-0 -translate-y-full'
    "
    class="fixed right-1/2 translate-x-1/2 duration-1000 z-50"
  >
    <div
      class="bg-black/40 backdrop-blur-sm rounded-lg w-64 h-64 flex items-center justify-center"
    >
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
