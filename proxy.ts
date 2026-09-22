import { NextRequest, NextResponse } from "next/server";
const protectedRoutes = ["/project"];
const publicOnlyRoutes = ["/login", "/sign-up"];

function redirectTo(path: string, request: NextRequest) {
  return NextResponse.redirect(new URL(path, request.nextUrl.origin));
}


export function proxy(request: NextRequest) {

  const session = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isGuestOnlyRoute =
    pathname === "/" || publicOnlyRoutes.includes(pathname);

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnlyRoute && session) return redirectTo("/project", request);
  if (pathname === "/" && !session) return redirectTo("/login", request);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
