"use client";

import { CldImage } from "next-cloudinary";
import { memo } from "react";

type MemeResources = {
  secure_url: string;
  width: number;
  height: number;
};

const MemeImage = memo(function MemeImage({
  secure_url,
  width,
  height,
}: MemeResources) {
  return (
    <CldImage
      className="w-full h-full border-[5px] border-blue rounded-3xl"
      src={secure_url}
      width={width / 1.4}
      height={height / 1.4}
      sizes="100vw"
      alt="a meme of Sabinus the comedian"
      loading="lazy"
    />
  );
});

export default MemeImage;
