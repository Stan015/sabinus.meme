import Image from "next/image";
import { v2 as cloudinary } from "cloudinary";
// import { memes } from "../data/data.json";
import { CldImage } from "next-cloudinary";
import MemeImage from "./components/meme-image";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

type Meme = {
  public_id: string;
  secure_url: string;
  // description: string;
  // expression: string[];
  width: number;
  height: number;
};

async function Home() {
  const { resources } = await cloudinary.search
    .expression("resource_type:image")
    .sort_by("uploaded_at", "desc")
    .max_results(30)
    .execute();

  console.log(resources);

  return (
    <>
      <section className="w-full px-[10%] flex flex-col items-center gap-10 mt-6">
        <h1 className="text-[2.5rem] font-bold text-center w-3/4">
          Sabinus Memes Library. Search, download, upload, share and laugh with
          me!
        </h1>
        <input
          className="w-3/4 h-14 bg-gray-100 rounded-full px-10 flex border transition-all border-white text-md ring-offset-blue-400 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Search memes by description, expression or keywords. E.g, investor's vibe, crying, laughing, in trouble..."
        />
      </section>
      <main className="flex flex-col w-full items-center px-[5%] my-20">
        <div className="w-full columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
          {resources.map((meme: Meme) => (
            <div
              className={`w-[${meme.width / 1.4}px] h-max overflow-hidden`}
              key={meme.public_id}
            >
              <MemeImage
                secure_url={meme.secure_url}
                width={meme.width}
                height={meme.height}
              />
            </div>
          ))}
        </div>
        <button
          className="w-max px-6 py-4 bg-blue-500 hover:bg-blue-600 transition-all text-white text-[1.2rem] font-bold rounded-xl mt-10"
          type="button"
        >
          Load more memes
        </button>
      </main>
    </>
  );
}

export default Home;
