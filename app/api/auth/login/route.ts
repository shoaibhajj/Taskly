import { SignInResponse } from "@/components/features/auth/login/types";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiError } from "@/lib/api/client";
import { NextResponse, NextRequest } from "next/server";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export async function POST(request: NextRequest) {
    
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("apikey", API_KEY!);
  const url = `${BASE_URL}${ENDPOINTS.LOGIN}`;
  try {
    const { email, password, remember_me } = await request.json();

    const result = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

   
    
    if (result.ok) {
      const data = (await result.json()) as SignInResponse;
      const { access_token, refresh_token, expires_at, user } = data;

      const date = new Date();
      date.setTime(
        date.getTime() + (remember_me ? 30 : 1) * 24 * 60 * 60 * 1000,
      );
      const refreshExp = date;
      const response = NextResponse.json({ user: user });

      response.cookies.set("access_token", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: new Date(expires_at * 1000),
      });

      response.cookies.set("refresh_token", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: refreshExp,
      });
      response.cookies.set("remember_me", String(remember_me), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: refreshExp,
      });
      return response;
    } else {
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: result.status },
      );
    }
  } catch (error) {
    const errMsg =
      error instanceof ApiError && error.status === 400
        ? `Invalid email or password.`
        : "Something went wrong. Please try again.";
    const err = error as ApiError;
    return NextResponse.json({ error: errMsg }, { status: err.status ?? 500 });
  }
}
