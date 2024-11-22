"use client";

import { PhShareFatBold } from "@/(icons)/icons";
import cn from "@/utils/cn";

export default function ShareMeme({ newClassName }: { newClassName: string }) {
  return (
    <button
      type="button"
      aria-label="share meme"
      className={cn("w-8 h-8 max-md:w-6 max-md:h-6", newClassName)}
    >
      <PhShareFatBold className="w-full h-full" />
    </button>
  );
}
