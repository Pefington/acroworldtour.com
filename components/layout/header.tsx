import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import lines from "/img/lines.svg";
import awtLogo from "/img/logo.svg";

interface Props {
  fontClass: string;
}

const Header = ({ fontClass }: Props) => {
  return (
    <header
      className={classNames(
        fontClass,
        "bg-awt-dark-950 z-20 flex h-24 w-full items-center justify-between bg-contain bg-right bg-no-repeat px-6 text-white",
        "lg:fixed lg:top-0",
      )}
      style={{
        backgroundImage: `url(${lines.src})`,
      }}
    >
      <Link href="/" title="Navigate Home">
        <Image
          src={awtLogo}
          alt="Acro World Tour logo"
          width="0"
          height="0"
          className="h-11 w-auto"
        />
      </Link>
    </header>
  );
};

export default Header;
