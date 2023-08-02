import cx from "classix";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  date: string;
  href: string;
  imageUrl: string;
}

const HomeIntroNewsSecondary = ({ title, date, href, imageUrl }: Props) => (
  <Link
    href={href}
    className={cx("flex flex-col gap-4", "grow", "rounded p-4 shadow-md", "sm:flex-row", "group")}
  >
    <figure
      className={cx("relative aspect-video overflow-hidden rounded-xl", "sm:aspect-square sm:h-24")}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, 25vw"
        className={cx("duration-500", "rounded-xl object-cover", "group-hover:scale-105")}
      />
    </figure>
    <div className={cx("flex grow items-center uppercase")}>
      <div className={cx("w-full px-4")}>
        <h3 className={cx("mb-1 font-bold")}>{title}</h3>
        <p className={cx("text-sm font-medium text-secondary")}>{date}</p>
      </div>
      <Image
        src="/img/icons/arrow.svg"
        alt=""
        height={20}
        width={20}
        className={cx("mr-3 aspect-square h-5", "group-hover:translate-x-1/2")}
      />
    </div>
  </Link>
);

export default HomeIntroNewsSecondary;
