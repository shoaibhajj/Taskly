"use client";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Navbar() {
  const { error, isLoading, user } = useCurrentUser();

  if (isLoading) return <p>Loading...</p>;
  if (error?.message) return <p>{error.message}</p>;

  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.department}</p>
    </div>
  );
}

export default Navbar;
