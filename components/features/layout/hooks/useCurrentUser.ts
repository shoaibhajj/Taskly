"use client";
import { useEffect, useState } from "react";
import { User } from "../types/user.types";
import { ApiError } from "@/lib/api/client";
import getUserData from "../services/user.service";
import { useRouter } from "next/navigation";
export function useCurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await getUserData();
        console.log(res);
        
        setUser(res);
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            setError(error);
            router.push("/login");
          } else {
            setError(error);
          }
        } else {
          setError(
            new ApiError("Something went wrong. Please try again.", 500),
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);
  return { user, isLoading, error };
}
