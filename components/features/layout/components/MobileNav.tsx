"use client";
import Avatar from "@/components/ui/Avatar";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { generateNameAvatar } from "../utils";
import TASKLY from "@/app/icons/TASKLY.svg";
import BurgerIcon from "@/app/icons/BurgerIcon.svg";
import CloseIcon from "@/app/icons/CloseIcon.svg";
import LogoIcon from "@/app/icons/LogoIcon.svg";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileNav({ isDrawerOpen, setIsDrawerOpen }: Props) {
  const { error, isLoading, user } = useCurrentUser();

  return (
    <div className="bg-background flex h-16 w-full items-center justify-between gap-3.75 border border-[#0000001A] px-6.25 md:hidden">
      <div className="flex">
        <BurgerIcon
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className={`mt-3 h-6 w-6 ${isDrawerOpen && "hidden"}`}
        />

        <LogoIcon
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          className={`mt-2 h-6 w-6 ${!isDrawerOpen && "hidden"}`}
        />

        <TASKLY className="mt-3 h-6 w-40.25" />
      </div>

      {!isDrawerOpen && <Avatar name={generateNameAvatar(user?.name ?? "")} />}

      <CloseIcon
        onClick={() => setIsDrawerOpen((prev) => !prev)}
        className={`mt-3 h-6 w-6 ${!isDrawerOpen && "hidden"}`}
      />
    </div>
  );
}

export default MobileNav;
