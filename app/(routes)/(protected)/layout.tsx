"use client";
import BottomNavBar from "@/components/features/layout/components/BottomNavBar";
import MobileNav from "@/components/features/layout/components/MobileNav";
import MobileSidebarDrawer from "@/components/features/layout/components/MobileSidebarDrawer";
import Navbar from "@/components/features/layout/components/Navbar";
import Sidebar from "@/components/features/layout/components/Sidebar";
import { ReactNode, useState } from "react";

function ProtectedLayout({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />
        <MobileNav
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        <MobileSidebarDrawer isDrawerOpen={isDrawerOpen} />
        {children}
      </div>

      <BottomNavBar />
    </div>
  );
}

export default ProtectedLayout;
