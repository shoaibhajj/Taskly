import { api } from "@/lib/api/client";
import { SupabaseUserResponse, User } from "../types/user.types";
import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";

export default async function getUserData(): Promise<User> {
  const { user_metadata } = await api.get<SupabaseUserResponse>(
    SUPABASE_ENDPOINTS.GET_USER_DATA,
  );

  return user_metadata;
}
