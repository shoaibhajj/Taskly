import { LOCAL_ENDPOINTS } from "@/constants/endpoints";
import { ProjectFormData } from "../schemas/project";
import { createProjectResponse } from "../types";
import { ApiError } from "@/lib/api/client";

export async function addProjectService({
  name,
  description,
}: ProjectFormData): Promise<createProjectResponse> {
  const res = await fetch(LOCAL_ENDPOINTS.ADD_PROJECT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }

  const data = (await res.json()) as createProjectResponse;

  return data;
}
