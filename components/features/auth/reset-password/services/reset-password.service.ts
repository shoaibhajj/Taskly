import { LOCAL_ENDPOINTS } from "@/constants/endpoints";
import { ApiError } from "@/lib/api/client";
import { resetPasswordApiRequest, resetPasswordApiResponse } from "../types";

export async function resetPassword(
  requestData: resetPasswordApiRequest,
): Promise<resetPasswordApiResponse> {
  const res = await fetch(LOCAL_ENDPOINTS.RESET_PASSWORD, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new ApiError(
      errorData.error || "Something went wrong. Please try again.",
      res.status,
    );
  }

  const data = (await res.json()) as resetPasswordApiResponse;
  return data;
}
