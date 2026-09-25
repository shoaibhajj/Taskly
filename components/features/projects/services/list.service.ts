import { LOCAL_ENDPOINTS } from "@/constants/endpoints";

import { ApiError } from "@/lib/api/client";
import { Project } from "../types";

export async function getListProjectService(): Promise<Project[]> {
  const url = `${LOCAL_ENDPOINTS.LIST_PROJECTS}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }

  const data = (await res.json()) as Project[];

  return data;
}
