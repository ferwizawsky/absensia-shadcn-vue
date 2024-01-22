<script setup>
import {
  CalendarDaysIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
</script>
<template>
  <div
    class="fixed bottom-0 z-20 bg-gray-100/10 backdrop-blur-sm left-0 w-full h-[60px] px-4"
  >
    <div
      class="mx-auto max-w-lg grid-cols-3 grid gap-4 justify-center items-center bot-nav"
    >
      <button
        @click="$router.push('/dosen/dash')"
        :class="$route.path == '/dosen/dash' ? 'text-primary' : ''"
      >
        <BuildingOfficeIcon class="icona" />
      </button>
      <button
        @click="$router.push('/dosen/jadwal')"
        :class="$route.path == '/dosen/jadwal' ? 'text-primary' : ''"
      >
        <CalendarDaysIcon class="icona" />
      </button>
      <button
        @click="$router.push('/dosen/mahasiswa')"
        :class="$route.path == '/dosen/mahasiswa' ? 'text-primary' : ''"
      >
        <UserGroupIcon class="icona" />
      </button>
    </div>
  </div>
</template>
<style>
.icona {
  @apply w-6 h-6 mx-auto;
}
.bot-nav button {
  @apply p-4 hover:text-primary;
}
</style>
