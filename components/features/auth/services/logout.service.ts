import { LOCAL_ENDPOINTS } from "@/constants/endpoints";
import { ApiError } from "@/lib/api/client";

export async function logoutUser(): Promise<void> {
  const res = await fetch(LOCAL_ENDPOINTS.LOGOUT, { method: "POST" });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
}
