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
          className="w-3/4 h-14 bg-gray-100 rounded-full px-10 flex border transition-all border-white text-md ring-offset-blue-400 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Search memes by description, expression or keywords. E.g, investor's vibe, crying, laughing, in trouble..."
        />
      </section>
      <main className="flex w-full justify-center px-[5%] my-20">
        <div className="w-max columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [&>div:not(:first-child)]:mt-4">
          {memes.map((meme) => (
            <div
              className={`w-[${meme.width / 1.4}px] h-max overflow-hidden`}
              key={meme.id}
            >
              <Image
                key={meme.id}
                className={`w-[${meme.width / 1.4}px] h-[${meme.height / 1.4}px] border-[5px] border-blue-500 rounded-3xl`}
                src={meme.src}
                alt={meme.description}
                width={meme.width / 1.4}
                height={meme.height / 1.4}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
