import classNames from "classnames";

import header from "@/assets/img/header.jpg";

import SocialLink from "./ui/socialLink";

const Header = () => {
  return (
    <header
      className={classNames(
        "h-[50vh] min-h-[500px] w-full",
        "bg-cover bg-right bg-no-repeat",
        "flex items-center",
        "md:h-[80vh] md:min-h-[560px]",
        "md:bg-center",
      )}
      style={{
        backgroundImage: `url(${header.src})`,
      }}
    >
      <div className={classNames("mx-auto w-full max-w-[1440px] px-5", "")}>
        <article className="max-w-md translate-y-10 text-white">
          <span className="text-lg font-medium">Welcome to</span>
          <h1
            className={classNames(
              "my-[15px] text-[40px] font-black uppercase leading-[110%]",
              "md:text-[60px]",
            )}
          >
            The Acro World Tour
          </h1>
          <span className="text-lg font-medium">
            {"The world's best pilots fighting for the most prestigious title."}
          </span>
          <footer className="mt-[30px] flex items-center gap-3 px-1">
            <SocialLink
              link="https://instagram.com/acroworldtour"
              media="instagram"
            />
            <SocialLink
              link="https://www.facebook.com/groups/120757714620928"
              media="facebook"
            />
            <SocialLink
              link="https://www.youtube.com/@acroworldtour"
              media="youtube"
            />
          </footer>
        </article>
      </div>
    </header>
  );
};

export default Header;
