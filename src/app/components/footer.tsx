import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <section className="w-full h-[6rem] px-[10%] text-base max-sm:text-[0.6rem] py-6 flex gap-2 items-center justify-between border-t-[1px] border-t-transparent dark:border-t-blue bg-gradient-to-b from-clr-light-start-rgb to-clr-light-end-rgb dark:from-clr-dark-start-rgb dark:to-clr-dark-end-rgb text-clr-light dark:text-clr-dark">
        <p>
          <span className="text-[1.2rem] max-sm:text-base text-blue">
            &copy;
          </span>{" "}
          {new Date().getFullYear()}. All rights reserved.
        </p>

        <Link
          href={"https://www.stanleyazi.me"}
          target="_blank"
          className="flex gap-2 max-sm:gap-1 items-center border-b border-b-transparent hover:border-b-blue transition-all py-1 px-3 rounded-full"
        >
          Dev: Stanley Azi
          <Image
            src="/stanley_azi.png"
            alt="Stanley Azi Avatar"
            className="rounded-full"
            width={40}
            height={40}
            priority
          />
        </Link>
      </section>
    </>
  );
};

export default Footer;
