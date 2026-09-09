"use client";
import Button from "@/components/ui/Button";
import Logo from "../icons/Logo.svg";
import Input from "@/components/ui/Input";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>("");

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // Dynamic error state handling
    if (!inputValue.includes("@")) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(null); // Clear error state when valid
    }
  };
  return (
    <div className="p-6">
      Welcome To Rafiq
      <Logo className="h-6 w-6 text-blue-500" />
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ maxWidth: "300px", margin: "2rem auto" }}
      >
      
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
