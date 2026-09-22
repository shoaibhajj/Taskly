"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutUser } from "../services/logout.service";

export function useLogout() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Logout failed, please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
}
