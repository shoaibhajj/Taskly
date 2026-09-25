export const SUPABASE_ENDPOINTS = {
  SIGN_UP: "/auth/v1/signup",
  LOGIN: "/auth/v1/token?grant_type=password",
  LOGOUT: "/auth/v1/logout",
  REFRESH_TOKEN: "/auth/v1/token?grant_type=refresh_token",
  GET_USER_DATA: "/auth/v1/user",
  FORGOT_PASSWORD: "/auth/v1/recover",
  ADD_PROJECT: "/rest/v1/projects",
  EDIT_PROJECT: "/rest/v1/projects",
  GET_PROJECT: "/rest/v1/rpc/get_projects",
  LIST_PROJECTS: "/rest/v1/rpc/get_projects",
} as const;

export const LOCAL_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  SIGNUP: "/api/auth/signup",
  LOGOUT: "/api/auth/logout",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  GET_USER_DATA: "/api/auth/user",
  ADD_PROJECT: "/api/project/add",
  EDIT_PROJECT: "/api/project/edit",
  GET_PROJECT: "/api/project/get",
  LIST_PROJECTS: "/api/project/list",
} as const;
