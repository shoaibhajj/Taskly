"use client";
import { ProjectFormData } from "../schemas/project";
import { ApiError } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjectService } from "../services/get.service";

export function useGetProject(id: string) {
  const [project, setProject] = useState<ProjectFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError>();
  const router = useRouter();

  useEffect(() => {
    const getProject = async (id: string) => {
      try {
        setIsLoading(true);

        const res = await getProjectService({ id });

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

    getProject(id);
  }, [id, router]);

  return { project, isLoading, error };
}
