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
  })
    .then((response) => {
      // Handle successful response
      console.log(response.data);
      return response; // or whatever you need to do with the response
    })
    .catch((error) => {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }

      throw error; // rethrow the error to propagate it further if needed
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
