"use client";

import { getFavouriteMemesAction, toggleFavouritesAction } from "@/actions";
import MemeImage from "@/components/meme-image";
import ToggleFavourite from "@/components/toggle-favourite";
import { Meme } from "@/types";
import { Suspense, useEffect, useState } from "react";

export default function Favourites() {
  const [memes, setMemes] = useState<Meme[]>([]);
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
        (meme) => meme.public_id !== justRemovedFromFav.memeID
      );
      setMemes(freshFavourites);

      setJustRemovedFromFav({
        memeID: "",
        justRemoved: false,
      });
    }
  }, [memes, justRemovedFromFav]);

  return (
    <section className="w-full px-[10%] flex flex-col items-center gap-10 mt-6">
      <h1 className="text-[2.5rem] font-bold text-center w-3/4">
        My Favourites
      </h1>
      <main className="flex flex-col w-full items-center my-20">
        {memes.length === 0 ? (<div className="w-full flex flex-col items-center gap-4">
            <h2 className="font-bold text-xl">Empty 🙃</h2>
            <p className="text-base text-center">No meme added to favourites yet.<br />Search memes you like or frequently use and ❤️ them.</p>
            </div>) : (<div className="w-full columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
          <Suspense fallback={<p>Loading...</p>}>
            {memes.map((meme: Meme) => (
              <div
                className={`w-[${
                  meme.width / 1.4
                }px] h-max overflow-hidden relative`}
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
        </div>)}
      </main>
    </section>
  );
}
