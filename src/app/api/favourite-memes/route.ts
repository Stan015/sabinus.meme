import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const GET = async () => {
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
    return NextResponse.json(resources);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
    return NextResponse.error();
  }
};
