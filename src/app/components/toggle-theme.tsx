"use client";

import { useEffect, useState, type FC } from "react";
import cn from "@/utils/cn";
import { useTheme } from "next-themes";

type Props = {
  classNameProp: string;
};

const ToggleTheme: FC<Props> = ({ classNameProp }) => {
  const [mounted, setMouted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  
  useEffect(() => setMouted(true), []);
  
  const handleThemeToggle = () => {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  };
  
  const themeClass = mounted
    ? resolvedTheme === "dark"
      ? "justify-end bg-white"
      : "justify-start bg-black"
    : "";

  return (
    <>
      <button
        aria-label="toggle theme"
        type="button"
        onClick={handleThemeToggle}
        className={cn(
          "flex items-center w-8 h-4 px-1 py-[0.5px] rounded-2xl transition-all duration-300",
          classNameProp,
          themeClass
        )}
      >
        <span className="block w-3 h-3 bg-blue-deep rounded-full" />
      </button>
    </>
  );
};

export default ToggleTheme;
