import cn from "classix";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  title: string;
  date: string;
  href: string;
  imageUrl: string;
}

const HomeIntroNewsSecondary = ({ title, date, href, imageUrl }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-4",
        "grow",
        "rounded p-4 shadow-md",
        "sm:flex-row",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure
        className={cn(
          "relative aspect-video overflow-hidden rounded-xl",
          "sm:aspect-square sm:h-24",
        )}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className={cn(
            "duration-500",
            "rounded-xl object-cover",
            isHovered && "scale-105",
          )}
        />
      </figure>
      <div className={cn("flex grow items-center uppercase")}>
        <div className={cn("w-full px-4")}>
          <h3 className={cn("mb-1 font-bold")}>{title}</h3>
          <p className={cn("text-sm font-medium text-secondary")}>{date}</p>
        </div>
        <Image
          src="/img/icons/arrow.svg"
          alt=""
          height={20}
          width={20}
          className={cn(
            "mr-3 aspect-square h-5",
            isHovered && "translate-x-1/2",
          )}
        />
      </div>
    </Link>
  );
};

export default HomeIntroNewsSecondary;
