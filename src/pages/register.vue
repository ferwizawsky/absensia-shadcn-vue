<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuth } from "@/stores/auth.js";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import { onMounted, ref } from "vue";

const isShow = ref(false);
const first = ref(false);
const auth = useAuth();
const router = useRouter();
const notif = useNotif();
const formPost = ref({
  username: "udeen_winter",
  password: "udeenwinter_48",
});
onMounted(() => {
  if (auth.token) {
    router.push("/");
  }
});
async function login() {
  if (notif.loading) return;
  notif.loading = true;
  try {
    const { data } = await useMyFetch(
      "POST",
      "/auth/login",
      jsonFormData(formPost.value)
    );

    localStorage.setItem("token", data.token);
    auth.token = data.token;
    router.push("/");
    // location.reload();
  } catch (error) {
    console.log(error);
    notif.make("Failed to Login Check your Username or Password", {
      type: "danger",
      delay: 4000,
    });
  } finally {
    notif.loading = false;
  }
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 px-4 lg:px-9 py-2 flex justify-center">
    <div
      class="w-full mt-8 ease-in-out duration-1000"
      :class="{ '-translate-y-full': first, '-translate-y-0': !first }"
    >
      <div class="mb-10 text-gray-600">
        <!-- <Icon class="w-32 mx-auto" /> -->
        <div>
          <img src="/icon.svg" class="w-[80px] mx-auto" />
        </div>
      </div>
      <div
        class="max-w-md p-10 mb-10 select-none bg-white rounded-xl filter drop-shadow-xl m-auto"
      >
        <form @submit.prevent="login()">
          <div class="text-3xl text-gray-600 font-bold text-left">
            <div class="mt-4">LOGIN</div>
            <div class="text-base font-thin text-gray-400 mt-2">
              Please first below to continue
            </div>
          </div>
          <div class="text-gray-400 mt-4 mb-3 text-xs">
            Name<br />
            <input
              required
              type="text"
              name="name"
              autocomplete="name"
              v-model="formPost.name"
              class="bg-gray-100 text-gray-600 py-2 w-full px-6 rounded-lg border-transparent focus:outline-none focus:ring-0 focus:ring-red-600 focus:border-transparent"
            />
          </div>
          <div class="text-gray-400 mt-4 mb-3 text-xs">
            Email<br />
            <input
              required
              type="text"
              name="email"
              autocomplete="email"
              v-model="formPost.email"
              class="bg-gray-100 text-gray-600 py-2 w-full px-6 rounded-lg border-transparent focus:outline-none focus:ring-0 focus:ring-red-600 focus:border-transparent"
            />
          </div>
          <div class="text-gray-400 mt-4 mb-3 text-xs">
            Username<br />
            <input
              required
              type="text"
              name="username"
              autocomplete="username"
              v-model="formPost.username"
              class="bg-gray-100 text-gray-600 py-2 w-full px-6 rounded-lg border-transparent focus:outline-none focus:ring-0 focus:ring-red-600 focus:border-transparent"
            />
          </div>
          <div class="text-gray-400 text-xs my-3 relative">
            Password <br />
            <input
              :type="!isShow ? 'password' : ''"
              required
              name="password"
              autocomplete="current-password"
              v-model="formPost.password"
              class="bg-gray-100 text-gray-600 py-2 w-full px-6 rounded-lg border-transparent focus:outline-none focus:ring-0 focus:ring-red-600 focus:border-transparent"
            />
            <svg
              @click="isShow = !isShow"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 absolute right-2 top-5 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <div class="text-gray-600 mt-10">
            <input
              type="submit"
              class="bg-primary uppercase rounded-lg m-auto drop-shadow-lg py-2 text-white px-16 flex items-center justify-center cursor-pointer transform hover:scale-110 ease-in-out duration-300"
              value="Sign in"
            />
          </div>
        </form>
        <!-- 
                <div class="my-2 text-xs text-primary">
                    <span class="cursor-pointer" @click="privacy()"
                        >Privacy Policy</span
                    >
                </div> -->
      </div>

      <div class="text-center">
        Don't have account ?
        <RouterLink to="/register">Register</RouterLink>
      </div>
    </div>
  </div>
</template>
