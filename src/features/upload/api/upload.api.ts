import { api } from "@/lib/api/axios";
import type { AxiosResponse } from "axios";

// ⚠️ Backend-тің нақты жауабына қарай түзет
export interface CreateApartmentResponse {
  message: string;
  data?: { id: string };
}

const CREATE_APARTMENT_URL = "/apartments"; // ⚠️ өзіңдегі endpoint-пен ауыстыр

/**
 * Пәтерді суреттерімен бірге жүктейді.
 * @param formData  buildFormData(values) нәтижесі
 * @param onProgress 0–99 аралығындағы пайыз (100 тек сервер жауап бергенде)
 * @param signal    сұранысты тоқтату үшін (AbortController.signal)
 */
export function createApartment(
  formData: FormData,
  onProgress?: (percent: number) => void,
  signal?: AbortSignal,
): Promise<AxiosResponse<CreateApartmentResponse>> {
  return api.post<CreateApartmentResponse>(
    CREATE_APARTMENT_URL,
    formData,
    {
      // Content-Type қолмен қойма: axios multipart boundary-ді өзі қосады
      signal,
      timeout: 0, // ауыр сурет жүктеуде әдепкі timeout сұранысты үзіп жібермесін
      onUploadProgress: (event) => {
        if (!event.total) return;
        const percent = Math.round((event.loaded / event.total) * 100);
        // Байт толық кетсе де, сервер әлі өңдеп жатыр (сурет сақтау, DB),
        // сондықтан 100% көрсетпейміз, әйтпесе "100%" тұрып қалғандай көрінеді
        onProgress?.(Math.min(percent, 99));
      },
    },
  );
}
