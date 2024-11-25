import ImageSkeleton from "./skeletons/image-skeleton";

export default function LoadingImage() {
  return (
    <div className="flex gap-4 flex-col w-full h-full">
      <ImageSkeleton newClassName="h-[13rem]" />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton newClassName="h-[16rem]" />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton newClassName="h-[13rem]" />
      <ImageSkeleton />
      <ImageSkeleton />
      <ImageSkeleton newClassName="h-[15rem]" />
      <ImageSkeleton />
      <ImageSkeleton newClassName="h-[18rem]" />
      <ImageSkeleton newClassName="h-[22rem]" />
      <ImageSkeleton />
    </div>
  );
}
