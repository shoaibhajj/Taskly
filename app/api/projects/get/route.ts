import { ProjectFormData } from "@/components/features/projects/schemas/project";
import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { api, ApiError } from "@/lib/api/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id  = searchParams.get("id");

     if (!id) {
       return NextResponse.json(
         { error: "Missing 'id' parameter" },
         { status: 400 },
       );
     }
    const url = SUPABASE_ENDPOINTS.GET_PROJECTS + `?id=eq.${id}`;

    const response = await api.get<ProjectFormData[]>(url);

    return NextResponse.json(response[0], { status: 200 });
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
