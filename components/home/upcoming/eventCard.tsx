import classNames from "classnames";
import countries from "i18n-iso-countries";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";

import { CalendarIcon } from "@/components/ui/icons";
import { components } from "@/types";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface Props {
  competition: components["schemas"]["CompetitionPublicExport"];
}

const UpcomingEventCard = ({ competition }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const { name, code, start_date, end_date, location, image, seasons } =
    competition;

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
    <Link
      href={`/competitions/${code}`}
      title={name}
      className={classNames(
        "aspect-[2/3] w-full max-w-lg",
        "overflow-hidden rounded shadow-md",
        "flex flex-col",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className={classNames("relative h-2/3 w-full overflow-hidden")}>
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className={classNames(
              "object-cover duration-500",
              isHovered && "scale-105",
            )}
          />
        )}
      </figure>
      <figcaption
        className={classNames("flex min-w-max flex-col gap-3 px-7 py-4")}
      >
        <h3 className={classNames("text-lg font-bold uppercase")}>{name}</h3>
        <span className={classNames("flex items-center gap-2 font-semibold")}>
          <CalendarIcon className="-ml-[2px] -mt-1 aspect-square h-[18px] fill-current" />
          {`${startDay} ${startMonth !== endMonth ? startMonth : ""} ${
            startYear !== endYear ? startYear : ""
          } to ${endDay} ${endMonth} ${endYear}`}
        </span>
        <span
          className={classNames(
            "flex items-center gap-3 text-sm font-medium text-secondary",
          )}
        >
          {alpha2country && (
            <CircleFlag countryCode={alpha2country} className="-mx-[2px] h-5" />
            // <Image
            //   src={`https://hatscripts.github.io/circle-flags/flags/${alpha2country}.svg`}
            //   alt=""
            //   height={20}
            //   width={20}
            //   className={classNames("aspect-square h-5")}
            // />
          )}

          {location}
        </span>
        <div className={classNames("flex gap-2")}>
          {seasons.map((code) => {
            const tag = code.slice(0, 3);

            return (
              <span
                key={code}
                className="my-2 rounded-xl bg-accent px-3 py-2 text-sm font-semibold uppercase text-white"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </figcaption>
    </Link>
  );
};

export default UpcomingEventCard;
