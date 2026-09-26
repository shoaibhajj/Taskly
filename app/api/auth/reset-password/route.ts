import { NextRequest, NextResponse } from "next/server";
import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";

type ResetPasswordRequest = {
  accessToken?: string;
  password?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ResetPasswordRequest;
    const { accessToken, password } = body;

    if (
      typeof accessToken !== "string" ||
      !accessToken.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return NextResponse.json(
        { error: "Access token and password are required." },
        { status: 400 },
      );
    }

    await api.put(
      SUPABASE_ENDPOINTS.RESET_PASSWORD,
      { password },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    const status = error instanceof ApiError ? (error.status ?? 500) : 500;
    const isInvalidLink = status === 401 || status === 403;

    return NextResponse.json(
      {
        error: isInvalidLink
          ? "Invalid or expired reset link."
          : "Something went wrong. Please try again.",
      },
      { status },
    );
  }
}
