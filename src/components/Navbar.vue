<script setup>
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ref, onMounted } from "vue";
import { useAuth } from "@/stores/auth.js";
import { useRouter } from "vue-router";

const item = ref();
const auth = useAuth();
const router = useRouter();
async function getUser() {
  item.value = {};
  try {
    const { data } = await useMyFetch("GET", `/auth/profile`);
    item.value = { ...data.data };
    // location.reload();
  } catch (error) {
    logout();
  } finally {
  }
}

function logout() {
  auth.token = "";
  localStorage.removeItem("token");
  router.push("/login");
}
onMounted(() => {
  if (!item.value) {
    getUser();
  }
});
</script>
<template>
  <div
    class="bg-primary fixed top-0 left-0 w-full text-white h-[60px] shadow-lg flex justify-between items-center px-4"
  >
    <div class="font-medium tracking-widest flex items-center text-lg">
      <svg
        class="w-7 mr-2"
        viewBox="0 0 46 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32.0547 0L0 32.0547H32.0547V0Z" fill="currentColor" />
        <path
          d="M45.5 34.246H0.167773L22.8339 56.9121L45.5 34.246Z"
          fill="currentColor"
        />
      </svg>
      <span>FIOEP</span>
    </div>

    <Menu as="div" class="relative inline-block text-left text-primary">
      <div>
        <MenuButton
          class="w-8 h-8 cursor-pointer bg-white flex items-center justify-center rounded-full"
        >
          {{ item?.name?.substring(0, 1) }}
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
</template>
