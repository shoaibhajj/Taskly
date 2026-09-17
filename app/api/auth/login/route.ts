import { SignInResponse } from "@/components/features/auth/login/types";
import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { setCookies } from "@/lib/auth/cookies";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, remember_me } = await request.json();

    const { access_token, refresh_token, expires_at, user } =
      await api.post<SignInResponse>(SUPABASE_ENDPOINTS.LOGIN, {
        email,
        password,
      });
    const date = new Date();
    date.setTime(date.getTime() + (remember_me ? 30 : 1) * 24 * 60 * 60 * 1000);
    const refreshExp = date;
    const response = NextResponse.json({ user: user });

    await setCookies("access_token", access_token, new Date(expires_at * 1000));
    await setCookies("refresh_token", refresh_token, refreshExp);
    await setCookies("remember_me", String(remember_me), refreshExp);

    return response;
  } catch (error) {
    const errMsg =
      error instanceof ApiError && error.status === 400
        ? `Invalid email or password.`
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
