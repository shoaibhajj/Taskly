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
  const [error, setError] = useState<ApiError>();
  const router = useRouter();
  const addProject = async (data: ProjectFormData) => {
    try {
      setIsLoading(true);

      await addProjectService(data);

      toast.success("Project created successfully");

      router.push("/project");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error);
      } else {
        setError(new ApiError("Something went wrong. Please try again.", 500));
      }
      toast.error("Failed To Add New Project, Try Again Later ");
    } finally {
      setIsLoading(false);
    }
  };
  return { addProject, isLoading, error };
}
