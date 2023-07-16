import cn from "classix";
import Image from "next/image";
import Link from "next/link";

import { swrPreload } from "@/utils/swr";

import NavItem from "./navItem";

interface Props {
  activeNav: string;
  fontClass: string;
}

const Nav = ({ activeNav, fontClass }: Props) => (
  <nav
    className={cn(
      fontClass,
      "absolute z-50 flex h-20 w-full max-w-8xl items-center bg-primary text-white",
      "md:fixed md:top-0",
      "before:aspect-[0.5] before:h-full before:-translate-x-[20px] before:skew-x-[26deg] before:bg-primary",
      "after:aspect-[0.5] after:h-full after:translate-x-[20px] after:-skew-x-[26deg] after:bg-primary",
    )}
  >
    <Link href="/" title="Navigate Home" className={cn("h-3/5 shrink-0")}>
      <Image
        src="/img/logo.svg"
        alt="Acro World Tour logo"
        width="0"
        height="0"
        className={cn("h-full w-auto")}
      />
    </Link>
    <ul
      className={cn(
        "fixed bottom-5 left-1/2 -translate-x-1/2",
        "flex justify-around",
        "w-11/12 rounded bg-primary px-7 pb-4 pt-5",
        "md:relative md:bottom-0 md:left-0 md:transform-none",
        "md:mr-4 md:justify-end md:gap-14 md:p-0",
      )}
    >
      <li>
        <NavItem link="" active={activeNav === "home"} />
      </li>

      {/* <li onMouseEnter={() => swrPreload("seasons")}>
            <NavItem link="Seasons" active={activeNav === "seasons"} />
        </li> */}

      <li
        onMouseEnter={() => {
          swrPreload("seasons");
          swrPreload("competitions");
        }}
      >
        <NavItem link="Events" active={activeNav === "events"} />
      </li>

      <li
        onMouseEnter={() => {
          swrPreload("competitions");
          swrPreload("seasons");
        }}
      >
        <NavItem link="Results" active={activeNav === "results"} />
      </li>

      <li onMouseEnter={() => swrPreload("pilots")}>
        <NavItem link="Pilots" active={activeNav === "pilots"} />
      </li>

      {/* <li onMouseEnter={() => swrPreload("teams")}>
          <NavItem link="Teams" active={activeNav === "teams"} />
        </li> */}

      {/* <li onMouseEnter={() => swrPreload("judges")}>
            <NavItem link="Judges" active={activeNav === "judges"} />
          </li> */}

      {/* <li onMouseEnter={() => swrPreload("tricks")}>
            <NavItem link="Tricks" active={activeNav === "tricks"} />
          </li> */}
    </ul>
  </nav>
);

export default Nav;
