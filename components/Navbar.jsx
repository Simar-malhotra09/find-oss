"use client";

import Link from "next/link";
import backgroundImage from "app/assets/backgroundImage.jpeg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full mt-2 py-0 ">
      <Link href="/" className="flex items-center gap-2">
        <Image
          className="object-contain rounded-full"
          width={30}
          height={30}
          alt="hello"
          src={backgroundImage}
        />
        <p className="text-xl font-semibold text-gray-800">Find-OSS</p>
      </Link>
    </nav>
  );
};

export default Navbar;
