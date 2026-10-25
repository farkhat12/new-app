import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const serverApi = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

export async function serverApiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await serverApi.get<T>(url, config);
  return response.data;
}
