import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    await api.post(SUPABASE_ENDPOINTS.FORGOT_PASSWORD, {
      email,
    });

    const response = NextResponse.json({
      message:
        "If an account exists with this email, we’ve sent a password reset link.",
    });
    return response;
  } catch (error) {
    const errMsg =
      error instanceof ApiError && error.status === 400
        ? `Invalid email format.`
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
