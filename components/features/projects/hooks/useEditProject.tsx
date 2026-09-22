"use client";
import { toast } from "sonner";
import { ProjectFormData } from "../schemas/project";
import { ApiError } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { editProjectService } from "../services/edit.service";

export function useEditProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError>();
  const router = useRouter();
  const editProject = async (data: ProjectFormData, id: string) => {
    try {
      setIsLoading(true);

      await editProjectService({ ...data, id });

      toast.success("Project updated successfully");

      router.push("/project");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error);
        toast.error(`Failed to update project: ${error.message}`);
      } else {
        setError(new ApiError("Something went wrong. Please try again.", 500));
        toast.error(`Failed to update project: ${error}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { editProject, isLoading, error };
}
