import { LOCAL_ENDPOINTS } from "@/constants/endpoints";

import { ApiError } from "@/lib/api/client";
import { ProjectResponse } from "../types";

interface Props {
  id: string;
}

export async function getProjectService({
  id,
}: Props): Promise<ProjectResponse> {
  const url = `${LOCAL_ENDPOINTS.GET_PROJECT}?id=${id}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }

  const data = (await res.json()) as ProjectResponse;

  return data;
}
