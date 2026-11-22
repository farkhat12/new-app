import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BACK_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
