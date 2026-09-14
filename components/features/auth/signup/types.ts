export interface SignUpResponse {
  code?: number;
  error_code?: string;
  msg?: string;
  access_token: string;
  refresh_token: string;
}
