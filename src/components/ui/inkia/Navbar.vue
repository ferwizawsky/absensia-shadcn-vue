<script setup>
import { onMounted, ref } from "vue";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import logo from "@/components/logo.vue";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-vue-next";
// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOption } from "@/stores/option";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";

const option = useOption();
const notTop = ref(false);
const list = [
  // {
  //   to: "/admin/dash",
  //   text: "Dashboard",
  // },
  {
    to: "/admin/user",
    text: "UserManagement",
  },
  {
    to: "/admin/jadwal",
    text: "JadwalMangement",
  },
  {
    to: "/admin/kelas",
    text: "KelasManagement",
  },
];
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

const handleScroll = () => {
  const rect = document.getElementById("navbar").getBoundingClientRect();
  notTop.value = rect.top <= 0;
  console.log(notTop.value);
};

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  if (!item.value) {
    getUser();
  }
});
</script>
<template>
  <div class="z-40 relative">
    <div class="flex justify-between p-4 items-center">
      <div class="flex space-x-4 items-center lg:pl-10 pt-1">
        <div class="text-lg font-medium tracking-widest">FIOEP</div>
      </div>
      <div class="flex space-x-4 items-center">
        <div>
          <!-- <button
            @click="toggleTheme"
            class="text-xs bg-foreground/10 px-3 py-1 rounded-full hover:bg-foreground/20"
          >
            Wanderer Plan
          </button> -->
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              class="w-8 h-8 cursor-pointer text-white bg-primary flex items-center justify-center rounded-full"
            >
              {{ item?.name?.substring(0, 1) }}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56 mr-7 mt-2">
            <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard class="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard class="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users class="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus class="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail class="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare class="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle class="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus class="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github class="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy class="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud class="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> -->
            <DropdownMenuItem @click="logout">
              <LogOut class="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
  <div
    :class="notTop ? 'lg:pl-14 pl-4 pr-4' : 'px-4'"
    id="navbar"
    class="navbar linear duration-100"
  >
    <RouterLink
      class="hover:text-foreground cursor-pointer pb-4"
      :class="
        $route?.path?.toLowerCase().search(item.to) != -1
          ? 'text-foreground  border-b-[3px] border-current'
          : ''
      "
      v-for="(item, index) in list"
      :to="item.to"
    >
      {{ item.text }}
    </RouterLink>
  </div>
  <logo
    :class="notTop ? 'scale-75' : ''"
    class="fixed top-3 left-2 z-30 linear w-10 h-10 duration-100 hidden lg:block"
  />
</template>
<style>
/* Hide the scrollbar */
.navbar::-webkit-scrollbar {
  height: 0rem; /* Set a small width for the scrollbar */
}

.navbar {
  @apply transition-all duration-500 sticky left-0 w-full overflow-x-auto break-normal flex bg-background z-30 top-0 text-sm pt-4 border-b border-gray-200 dark:border-foreground/10 text-foreground/40 space-x-4;
}

.navbar::-webkit-scrollbar-thumb {
  background-color: transparent; /* Set the thumb color to transparent */
}
</style>
