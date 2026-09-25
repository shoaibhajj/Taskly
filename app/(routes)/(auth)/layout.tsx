import Header from "@/components/shared/Header";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="bg-slate-50 container mb-36.75 h-screen w-full px-6">
      <Header />
      {children}
    </div>
  );
};
export default AuthLayout;
