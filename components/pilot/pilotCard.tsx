import cn from "classnames";
import countries from "i18n-iso-countries";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { components } from "@/types";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface Props {
  pilot: components["schemas"]["Pilot"];
}

const PilotCard = ({ pilot }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const {
    civlid,
    name,
    photo: photoLowres,
    photo_highres: photo,
    country,
  } = pilot;

  const countryName = countries.getName(country, "en");

  return (
    <article
      className={cn(
        "relative flex flex-col justify-end",
        "aspect-[260/370] w-full max-w-[min(80vw,260px)]",
        "overflow-hidden rounded shadow-md",
        "hover:drop-shadow-lg",
      )}
    >
      <figure
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-b from-transparent to-slate-900/90",
        )}
      >
        <Image
          src={photo ?? photoLowres ?? "/img/blur.jpg"}
          alt={name}
          fill
          className={cn(
            "-z-10 object-cover duration-500",
            isHovered && "scale-105",
            imgLoading && "scale-110 blur-2xl",
          )}
          onLoadingComplete={() => setImgLoading(false)}
        />
      </figure>
      <Link
        href={`/pilots/${civlid}`}
        title={name}
        className={cn(
          "z-10 w-full",
          "flex flex-col justify-end",
          "py-7 text-center",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <figcaption className={cn()}>
          <h3 className={cn("text-lg font-bold uppercase text-white")}>
            {name}
          </h3>
          <span className={cn("font-semibold uppercase text-secondary-medium")}>
            {countryName}
          </span>
        </figcaption>
      </Link>
    </article>
  );
};

export default PilotCard;
