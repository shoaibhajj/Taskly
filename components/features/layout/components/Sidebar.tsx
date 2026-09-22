"use client";
import Button from "@/components/ui/Button";
import { useState } from "react";
import CollapseIcon from "@/app/icons/CollapseIcon.svg";
import LogoutIcon from "@/app/icons/LogoutIcon.svg";
import { useLogout } from "../../auth/hooks/useLogout";
import SidebarNavContent from "./SidebarNavContent";
function Sidebar() {
  const { logout, isLoggingOut } = useLogout();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-surface-low hidden h-screen flex-col justify-between p-6 transition-all duration-300 md:flex ${
        isCollapsed ? "w-18" : "w-[256px]"
      }`}
    >
      <SidebarNavContent
        isCollapsed={isCollapsed}
        logout={logout}
        isLoggingOut={isLoggingOut}
      />

      <div className="flex flex-col items-stretch justify-center gap-2">
        <div className={`flex ${isCollapsed ? "justify-center" : ""}`}>
          <Button
            variant="ghost"
            className="text-slate-dark flex w-full gap-3"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <CollapseIcon
              className={`text-slate-dark h-5 w-5.25 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
            {!isCollapsed && <p className="text-slate-dark">Collapse</p>}
          </Button>
        </div>

        <div
          className={` ${isCollapsed ? "justify-center" : ""} hidden md:flex`}
        >
          <Button
            variant="ghost"
            onClick={logout}
            disabled={isLoggingOut}
            className="text-error flex gap-3"
          >
            <LogoutIcon className="text-error h-5 w-5.25" />
            {!isCollapsed && (
              <p className="text-error">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
