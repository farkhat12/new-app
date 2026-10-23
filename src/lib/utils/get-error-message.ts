import axios from "axios";

const FALLBACK = "Something went wrong";

/** Nest.js `message` өрісі `string` не `string[]` (class-validator) болуы мүмкін */
export function getErrorMessage(error: unknown, fallback = FALLBACK): string {
  if (!axios.isAxiosError(error)) return fallback;

  const raw: unknown = error.response?.data?.message;
  if (Array.isArray(raw)) {
    const first = raw.find((m): m is string => typeof m === "string");
    return first ?? fallback;
  }
  return typeof raw === "string" && raw.length > 0 ? raw : fallback;
}
