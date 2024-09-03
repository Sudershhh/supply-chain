"use client";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

function Header() {
  const { isSignedIn } = useUser();
  return (
    <header className="flex items-center justify-between p-3 bg-white sticky top-0">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.svg"
          width={30}
          height={30}
          className="object-cover"
          alt="Logo - Supply Chain"
        />
        <h1 className="font-bold text-xl">Invoice AI</h1>
      </Link>

      <div className="flex items-center justify-around w-1/6">
        <Link href="/dashboard">
          <Button size={"sm"}>Dashboard</Button>
        </Link>

        <UserButton />

        {!isSignedIn && (
          <SignInButton forceRedirectUrl="/dashboard">
            <Button size={"sm"}>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </header>
  );
}

export default Header;
