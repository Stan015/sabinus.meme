import cn from "@/utils/cn";

export default function ImageSkeleton({
  newClassName,
}: {
  newClassName?: string;
}) {
  return (
    <div
      className={cn(
        "block h-[20rem] w-full bg-gray-400 animate-pulse rounded-3xl break-inside-avoid",
        newClassName,
      )}
    />
  );
}
