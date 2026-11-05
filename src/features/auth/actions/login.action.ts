"use server";
import { api } from "@/lib/api/axios";
import { LoginFormValues } from "../schema/login.schema";
import { createSession } from "@/lib/session";

export const loginAction = async (values: LoginFormValues) => {
  try {
    const { data } = await api.post("/auth/login", values);
    await createSession(data.data);
  } catch (error) {
    console.log(error);
  }
};
