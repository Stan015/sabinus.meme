"use client";

import type { PreviewSizeOptions, PreviewSizes } from "@/types";
import type { ChangeEvent } from "react";

import Image from "next/image";
// import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { uploadAction } from "@/actions";
import SizeOptions from "@/components/size-options";
import ExpressionOptions from "@/components/expression-options";
import PreviewUpload from "@/components/preview-upload";

export default function Upload() {
  const [expressions, setExpressions] = useState<string[]>([]);

  const [previewSizeOptions, setPreviewSizeOptions] =
    useState<PreviewSizeOptions>([
      { width: 320, height: 320, "aspect-ratio": "1" },
      { width: 320, height: 420, "aspect-ratio": "auto" },
      { width: 320, height: 500, "aspect-ratio": "auto" },
    ]);
  const [previewSize, setPreviewSize] = useState<PreviewSizes>({
    width: 320,
    height: 400,
    "aspect-ratio": "auto",
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const expressionOptions: string[] = [
    "happy",
    "crying",
    "investor’s vibe",
    "sitting",
    "walking",
    "focussed",
    "winning",
    "smiling",
    "laughing",
    "in trouble",
    "dancing",
    "fooled",
    "sleeping",
    "waving hand",
    "eyes closed",
    "eyes wide open",
    "foto!",
    "thinking",
    "arrested",
    "in prison",
    "shocked",
  ];

  const handleAddExpression = (expression: string) => {
    if (expressions.includes(expression)) return;

    setExpressions((prevExpressions) => [...prevExpressions, expression]);
  };

  const handleExpressionInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setExpressions(value.split(", ").map((str) => str.trim()));
  };

  const handleImagePreview = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    const img = new window.Image();

    if (image) {
      img.src = image as string;

      img.onload = () => {
        const { width, height } = img;
        setPreviewSize({
          width: width,
          height: height,
          "aspect-ratio": "auto",
        });
        setPreviewSizeOptions((prev) => [
          {
            width: width,
            height: height,
            "aspect-ratio": "auto",
          },
          ...prev,
        ]);
        // console.log(previewSizeOptions);
      };
    }
    // console.log("preview image not loaded yet");
  }, [image]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0] as File;
    handleImagePreview(inputFile);
  };

  console.log(isPopoverVisible);

  return (
    <section className="flex flex-col gap-6 max-sm:gap-4 mt-[7rem] mb-10 px-[10%] items-center w-full min-h-[calc(100dvh-9.5rem)]">
      <h1 className="text-[2.5rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] max-sm:text-base text-pretty font-bold text-center w-11/12 lg:w-3/4">
        Before you upload, try searching to see if the meme already exists.
      </h1>
      <div className="flex w-full h-auto justify-center">
        <form
          className="w-max h-max flex flex-wrap justify-center gap-6 items-start"
          action={uploadAction}
        >
          <div className="w-max h-max p-6 max-sm:p-0">
            {/* <CldUploadWidget
              uploadPreset="sabinus_preset"
              options={{ sources: ["local"] }}
              signatureEndpoint={"/api/sign-image-upload"}
            >
              {({ open }) => {
                return (
                  <button
                    className="w-max px-4 py-2 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] font-bold rounded-xl"
                    type="button"
                    onClick={() => open()}
                  >
                    Upload
                  </button>
                );
              }}
            </CldUploadWidget> */}
            <input
              className="w-[20rem] h-16 bg-gray-100 dark:text-clr-light rounded-xl text-center p-4 border border-white dark:border-blue hover:border-blue-deep transition-all file:border-blue file:rounded-lg dark:file:bg-dark cursor-pointer file:cursor-pointer"
              type="file"
              name="memeFile"
              id="memeFile"
              title="Choose or drag and drop image file"
              accept="image/*"
              required
              onChange={(e) => handleInputChange(e)}
            />

            <PreviewUpload image={image} previewSize={previewSize} />
          </div>

          <div className="w-max max-sm:w-[20rem] max-sm:p-0 max-md:items-center h-max p-6 flex flex-col gap-6">
            {/* <div className="flex flex-col gap-1">
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
            </div> */}

            <ExpressionOptions
              expressionOptions={expressionOptions}
              expressions={expressions}
              handleAddExpression={handleAddExpression}
              handleExpressionInputChange={handleExpressionInputChange}
            />

            <SizeOptions
              previewSizeOptions={previewSizeOptions}
              previewSize={previewSize}
              setPreviewSize={setPreviewSize}
            />

            <div className="w-max h-max block relative">
              <button
                className="w-max px-6 py-4 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] font-bold rounded-xl"
                type="button"
                {...{
                  popoverTarget: "upload-warning",
                  popoverTargetAction: "show",
                }}
                onClick={() => setIsPopoverVisible(true)}
              >
                Proceed
              </button>

              <div
                className="w-[24rem] max-sm:-[18rem] p-4 border-[5px] border-blue rounded-xl bg-gray-100 dark:bg-dark backdrop:bg-dark backdrop:opacity-[0.8] absolute top-[-15rem] text-base"
                id="upload-warning"
                popover="auto"
              >
                <p className="mb-4">
                  <strong className="text-red-600">Warning:</strong> Only
                  Sabinus&#39; memes should be uploaded. Account that uploads
                  other memes in this section would be disabled with immediate
                  effect.
                </p>
                <label className="flex items-start italic gap-2 mb-6">
                  <input
                    className="w-[2rem] h-[2rem]"
                    type="checkbox"
                    name="confirmedMeme"
                    id="confirmedMeme"
                    required
                  />
                  I confirm that the image to be uploaded is Sabinus&#39; meme:
                </label>

                <div className="flex flex-wrap justify-between gap-2">
                  <button
                    className="w-max px-4 py-2 bg-red-500 hover:bg-red-600 transition-all text-white text-[1.2rem] font-bold rounded-xl"
                    type="button"
                    {...{
                      popoverTarget: "upload-warning",
                      popoverTargetAction: "hide",
                    }}
                    onClick={() => setIsPopoverVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-max px-4 py-2 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] font-bold rounded-xl"
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
