<script setup>
import { RouterView } from "vue-router";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { onMounted, ref } from "vue";
import logo from "@/components/logo.vue";
import { useOption } from "@/stores/option";

const option = useOption();
const notTop = ref(false);

const handleScroll = () => {
  const rect = document.getElementById("navbar").getBoundingClientRect();
  notTop.value = rect.top <= 0;
  console.log(notTop.value);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>
<template>
  <div>
    <div class="z-40 relative">
      <div class="flex justify-between p-4 items-center">
        <div class="flex space-x-4 items-center lg:pl-10 pt-1">
          <div class="text-lg font-medium tracking-widest">FIOEP</div>
        </div>
        <div class="flex space-x-4 items-center">
          <div>
            <button
              class="text-xs bg-accent-foreground/10 px-3 py-1 rounded-full hover:bg-accent-foreground/20"
            >
              Wanderer Plan
            </button>
          </div>
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="w-8 h-8 cursor-pointer text-white bg-amber-500 flex items-center justify-center rounded-full"
              >
                F
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="logout()"
                      :class="[
                        active ? 'bg-primary text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
    <div
      :class="notTop ? 'lg:pl-14 pl-4 pr-4' : 'px-4'"
      id="navbar"
      class="navbar linear duration-100"
    >
      <span
        class="hover:text-foreground cursor-pointer pb-4"
        :class="
          index == 1 ? 'text-foreground  border-b-[3px] border-current' : ''
        "
        v-for="index in 18"
      >
        TextMenu
      </span>
    </div>
    <logo
      :class="notTop ? 'scale-75' : ''"
      class="fixed top-0 mt-1 z-30 linear w-14 duration-100 hidden lg:block"
    />

    <div
      class="max-w-[1024px] mx-auto pt-4 relative min-h-[200vh] pb-20 text-xs"
    >
      <RouterView />
    </div>
  </div>
</template>
<style>
/* Hide the scrollbar */
.navbar::-webkit-scrollbar {
  height: 0rem; /* Set a small width for the scrollbar */
}

.navbar {
  @apply sticky left-0 w-full overflow-x-auto break-normal flex bg-accent z-30 top-0 text-sm pt-4 border-b border-gray-200 dark:border-accent-foreground/10 text-foreground/40 space-x-4;
}

.navbar::-webkit-scrollbar-thumb {
  background-color: transparent; /* Set the thumb color to transparent */
}
</style>
