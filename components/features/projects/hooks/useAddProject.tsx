"use client";
import { toast } from "sonner";
import { ProjectFormData } from "../schemas/project";
import { ApiError } from "@/lib/api/client";
import { addProjectService } from "../services/add.service";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function useAddProject() {
  // const [project, setProject] = useState<createProjectResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | unknown>();
  const router = useRouter();
  const addProject = async (data: ProjectFormData) => {
    try {
      setIsLoading(true);

      await addProjectService(data);

      toast.success("Project created successfully");

      router.push("/projects");
    } catch (error) {
      toast.error(
        error instanceof ApiError
          ? `${error.message}`
          : "Something went wrong. Please try again.",
      );
      setError(error);
    } finally {
      setIsLoading(false);
      // setProject(undefined);
    }
  };

  return { addProject, isLoading, error };
}
