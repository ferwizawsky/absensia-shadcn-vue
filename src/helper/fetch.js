// fetch.js
import { ref } from "vue";
import { useOption } from "@/stores/option";

export async function useFetch(url, options = { method: "GET" }) {
  const data = ref(null);
  const error = ref(null);
  console.log(useOption().url);
  fetch(`${useOption().url}${url}`, {
    headers: {
      Accept: "application/json",
    },
    ...options,
  })
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
