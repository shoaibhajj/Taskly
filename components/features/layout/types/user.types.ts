export interface SupabaseUserResponse {
  user_metadata: { department: string; name: string };
}
export interface User {
  department: string;
  name: string;
}
