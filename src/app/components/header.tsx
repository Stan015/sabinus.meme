"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../../context/auth-context";
import { MdiUser } from "@/(icons)/icons";
import ToggleTheme from "@/components/toggle-theme";

export default function Header() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <header className="flex fixed z-30 bg-gradient-to-b from-clr-light-start-rgb to-clr-light-end-rgb dark:from-clr-dark-start-rgb dark:to-clr-dark-end-rgb text-clr-light dark:text-clr-dark top-0 w-full h-[6rem] justify-between items-center px-[10%]">
        <Link href={"/"} aria-label="logo">
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
          <Link href={"/"} className="border-b-2 border-b-transparent hover:border-b-blue px-2 rounded-full transition-all">Home</Link>
          <Link href={"/upload"} className="border-b-2 border-b-transparent hover:border-b-blue px-2 rounded-full transition-all">Upload</Link>
          <Link href={"/favourites"} className="border-b-2 border-b-transparent hover:border-b-blue px-2 rounded-full transition-all">Favourites</Link>
          <Link href={"/contact"} className="border-b-2 border-b-transparent hover:border-b-blue px-2 rounded-full transition-all">Contact</Link>
        </nav>

        <div className="flex flex-col h-full relative items-center justify-center">
          <ToggleTheme classNameProp="absolute top-[3px]" />

          {!isLoggedIn ? (
            <nav className="flex gap-6">
              <Link href={"/login"} className="border-b-2 border-b-transparent hover:border-b-blue px-2 rounded-full transition-all">Login</Link>
              <Link href={"/sign-up"} className="border-b-2 border-b-transparent hover:border-b-blue px-2 rounded-full transition-all">Sign Up</Link>
            </nav>
          ) : (
            <Link
              href={"/dashboard"}
              className="group w-12 h-12 p-1 rounded-full border-2 border-blue hover:border-blue-deep transition-all"
            >
              <MdiUser className="w-full h-full text-clr-light dark:text-clr-dark group-hover:text-blue-500" />
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
