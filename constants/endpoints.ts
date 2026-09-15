export const ENDPOINTS = {
  SIGN_UP: "/auth/v1/signup",
  LOGIN: "/auth/v1/token?grant_type=password",
  LOGOUT: "/auth/v1/logout",
  REFRESH_TOKEN: "/auth/v1/token?grant_type=refresh_token",
  LOGIN_SESSION: "/api/auth/login",
} as const;
