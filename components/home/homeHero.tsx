import classNames from "classnames";

import header from "@/assets/img/header.jpg";

import SocialLink from "../ui/socialLink";

const HomeHero = () => {
  return (
    <header
      className={classNames(
        /* "header", */
        "h-[50vh min-h-[500px]",
        "bg-cover bg-right bg-no-repeat",
        "flex items-center",
        "px-5",
        "lg:px-14",
        "md:h-[80vh]",
        "md:bg-center",
      )}
      style={{
        backgroundImage: `url(${header.src})`,
      }}
    >
      <article
        className={classNames(
          /* "header__content", */
          "max-w-md translate-y-10 text-white",
        )}
      >
        <span
          className={classNames(
            /* "header__pre-title", */
            "text-lg font-medium",
          )}
        >
          Welcome to
        </span>
        <h1
          className={classNames(
            /* "header__title", */
            "my-4 text-4xl font-black uppercase",
            "sm:text-5xl",
            "md:text-6xl",
          )}
        >
          The Acro World Tour
        </h1>
        <span
          className={classNames(
            /* "header__subtitle", */
            "text-lg font-medium",
          )}
        >
          {"The world's best pilots fighting for the most prestigious title."}
        </span>
        <footer
          className={classNames(
            /* "header_icons icons", */
            "mt-7 flex items-center gap-3 px-1",
          )}
        >
          <SocialLink link="https://instagram.com/acroworldtour" />
          <SocialLink link="https://www.facebook.com/groups/120757714620928" />
          <SocialLink link="https://www.youtube.com/@acroworldtour" />
        </footer>
      </article>
    </header>
  );
};

export default HomeHero;
