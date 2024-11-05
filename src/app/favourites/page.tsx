"use client";

import { getFavouriteMemesAction, toggleFavouritesAction } from "@/actions";
import MemeImage from "@/components/meme-image";
import ToggleFavourite from "@/components/toggle-favourite";
import type { Meme } from "@/types";
import cn from "@/utils/cn";
import { Suspense, useEffect, useState } from "react";

export default function Favourites() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [justRemovedFromFav, setJustRemovedFromFav] = useState<{
    memeID: string;
    justRemoved: boolean;
  }>({
    memeID: "",
    justRemoved: false,
  });

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await getFavouriteMemesAction();
      setMemes(response);
      setLoaded(true);
    };

    fetchFavourites();
  }, []);

  const handleRemoveFromFavourite = (publicID: string): void => {
    toggleFavouritesAction(publicID);
    setJustRemovedFromFav({ memeID: publicID, justRemoved: true });
  };

  useEffect(() => {
    if (justRemovedFromFav.justRemoved) {
      const freshFavourites = memes.filter(
        (meme) => meme.public_id !== justRemovedFromFav.memeID,
      );
      setMemes(freshFavourites);

      setJustRemovedFromFav({
        memeID: "",
        justRemoved: false,
      });
    }
  }, [memes, justRemovedFromFav]);

  return (
    <main className="mt-[7rem] px-[10%] flex flex-col items-center gap-8 w-full min-h-[calc(100dvh-15rem)] mb-[2rem]">
      <h1 className="text-[2.5rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] max-sm:text-base text-pretty font-bold text-center w-11/12 lg:w-3/4">
        My Favourites
      </h1>
      {memes.length === 0 && loaded ? (
        <div className="w-full flex flex-col items-center gap-4">
          <h2 className="font-bold text-xl">Empty 🙃</h2>
          <p className="text-base text-center">
            No meme added to favourites yet.
            <br />
            Search memes you like or frequently use and ❤️ them.
          </p>
        </div>
      ) : (
        <div className="w-full columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
          <Suspense fallback={<p>Loading...</p>}>
            {memes.map((meme: Meme) => (
              <div
                className={cn(
                  "h-max overflow-hidden relative",
                  `w-[${meme.width / 1.4}px]`,
                )}
                key={meme.public_id}
              >
                <ToggleFavourite
                  meme={meme}
                  handleRemoveFromFavourite={handleRemoveFromFavourite}
                />
                <MemeImage
                  secure_url={meme.secure_url}
                  width={meme.width}
                  height={meme.height}
                />
              </div>
            ))}
          </Suspense>
        </div>
      )}
    </main>
  );
}
