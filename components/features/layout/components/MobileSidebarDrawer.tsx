import React from "react";
import SidebarNavContent from "./SidebarNavContent";
import { useLogout } from "../../auth/hooks/useLogout";

function MobileSidebarDrawer({ isDrawerOpen }: { isDrawerOpen: boolean }) {
  const { logout, isLoggingOut } = useLogout();
  return (
    <div>
      {isDrawerOpen && (
        <div className="fixed z-10 h-full w-full bg-white">
          <SidebarNavContent
            isCollapsed={false}
            logout={logout}
            isLoggingOut={isLoggingOut}
          />
        </div>
      )}
    </div>
  );
}

export default MobileSidebarDrawer;
