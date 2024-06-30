import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex w-full h-[6rem] justify-between items-center px-[10%]">
        <Link href={"/"}>
          <Image className="w-full h-full" src={"/logo.png"} alt="logo" width={40} height={40} priority />
        </Link>

        <nav className="flex gap-6">
          <Link href={"/"}>Home</Link>
          <Link href={"/upload"}>Upload</Link>
          <Link href={"/favourites"}>Favourites</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>

        <nav className="flex gap-6">
          <Link href={"/login"}>Login</Link>
          <Link href={"/sign-up"}>Sign Up</Link>
        </nav>
      </header>
    </>
  );
}
