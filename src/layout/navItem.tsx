import cn from "classix";
import Link from "next/link";

import {
  CalendarIcon,
  HomeIcon,
  JudgesIcon,
  PersonIcon,
  TeamsIcon,
  TricksIcon,
  TrophyIcon,
} from "@/src/ui/icons";

interface Props {
  link: string;
  active: boolean;
}

const NavItem = ({ link, active }: Props) => {
  const iconClasses = cn("fill-white h-5 w-auto", "md:hidden");

  return (
    <Link
      href={`/${link.toLowerCase()}`}
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        "fill-white text-xs font-semibold uppercase",
        "md:text-sm",
        "hover:text-hover",
        active && "fill-accent-light text-accent-light",
      )}
    >
      {link === "" && <HomeIcon className={iconClasses} />}
      {link === "Events" && <CalendarIcon className={iconClasses} />}
      {link === "Results" && <TrophyIcon className={iconClasses} />}
      {link === "Pilots" && <PersonIcon className={iconClasses} />}

      {link === "Teams" && <TeamsIcon className={iconClasses} />}

      {link === "Seasons" && <CalendarIcon className={iconClasses} />}
      {link === "Competitions" && <TrophyIcon className={iconClasses} />}

      {link === "Judges" && <JudgesIcon className={iconClasses} />}
      {link === "Tricks" && <TricksIcon className={iconClasses} />}

      <p>{link || "Home"}</p>
    </Link>
  );
};

export default NavItem;
