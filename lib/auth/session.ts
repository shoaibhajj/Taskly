interface sessionTokens {
  access_token: string;
  refresh_token: string;
}

function setCookie(name: string, value: string, daysToLive: number | null) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += "; path=/; SameSite=Lax; Secure";

  document.cookie = cookieString;
}

export function getCookie(name: string) {
  const cookieName = `${encodeURIComponent(name)}=`;
  const cookieArray = document.cookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();

    if (cookie.indexOf(cookieName) === 0) {
      return decodeURIComponent(cookie.substring(cookieName.length));
    }
  }
  return null;
}

function deleteCookie(name: string) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure`;
}

export function storeSession(tokens: sessionTokens, rememberMe: boolean): void {
 setCookie("access_token", tokens.access_token, null);
 setCookie("refresh_token", tokens.refresh_token, rememberMe ? 30 : null);
 setCookie(
   "remember_me",
   rememberMe ? "true" : "false",
   rememberMe ? 30 : null,
 );
}

export function getAccessToken(): string | null {
  const access_token = getCookie("access_token");
  return access_token;
}
export function getRefreshToken(): string | null {
  const refresh_token = getCookie("refresh_token");
  return refresh_token;
}

export function clearSession(): void {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
  deleteCookie("remember_me");
}



