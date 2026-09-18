"use client";
import Avatar from "@/components/ui/Avatar";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { generateNameAvatar } from "../utils";
import TASKLY from "@/app/icons/TASKLY.svg";
import BurgerIcon from "@/app/icons/BurgerIcon.svg";
function MobileNav() {
  const { error, isLoading, user } = useCurrentUser();

  return (
    <div className="bg-background flex h-16 w-full items-center justify-between gap-3.75 border border-[#0000001A] px-6.25 md:hidden">
      <div className="flex">
        <BurgerIcon className="mt-3 h-6 w-6" />
        <TASKLY className="mt-3 h-6 w-40.25" />
      </div>
      <Avatar name={generateNameAvatar(user?.name ?? "")} />
    </div>
  );
}

export default MobileNav;
