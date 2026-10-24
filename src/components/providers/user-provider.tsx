"use client";
import { useEffect, type ReactNode } from "react";
import { api } from "@/lib/api/axios";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/features/auth/types/register.types";

interface UserProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export function UserProvider({
  children,
  initialUser = null,
}: UserProviderProps) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
      return;
    }

    let cancelled = false;

    const fetchUser = async () => {
      try {
        const { data } = await api.get("/api/users/me", {
          withCredentials: true,
        });

        if (!cancelled) {
          // API ResponseInterceptor форматына сәйкес ретте.
          setUser(data.data ?? data);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      }
    };

    void fetchUser();

    return () => {
      cancelled = true;
    };
  }, [initialUser, setUser]);

  return children;
}
