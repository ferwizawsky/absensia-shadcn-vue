// fetch.js
import { ref } from "vue";
import { useOption } from "@/stores/option";
import { useAuth } from "@/stores/auth";
import axios from "axios";

export const useMyFetch = (method = "GET", request = "/", opts) => {
  const auth = useAuth();
  const option = useOption();
  let header_option = {
    Accept: "application/json",
  };
  let url = option.url;
  console.log(option.url);
  if (auth.isAuthenticated) {
    header_option = {
      // Authorization: auth?.token,
      authorization: "Bearer " + auth?.token,
      Accept: "application/json",
    };
  }
  return axios({
    method: method,
    url: `${url}${request}`,
    data: opts,
    headers: header_option,
  });
};

export const jsonFormData = (json, exceptional = []) => {
  let fm = new FormData();
  for (let x in json) {
    if (Array.isArray(json[x]) || typeof json[x] === "object") {
      for (let y in json[x]) {
        if (json[x][y]) {
          if (
            Array.isArray(json[x][y]) ||
            (typeof json[x][y] === "object" && exceptional.indexOf(x) == -1)
          ) {
            for (let z in json[x][y]) {
              if (json[x][y][z]) {
                fm.append(`${x}[${y}][${z}]`, json[x][y][z]);
              }
            }
          } else {
            console.log(json[x][y]);
            fm.append(`${x}[${y}]`, json[x][y]);
          }
        }
      }
    } else {
      if (json[x]) {
        fm.append(x, json[x]);
      }
    }
  }
  return fm;
};
