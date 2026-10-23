"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { PhoneInput } from "@/shared";
import { PasswordInput } from "@/shared";
import Link from "next/link";
import { House } from "lucide-react";
import FormButton from "@/shared/buttons/form-button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/axios";
import {
  type LoginFormValues,
  loginSchema,
} from "@/features/auth/schema/login.schema";
import axios from "axios";
import { toast } from "sonner";
const defaultValues: LoginFormValues = { phone: "", password: "" };

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues,
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await api.post("/auth/login", data);
      router.push("/profile");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        form.setError("root", { message: "Invalid phone or password" });
        return;
      }
      toast.error("error");
    }
  };
  return (
    <Card className="w-full rounded-[18px] py-0 md:gap-2 gap-1 border-slate-200 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:translate-y-0 -translate-y-1/4 max-w-md border">
      <CardHeader className="text-center space-y-0 md:gap-1 gap-0 mt-2 py-2">
        <div className="mx-auto flex h-11 w-12 items-center justify-center rounded-xl bg-blue-50">
          <House className="h-6 w-6 text-blue-600" strokeWidth={2} />
        </div>
        <CardTitle className="text-[16px] md:text-xl font-semibold mb-0">
          Welcome back
        </CardTitle>
      </CardHeader>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex p-2 md:px-5 px-4 flex-col">
            <div className="input-fields flex flex-col gap-4">
              <PhoneInput />
              <PasswordInput name="password" label="Password" />
            </div>
            <div className="flex my-2 justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:underline"
                prefetch={false}
              >
                Forgot password?
              </Link>
            </div>
            <FormButton
              type="submit"
              loadingText="Loading..."
              isLoading={isSubmitting}
              className="mt-2"
            >
              <span className="text-[14px]">Login</span>
            </FormButton>
          </CardContent>
        </form>
      </FormProvider>
      <CardFooter className="justify-center text-sm py-5 text-muted-foreground">
        You don&apos;t have any account?
        <Link
          href="/register"
          className="ml-2 font-medium text-blue-600 transition-colors hover:text-blue-700"
          prefetch={false}
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
