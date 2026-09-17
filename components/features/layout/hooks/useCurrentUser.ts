"use client";
import { useEffect, useState } from "react";
import { User } from "../types/user.types";
import { ApiError } from "@/lib/api/client";
import getUserData from "../services/user.service";

export function useCurrentUser() {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await getUserData();
        setUser(res);
      } catch (error) {
        if (error instanceof ApiError) {
          setError(error);
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
