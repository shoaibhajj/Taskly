import { ApiError } from "@/lib/api/client";


export async function logoutUser(): Promise<void> {
  const res = await fetch(
    "/api/auth/logout",
    { method: "POST" }
  );
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
}
