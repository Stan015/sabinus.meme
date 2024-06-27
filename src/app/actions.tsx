"use server";

import { z } from "zod";

export const handleUpload = async (formData: FormData) => {
  const schema = z.object({
    memeFile: z.string(),
    memeDescription: z.string(),
    memeExpression: z.string(),
    imageSize: z.string(),
    confirmedMeme: z.boolean(),
  });

  const memeFileInput = (formData.get("memeFile") as File) || null;

  const memeFile = memeFileInput ? memeFileInput.name : "";
  const memeDescription =
    formData.get("memeDescription")?.toString().trim() || "";
  const memeExpression =
    formData.get("memeExpression")?.toString().trim() || "";
  const imageSize = formData.get("imageSize")?.toString().trim() || "";
  const confirmedMeme = formData.get("confirmedMeme") === "on";

  const newFormValues: z.infer<typeof schema> = {
    memeFile,
    memeDescription,
    memeExpression,
    imageSize,
    confirmedMeme,
  };

  console.log(newFormValues);
};
