"use client";
import BottomNavBar from "@/components/features/layout/components/BottomNavBar";
import MobileNav from "@/components/features/layout/components/MobileNav";
import Navbar from "@/components/features/layout/components/Navbar";
import Sidebar from "@/components/features/layout/components/Sidebar";
import { ReactNode } from "react";

function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <div className="flex">
        <Sidebar />
        <Navbar />
      </div>
      <MobileNav />
      <BottomNavBar/>
      {children}
    </div>
  );
}

export default ProtectedLayout;
