"use client";

import { Button } from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mt-[7rem] px-[10%] flex flex-col items-center gap-8 w-full min-h-[calc(100dvh-15rem)] mb-[2rem]">
      <h1 className="text-[2rem] max-md:text-[1.5rem] max-sm:text-[1.3rem] font-bold">
        Something went wrong.
      </h1>
      <Image
        src="/media/error-img.JPG"
        alt="sabinus meme for error page"
        width={400}
        height={600}
        className="border-[5px] border-blue rounded-3xl"
      />
      <div className="flex gap-3">
        <Button className="text-base" onClick={() => router.back()}>
          Go back
        </Button>
        <Button className="text-base" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </section>
  );
}
