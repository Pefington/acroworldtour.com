import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  title: string;
  href: string;
  imageUrl: string;
}

const HomeIntroNewsMain = ({ title, href, imageUrl }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      title={title}
      className={classNames("overflow-hidden rounded shadow-md")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure
        className={classNames("relative w-full overflow-hidden pt-[50%]")}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={classNames(
            "object-cover duration-500",
            isHovered && "scale-105",
          )}
        />
      </figure>
      <figcaption
        className={classNames("flex items-center px-7 py-4 uppercase")}
      >
        <div className={classNames("flex flex-col gap-1", "flex-1")}>
          <h3 className={classNames("font-bold")}>
            The AWT 2023 is about to start!
          </h3>
          <span className={classNames("text-sm font-medium text-secondary")}>
            25 May 2023
          </span>
        </div>
        <Image
          src="/img/icons/arrow.svg"
          alt=""
          height={20}
          width={20}
          className={classNames(
            "aspect-square h-5",
            isHovered && "translate-x-1/2",
          )}
        />
      </figcaption>
    </Link>
  );
};

export default HomeIntroNewsMain;
