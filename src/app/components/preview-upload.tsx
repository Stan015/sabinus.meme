"use client";

import type { PreviewSizes } from "@/types";

import type { FC } from "react";
import Image from "next/image";

type Props = {
  image: string | ArrayBuffer | null | undefined;
  previewSize: PreviewSizes;
};

const PreviewUpload: FC<Props> = ({ image, previewSize }) => {
  return (
    <div className="w-full h-max mt-6">
      <h3 className="font-bold text-md">Preview</h3>
      <span
        className={
          "block w-[320px] h-[400px] mt-2 rounded-xl bg-gray-100 border-[5px] border-blue overflow-hidden"
        }
        style={{
          width: `${previewSize.width <= 320 ? previewSize.width : 320}px`,
          height: `${previewSize.height <= 550 ? previewSize.height : 400}px`,
        }}
      >
        {image ? (
          <img
            src={image as string}
            alt="a meme of investor sabinus the comedian"
            className="w-full h-full"
            style={{ aspectRatio: previewSize["aspect-ratio"] }}
          />
        ) : (
          <Image
            className="w-full h-full"
            src={"/media/FB_IMG_1643537249999.JPG"}
            alt="an image of investor sabinus the comedian"
            width={previewSize.width}
            height={previewSize.height}
          />
        )}
      </span>
    </div>
  );
};

export default PreviewUpload;
