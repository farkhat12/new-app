import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.API_URL || "http://localhost:5000";

export const serverApi = axios.create({
  baseURL: BASE_URL,
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

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
