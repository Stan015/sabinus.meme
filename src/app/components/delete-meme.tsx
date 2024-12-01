"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { EosIconsThreeDotsLoading, MingcuteDeleteLine } from "@/(icons)/icons";
import { deleteMemeAction, fetchUserUploadsAction } from "@/actions";
import cn from "@/utils/cn";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteMeme({
  newClassName,
  memeId,
  memeUrl,
  onDeleteSuccess,
  setMemeArray,
}: {
  newClassName?: string;
  memeId: string;
  memeUrl: string;
  onDeleteSuccess: () => void;
  setMemeArray: () => void;
}) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    const isDeleted = await deleteMemeAction(id);
    if (isDeleted) {
      toast.success("Meme deleted successfully!");
      if (onDeleteSuccess) {
        setTimeout(() => {
          setMemeArray();
          onDeleteSuccess();
        }, 2000);
      }
    } else {
      toast.error("Failed to delete meme.");
    }
    setDeleting(false);
    setIsPopoverVisible(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Delete meme button"
        className={cn(
          "w-8 h-8 max-md:w-6 max-md:h-6 flex justify-center items-center",
          newClassName,
        )}
        onClick={() => setIsPopoverVisible(true)}
      >
        <MingcuteDeleteLine />
      </button>

      {isPopoverVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.8] z-50"
          role="dialog"
          aria-labelledby="delete-warning-title"
          aria-describedby="delete-warning-desc"
        >
          <div className="w-[24rem] max-sm:w-[18rem] p-4 border-[5px] border-blue rounded-xl bg-gray-100 dark:bg-dark text-base">
            <p id="delete-warning-desc" className="mb-4 text-pretty">
              <strong className="text-red-600">Warning:</strong> You are about
              to delete the meme below.
            </p>

            <img
              src={memeUrl}
              alt="sabinus meme"
              className="w-[10rem] h-[10rem] mx-auto mb-4"
            />

            <div className="flex flex-wrap justify-between gap-2">
              <button
                className="w-max px-4 py-2 bg-red-500 hover:bg-red-600 transition-all text-white text-[1.2rem] max-sm:text-[0.8rem] max-sm:font-medium font-bold rounded-xl"
                type="button"
                onClick={() => setIsPopoverVisible(false)}
              >
                Cancel
              </button>
              <button
                className="w-max px-4 py-2 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] max-sm:text-[0.8rem] max-sm:font-medium font-bold rounded-xl"
                type="button"
                onClick={() => handleDelete(memeId)}
              >
                {!deleting ? (
                  "Delete Meme"
                ) : (
                  <span className="flex items-center">
                    Deleting <EosIconsThreeDotsLoading />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
