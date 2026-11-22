import "server-only";
import axios from "axios";
import { cookies } from "next/headers";
import { apiClient } from "./api-client";
import { clientApi } from "./client-axios";

const baseURL = process.env.NEXT_PUBLIC_BACK_URL;

export const serverApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

/* ------------------------- Request ------------------------- */
serverApi.interceptors.request.use(async (config) => {
  const cookie = await cookies();
  const access_token = cookie.get("access_token")?.value;

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

/* ------------------------- Response ------------------------- */
