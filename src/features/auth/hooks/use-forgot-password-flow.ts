import { useCallback, useState } from "react";
import { authApi } from "../api/api";
import { PhoneFormValues } from "../schema/phone.schema";

export function useForgotPasswordFlow() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (fn: () => Promise<void>) => {
    setSubmitting(true);
    setError(null);
    try {
      await fn();
    } catch (e: any) {
      setError(e?.message ?? "Қате орын алды");
    } finally {
      setSubmitting(false);
    }
  }, []);

  const submitPhone = (values: PhoneFormValues) =>
    run(async () => {
      await authApi.forgotPassword(values.phone);
      setPhone(values.phone);
    });

  return { phone, step, submitPhone };
}
