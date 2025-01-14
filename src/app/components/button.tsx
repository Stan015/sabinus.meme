import cn from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "flex h-10 items-center rounded-lg bg-blue px-4 text-sm font-medium text-white transition-colors hover:bg-blue-deep focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-blue active:bg-blue-deep aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
