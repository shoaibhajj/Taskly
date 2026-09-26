import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
const redirectTo = new URL(
  "/reset-password",
  request.nextUrl.origin,
).toString();

const recoverUrl =
  `${SUPABASE_ENDPOINTS.FORGOT_PASSWORD}` +
  `?redirect_to=${encodeURIComponent(redirectTo)}`;

  try {
    const { email } = await request.json();

    await api.post(recoverUrl, {
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
