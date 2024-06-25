"use client";

import Image from "next/image";
import { useState } from "react";

type PreviewSizes = {
  width: number;
  height: number;
  "aspect-ratio": string;
};

export default function Upload() {
  const [expressions, setExpressions] = useState<Set<string>>(new Set());
  const [previewSize, setPreviewSize] = useState<PreviewSizes>({
    width: 320,
    height: 400,
    "aspect-ratio": "auto",
  });

  const expressionOptions: string[] = [
    "happy",
    "crying",
    "investor’s vibe",
    "walking",
    "winning",
    "laughing",
    "in trouble",
    "dancing",
    "sleeping",
  ];

  const handleAddExpression = (expression: string) => {
    setExpressions((prevExpressions) =>
      new Set(prevExpressions).add(` ${expression}`)
    );
  };

  const previewSizeOptions: Array<PreviewSizes> = [
    { width: 320, height: 320, "aspect-ratio": "1" },
    { width: 320, height: 400, "aspect-ratio": "auto" },
    { width: 320, height: 420, "aspect-ratio": "auto" },
    { width: 320, height: 500, "aspect-ratio": "auto" },
    { width: 320, height: 550, "aspect-ratio": "auto" },
  ];

  return (
    <section className="flex flex-col gap-6 mt-6 px[10%] items-center w-full h-full">
      <h1 className="text-[2.5rem] font-bold w-2/3 text-center">
        Before you upload, try searching to see if the meme already exists.
      </h1>
      <div className="flex w-full h-auto justify-center">
        <form className="w-max h-max flex flex-wrap justify-center gap-6 items-center">
          <div className="w-max h-max p-6">
            <input
              className="w-[20rem] h-16 bg-gray-100 rounded-xl text-center p-4 file:border-blue-500 file:rounded-lg cursor-pointer file:cursor-pointer"
              type="file"
              name="meme-file"
              id="meme-file"
              title="Choose or drag and drop image file"
              accept="image/*"
              required
            />

            <div className="w-full h-max mt-6">
              <h3 className="font-bold text-md">Preview</h3>
              <span
                className={`block w-[${previewSize.width}px] h-[${previewSize.height}px] mt-2 rounded-xl bg-gray-100 border-[5px] border-blue-500 overflow-hidden`}
              >
                <Image
                  className={`w-full h-full aspect-[${previewSize["aspect-ratio"]}]`}
                  src={"/media/FB_IMG_1645463326152.JPG"}
                  alt="cs"
                  width={previewSize.width}
                  height={previewSize.height}
                />
              </span>
            </div>
          </div>

          <div className="w-max h-max p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-md" htmlFor="meme-description">
                Description
              </label>
              <textarea
                className="w-full h-[5.4rem] bg-gray-100 rounded-xl p-4 border transition-all border-white text-md ring-offset-blue-400 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="meme-description"
                id="meme-description"
                placeholder="What is sabinus up to in the picture?"
                rows={2}
                required
                minLength={60}
                maxLength={100}
              ></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <span className="mb-2 flex gap-4 flex-wrap">
                <label className="font-bold text-md" htmlFor="meme-expressions">
                  Select Expression:
                </label>
                <input
                  className="w-full h-max px-2 bg-gray-100 rounded-xl py-1"
                  type="text"
                  id="meme-expressions"
                  placeholder="Choose or enter expression"
                  value={Array.from(expressions)}
                  required
                />
              </span>
              <span className="flex gap-2 flex-wrap max-w-[24rem]">
                {expressionOptions.map((option, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className="bg-gray-100 px-3 py-1 rounded-2xl"
                      onClick={() => handleAddExpression(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="mb-2 flex gap-4">
                <label className="font-bold text-md" htmlFor="image-size">
                  Select Size:
                </label>
                <input
                  className="max-w-[9rem] h-max px-2 text-center bg-gray-100 rounded-xl py-1"
                  type="text"
                  id="image-size"
                  placeholder="no size selected"
                  value={`${previewSize.width} x ${previewSize.height}`}
                  disabled
                  required
                />
              </span>
              <span className="flex gap-2 flex-wrap max-w-[24rem]">
                {previewSizeOptions.map((option, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className="bg-gray-100 px-3 py-1 rounded-2xl"
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

            <button
              className="w-max px-6 py-4 bg-blue-500 hover:bg-blue-600 transition-all text-white text-[1.2rem] font-bold rounded-xl"
              type="submit"
            >
              Upload Meme
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
