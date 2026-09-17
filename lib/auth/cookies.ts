export const setCookies = async (
  cookieName: string,
  cookieValue: string,
  expires: Date,
) => {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.set(cookieName, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expires,
  });
};
export const deleteAuthCookies = async () => {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  ["access_token", "refresh_token", "remember_me"].forEach((name) => {
    cookieStore.set(name, "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });
  });
};
