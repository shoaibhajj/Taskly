"use client";
import { useLogout } from "@/components/features/auth/hooks/useLogout";

export default function ProjectsPage() {
  const { logout, isLoggingOut } = useLogout();
  return (
    <div>
      <button onClick={logout} disabled={isLoggingOut}>
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
