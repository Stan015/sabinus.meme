import { FC } from "react";
import Image from "next/image";
import { memes } from "../data/data.json";

type Meme = {
  id: number;
  src: string;
  description: string;
  expression: string[];
  width?: number;
  height?: number;
};

type Props = {
  memes: Meme[];
};

const Home: FC<Props> = () => {
  console.log(memes);

  return (
    <>
      <section className="w-full px-[10%] flex flex-col items-center gap-10 mt-6">
        <h1 className="text-[2.5rem] font-bold text-center w-3/4">
          Sabinus Memes Library. Search, download, upload, share and laugh with
          me!
        </h1>
        <input
          className="w-3/4 h-14 bg-gray-200 rounded-full px-10"
          type="text"
          placeholder="Search memes by description, expression or keywords. E.g, investor's vibe, crying, laughing, in trouble..."
        />
      </section>
      <main className="flex w-full justify-center px-[5%] my-20">
        <div className="w-max columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 [&>div:not(:first-child)]:mt-4">
          {memes.map((meme) => (
            <div
              className={`w-[${meme.width}px] h-max overflow-hidden`}
              key={meme.id}
            >
              <Image
                key={meme.id}
                className={`w-[${meme.width}px] h-[${meme.height}px] border-[6px] border-blue-500 rounded-3xl`}
                src={meme.src}
                alt={meme.description}
                width={meme.width}
                height={meme.height}
                // loading="lazy"
                priority
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
