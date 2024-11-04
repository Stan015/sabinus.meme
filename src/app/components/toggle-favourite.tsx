"use client";

import type { Meme } from "@/types";
import type { FC } from "react";

import { toggleFavouritesAction } from "@/actions";
import { MdiHeart, MdiHeartOutline } from "@/(icons)/icons";
import { useState } from "react";

type Props = {
  meme: Meme;
  handleRemoveFromFavourite?: (publicID: string) => void;
};

const ToggleFavourite: FC<Props> = ({ meme, handleRemoveFromFavourite }) => {
  const isFavourite = meme.tags?.includes("favourite");
  const [toggleIsFavourite, setToggleIsFavourite] = useState(isFavourite);

  return (
    <button
      className="absolute z-10 w-8 h-8 max-md:w-6 max-md:h-6 right-3 top-3"
      type="button"
      title="add to favourites"
      onClick={() => {
        if (handleRemoveFromFavourite) {
          handleRemoveFromFavourite?.(meme.public_id);
          setTimeout(() => {
            setToggleIsFavourite((prev) => !prev);
          }, 1500);
        } else {
          toggleFavouritesAction(meme.public_id, isFavourite);
          setTimeout(() => {
            setToggleIsFavourite((prev) => !prev);
          }, 1500);
        }
      }}
    >
      {toggleIsFavourite ? (
        <MdiHeart className="text-red-500 w-full h-full hover:text-blue-500 transition-all" />
      ) : (
        <MdiHeartOutline className="w-full h-full text-blue hover:text-red-500 transition-all" />
      )}
    </button>
  );
};

export default ToggleFavourite;
