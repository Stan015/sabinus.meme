"use client";

import { CldImage } from "next-cloudinary";

type MemeResources = {
  secure_url: string;
  width: number;
  height: number;
};

export default function MemeImage(memeResources: MemeResources) {
  return (
    <CldImage
      className="w-full h-full border-[5px] border-blue-500 rounded-3xl"
      src={memeResources.secure_url}
      width={memeResources.height / 1.4}
      height={memeResources.height / 1.4}
      sizes="100vw"
      alt="a meme of Sabinus the comedian"
      loading="lazy"
    />
  );
}
