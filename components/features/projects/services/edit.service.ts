import { LOCAL_ENDPOINTS } from "@/constants/endpoints";
import { ProjectFormData } from "../schemas/project";
import { ApiError } from "@/lib/api/client";

interface Props extends ProjectFormData {
  id: string;
}

export async function editProjectService({
  name,
  description,
  id,
}: Props): Promise<void> {
  const res = await fetch(LOCAL_ENDPOINTS.EDIT_PROJECT, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, id }),
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
}
