"use client";
import type { PreviewSizeOptions, PreviewSizes } from "../types";

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
      <div className="w-full mb-2 flex gap-4">
        <label className="font-bold text-md" htmlFor="imageSize">
          Select Size:
        </label>
        <span className="flex w-max h-12 relative">
          <input
            className="max-w-[9rem] h-max px-2 text-center bg-gray-100 rounded-xl py-1"
            type="text"
            id="imageSize"
            name="imageSize"
            placeholder="no size selected"
            value={`${previewSize.width} x ${previewSize.height}`}
            readOnly
            required
          />
          {previewSize.width > 320 || previewSize.height > 550 ? (
            <p className="absolute bottom-0 left-[0.62rem] text-[0.6rem]">
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
          if (previewInputValue === currentSize) {
            selectedSize = true;
          }

          return (
            <button
              key={index}
              type="button"
              className={
                selectedSize
                  ? "bg-blue-500 hover:bg-blue-500 text-white transition-all px-3 py-1 rounded-2xl"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white transition-all px-3 py-1 rounded-2xl"
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
            </button>
          );
        })}
      </span>
    </div>
  );
};

export default SizeOptions;
