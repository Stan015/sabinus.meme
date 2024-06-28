"use client";

import { CldImage } from "next-cloudinary";

type MemeResources = {
  secure_url: string;
  // description: string;
  // expression: string[];
  width: number;
  height: number;
};

export default function MemeImage(memeResources: MemeResources) {
  return (
    <CldImage
      className={`w-[${memeResources.width / 1.4}px] h-[${
        memeResources.height / 1.4
      }px] border-[5px] border-blue-500 rounded-3xl`}
      src={memeResources.secure_url}
      width={memeResources.height / 1.4}
      height={memeResources.height / 1.4}
      sizes="100vw"
      alt="Description of my image"
      loading="lazy"
    />
  );
}
