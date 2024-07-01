"use client";

import { getFavouriteMemesAction } from "@/actions";
import MemeImage from "@/components/meme-image";
import ToggleFavourite from "@/components/toggle-favourite";
import { Meme } from "@/types";
import { Suspense, useEffect, useState } from "react";

export default function Favourites() {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await getFavouriteMemesAction();
      setMemes(response);
    };

    fetchFavourites();
  }, []);

  return (
    <section className="w-full px-[10%] flex flex-col items-center gap-10 mt-6">
      <h1 className="text-[2.5rem] font-bold text-center w-3/4">
        My Favourites
      </h1>
      <main className="flex flex-col w-full items-center my-20">
        <div className="w-full columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
          <Suspense fallback={<p>Loading...</p>}>
            {memes.map((meme: Meme) => (
              <div
                className={`w-[${
                  meme.width / 1.4
                }px] h-max overflow-hidden relative`}
                key={meme.public_id}
              >
                <ToggleFavourite meme={meme} />
                <MemeImage
                  secure_url={meme.secure_url}
                  width={meme.width}
                  height={meme.height}
                />
              </div>
            ))}
          </Suspense>
        </div>
      </main>
    </section>
  );
}
