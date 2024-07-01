"use client";

import type { Meme } from "@/types";

import { toggleFavouritesAction } from "@/actions";
import { MdiHeart, MdiHeartOutline } from "@/icons";
import { FC } from "react";
import { useRouter } from "next/router";

type Props = {
  meme: Meme;
};

const ToggleFavourite: FC<Props> = ({ meme }) => {
  const isFavourite = meme.tags?.includes("favourite");

  return (
    <button
      className="absolute z-10 w-8 h-8 max-md:w-6 max-md:h-6 right-3 top-3"
      type="button"
      title="add to favourites"
      onClick={() => toggleFavouritesAction(meme.public_id, isFavourite)}
    >
      {isFavourite ? (
        <MdiHeart className="text-red-500 w-full h-full hover:text-blue-500 transition-all" />
      ) : (
        <MdiHeartOutline className="w-full h-full text-blue-500 hover:text-red-500 transition-all" />
      )}
    </button>
  );
};

export default ToggleFavourite;
