"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../../context/auth-context";
import { MdiUser } from "@/(icons)/icons";

export default function Header() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <header className="flex w-full h-[6rem] justify-between items-center px-[10%]">
        <Link href={"/"}>
          <Image
            className="w-full h-full"
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={40}
            priority
          />
        </Link>

        <nav className="flex gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/upload"}>Upload</Link>
          <Link href={"/favourites"}>Favourites</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>

        {!isLoggedIn ? (
          <nav className="flex gap-6">
            <Link href={"/login"}>Login</Link>
            <Link href={"/sign-up"}>Sign Up</Link>
          </nav>
        ) : (
          <Link
            href={"/dashboard"}
            className="group w-12 h-12 p-1 rounded-full border-2 border-blue-500"
          >
            <MdiUser className="w-full h-full text-black group-hover:text-blue-500" />
          </Link>
        )}
      </header>
    </>
  );
}
