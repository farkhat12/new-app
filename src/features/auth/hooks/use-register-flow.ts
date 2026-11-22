import { useCallback, useEffect, useState } from "react";
import { RegisterStore, useRegisterStore } from "../store/register.store";
import { authApi } from "../api/api";
import { RegisterFormValues } from "../schema/register.schema";
import { toast } from "sonner";

export function useRegisterFlow({ onSuccess }: { onSuccess: () => void }) {
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const next = useRegisterStore((state: RegisterStore) => state.next);
  const back = useRegisterStore((state: RegisterStore) => state.back);
  const reset = useRegisterStore((state: RegisterStore) => state.resetStep);
  const storeValues = useRegisterStore((state: RegisterStore) => state.values);
  const setValues = useRegisterStore((state) => state.setValues);
  const currentStep = useRegisterStore(
    (state: RegisterStore) => state.currentStep,
  );

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [secondsLeft]);

  useEffect(() => {
    return reset();
  }, [reset]);

  // Step 1
  const submitInfo = useCallback(
    async (values: Partial<RegisterFormValues>) => {
      try {
        setIsPending(true);

        await authApi.checkPhone(values);
        toast.success("Set a password");
        setValues(values);
        next();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [next, setValues],
  );

  // Step 2
  const submitPassword = useCallback(
    async (values: Partial<RegisterFormValues>) => {
      try {
        setIsPending(true);
        const payload = {
          name: storeValues.name,
          phone: storeValues.phone,
          ...values,
        };

        const data = await authApi.register(payload);
        const serverCooldown = data.data?.data.cooldownRemaining;
        if (serverCooldown > 0) {
          setSecondsLeft(serverCooldown);
        }

        toast.success("Verify phone number");
        setValues(payload);
        next();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [next, setValues, storeValues],
  );

  // Step 3
  const submitOtp = useCallback(
    async (values: Partial<RegisterFormValues>) => {
      try {
        setIsPending(true);
        const payload = {
          ...storeValues,
          ...values,
        };

        await authApi.verifyOtp(payload);
        onSuccess();
        reset();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [storeValues, setValues],
  );

  const resendOtp = useCallback(async () => {
    const phone = storeValues.phone;
    if (!phone) throw new Error("Phone жоқ");
    try {
      setIsResending(true);
      const data = await authApi.resendOtp(phone);
      const serverCooldown = data.data?.data.cooldownRemaining;
      if (serverCooldown > 0) {
        setSecondsLeft(serverCooldown);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsResending(false);
    }
  }, [storeValues, setValues]);

  return {
    currentStep,
    isPending,
    submitInfo,
    submitPassword,
    submitOtp,
    back,
    resendOtp,
    secondsLeft,
    isResending,
    canResend: secondsLeft === 0 && !isResending,
  };
}
