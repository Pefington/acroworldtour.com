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

const HomeIntroNewsMain = ({ title, date, href, imageUrl }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      title={title}
      className={cn("overflow-hidden rounded shadow-md")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className={cn("relative w-full overflow-hidden pt-[50%]")}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className={cn("object-cover duration-500", isHovered && "scale-105")}
        />
      </figure>
      <div className={cn("flex items-center px-7 py-4 uppercase")}>
        <div className={cn("flex flex-col gap-1", "flex-1")}>
          <h3 className={cn("font-bold")}>{title}</h3>
          <p className={cn("text-sm font-medium text-secondary")}>{date}</p>
        </div>
        <Image
          src="/img/icons/arrow.svg"
          alt=""
          height={20}
          width={20}
          className={cn("aspect-square h-5", isHovered && "translate-x-1/2")}
        />
      </div>
    </Link>
  );
};

export default HomeIntroNewsMain;
