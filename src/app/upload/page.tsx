"use client";

import Image from "next/image";
// import { CldUploadButton } from 'next-cloudinary';
import { FormEvent, use, useState } from "react";
import { handleUpload } from "../actions";

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

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

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
    <section className="flex flex-col gap-6 mt-6 mb-10 px[10%] items-center w-full h-full">
      <h1 className="text-[2.5rem] font-bold w-2/3 text-center">
        Before you upload, try searching to see if the meme already exists.
      </h1>
      <div className="flex w-full h-auto justify-center">
        <form
          className="w-max h-max flex flex-wrap justify-center gap-6 items-center"
          action={handleUpload}
        >
          <div className="w-max h-max p-6">
            
            <input
              className="w-[20rem] h-16 bg-gray-100 rounded-xl text-center p-4 file:border-blue-500 file:rounded-lg cursor-pointer file:cursor-pointer"
              type="file"
              name="memeFile"
              id="memeFile"
              title="Choose or drag and drop image file"
              accept="image/*"
              required
            />

            <div className="w-full h-max mt-6">
              <h3 className="font-bold text-md">Preview</h3>
              <span
                className={`block mt-2 rounded-xl bg-gray-100 border-[5px] border-blue-500 overflow-hidden`}
                style={{
                  width: `${previewSize.width}px`,
                  height: `${previewSize.height}px`,
                }}
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
              <label className="font-bold text-md" htmlFor="memeDescription">
                Description
              </label>
              <textarea
                className="w-full h-[5.4rem] bg-gray-100 rounded-xl p-4 border transition-all border-white text-md ring-offset-blue-400 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                name="memeDescription"
                id="memeDescription"
                placeholder="What is sabinus up to in the picture?"
                rows={2}
                required
                minLength={60}
                maxLength={100}
              ></textarea>
            </div>
            <div className="flex flex-col gap-1">
              <span className="mb-2 flex gap-4 flex-wrap">
                <label className="font-bold text-md" htmlFor="memeExpressions">
                  Select Expression:
                </label>
                <input
                  className="w-full h-max px-2 bg-gray-100 rounded-xl py-1"
                  type="text"
                  id="memeExpressions"
                  name="memeExpression"
                  placeholder="Choose or enter expression"
                  value={Array.from(expressions)}
                  required
                  readOnly
                />
              </span>
              <span className="flex gap-2 flex-wrap max-w-[24rem]">
                {expressionOptions.map((option, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className="bg-gray-100 hover:bg-blue-500 hover:text-white transition-all px-3 py-1 rounded-2xl"
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
                <label className="font-bold text-md" htmlFor="imageSize">
                  Select Size:
                </label>
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
              </span>
              <span className="flex gap-2 flex-wrap max-w-[24rem]">
                {previewSizeOptions.map((option, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      className="bg-gray-100 hover:bg-blue-500 hover:text-white transition-all px-3 py-1 rounded-2xl"
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

            <div className="w-max h-max block relative">
              <button
                className="w-max px-6 py-4 bg-blue-500 hover:bg-blue-600 transition-all text-white text-[1.2rem] font-bold rounded-xl"
                type="button"
                popovertarget="upload-warning"
                popovertargetaction="show"
                onClick={() => setIsPopoverVisible(true)}
              >
                Proceed
              </button>

              <div
                className="w-[24rem] max-sm:-[18rem] p-4 border-[5px] border-blue-500 rounded-xl bg-gray-100 backdrop:bg-black backdrop:opacity-[0.8] absolute top-[-15rem] text-base"
                id="upload-warning"
                popover="auto"
              >
                <p className="mb-4">
                  <strong className="text-red-600">Warning:</strong> Only
                  Sabinus' memes should be uploaded. Account that uploads other
                  memes in this section would be disabled with immediate effect.
                </p>
                <label className="flex items-start italic gap-2 mb-6">
                  <input
                    className="w-[2rem] h-[2rem]"
                    type="checkbox"
                    name="confirmedMeme"
                    id="confirmedMeme"
                    required
                  />
                  I confirm that the image to be uploaded is Sabinus' meme:
                </label>

                <div className="flex flex-wrap justify-between gap-2">
                  <button
                    className="w-max px-4 py-2 bg-red-500 hover:bg-red-600 transition-all text-white text-[1.2rem] font-bold rounded-xl"
                    type="button"
                    popovertarget="upload-warning"
                    popovertargetaction="hide"
                    onClick={() => setIsPopoverVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-max px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-all text-white text-[1.2rem] font-bold rounded-xl"
                    type="submit"
                  >
                    Upload Meme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
