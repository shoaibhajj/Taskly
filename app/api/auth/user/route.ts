import { SupabaseUserResponse } from "@/components/features/layout/types/user.types";
import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const {
      user_metadata: { department, name },
    } = await api.get<SupabaseUserResponse>(SUPABASE_ENDPOINTS.GET_USER_DATA);

    const response = NextResponse.json({ name, department });

    return response;
  } catch (error) {
    const errMsg =
      error instanceof ApiError
        ? `${error.message}`
        : "Something went wrong. Please try again.";
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: errMsg },
        { status: error.status ?? 500 },
      );
    }
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
