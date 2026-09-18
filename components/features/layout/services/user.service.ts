import { ApiError } from "@/lib/api/client";
import { User } from "../types/user.types";
import { LOCAL_ENDPOINTS } from "@/constants/endpoints";

export default async function getUserData(): Promise<User> {
  const res = await fetch(LOCAL_ENDPOINTS.GET_USER_DATA, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new ApiError("Something went wrong. Please try again.", res.status);
  }
  const data = (await res.json()) as User;
  return data;
}
