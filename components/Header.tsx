// app/components/Header.tsx

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import Image from "next/image";
function Header() {
  return (
    <header className="flex items-center justify-between p-3 bg-white">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={"/logo.svg"}
          width={30}
          height={30}
          objectFit="cover"
          alt="Logo - Supply Chain"
        />
        <h1 className="font-bold text-xl">Didero</h1>
      </Link>

      <div className="flex items-center space-x-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
