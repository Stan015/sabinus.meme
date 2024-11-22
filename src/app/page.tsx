"use client";

import Image from "next/image";
// import { memes } from "../data/data.json";
import MemeImage from "./components/meme-image";
import ToggleFavourite from "./components/toggle-favourite";
import cn from "./utils/cn";
import { getUsernameFromCookie, searchMemesAction } from "./actions";
import { useEffect, useState } from "react";

type Meme = {
  public_id: string;
  secure_url: string;
  // expression: string[];
  width: number;
  height: number;
  tags: string[];
};

function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [memes, setMemes] = useState<Meme[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    (async () => {
      const result = await getUsernameFromCookie();
      setUsername(result);
    })();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setTag(inputValue);
    }, 500);
    
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    setMemes([]);
    fetchMemes(tag);
  }, [tag]);

  const fetchMemes = async (tag?: string, cursor?: string) => {
    setLoading(true);
    
    try {
      const { resources, nextCursor } = await searchMemesAction(tag, cursor);
      if (resources.length) {
        setMemes((prev) => [...prev, ...resources]);
        setNextCursor(nextCursor);
      } else {
        console.log("No more memes to fetch.");
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex flex-col w-full min-h-[calc(100dvh-9.5rem)] mt-[6rem] items-center px-[10%] mb-20">
        <section className="w-full flex flex-col items-center gap-10 max-sm:gap-5 mt-6 mb-[3.5rem] max-sm:mb-[2rem]">
          <h1 className="text-[2.5rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] max-sm:text-base text-pretty font-bold text-center w-11/12 lg:w-3/4">
            Sabinus Memes Library. Search, download, upload, share and laugh
            with me!
          </h1>
          <input
            className="w-3/4 h-14 max-sm:w-full max-sm:h-10 px-10 max-md:px-5 max-sm:px-3 max-sm:text-[0.7rem] max-md:text-base bg-gray-100 rounded-full flex border hover:border-blue-400 text-clr-light dark:text-clr-light transition-all border-white hover:border-blue text-md ring-offset-blue-deep ring-offset-[0.6px] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search memes by description, expression or keywords. E.g, investor's vibe, crying, laughing, in trouble..."
            onChange={(e) => setInputValue(e.target.value)}
          />
        </section>
        <div className="w-full columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
          {memes.map((meme: Meme) => (
            <div
              className={cn(
                "h-max overflow-hidden relative",
                `w-[${meme.width / 1.4}px]`,
              )}
              key={meme.public_id}
            >
              <ToggleFavourite meme={meme} username={username} />
              <MemeImage
                secure_url={meme.secure_url}
                width={meme.width}
                height={meme.height}
              />
            </div>
          ))}
        </div>
        <button
          className="w-[15rem] px-6 py-4 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] font-bold rounded-xl mt-10"
          type="button"
          onClick={() => {
            if (nextCursor) fetchMemes(tag, nextCursor as string)
          }}
          disabled={loading}
        >
          {loading ? "loading..." : "Load more memes"}
        </button>
      </main>
    </>
  );
}

export default Home;
