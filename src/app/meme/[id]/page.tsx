/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { getSingleMemeAction } from "@/actions";
import DownloadMeme from "@/components/download-meme";
import ShareMeme from "@/components/share-meme";
import ToggleFavourite from "@/components/toggle-favourite";
import type { Meme } from "@/types";
import { fetchUsername } from "@/utils/fetchUsername";
import type { Metadata } from "next";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";
import Link from "next/link";

type PageParams = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const origin = ((await headers()) as unknown as UnsafeUnwrappedHeaders).get(
    "origin",
  );

  const memeId = (await params).id;

  const meme = {
    id: memeId,
    title: "Check out this Sabinus meme! 😂",
    description: "Check out this hilarious Sabinus meme!",
  };

  return {
    title: meme.title,
    description: meme.description,
    openGraph: {
      title: meme.title,
      description: meme.description,
      url: `${origin}/api/og?memeId=${meme.id}`,
      images: [
        {
          url: `${origin}/api/og?memeId=${meme.id}`,
          width: 1200,
          height: 630,
          alt: meme.title,
        },
      ],
    },
  };
};

export default async function MemeDetails({ params }: PageParams) {
  const username = await fetchUsername();
  const memeId = (await params).id;

  console.log(username);

  const displayedMemeData = async () => {
    try {
      const memeData = await getSingleMemeAction(memeId);
      return memeData[0] as Meme;
    } catch (error) {
      console.error("Failed to display meme:", error);
    }
  };

  const meme = (await displayedMemeData()) as Meme;
  const title = "A meme of Sabinus the comedian! 😂";

  return (
    <section className="w-full min-h-[calc(100dvh-16rem)] mb-[2rem] mt-[8rem] bg-unset px-[10%] flex flex-col items-center gap-5">
      <div className="flex flex-col h-full w-full gap-3 items-center p-4">
        <h1 className="text-4xl font-bold max-sm:text-[1.5rem] text-center">
          Laugh with us! 😂
        </h1>
        <div className="h-max overflow-hidden relative">
          <DownloadMeme
            fileUrl={meme.secure_url}
            newClassName="absolute text-blue left-3 top-3 hover:text-red-500 transition-all"
          />
          <ToggleFavourite meme={meme} username={username} />
          <div className="max-w-[30rem] max-h-[60svh] max-sm:max-w-[18rem] max-sm:max-h-[30rem] border-[5px] border-blue rounded-3xl overflow-hidden">
            <img src={meme.secure_url} alt={title} className="w-full h-full" />
          </div>
          <ShareMeme
            imageId={meme.public_id}
            newClassName="absolute bottom-3 right-3 text-blue hover:text-red-500 transition-all"
          />
        </div>
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-blue px-4 text-[1.2rem] font-medium text-white transition-colors hover:bg-blue-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue active:bg-blue-deep aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          View More Memes
        </Link>
      </div>
    </section>
  );
}
