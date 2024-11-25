import ImageSkeleton from "@/components/skeletons/image-skeleton";

export default function LoadingImage() {
  return (
  <section className="w-full min-h-[calc(100dvh-16rem)] mb-[2rem] mt-[8rem] bg-unset px-[10%] flex flex-col items-center gap-5">
    <div className="flex gap-4 flex-col w-full h-full items-center justify-center">
      <div
        className="block h-[3rem] w-[15rem] bg-gray-400 animate-pulse rounded-3xl break-inside-avoid"
      />
      <ImageSkeleton newClassName="w-[20rem] h-[30rem] rounded-3xl" />
      <div
        className="block h-[3rem] w-[10rem] bg-gray-400 animate-pulse rounded-3xl break-inside-avoid"
      />
    </div>
  </section>
  );
}
