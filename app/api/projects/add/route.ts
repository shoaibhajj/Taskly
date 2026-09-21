import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await api.post(SUPABASE_ENDPOINTS.ADD_PROJECT, body);

    return NextResponse.json(response, { status: 201 });
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
