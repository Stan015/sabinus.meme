"use server";

import type { Meme } from "@/types";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadAction = async (formData: FormData) => {
  const schema = z.object({
    memeFile: z.string(),
    // memeDescription: z.string(),
    memeExpression: z.string(),
    imageSize: z.string(),
    confirmedMeme: z.boolean(),
  });

  const memeFileInput = (formData.get("memeFile") as File) || null;

  const memeFile = memeFileInput ? memeFileInput.name : "";
  //   const memeDescription =
  //     formData.get("memeDescription")?.toString().trim() || "";
  const memeExpression =
    formData.get("memeExpression")?.toString().trim() || "";
  const imageSize = formData.get("imageSize")?.toString().trim() || "";
  const confirmedMeme = formData.get("confirmedMeme") === "on";

  const newFormValues: z.infer<typeof schema> = {
    memeFile,
    // memeDescription,
    memeExpression,
    imageSize,
    confirmedMeme,
  };

  const memeWidth = Number(imageSize.split("x")[0]);
  const memeHeight = Number(imageSize.split("x")[1]);

  // console.log([imageSize.split('x'), {"width": `${[imageSize.split('x')[0]]}`, "height": `${[imageSize.split('x')[1]]}`}])

  const arrayBuffer = await memeFileInput.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ["sabinus", memeExpression],
          upload_preset: "sabinus_preset",
          image_metadata: true,
          unique_filename: true,
          resource_type: "image",
          width: memeWidth,
          height: memeHeight,
        },
        (error, result) => {
          if (error) {
            reject(reject);
            return;
          }
          resolve(result);
          console.log(result);
        }
      )

      .end(buffer);
  });

  // console.log(newFormValues);

  revalidatePath("/");
};

export const searchMemesAction = async (): Promise<Meme[]> => {
  try {
    const { resources } = await cloudinary.search
      .expression("resource_type:image AND folder:sabinus-memes")
      .sort_by("uploaded_at", "desc")
      .with_field("tags")
      // .max_results(30)
      .execute();

    // console.log(resources);
    return resources;
  } catch (error) {
    throw new Error(`Error occurred: ${error}`);
  }
};

export const toggleFavouritesAction = async (
  publicID: string,
  isFavourite: boolean
) => {
  try {
    if (!isFavourite) {
      await cloudinary.uploader.add_tag("favourite", [publicID]);
    } else {
      await cloudinary.uploader.remove_tag("favourite", [publicID]);
    }
  } catch (error) {
    throw new Error(`Error occurred: ${error}`);
  }

  revalidatePath("/");
  revalidatePath("/favourites");
};

export const getFavouriteMemesAction = async (): Promise<Meme[]> => {
  try {
    const { resources } = await cloudinary.search
      .expression(
        "resource_type:image AND folder:sabinus-memes AND tags=favourite"
      )
      .sort_by("uploaded_at", "desc")
      .with_field("tags")
      // .max_results(30)
      .execute();

    // console.log(resources);
    return resources;
  } catch (error) {
    throw new Error(`Error occurred: ${error}`);
  }
};
