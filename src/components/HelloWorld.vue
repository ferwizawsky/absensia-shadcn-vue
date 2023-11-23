<script setup>
import { onMounted, ref } from "vue";
import { useFetch } from "@/helper/fetch.js";
import { useOption } from "@/stores/option";

const data = ref();

onMounted(() => {
  // console.log(import.meta.env.VITE_API);
  data.value = useFetch(
    "/dash-masyarakat/get-all-ranmor?status=ditemukan&limit=10&page=1&filter="
  );
});
defineProps({
  msg: String,
});

const count = ref(0);
function test() {
  console.log(import.meta.env.VITE_MODE);
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <!-- <h1>{{ data }}</h1> -->
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p @click="test">
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
