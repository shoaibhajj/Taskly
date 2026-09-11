import LoginForm from "@/components/features/auth/login/LoginForm";
import Header from "@/components/ui/Header";
import React from "react";

const SignUp = () => {
  return (
    <div className="bg-background container mb-36.75 h-screen w-full px-6">
      <Header />
      <LoginForm />
    </div>
  );
};

export default SignUp;
