"use client";
import Avatar from "@/components/ui/Avatar";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { generateNameAvatar } from "../utils";

function Navbar() {
  const { error, isLoading, user } = useCurrentUser();

  return (
    <div className="hidden bg-background md:flex h-16 w-full items-center justify-end gap-3.75 border-b border-[#0000001A] px-6.25">
      <div className="flex flex-col text-end">
        <p className="text-body-md leading-btn font-semibold capitalize">
          {isLoading ? "Loading..." : user?.name}
          {error && error.message}
        </p>
        <p className="text-primary text-label-xs leading-btn space-x-1 font-bold uppercase">
          {isLoading ? "Loading..." : user?.department}
        </p>
      </div>
      <Avatar name={generateNameAvatar(user?.name ?? "")} />
    </div>
  );
}

export default Navbar;
