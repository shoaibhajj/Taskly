export interface SignUpResponse {
  code?: number;
  error_code?: string;
  msg?: string;
  access_token: string;
  refresh_token: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
