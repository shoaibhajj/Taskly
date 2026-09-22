interface User {
  id: string;
  email: string;
  name: string;
}
export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export interface LoginApiResponse {
  user: User;
}
