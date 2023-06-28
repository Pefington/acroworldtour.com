import cn from "classnames";
import countries from "i18n-iso-countries";
import Image from "next/image";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";

import { components } from "@/types";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type Season = components["schemas"]["SeasonExport"];

interface Props {
  season: Season;
  active: boolean | null;
  handleSelect: Function;
}

const SeasonCard = ({ season, active, handleSelect }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const { name, image, competitions, country } = season;

  const alpha2country = country
    ? countries
        .getAlpha2Code(countries.getName(country, "en"), "en")
        ?.toLowerCase()
    : null;

  return (
    <button
      className={cn(
        "flex flex-col justify-end awt-accordion-closed",
        "aspect-video w-full min-w-max",
        "overflow-hidden rounded-md bg-white shadow-md",
        !active && "opacity-30 blur-[1px]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleSelect(season)}
      onKeyDown={({ key }) => key === "Enter" && handleSelect(season)}
    >
      <figure className={cn("relative flex h-full w-full overflow-hidden")}>
        {image ? (
          <Image
            src={image}
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
        ) : (
          competitions.map((competition) => {
            const { code, image: compImg } = competition;
            return (
              <div
                key={code}
                className={cn(
                  "h-full w-full",
                  isHovered ? "scale-105" : "scale-100",
                  imgLoading && "scale-110 blur-2xl",
                )}
              >
                <Image
                  src={compImg || "/img/blur.jpg"}
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 10vw"
                  className={cn("object-cover")}
                  onLoadingComplete={() => setImgLoading(false)}
                />
              </div>
            );
          })
        )}
      </figure>
      <figcaption className={cn("flex gap-2 px-4 py-2")}>
        <span
          className={cn("col-span-8 flex items-center gap-3 font-semibold")}
        >
          <CircleFlag
            countryCode={alpha2country || "earth"}
            className="-mt-0.5 h-5"
          />
          <h4 className={cn("font-bold uppercase", "sm:text-lg")}>
            {name.split(" ").slice(0, -1).join(" ")}
          </h4>
        </span>
      </figcaption>
    </button>
  );
};

export default SeasonCard;
