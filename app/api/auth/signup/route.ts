import { SignUpResponse } from "@/components/features/auth/signup/types";
import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, data } = await request.json();

    await api.post<SignUpResponse>(SUPABASE_ENDPOINTS.SIGN_UP, {
      email,
      password,
      data,
    });

    const response = NextResponse.json({ message: "success" }, { status: 201 });

    return response;
  } catch (error) {
    const errMsg =
      error instanceof ApiError && error.status === 400
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
