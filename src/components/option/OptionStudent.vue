<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { useOption } from "@/stores/option";

const option = useOption();
const emit = defineEmits(["add"]);
const props = defineProps(["disabled", "list"]);

let selected = ref();
let query = ref("");

let filteredData = computed(() =>
  query.value === ""
    ? option.listUser
    : option.listUser.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);
watch(
  () => selected.value,
  (e) => {
    emit("add", e);
  },
  {
    deep: true,
  }
);
</script>
<template>
  <Combobox v-model="selected">
    <div class="relative mt-1">
      <div class="relative">
        <ComboboxInput
          class="inputan"
          :displayValue="(person) => person.text"
          @change="query = $event.target.value"
          :disabled="disabled"
        />
        <ComboboxButton
          v-if="!disabled"
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute bg-white font-normal backdrop-blur-sm mt-1 max-h-60 w-full overflow-auto rounded-md py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredData.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="person in filteredData"
            as="template"
            :key="person.id"
            :value="person"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-pointer select-none py-2 pl-10 pr-4"
              :class="{
                'bg-primary/40  ': active,
                '': !active,
              }"
            >
              {{ person.name }}
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>
