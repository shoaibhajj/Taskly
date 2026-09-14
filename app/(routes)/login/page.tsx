import LoginForm from "@/components/features/auth/login/components/LoginForm";
import Header from "@/components/shared/Header";
import React from "react";

const LogIn = () => {
  return (
    <div className="bg-background container mb-36.75 h-screen w-full px-6">
      <Header />
      <LoginForm />
    </div>
  );
};

export default LogIn;
