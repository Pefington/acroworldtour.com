import cn from "classnames";
import Image from "next/image";

import SocialLink from "../ui/socialLink";

const HomeHero = () => {
  return (
    <header
      className={cn(
        "relative h-[50vh] min-h-[500px]",
        "bg-cover bg-right bg-no-repeat",
        "flex items-end",
        "md:-mt-20",
        "lg:bg-center",
      )}
    >
      <Image
        src="/img/hero.jpg"
        alt=""
        fill
        sizes="100vw"
        className={cn("-z-10 object-cover object-right", "md:object-center")}
      />
      <article className={cn("max-w-lg pb-20 text-white awt-center")}>
        <span className={cn("text-lg font-medium")}>Welcome to</span>
        <h1
          className={cn(
            "my-4 text-4xl font-black uppercase",
            "sm:text-5xl",
            "md:text-6xl",
          )}
        >
          The Acro World Tour
        </h1>
        <span className={cn("text-lg font-medium")}>
          The world&apos;s best pilots fighting for the most prestigious title.
        </span>
        <footer className={cn("mt-7 flex items-center gap-3 px-1")}>
          <SocialLink link="https://instagram.com/acroworldtour" />
          <SocialLink link="https://www.facebook.com/groups/120757714620928" />
          <SocialLink
            link="https://www.youtube.com/@acroworldtour"
            className="fill-white"
          />
        </footer>
      </article>
    </header>
  );
};

export default HomeHero;
