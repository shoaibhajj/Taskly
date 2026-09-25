"use client";
import { ApiError } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getListProjectService } from "../services/list.service";
import { Project } from "../types";

export function useListProjects() {
  const [projects, setProject] = useState<Project[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError>();
  const router = useRouter();

  useEffect(() => {
    const getProjectsList = async () => {
      try {
        setIsLoading(true);

        const res = await getListProjectService();

        setProject(res);
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

    getProjectsList();
  }, [ router]);

  return { projects, isLoading, error };
}
