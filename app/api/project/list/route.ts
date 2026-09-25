import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { Project } from "next/dist/build/swc/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = SUPABASE_ENDPOINTS.LIST_PROJECTS;

    const response = await api.get<Project[]>(url);

    return NextResponse.json(response, { status: 200 });
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
