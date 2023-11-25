<script setup>
const props = defineProps({
  list: Array,
  page: Number,
});
const emit = defineEmits(["move"]);
</script>
<template>
  <div class="px-4 mt-8 text-base w-full flex break-all">
    <button
      @click="emit('move', index)"
      :class="
        (props.page == index.label
          ? ' w-7 h-7 flex justify-center items-center text-white bg-primary rounded-full hover:text-white'
          : '') || (index.url ? '' : 'hidden')
      "
      v-for="index in list"
      v-html="index.label"
      class="mx-1 hover:text-primary"
    ></button>
  </div>
</template>
