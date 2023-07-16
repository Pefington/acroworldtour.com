import cn from "classix";
import countries from "i18n-iso-countries";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Pilot } from "@/types/project";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface Props {
  pilot: Pilot;
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

  const countryName = countries.getName(country, "en") || "Earth";

  return (
    <article
      className={cn(
        "relative flex flex-col justify-end",
        "aspect-[260/370] w-full max-w-card",
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
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
        title={`View ${name}'s profile`}
        className={cn(
          "z-10 w-full",
          "flex flex-col justify-end",
          "py-7 text-center",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <h3 className={cn("text-lg font-bold uppercase text-white")}>
            {name}
          </h3>
          <p className={cn("font-semibold uppercase text-secondary-medium")}>
            {countryName}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default PilotCard;
