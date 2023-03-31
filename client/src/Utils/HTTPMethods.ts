import { BASE_URL } from "./Credentials";
import axios from "axios";

function post(url: string, data: any) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.post(BASE_URL + url, data);
}

function get(url: string) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.get(BASE_URL + url);
}

function put(url: string, data: any) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.put(BASE_URL + url, data);
}

function deleteUser(url: string) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.delete(BASE_URL + url);
}

export const HTTPMethods = {
  post,
  get,
  put,
  deleteUser,
};
