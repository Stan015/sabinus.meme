import Image from "next/image";
import { v2 as cloudinary } from "cloudinary";
// import { memes } from "../data/data.json";
import MemeImage from "./components/meme-image";
import ToggleFavourite from "./components/toggle-favourite";
import cn from "./utils/cn";
import { cookies } from "next/headers";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

type Meme = {
  public_id: string;
  secure_url: string;
  // expression: string[];
  width: number;
  height: number;
  tags: string[];
};

async function Home() {
  const { resources } = await cloudinary.search
    .expression("resource_type:image AND folder:sabinus-memes")
    .sort_by("uploaded_at", "desc")
    .with_field("tags")
    // .max_results(30)
    .execute();
  
  const coockiesStore = await cookies();
  const username = coockiesStore.get("username")?.value || null;
  
  return (
    <>
      <main className="flex flex-col w-full min-h-[calc(100dvh-9.5rem)] mt-[6rem] items-center px-[10%] mb-20">
        <section className="w-full flex flex-col items-center gap-10 max-sm:gap-5 mt-6 mb-[3.5rem] max-sm:mb-[2rem]">
          <h1 className="text-[2.5rem] max-lg:text-[1.5rem] max-md:text-[1.3rem] max-sm:text-base text-pretty font-bold text-center w-11/12 lg:w-3/4">
            Sabinus Memes Library. Search, download, upload, share and laugh
            with me!
          </h1>
          <input
            className="w-3/4 h-14 max-sm:w-full max-sm:h-10 px-10 max-md:px-5 max-sm:px-3 max-sm:text-[0.7rem] max-md:text-base bg-gray-100 rounded-full flex border hover:border-blue-400 text-clr-light dark:text-clr-light transition-all border-white hover:border-blue text-md ring-offset-blue-deep ring-offset-[0.6px] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue dark:focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Search memes by description, expression or keywords. E.g, investor's vibe, crying, laughing, in trouble..."
          />
        </section>
        <div className="w-full columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
          {resources.map((meme: Meme) => (
            <div
              className={cn(
                "h-max overflow-hidden relative",
                `w-[${meme.width / 1.4}px]`,
              )}
              key={meme.public_id}
            >
              <ToggleFavourite meme={meme} username={username} />
              <MemeImage
                secure_url={meme.secure_url}
                width={meme.width}
                height={meme.height}
              />
            </div>
          ))}
        </div>
        <button
          className="w-max px-6 py-4 bg-blue hover:bg-blue-deep transition-all text-white text-[1.2rem] font-bold rounded-xl mt-10"
          type="button"
        >
          Load more memes
        </button>
      </main>
    </>
  );
}

export default Home;
