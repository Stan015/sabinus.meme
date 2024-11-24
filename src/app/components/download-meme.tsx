"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EvaCloudDownloadOutline,
  LineMdDownloadingLoop,
} from "@/(icons)/icons";
import cn from "@/utils/cn";

export default function DownloadMeme({
  newClassName,
  fileUrl,
}: {
  newClassName: string;
  fileUrl: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const toastId = toast("Starting download...");

    try {
      setIsDownloading(true);

      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Failed to fetch the file");

      const contentLength = response.headers.get("content-length");
      const totalBytes = contentLength ? Number.parseInt(contentLength, 10) : 0;
      let downloadedBytes = 0;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        if (value) {
          chunks.push(value);
          downloadedBytes += value.length;

          if (totalBytes) {
            const progress = Math.floor((downloadedBytes / totalBytes) * 100);
            toast.update(toastId, {
              render: `Downloading... ${progress}%`,
              progress: progress / 100,
            });
          }
        }
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sabinus_meme_${Math.floor(Math.random() * 1000)}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.update(toastId, {
        render: "Download completed!",
        type: "success",
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Error downloading the file",
        type: "error",
        autoClose: 3000,
      });
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="download meme button"
        className={cn("w-8 h-8 max-md:w-6 max-md:h-6", newClassName)}
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <LineMdDownloadingLoop className="w-full h-full" />
        ) : (
          <EvaCloudDownloadOutline className="w-full h-full" />
        )}
      </button>
      <ToastContainer />
    </>
  );
}
