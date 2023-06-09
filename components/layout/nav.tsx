import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { preload } from "swr";

import awtLogo from "@/assets/img/logo.svg";
import { API_URL } from "@/constants";
import { fetcher } from "@/utils/fetcher";

import NavItem from "./navItem";

interface Props {
  activeNav: string;
  fontClass: string;
}

const Nav = ({ activeNav, fontClass }: Props) => (
  <nav
    style={{}}
    className={classNames(
      fontClass,
      /* "nav", */
      "absolute z-10 h-20 w-full items-center bg-primary",
      "md:fixed md:top-0 md:flex md:max-w-8xl md:px-5",
    )}
  >
    <div
      /* ::before */
      className={classNames(
        "absolute -left-5 hidden aspect-square h-full skew-x-[26deg] bg-primary md:block",
      )}
    />
    <div
      className={classNames(
        "z-10 flex h-20 w-full items-center justify-between fill-white px-5 text-white md:px-7",
      )}
    >
      <Link
        href="/"
        title="Navigate Home"
        className={classNames(
          /* "nav__logo", */
          "shrink-0",
        )}
      >
        <Image
          src={awtLogo}
          alt="Acro World Tour logo"
          width="0"
          height="0"
          className={classNames("w-24")}
        />
      </Link>
      <ul
        className={classNames(
          /* "nav__list", */
          "fixed bottom-5 left-1/2 -translate-x-1/2",
          "flex justify-around",
          "w-11/12 rounded bg-primary px-7 pb-4 pt-5",
          "md:relative md:bottom-0 md:left-0 md:transform-none md:justify-end md:gap-7 md:bg-transparent md:p-0",
          "",
        )}
      >
        <li
        // onMouseEnter={() => preload( `${API_URL}/competitions/`, fetcher )}
        >
          <NavItem link="" active={activeNav === "home"} />
        </li>
        {/* <li onMouseEnter={() => preload(`${API_URL}/seasons/`, fetcher)}>
            <NavItem link="Seasons" active={activeNav === "seasons"} />
          </li> */}
        <li
        // onMouseEnter={() => {
        //   preload(`${API_URL}/competitions/`, fetcher);
        //   preload(`${API_URL}/seasons/`, fetcher);
        // }}
        >
          <NavItem link="Competitions" active={activeNav === "competitions"} />
        </li>
        <li onMouseEnter={() => preload(`${API_URL}/pilots/`, fetcher)}>
          <NavItem link="Pilots" active={activeNav === "pilots"} />
        </li>
        <li onMouseEnter={() => preload(`${API_URL}/teams/`, fetcher)}>
          <NavItem link="Teams" active={activeNav === "teams"} />
        </li>
        {/* <li onMouseEnter={() => preload(`${API_URL}/judges/`, fetcher)}>
            <NavItem link="Judges" active={activeNav === "judges"} />
          </li> */}
        {/* <li onMouseEnter={() => preload(`${API_URL}/tricks/`, fetcher)}>
            <NavItem link="Tricks" active={activeNav === "tricks"} />
          </li> */}
      </ul>
    </div>
    <div
      /* after */
      className={classNames(
        "absolute -right-5 hidden aspect-square h-full -skew-x-[26deg] bg-primary md:block",
      )}
    />
  </nav>
);

export default Nav;
