import RegistrationForm from "@/components/features/auth/signup/RegistrationForm";
import Header from "@/components/ui/Header";
import React from "react";

const SignUp = () => {
  return (
    <div className="bg-background container mb-36.75 h-screen w-full px-6">
      <Header />
      <RegistrationForm />
    </div>
  );
};

export default SignUp;
