"use server";

import type { Meme } from "@/types";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { createClient } from "./utils/supabase/server";
import { headers } from "next/headers";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadAction = async (formData: FormData) => {
  const memeFileInput = (formData.get("memeFile") as File) || null;
  // const memeDescription =
  //   formData.get("memeDescription")?.toString().trim() || "";
  const memeExpression =
    formData.get("memeExpression")?.toString().trim() || "";
  const imageSize = formData.get("imageSize")?.toString().trim() || "";
  const confirmedMeme = formData.get("confirmedMeme") === "on";

  const memeWidth = Number(imageSize.split("x")[0]);
  const memeHeight = Number(imageSize.split("x")[1]);

  const arrayBuffer = await memeFileInput.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const user = (await (await createClient()).auth.getUser()).data.user;

  if (confirmedMeme && user) {
    try {
      const response = await fetch("http://localhost:3000/api/get-username", {
        method: "GET",
        headers: {
          "x-user-email": `${user.email}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      if (!data.username) {
        throw new Error("Username not found in response");
      }

      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["sabinus", memeExpression],
              upload_preset: "sabinus_preset",
              folder: `sabinus-memes/${data.username}`,
              image_metadata: true,
              unique_filename: true,
              resource_type: "image",
              width: memeWidth,
              height: memeHeight,
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
              console.log(result);
            },
          )
          .end(buffer);
      });
    } catch (error) {
      console.error("Failed to fetch username or upload image:", error);
    }
  }

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
  isFavourite: boolean = true,
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
        "resource_type:image AND folder:sabinus-memes AND tags=favourite",
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
