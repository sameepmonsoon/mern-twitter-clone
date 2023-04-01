import { BASE_URL } from "./Credentials";
import axios from "axios";
const token = localStorage.getItem("token");

function post(url: string, data: any) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.post(BASE_URL + url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function get(url: string) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.get(BASE_URL + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function put(url: string, data: any) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.put(BASE_URL + url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function deleteUser(url: string) {
  if (!url) {
    throw new Error("Url not provided");
  }
  return axios.delete(BASE_URL + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const HTTPMethods = {
  post,
  get,
  put,
  deleteUser,
};
