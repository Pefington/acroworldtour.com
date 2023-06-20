import cn from "classnames";

import SocialLink from "../ui/socialLink";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer
    className={cn(
      "w-full",
      "flex flex-col items-center justify-center gap-3",
      "sm:flex-row sm:justify-between",
      "bg-primary text-white",
      "px-5 pb-28 pt-9",
      "sm:px-20",
      "md:pb-9",
      "text-sm font-semibold",
    )}
  >
    <span className="leading-loose ">
      Copyright © {currentYear} Acro World Tour, <wbr />
      all rights reserved.
    </span>
    <div className="flex items-center gap-3">
      <SocialLink link="https://instagram.com/acroworldtour" />
      <SocialLink link="https://www.facebook.com/groups/120757714620928" />
      <SocialLink link="https://www.youtube.com/@acroworldtour" />
    </div>
  </footer>
);

export default Footer;
