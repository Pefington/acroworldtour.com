import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  title: string;
  href: string;
  imageUrl: string;
}

const HomeIntroNewsSecondary = ({ title, href, imageUrl }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={classNames(
        "flex flex-col gap-4",
        "grow",
        "rounded p-4 shadow-md",
        "sm:flex-row",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure
        className={classNames(
          "relative aspect-video overflow-hidden rounded-xl",
          "sm:aspect-square sm:h-24",
        )}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={classNames(
            "duration-500",
            "rounded-xl object-cover",
            isHovered && "scale-105",
          )}
        />
      </figure>
      <figcaption className={classNames("flex grow items-center uppercase")}>
        <div className={classNames("w-full px-4")}>
          <h3 className={classNames("mb-1 font-bold")}>
            The AWT 2022 Overall Standings
          </h3>
          <span className={classNames("text-sm font-medium text-secondary")}>
            24 September 2022
          </span>
        </div>
        <Image
          src="/img/icons/arrow.svg"
          alt=""
          height={20}
          width={20}
          className={classNames(
            "mr-3 aspect-square h-5",
            isHovered && "translate-x-1/2",
          )}
        />
      </figcaption>
    </Link>
  );
};

export default HomeIntroNewsSecondary;
