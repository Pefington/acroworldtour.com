import cn from "classnames";
import countries from "i18n-iso-countries";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import useSWR from "swr";

import { RolodexIcon } from "@/components/ui/icons";
import { API_URL } from "@/constants";
import { components } from "@/types";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type Season = components["schemas"]["SeasonExport"];

interface Props {
  competition: components["schemas"]["CompetitionPublicExport"];
}

const EventCard = ({ competition }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const {
    data: seasons,
    error: seasonsError,
    isLoading: seasonsLoading,
  } = useSWR<Season[]>(`${API_URL}/seasons/`);

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
  const alpha2country = country
    ? countries.getAlpha2Code(country, "en").toLowerCase()
    : null;

  return (
    <article
      className={cn(
        "aspect-[2/3] w-full",
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
            src={image ?? "/img/blur.jpg"}
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
        <figcaption className={cn("flex min-w-max flex-col gap-3 px-7 py-4")}>
          <h3 className={cn("text-lg font-bold uppercase")}>{name}</h3>
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
            <CircleFlag
              countryCode={alpha2country || "earth"}
              className="-mx-[2px] h-5"
            />
            {location}
          </span>
        </figcaption>
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
                "hover:px-4",
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
