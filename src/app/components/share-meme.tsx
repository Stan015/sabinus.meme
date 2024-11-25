"use client";

import { PhShareFatBold } from "@/(icons)/icons";
import cn from "@/utils/cn";
import { toast } from "react-toastify";

export default function ShareMeme({
  imageId,
  newClassName,
}: {
  imageId: string;
  newClassName: string;
}) {
  const handleShare = async () => {
    const url = `${window.location.origin}/meme/${imageId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard! Share it on socials!");
    } catch (error) {
      toast.error("Failed to copy the link.");
      console.error("Error copying link:", (error as Error).message);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        type="button"
        aria-label="share meme"
        className={cn("w-8 h-8 max-md:w-6 max-md:h-6", newClassName)}
      >
        <PhShareFatBold className="w-full h-full" />
      </button>
    </>
  );
}
