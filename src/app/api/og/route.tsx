/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "next/og";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const memeId = searchParams.get("memeId");

    if (!memeId) {
      return new NextResponse("Meme ID are required", { status: 400 });
    }

    const meme = {
      id: memeId,
      title: "Check out this Sabinus meme! 😂",
      imageUrl: `http://res.cloudinary.com/stan015cloud/image/upload/v1732383817/${memeId}`,
    };

    const logoUrl =
      "http://res.cloudinary.com/stan015cloud/image/upload/v1732383817/logo_nfgi2v.png";

    return new ImageResponse(
      (
        <div
          tw="bg-blue-500 w-[1200px] h-[630px] relative flex flex-col justify-center items-center text-center"
          style={{ fontFamily: "Arial, sans-serif", color: "#111827" }}
        >
          <span tw="bg-black p-2 rounded absolute left-3 top-3">
            <img
              src={logoUrl}
              alt="Sabinus.meme logo"
              tw="w-[6rem] h-[6rem] rounded"
            />
          </span>

          <img
            src={meme.imageUrl}
            alt="Sabinus meme"
            tw="object-cover w-[600px] h-[400px] mb-4"
          />
          <h1 tw="text-4xl font-bold">{meme.title}</h1>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "twemoji",
      },
    );
  } catch (error) {
    console.error(
      "Failed to generate sabinus OG image",
      (error as Error).cause,
    );
    return new NextResponse("Failed to generate sabinus OG image", {
      status: 500,
    });
  }
}
