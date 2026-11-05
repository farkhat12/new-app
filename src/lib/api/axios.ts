import axios from "axios";
const BASE_URL = process.env.API_BACK_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
