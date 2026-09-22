import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...rest } = await request.json();
    const url = SUPABASE_ENDPOINTS.EDIT_PROJECT + `?id=eq.${id}`;

    await api.patch(url, { ...rest });

    return new NextResponse(null, { status: 204 });
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
