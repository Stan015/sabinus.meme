"use client";

import { Button } from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="mt-[7rem] px-[10%] flex flex-col items-center gap-8 w-full min-h-[calc(100dvh-15rem)] mb-[2rem]">
      <h1 className="text-[2rem] max-md:text-[1.5rem] max-sm:text-[1.3rem] font-bold">
        404 - Page Not Found.
      </h1>
      <Image
        src="/media/not-found.jpg"
        alt="sabinus meme for 404 page"
        width={400}
        height={600}
        className="border-[5px] border-blue rounded-3xl"
      />
      <Button className="text-base" onClick={() => router.back()}>
        Go back
      </Button>
    </section>
  );
}
