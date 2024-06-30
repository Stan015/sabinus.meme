"use client";
import type { PreviewSizeOptions, PreviewSizes } from "@/types";

import { FC } from "react";

type Props = {
  previewSizeOptions: PreviewSizeOptions;
  previewSize: PreviewSizes;
  setPreviewSize: (option: PreviewSizes) => void;
};

const SizeOptions: FC<Props> = ({
  previewSizeOptions,
  previewSize,
  setPreviewSize,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="w-full mb-2 flex items-center gap-4">
        <label className="font-bold text-md" htmlFor="imageSize">
          Select Size:
        </label>
        <span className="flex flex-col items-center w-max h-12">
          <input
            className="max-w-[9rem] h-max px-2 text-center bg-gray-100 rounded-xl p-2 border transition-all border-white text-md ring-offset-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            id="imageSize"
            name="imageSize"
            placeholder="no size selected"
            value={`${previewSize.width} x ${previewSize.height}`}
            readOnly
            required
          />
          {previewSize.width > 320 || previewSize.height > 500 ? (
            <p className="text-[0.6rem]">
              original size recommended
            </p>
          ) : (
            ""
          )}
        </span>
      </div>
      <span className="flex gap-2 flex-wrap max-w-[24rem]">
        {previewSizeOptions.map((option, index) => {
          let previewInputValue = `${previewSize.width} x ${previewSize.height}`;
          let currentSize = `${option.width} x ${option.height}`;
          let selectedSize = false;
          let originalSize = false;
          const isFirstButton = index === 0;

          if (previewInputValue === currentSize) {
            selectedSize = true;
          }

          if (option.width > 320 || option.height > 500) {
            originalSize = true
          }

          return (
            <button
              key={index}
              type="button"
              className={
                selectedSize
                  ? "bg-blue-500 hover:bg-blue-500 text-white transition-all px-3 py-1 rounded-2xl relative"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white transition-all px-3 py-1 rounded-2xl relative"
              }
              onClick={() => {
                setPreviewSize({
                  width: option.width,
                  height: option.height,
                  "aspect-ratio": option["aspect-ratio"],
                });
              }}
            >
              <span>{option.width}</span> x <span>{option.height}</span>
              {originalSize && isFirstButton && <span className="absolute -right-1 -top-[0.8rem] text-blue-500">☆</span>}
            </button>
          );
        })}
      </span>
    </div>
  );
};

export default SizeOptions;
