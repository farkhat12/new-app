"use client";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user.store";
import { User } from "@/features/auth/types/register.types";

interface UserProviderProps {
  user: User | null;
  children: React.ReactNode;
}

const UserProvider = ({ user, children }: UserProviderProps) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return children;
};

export default UserProvider;
