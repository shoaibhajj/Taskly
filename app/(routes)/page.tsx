"use client";
import Logo from "../icons/Logo.svg";


export default function Home() {
  
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
