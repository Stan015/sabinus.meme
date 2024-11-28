"use client";

import { signOut } from "@/(authentication)/auth";
import { EosIconsThreeDotsLoading } from "@/(icons)/icons";
import { getUsernameFromCookie, fetchUserUploadsAction } from "@/actions";
import { Button } from "@/components/button";
import DownloadMeme from "@/components/download-meme";
import LoadingImage from "@/components/loadImageSkeleton";
import MemeImage from "@/components/meme-image";
import ShareMeme from "@/components/share-meme";
import ToggleFavourite from "@/components/toggle-favourite";
import type { Meme } from "@/types";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [typeOfMeme, setTypeOfMeme] = useState<string>("sabinus");
  const [greeting, setGreeting] = useState("Good Morning!");
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
    fetchMemes(username as string, typeOfMeme);
  }, [username, typeOfMeme]);

  const fetchMemes = async (username: string, typeOfMeme: string, cursor?: string) => {
    setLoading(true);

    try {
      const { resources, nextCursor } = await fetchUserUploadsAction(username, typeOfMeme, cursor);
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
  
  const handleSignOut = async () => {
    const response = await signOut();

    if (response.error) {
      console.error(response.error);
      router.push("/error");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const handleGreetings = () => {
      const hours = new Date().getHours();

      if (hours >= 5 && hours < 12) {
        setGreeting("Good Morning!");
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Good Afternoon!");
      } else if (hours >= 18 && hours < 22) {
        setGreeting("Good Evening!");
      } else {
        setGreeting("Good Night!");
      }
    };

    handleGreetings();
  }, []);

  return (
    <main className="mt-[7rem] px-[10%] flex flex-col gap-8 w-full min-h-[calc(100dvh-15rem)] mb-[2rem]">
      <div className="w-full flex gap-3 justify-between max-sm:justify-center max-sm:flex-col flex-wrap items-center">
        <h1 className="text-[1.5rem] font-bold">My Dashboard</h1>
        <p className="text-base">{greeting} How&#39;s the family?</p>
      </div>
      <div className="flex gap-4 items-center w-max self-center justify-between">
        <button
          type="button"
          aria-label="upload sabinus's memes"
          onClick={() => setTypeOfMeme("sabinus")}
          className={cn(
            "text-center text-[1.2rem] max-sm:text-[0.9rem] whitespace-nowrap border-b-2 border-b-white dark:border-b-[#344054] hover:-translate-y-1 hover:translate-x-1 px-3 rounded-3xl transition-all",
            {
              "bg-blue text-white border-b-transparent dark:border-b-transparent":
                typeOfMeme === "sabinus",
            },
          )}
        >
          Sabinus Uploads
        </button>
        <button
          type="button"
          aria-label="upload other memes"
          onClick={() => setTypeOfMeme("others")}
          className={cn(
            "text-center text-[1.2rem] max-sm:text-[0.9rem] whitespace-nowrap border-b-2 border-b-white dark:border-b-[#344054] hover:-translate-y-1 hover:translate-x-1 px-3 rounded-3xl transition-all",
            {
              "bg-blue text-white border-b-transparent dark:border-b-transparent":
                typeOfMeme === "others",
            },
          )}
        >
          Other Uploads
        </button>
      </div>
      <section className="w-full columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
        {loading && !nextCursor ? (
          <LoadingImage />
        ) : (
          memes.map((meme: Meme) => (
            <div
              className={cn(
                "h-max overflow-hidden relative",
                `w-[${meme.width / 1.4}px]`,
              )}
              key={meme.public_id}
            >
              <DownloadMeme
                fileUrl={meme.secure_url}
                newClassName="absolute text-blue left-3 top-3 hover:text-red-500 transition-all"
              />
              <ToggleFavourite meme={meme} username={username} />
              <MemeImage
                secure_url={meme.secure_url}
                width={meme.width}
                height={meme.height}
              />
              <ShareMeme
                imageId={meme.public_id}
                newClassName="absolute bottom-3 right-3 text-blue hover:text-red-500 transition-all"
              />
            </div>
          ))
        )}
      </section>
      <Button
        className="w-[15rem] px-6 py-4 bg-blue hover:bg-blue-deep self-center transition-all text-white text-[1.2rem] font-bold rounded-xl"
        type="button"
        onClick={() => {
          if (nextCursor) fetchMemes(username as string, typeOfMeme, nextCursor as string);
        }}
        disabled={loading}
      >
        {loading ? (
          <span className="flex gap-1 w-full items-center justify-center">
            loading <EosIconsThreeDotsLoading className="w-[2rem] h-[2rem]" />
          </span>
        ) : (
          "Load more memes"
        )}
      </Button>
      <div className="flex w-full gap-2 justify-between items-center mt-7">
        <Button type="button" onClick={handleSignOut} className="w-max text-base  whitespace-nowrap">
          Sign Out
        </Button>
        <p className="text-base max-sm:text-[0.8rem]">Username: {username}</p>
      </div>
    </main>
  );
};

export default Dashboard;
