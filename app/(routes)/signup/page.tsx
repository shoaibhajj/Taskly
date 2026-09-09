import RegistrationForm from "@/components/features/auth/signup/RegistrationForm";
import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import React from "react";

const SignUp = () => {
  return (
    <div className="container px-6 bg-background h-screen w-full ">
      <Header />
      <RegistrationForm />
    </div>
  );
};

export default SignUp;
