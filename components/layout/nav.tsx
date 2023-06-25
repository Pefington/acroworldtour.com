import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { preload } from "swr";

import { API_URL } from "@/constants";
import { fetcher } from "@/utils/fetcher";

import NavItem from "./navItem";

interface Props {
  activeNav: string;
  fontClass: string;
}

const Nav = ({ activeNav, fontClass }: Props) => (
  <nav
    className={cn(
      fontClass,
      "absolute z-10 flex h-20 w-full max-w-8xl items-center bg-primary text-white",
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

      {/* <li onMouseEnter={() => preload(`${API_URL}/seasons/`, fetcher)}>
            <NavItem link="Seasons" active={activeNav === "seasons"} />
        </li> */}

      <li
        onMouseEnter={() => {
          preload(`${API_URL}/competitions/`, fetcher);
          preload(`${API_URL}/seasons/`, fetcher);
        }}
      >
        <NavItem link="Events" active={activeNav === "events"} />
      </li>

      <li
        onMouseEnter={() => {
          preload(`${API_URL}/competitions/`, fetcher);
          preload(`${API_URL}/seasons/`, fetcher);
        }}
      >
        <NavItem link="Results" active={activeNav === "results"} />
      </li>

      <li onMouseEnter={() => preload(`${API_URL}/pilots/`, fetcher)}>
        <NavItem link="Pilots" active={activeNav === "pilots"} />
      </li>

      {/* <li onMouseEnter={() => preload(`${API_URL}/teams/`, fetcher)}>
          <NavItem link="Teams" active={activeNav === "teams"} />
        </li> */}

      {/* <li onMouseEnter={() => preload(`${API_URL}/judges/`, fetcher)}>
            <NavItem link="Judges" active={activeNav === "judges"} />
          </li> */}

      {/* <li onMouseEnter={() => preload(`${API_URL}/tricks/`, fetcher)}>
            <NavItem link="Tricks" active={activeNav === "tricks"} />
          </li> */}
    </ul>
  </nav>
);

export default Nav;
