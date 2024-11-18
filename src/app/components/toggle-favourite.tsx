"use client";

import type { Meme } from "@/types";

import { toggleFavouritesAction } from "@/actions";
import { MdiHeart, MdiHeartOutline } from "@/(icons)/icons";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  username: string | null;
  meme: Meme;
  handleRemoveFromFavourite?: (publicID: string) => void;
};

const ToggleFavourite = memo(function ToggleFavourite ({ username, meme, handleRemoveFromFavourite }: Props) {
  const [isFavourite, setIsFavourite] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (username) {
      setIsFavourite(() => meme.tags.includes(`favourite-${username}`));
    } 
  }, [username, meme])

  const handleToggleFavourite = async () => {      
    if (username && handleRemoveFromFavourite) {
      handleRemoveFromFavourite?.(meme.public_id);
      setTimeout(() => {
        setIsFavourite((prev) => !prev);
      }, 1500);
    } else if (username) {
      toggleFavouritesAction(meme.public_id, isFavourite);
      setTimeout(() => {
        setIsFavourite((prev) => !prev);
      }, 1500);
    } else {
      router.push("/login")
    }
  };

  return (
    <button
      className="absolute z-10 w-8 h-8 max-md:w-6 max-md:h-6 right-3 top-3"
      type="button"
      title="add to favourites"
      onClick={handleToggleFavourite}
    >
      {isFavourite ? (
        <MdiHeart className="text-red-500 w-full h-full hover:text-blue-500 transition-all" />
      ) : (
        <MdiHeartOutline className="w-full h-full text-blue hover:text-red-500 transition-all" />
      )}
    </button>
  );
});

export default ToggleFavourite;
