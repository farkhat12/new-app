import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
// console.log(BASE_URL, "url");

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
