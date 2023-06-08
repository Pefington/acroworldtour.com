import classNames from "classnames";
import Link from "next/link";

import {
  CompetitionsIcon,
  HomeIcon,
  JudgesIcon,
  PilotsIcon,
  SeasonsIcon,
  TeamsIcon,
  TricksIcon,
} from "../ui/icons";

interface Props {
  link: string;
  active: boolean;
}

const NavItem = ({ link, active }: Props) => {
  const iconClasses = classNames("fill-white h-5 w-auto", "md:hidden");

  return (
    <Link
      href={`/${link.toLowerCase()}`}
      className={classNames(
        "flex flex-col items-center justify-center gap-1",
        "fill-white text-xs font-semibold uppercase",
        "md:text-sm",
        "md:hover:text-accent",
        active && "fill-accent text-accent",
      )}
    >
      {link === "" && <HomeIcon className={iconClasses} />}
      {link === "Seasons" && <SeasonsIcon className={iconClasses} />}
      {link === "Competitions" && <CompetitionsIcon className={iconClasses} />}
      {link === "Pilots" && <PilotsIcon className={iconClasses} />}
      {link === "Teams" && <TeamsIcon className={iconClasses} />}
      {link === "Judges" && <JudgesIcon className={iconClasses} />}
      {link === "Tricks" && <TricksIcon className={iconClasses} />}
      <span>{link || "Home"}</span>
    </Link>
  );
};

export default NavItem;
