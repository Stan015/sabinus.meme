"use server";

import type { Meme } from "@/types";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { fetchUsername } from "./utils/fetchUsername";
import { cookies } from "next/headers";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadAction = async (
  formData: FormData,
  memeType: string,
  req?: NextRequest,
) => {
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

  if (confirmedMeme) {
    try {
      const username = await fetchUsername(req);

      if (!username) {
        throw new Error("Failed to fetch username");
      }

      let folder: string;

      if (memeType === "sabinus") {
        folder = "sabinus-memes";
      } else {
        folder = `sabinus-memes/${username}`;
      }

      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: [username, memeExpression],
              upload_preset: "sabinus_preset",
              folder: folder,
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
      console.error("Error occured: ", error as Error);
    }
  }

  revalidatePath("/");
};

type SearchMemesResult = {
  resources: Array<Meme>;
  nextCursor: string | null;
};

export const searchMemesAction = async (
  tag?: string,
  cursor?: string,
): Promise<SearchMemesResult> => {
  try {
    let expression = "resource_type:image AND folder:sabinus-memes";

    if (tag) {
      expression += ` AND tags:${tag}`;
    }

    const search = cloudinary.search
      .expression(expression)
      .sort_by("uploaded_at", "desc")
      .with_field("tags")
      .max_results(30);

    if (cursor) {
      search.next_cursor(cursor);
    }

    const { resources, next_cursor } = await search.execute();
    console.log("Cloudinary response:", { resources, next_cursor });

    return { resources, nextCursor: next_cursor };
  } catch (error) {
    console.error("Error occurred:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { resources: [], nextCursor: null };
  }
};

export const fetchUserUploadsAction = async (
  username: string,
  typeOfUpload: string,
  cursor?: string,
): Promise<SearchMemesResult> => {
  try {
    let expression = "resource_type:image";

    if (typeOfUpload === "sabinus") {
      expression += ` AND folder:sabinus-memes AND tags:${username}`;
    } else {
      expression += ` AND folder:sabinus-memes/${username}`;
    }

    const search = cloudinary.search
      .expression(expression)
      .sort_by("uploaded_at", "desc")
      .with_field("tags")
      .max_results(20);

    if (cursor) {
      search.next_cursor(cursor);
    }

    const { resources, next_cursor } = await search.execute();
    console.log("Cloudinary response:", { resources, next_cursor });

    return { resources, nextCursor: next_cursor };
  } catch (error) {
    console.error("Error occurred:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { resources: [], nextCursor: null };
  }
};

export const toggleFavouritesAction = async (
  publicID: string,
  isFavourite = true,
  req?: NextRequest,
) => {
  try {
    const username = await fetchUsername(req);

    if (!username) {
      throw new Error("Failed to fetch username");
    }

    if (!isFavourite) {
      await cloudinary.uploader.add_tag(`favourite-${username}`, [publicID]);
    } else {
      await cloudinary.uploader.remove_tag(`favourite-${username}`, [publicID]);
    }
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }

  revalidatePath("/");
  revalidatePath("/favourites");
};

export const getFavouriteMemesAction = async (req?: NextRequest) => {
  try {
    const username = await fetchUsername(req);

    if (!username) {
      throw new Error("Failed to fetch username");
    }

    const { resources } = await cloudinary.search
      .expression(
        `resource_type:image AND folder:sabinus-memes AND tags=favourite-${username}`,
      )
      .sort_by("uploaded_at", "desc")
      .with_field("tags")
      // .max_results(30)
      .execute();

    // console.log(resources);
    return resources;
  } catch (error) {
    console.error(`Error occurred: ${error}`);
  }
};

export const getSingleMemeAction = async (memeId: string) => {
  try {
    const { resources } = await cloudinary.search
      .expression(`public_id=${memeId}`)
      .with_field("tags")
      .execute();

    // console.log(resources);
    return resources;
  } catch (error) {
    console.error("Error fetching meme:", (error as Error).message);
    throw error;
  }
};

export const getUsernameFromCookie = async () => {
  const coockiesStore = await cookies();
  return coockiesStore.get("username")?.value || null;
};
