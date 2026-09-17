import { SUPABASE_ENDPOINTS } from "@/constants/endpoints";
import { deleteAuthCookies } from "@/lib/auth/cookies";
import { NextResponse, NextRequest } from "next/server";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export async function POST(request: NextRequest) {
  console.log(request.cookies.getAll());
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("apikey", API_KEY!);
  const url = `${BASE_URL}${SUPABASE_ENDPOINTS.LOGOUT}`;

  const accessToken = request.cookies.get("access_token")?.value;
  if (!accessToken) {
    const response = NextResponse.json(null, { status: 204 });
    await deleteAuthCookies();
    return response;
  }
  headers.set("Authorization", `Bearer ${accessToken}`);
  try {
    const result = await fetch(url, {
      method: "POST",
      headers,
    });
    console.log(result);

const response = new NextResponse(null, { status: 204 });
    const session_not_found =
      result.headers.get("x-sb-error-code") === "session_not_found"
        ? true
        : false;
    if (result.ok) {
      await deleteAuthCookies();

      return response;
    } else if (session_not_found) {
      await deleteAuthCookies();
      return response;
    } else {
      return NextResponse.json(
        { error: "Logout failed, please try again." },
        { status: result.status },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Logout failed, please try again." },
      { status: 500 },
    );
  }
}
