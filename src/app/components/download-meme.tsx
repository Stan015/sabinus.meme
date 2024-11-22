"use client";

import { EvaCloudDownloadOutline } from "@/(icons)/icons";
import cn from "@/utils/cn";

export default function DownloadMeme({
  newClassName,
}: {
  newClassName: string;
}) {
  return (
    <button
      type="button"
      aria-label="download meme button"
      className={cn("w-8 h-8 max-md:w-6 max-md:h-6", newClassName)}
    >
      <EvaCloudDownloadOutline className="w-full h-full" />
    </button>
  );
}
