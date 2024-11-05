"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../../context/auth-context";
import {
  MdiUser,
  MarketeqMenuAlt,
  LineMdMenuToCloseTransition,
} from "@/(icons)/icons";
import ToggleTheme from "@/components/toggle-theme";
import { useState } from "react";
import cn from "@/utils/cn";

export default function Header() {
  const { isLoggedIn } = useAuthContext();
  const [menuExpanded, setMenuExpanded] = useState(false);

  const handleToggleMenu = () =>
    setMenuExpanded((menuExpanded) => !menuExpanded);

  return (
    <>
      <header
        className={cn(
          "flex fixed z-30 bg-gradient-to-b from-clr-light-start-rgb to-clr-light-end-rgb dark:from-clr-dark-start-rgb dark:to-clr-dark-end-rgb text-clr-light dark:text-clr-dark top-0 w-full h-[6rem] justify-between items-center px-[10%] transition-all duration-700",
          {
            "max-md:min-h-dvh max-md:flex-col max-md:items-end max-md:justify-start max-md:gap-14":
              menuExpanded,
          },
        )}
      >
        <div className="flex gap-4 max-md:w-[80%] items-center justify-between max-md:h-[6rem] max-md:top-0 max-md:fixed">
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

          <button
            onClick={handleToggleMenu}
            className="hidden transition-all rounded-full border border-transparent hover:border-blue-deep p-[5px] max-md:flex place-items-center"
            type="button"
            aria-label="toggle menu"
            aria-expanded={menuExpanded ? "true" : "false"}
          >
            {!menuExpanded ? (
              <MarketeqMenuAlt className="w-[2.8rem] h-[2.8rem]" />
            ) : (
              <LineMdMenuToCloseTransition className="w-[2.8rem] h-[2.8rem] text-blue" />
            )}
          </button>
        </div>

        <nav
          className={cn("flex gap-6 max-md:hidden", {
            "max-md:flex max-md:flex-col max-md:w-[7rem] max-md:mt-[6.5rem]":
              menuExpanded,
          })}
        >
          <Link
            href={"/"}
            className="max-md:text-center border-b-2 border-b-transparent max-md:border-b-white dark:max-md:border-b-[#344054] hover:!border-b-blue px-2 rounded-full transition-all"
          >
            Home
          </Link>
          <Link
            href={"/upload"}
            className="max-md:text-center border-b-2 border-b-transparent max-md:border-b-white dark:max-md:border-b-[#344054] hover:!border-b-blue px-2 rounded-full transition-all"
          >
            Upload
          </Link>
          <Link
            href={"/favourites"}
            className="max-md:text-center border-b-2 border-b-transparent max-md:border-b-white dark:max-md:border-b-[#344054] hover:!border-b-blue px-2 rounded-full transition-all"
          >
            Favourites
          </Link>
          <Link
            href={"/contact"}
            className="max-md:text-center border-b-2 border-b-transparent max-md:border-b-white dark:max-md:border-b-[#344054] hover:!border-b-blue px-2 rounded-full transition-all"
          >
            Contact
          </Link>
        </nav>

        <div
          className={cn(
            "flex flex-col h-full relative items-center justify-center max-md:hidden",
            {
              "max-md:flex max-md:h-[14rem]": menuExpanded,
            },
          )}
        >
          <ToggleTheme classNameProp="absolute top-[3px]" />

          {!isLoggedIn ? (
            <nav className="flex max-md:flex-col max-md:w-[7rem] gap-6">
              <Link
                href={"/login"}
                className="max-md:text-center border-b-2 border-b-transparent max-md:border-b-white dark:max-md:border-b-[#344054] hover:!border-b-blue px-2 rounded-full transition-all"
              >
                Login
              </Link>
              <Link
                href={"/sign-up"}
                className="max-md:text-center border-b-2 border-b-transparent max-md:border-b-white dark:max-md:border-b-[#344054] hover:!border-b-blue px-2 rounded-full transition-all"
              >
                Sign Up
              </Link>
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
