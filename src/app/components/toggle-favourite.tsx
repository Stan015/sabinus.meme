"use client";

import type { Meme } from "@/types";

import { toggleFavouritesAction } from "@/actions";
import { MdiHeart, MdiHeartOutline } from "@/(icons)/icons";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  username: string | null;
  meme: Meme;
  handleRemoveFromFavourite?: (publicID: string) => void;
};

const ToggleFavourite = memo(function ToggleFavourite({
  username,
  meme,
  handleRemoveFromFavourite,
}: Props) {
  const [isFavourite, setIsFavourite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (username) {
      setIsFavourite(() => meme.tags.includes(`favourite-${username}`));
    }
  }, [username, meme]);

  const handleToggleFavourite = async () => {
    if (!username) {
      router.push("/login");
      toast.error("You need to log in to add favourites!");
      return;
    }

    try {
      if (handleRemoveFromFavourite) {
        handleRemoveFromFavourite?.(meme.public_id);
      } else {
        toggleFavouritesAction(meme.public_id, isFavourite);
      }
      setIsFavourite((prev) => !prev);
      toast.success(
        isFavourite
          ? "Removed from favourites successfully!"
          : "Added to favourites successfully!",
      );
    } catch (error) {
      console.error("Failed to toggle favourite:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <button
        className="absolute z-10 w-8 h-8 max-md:w-6 max-md:h-6 right-3 top-3"
        type="button"
        aria-label="toggle favourites"
        onClick={handleToggleFavourite}
      >
        {isFavourite ? (
          <MdiHeart className="text-red-500 w-full h-full hover:text-blue transition-all" />
        ) : (
          <MdiHeartOutline className="w-full h-full text-blue hover:text-red-500 transition-all" />
        )}
      </button>
    </>
  );
});

export default ToggleFavourite;
