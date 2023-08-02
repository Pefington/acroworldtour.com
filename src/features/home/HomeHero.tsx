import SocialLink from "@ui/SocialLink";
import cx from "classix";
import Image from "next/image";

const HomeHero = () => {
  return (
    <header
      className={cx(
        "awt-center",
        "relative h-[50vh] min-h-[500px]",
        "bg-cover bg-right bg-no-repeat",
        "flex items-end",
        "md:-mt-20",
        "lg:bg-center",
      )}
    >
      <Image
        src="/img/hero.webp"
        alt=""
        priority
        fill
        sizes="100vw"
        className={cx("-z-10 object-cover object-right", "md:object-center")}
      />
      <article className={cx("max-w-lg pb-20 text-white")}>
        <p className={cx("text-lg font-medium")}>Welcome to</p>
        <h1 className={cx("my-4 text-4xl font-black uppercase", "sm:text-5xl", "md:text-6xl")}>
          The Acro World Tour
        </h1>
        <p className={cx("text-lg font-medium")}>
          The world&apos;s best pilots fighting for the most prestigious title.
        </p>
        <div className={cx("mt-7 flex items-center gap-3 px-1")}>
          <SocialLink link="https://instagram.com/acroworldtour" />
          <SocialLink link="https://www.facebook.com/groups/120757714620928" />
          <SocialLink link="https://www.youtube.com/@acroworldtour" className="fill-white" />
        </div>
      </article>
    </header>
  );
};

export default HomeHero;
