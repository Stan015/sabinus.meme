"use client";
import type { PreviewSizeOptions, PreviewSizes } from "@/types";

import type { FC } from "react";

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
            className="max-w-[9rem] h-max px-2 text-center dark:text-clr-light bg-gray-100 rounded-xl p-2 border transition-all border-white text-md ring-offset-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue focus-visible:ring-offset-1 hover:border-blue disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            id="imageSize"
            name="imageSize"
            placeholder="no size selected"
            value={`${previewSize.width} x ${previewSize.height}`}
            readOnly
            required
          />
          {previewSize.width > 320 || previewSize.height > 500 ? (
            <p className="text-[0.6rem]">original size recommended</p>
          ) : (
            ""
          )}
        </span>
      </div>
      <span className="flex gap-2 flex-wrap max-md:justify-center max-w-[24rem]">
        {previewSizeOptions.map((option, index) => {
          const previewInputValue = `${previewSize.width} x ${previewSize.height}`;
          const currentSize = `${option.width} x ${option.height}`;
          let selectedSize = false;
          let originalSize = false;
          const isFirstButton = index === 0;

          if (previewInputValue === currentSize) {
            selectedSize = true;
          }

          if (option.width > 320 || option.height > 500) {
            originalSize = true;
          }

          return (
            <button
              key={index}
              type="button"
              className={
                selectedSize
                  ? "bg-blue hover:bg-blue text-clr-dark dark:text-clr-dark transition-all px-3 py-1 rounded-2xl relative border-[1px] border-blue "
                  : "bg-gray-100 hover:bg-blue hover:text-white dark:text-clr-light transition-all px-3 py-1 rounded-2xl relative border-[1px] border-blue "
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
              {originalSize && isFirstButton && (
                <span className="absolute -right-1 -top-[0.8rem] text-blue">
                  ☆
                </span>
              )}
            </button>
          );
        })}
      </span>
    </div>
  );
};

export default SizeOptions;
