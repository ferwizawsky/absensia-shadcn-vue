<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowUpOnSquareIcon,
  BackspaceIcon,
} from "@heroicons/vue/24/outline";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps([
  "modelValue",
  "disabled",
  "students",
  "absensi",
  "kelas",
]);
let list = ref([]);

function selectAll() {
  if (list.value.length == props.kelas?.students?.length) {
    list.value = [];
  } else {
    for (let x in props.kelas?.students) {
      if (list.value.indexOf(props.kelas.students[x].id) == -1) {
        list.value.push(props.kelas.students[x].id);
      }
    }
  }
}

watch(
  () => props.modelValue,
  (e) => {
    list.value = e;
  },
  {
    deep: true,
  }
);

watch(
  () => list.value,
  (e) => {
    emit("update:modelValue", e);
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div class="">
    <div class="pb-4 flex justify-between items-center">
      <button class="btn" @click="selectAll()">Select All</button>
      <slot></slot>
    </div>
    <div
      v-for="(item, index) in props?.students?.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })"
      class="cardia pl-12"
    >
      <!-- {{ item.id }} -->
      <button
        @click="
          () => {
            if (!list.find((x) => x == item.id)) {
              list.push(item.id);
            } else {
              list.splice(list.indexOf(item.id), 1);
            }
          }
        "
        :class="list.find((x) => x == item.id) ? 'bg-primary/60' : ''"
        class="absolute left-3 top-7 border-primary border w-5 h-5 rounded-lg"
      ></button>
      <div class="font-medium text-base">{{ item.name }}</div>
      <div
        v-if="props.absensi"
        class="text-xs flex items-center text-gray-400 pt-1"
      >
        <ClockIcon class="w-4 h-4 mr-1" />
        <div class="">
          {{
            props.absensi.find((x) => x.user?.username == item.username)
              ?.total ?? 0
          }}
          / {{ kelas?.min }} Kehadiran
          <span
            :class="
              props.absensi.find((x) => x.user?.username == item.username)
                ?.status == 'Cukup'
                ? 'text-primary'
                : 'text-rose-600'
            "
          >
            {{
              props.absensi.find((x) => x.user?.username == item.username)
                ?.status ?? "Belum Cukup"
            }}
          </span>
        </div>
      </div>
      <div v-else>-</div>
      <div></div>
      <div
        class="absolute bottom-2 right-2 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-2xl"
      >
        <BackspaceIcon
          v-if="$route.params.id"
          @click="emit('remove', index)"
          class="w-6 h-6 text-rose-600 hover:brightness-50 duration-300 ease-linear cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>
