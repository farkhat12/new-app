import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BACK_URL;

export const clientApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
