import { seasonsAtom } from "@data/jotai";
import { useUpdateSeasons } from "@data/useData";
import { Flag } from "@ui/Flag";
import { RolodexIcon } from "@ui/icons";
import { getCleanName, getCompCountry, getVerboseDates } from "@utils/data-helpers";
import cx from "classix";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  competition: API.Competition;
}

const EventCard = ({ competition: comp }: Props) => {
  useUpdateSeasons();
  const seasons = useAtomValue(seasonsAtom);
  const { name, code, location, image, seasons: seasonCodes } = comp;

  const [imgLoading, setImgLoading] = useState(true);

  return (
    <article
      className={cx(
        "aspect-[2/3] w-full max-w-sm",
        "overflow-hidden rounded bg-white shadow-md",
        "flex flex-col",
        "group",
      )}
    >
      <Link
        href={`/events/${code}/${name}`}
        title={name}
        className={cx("grow", "overflow-hidden", "flex flex-col")}
      >
        <figure className={cx("relative w-full grow overflow-hidden")}>
          <Image
            src={image ?? "/img/blur.webp"}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={cx(
              "object-cover duration-500",
              "group-hover:scale-105",
              imgLoading && "scale-110 blur-2xl",
            )}
            onLoadingComplete={() => setImgLoading(false)}
          />
        </figure>

        <div className={cx("flex min-w-max flex-col gap-3 px-7 py-4")}>
          <h3 className={cx("text-lg font-bold uppercase")}>{getCleanName(name)}</h3>
          <span className={cx("flex items-center gap-2 font-semibold")}>
            <RolodexIcon className="-ml-[2px] -mt-1 aspect-square h-[18px] fill-current" />
            {getVerboseDates(comp)}
          </span>
          <span className={cx("flex items-center gap-3 text-sm font-medium text-secondary")}>
            <Flag country={getCompCountry(comp)} className="-mx-0.5 h-5 w-5" />
            {location}
          </span>
        </div>
      </Link>

      <div className={cx("mb-4 flex gap-2 px-7")}>
        {seasonCodes.map((code) => {
          const tag = code.slice(0, 3);
          const season = seasons.find((season) => season.code === code);
          const name = season?.name;

          return (
            <Link
              key={code}
              href={`/events/${code}/${name}`}
              title={name}
              className={cx(
                "px-3 py-2",
                "rounded-xl bg-accent text-white",
                "text-sm font-semibold uppercase",
                "hover:font-black",
              )}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </article>
  );
};

export default EventCard;
