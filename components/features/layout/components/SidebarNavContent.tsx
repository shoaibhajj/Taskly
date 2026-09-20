"use client";
import React, { useState } from "react";
import CurrentActiveProjectLinks from "./ActiveProjectDropdown";
import Logo from "@/app/icons/Logo.svg";
import StatisticsIcon from "@/app/icons/StatisticsIcon.svg";
import ProjectsIconActual from "@/app/icons/ProjectsIcon.svg";
import Button from "@/components/ui/Button";
import LogoutIcon from "@/app/icons/LogoutIcon.svg";
function SidebarNavContent({
  isCollapsed,
  logout,
  isLoggingOut,
}: {
  isCollapsed: boolean;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}) {
  const [activeLink, setActiveLink] = useState("projects");

  const getLinkClass = (linkName: string) => {
    const isActive = activeLink === linkName;
    return `flex items-center justify-start gap-3 py-2.5 cursor-pointer rounded-lg transition-all ${
      isCollapsed ? "justify-center px-0" : "px-3"
    } ${isActive ? "bg-primary-light/10 text-primary" : "text-slate-dark hover:bg-slate-100"}`;
  };

  const getIconClass = (linkName: string) => {
    return activeLink === linkName
      ? "fill-primary text-primary h-4 w-fit"
      : "text-slate-dark h-4 w-fit";
  };
  return (
    <div>
      <div
        className={`items-center ${isCollapsed ? "justify-center" : ""} hidden md:flex `}
      >
        <Logo className="h-7 w-50.75" />
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <div
          className={getLinkClass("projects")}
          onClick={() => setActiveLink("projects")}
        >
          <ProjectsIconActual className={getIconClass("projects")} />
          {!isCollapsed && <p className="font-medium">Projects</p>}
        </div>

        <div
          className={getLinkClass("statistics")}
          onClick={() => setActiveLink("statistics")}
        >
          <StatisticsIcon className={getIconClass("statistics")} />
          {!isCollapsed && <p className="font-medium">My Statistics</p>}
        </div>
      </div>
      <hr className="text-slate-light" />
      <CurrentActiveProjectLinks isCollapsed={isCollapsed} />

      <div
        className={` ${isCollapsed ? "justify-center" : ""} fixed bottom-3 px-3 py-2.5 md:hidden`}
      >
        <Button
          variant="ghost"
          onClick={logout}
          disabled={isLoggingOut}
          className="text-error flex w-full gap-3"
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
  );
}

export default SidebarNavContent;
