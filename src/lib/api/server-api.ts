import "server-only";

import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

import { getAccessToken } from "@/lib/session";
const baseURL = process.env.API_BACK_URL;

if (!baseURL) {
  throw new Error("API_BACK_URL is not set");
}

export class UnauthenticatedError extends Error {
  constructor() {
    super("Unauthenticated");
    this.name = "UnauthenticatedError";
  }
}

export const serverApi = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

serverApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new UnauthenticatedError();
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
);

export async function serverApiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await serverApi.get<T>(url, config);

  return response.data;
}
