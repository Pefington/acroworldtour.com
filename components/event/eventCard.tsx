import cn from "classix";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Flag } from "@/components/ui/flag";
import { RolodexIcon } from "@/components/ui/icons";
import { Competition, Season } from "@/types/project";
import { useAPI } from "@/utils/swr";

interface Props {
  competition: Competition;
}

const EventCard = ({ competition }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const {
    data: seasons,
    isLoading: seasonsLoading,
    error: seasonsError,
  } = useAPI<Season[]>("seasons");

  const {
    name,
    code,
    start_date,
    end_date,
    location,
    image,
    seasons: seasonCodes,
  } = competition;

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString("default", {
    month: "long",
  });
  const startYear = startDate.getFullYear();
  const endDay = endDate.getDate();
  const endMonth = endDate.toLocaleString("default", {
    month: "long",
  });
  const endYear = endDate.getFullYear();

  const country = location.split(", ").at(-1);

  const nameWithoutYear = name.split(" ").slice(0, -1).join(" ");

  return (
    <article
      className={cn(
        "aspect-[2/3] w-full max-w-sm",
        "overflow-hidden rounded bg-white shadow-md",
        "flex flex-col",
      )}
    >
      <Link
        href={`/competitions/${code}`}
        title={name}
        className={cn("grow", "overflow-hidden", "flex flex-col")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <figure className={cn("relative w-full grow overflow-hidden")}>
          <Image
            src={image ?? "/img/blur.webp"}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={cn(
              "object-cover duration-500",
              isHovered && "scale-105",
              imgLoading && "scale-110 blur-2xl",
            )}
            onLoadingComplete={() => setImgLoading(false)}
          />
        </figure>
        <div className={cn("flex min-w-max flex-col gap-3 px-7 py-4")}>
          <h3 className={cn("text-lg font-bold uppercase")}>
            {nameWithoutYear}
          </h3>
          <span className={cn("flex items-center gap-2 font-semibold")}>
            <RolodexIcon className="-ml-[2px] -mt-1 aspect-square h-[18px] fill-current" />
            {`${startDay} ${startMonth !== endMonth ? startMonth : ""} ${
              startYear !== endYear ? startYear : ""
            } to ${endDay} ${endMonth} ${endYear}`}
          </span>
          <span
            className={cn(
              "flex items-center gap-3 text-sm font-medium text-secondary",
            )}
          >
            <Flag country={country} className="-mx-0.5 h-5 w-5" />
            {location}
          </span>
        </div>
      </Link>
      <div className={cn("mb-4 flex gap-2 px-7")}>
        {seasonCodes.map((code) => {
          const tag = code.slice(0, 3);
          const season = seasons?.find((season) => season.code === code);
          const name = season?.name;
          return (
            <Link
              key={code}
              href={`/seasons/${code}`}
              title={name}
              className={cn(
                "px-3 py-2",
                "rounded-xl bg-accent text-white",
                "text-sm font-semibold uppercase",
                "hover:font-black",
                seasonsLoading && "animate-pulse",
              )}
            >
              {(seasonsError && "❗") || seasonsLoading ? "..." : tag}
            </Link>
          );
        })}
      </div>
    </article>
  );
};

export default EventCard;
