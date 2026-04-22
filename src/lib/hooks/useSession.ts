"use client";

import { useSession as useNextAuthSession } from "next-auth/react";

export function useSession() {
  const { data, status } = useNextAuthSession();
  return {
    session: data,
    user: data?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}
