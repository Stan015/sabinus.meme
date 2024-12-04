"use client";

import type { PreviewSizeOptions, PreviewSizes } from "@/types";
import type { ChangeEvent } from "react";

import { useEffect, useRef, useState } from "react";
import { uploadAction } from "@/actions";
import SizeOptions from "@/components/size-options";
import ExpressionOptions from "@/components/expression-options";
import PreviewUpload from "@/components/preview-upload";
import cn from "@/utils/cn";
import { EosIconsThreeDotsLoading } from "@/(icons)/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Upload() {
  const router = useRouter();
  const [typeOfMeme, setTypeOfMeme] = useState<string>("sabinus");
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
  const [uploading, setUploading] = useState(false);
  const popoverDiv = useRef<HTMLDivElement | null>(null);

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
      };
    }
  }, [image]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0] as File;
    handleImagePreview(inputFile);
  };

  useEffect(() => {
    if (uploading) toast.success("Your meme is uploading...");

    if (!isPopoverVisible && popoverDiv.current) {
      popoverDiv.current.hidePopover?.();
    }
  }, [uploading, isPopoverVisible]);

  return (
    <section className="flex flex-col gap-6 max-sm:gap-4 mt-[7rem] mb-10 px-[10%] items-center w-full min-h-[calc(100dvh-9.5rem)]">
      <h1 className="text-[2.5rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] max-sm:text-base text-pretty font-bold text-center w-11/12 lg:w-3/4">
        What meme do you want to upload?
      </h1>
      <div className="flex gap-4 items-center w-[14rem] justify-between">
        <button
          type="button"
          aria-label="upload sabinus's memes"
          onClick={() => setTypeOfMeme("sabinus")}
          className={cn(
            "text-center text-[1.2rem] border-b-2 border-b-white dark:border-b-[#344054] hover:-translate-y-1 hover:translate-x-1 px-3 rounded-3xl transition-all",
            {
              "bg-blue text-white border-b-transparent dark:border-b-transparent":
                typeOfMeme === "sabinus",
            },
          )}
        >
          Sabinus
        </button>
        <button
          type="button"
          aria-label="upload other memes"
          onClick={() => setTypeOfMeme("others")}
          className={cn(
            "text-center text-[1.2rem] border-b-2 border-b-white dark:border-b-[#344054] hover:-translate-y-1 hover:translate-x-1 px-3 rounded-3xl transition-all",
            {
              "bg-blue text-white border-b-transparent dark:border-b-transparent":
                typeOfMeme === "others",
            },
          )}
        >
          Others
        </button>
      </div>
      <p className="text-[1.5rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] max-sm:text-base font-medium text-pretty text-center w-11/12 lg:w-3/4">
        {typeOfMeme === "sabinus"
          ? "Before you upload, try searching to see if the meme already exists."
          : "Memes uploaded to 'Others' will only be displayed on your dashboard."}
      </p>
      <div className="flex w-full h-auto justify-center">
        <form
          className="w-max h-max flex flex-wrap justify-center gap-6 items-start"
          action={async () => {
            try {
              const formElement = document.querySelector(
                "form",
              ) as HTMLFormElement;
              const formData = new FormData(formElement);

              const response = await uploadAction(formData, typeOfMeme);
              if (response) {
                toast.success("Your meme has been uploaded successfully");
                router.push(`/meme/${response.publicId}`);
              }
            } catch (error) {
              console.error("failed to upload", (error as Error).message);
              toast.error("Failed to upload successfully");
            } finally {
              setUploading(false);
              setIsPopoverVisible(false);
            }
          }}
        >
          <div className="w-max h-max p-6 max-sm:p-0">
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

            <PreviewUpload
              image={image}
              typeOfMeme={typeOfMeme}
              previewSize={previewSize}
            />
          </div>

          <div className="w-max max-sm:w-[20rem] max-sm:p-0 max-md:items-center h-max p-6 flex flex-col gap-6">
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
            {isPopoverVisible && (
              <div
                role="dialog"
                aria-labelledby="upload-warning-title"
                aria-describedby="upload-warning-desc"
                className="w-max h-max block relative"
              >
                <div
                  className="w-[24rem] max-sm:w-[18rem] p-4 border-[5px] border-blue rounded-xl bg-gray-100 dark:bg-dark backdrop:bg-dark backdrop:opacity-[0.8] fixed top-[-15rem] text-base"
                  id="upload-warning"
                  popover="auto"
                  ref={popoverDiv}
                >
                  {typeOfMeme === "sabinus" ? (
                    <>
                      <p className="mb-4 text-pretty">
                        <strong className="text-red-600">Warning:</strong> Only
                        Sabinus&#39; memes should be uploaded. User who uploads
                        other memes in this section would be disabled with
                        immediate effect.
                      </p>
                      <label className="flex items-start italic gap-2 mb-6">
                        <input
                          className="w-[2rem] h-[2rem] text-pretty"
                          type="checkbox"
                          name="confirmedMeme"
                          id="confirmedMeme"
                          required
                        />
                        I confirm that the image to be uploaded is Sabinus&#39;
                        meme, and should be displayed to the public.
                      </label>
                    </>
                  ) : (
                    <>
                      <p className="mb-4 text-pretty">
                        <strong className="text-red-600">Warning:</strong> Memes
                        uploaded to &#39;Others&#39; will be saved to your
                        personal folder, and will ONLY be displayed on your
                        dashboard.
                      </p>
                      <label className="flex items-start italic gap-2 mb-6">
                        <input
                          className="w-[2rem] h-[2rem] text-pretty"
                          type="checkbox"
                          name="confirmedMeme"
                          id="confirmedMeme"
                          required
                        />
                        I confirm that the image to be uploaded is NOT
                        Sabinus&#39; meme and should be saved to
                        &#39;Others&#39;.
                      </label>
                    </>
                  )}

                  <div className="flex flex-wrap justify-between gap-2">
                    <button
                      className="w-max px-4 py-2 bg-red-500 hover:bg-red-600 transition-all text-white text-[1.2rem] max-sm:text-[0.8rem] max-sm:font-medium font-bold rounded-xl"
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
                      className="w-max px-4 py-2 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] max-sm:text-[0.8rem] max-sm:font-medium font-bold rounded-xl"
                      type="submit"
                      onClick={() => setUploading(true)}
                    >
                      {!uploading ? (
                        "Upload Meme"
                      ) : (
                        <span className="flex items-center">
                          Uploading <EosIconsThreeDotsLoading />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
