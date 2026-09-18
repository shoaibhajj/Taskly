export const SUPABASE_ENDPOINTS = {
  SIGN_UP: "/auth/v1/signup",
  LOGIN: "/auth/v1/token?grant_type=password",
  LOGOUT: "/auth/v1/logout",
  REFRESH_TOKEN: "/auth/v1/token?grant_type=refresh_token",
  GET_USER_DATA: "/auth/v1/user",
} as const;

export const LOCAL_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  LOGOUT: "/api/auth/logout",
  GET_USER_DATA: "/api/auth/user",
} as const;
