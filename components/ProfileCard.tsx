"use client";

import { useUser } from "@clerk/nextjs";

export default function ProfileCard() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return <div className="text-red-500">You are not signed in!</div>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold">Hello, {user.firstName}!</h3>
      <p>Email: {user.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
