"use client";
import Button from "@/components/ui/Button";
import { useState } from "react";
import Logo from "@/app/icons/Logo.svg";
import StatisticsIcon from "@/app/icons/StatisticsIcon.svg";
import ProjectsIcon from "@/app/icons/CollapseIcon.svg";
import CollapseIcon from "@/app/icons/CollapseIcon.svg";
import LogoutIcon from "@/app/icons/LogoutIcon.svg";
import ProjectsIconActual from "@/app/icons/ProjectsIcon.svg";
import { useLogout } from "../../auth/hooks/useLogout";

function Sidebar() {
  const { logout, isLoggingOut } = useLogout();
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <div
      className={`bg-surface-low hidden h-screen flex-col justify-between p-6 transition-all duration-300 md:flex ${
        isCollapsed ? "w-18" : "w-[256px]"
      }`}
    >
      <div>
        {/* Logo Section */}
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
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
      </div>

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

        <div className={`flex ${isCollapsed ? "justify-center" : ""}`}>
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
    </div>
  );
}

export default Sidebar;
