import cn from "classix";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  date: string;
  href: string;
  imageUrl: string;
}

const HomeIntroNewsMain = ({ title, date, href, imageUrl }: Props) => (
  <Link
    href={href}
    title={title}
    className={cn("group overflow-hidden rounded shadow-md")}
  >
    <figure className={cn("relative w-full overflow-hidden pt-[50%]")}>
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className={cn("object-cover duration-500", "group-hover:scale-105")}
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
        className={cn("aspect-square h-5", "group-hover:translate-x-1/2")}
      />
    </div>
  </Link>
);

export default HomeIntroNewsMain;
