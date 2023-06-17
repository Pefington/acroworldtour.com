import classNames from "classnames";
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
      className={classNames(
        "relative flex flex-col justify-end",
        "aspect-[260/370] w-full max-w-[min(80vw,260px)]",
        "overflow-hidden rounded shadow-md",
        "hover:drop-shadow-lg",
      )}
    >
      <figure
        className={classNames(
          "absolute inset-0",
          "bg-gradient-to-b from-transparent to-slate-900/90",
        )}
      >
        <Image
          src={photo || photoLowres}
          alt={name}
          fill
          className={classNames(
            "-z-10 object-cover duration-500",
            isHovered && "scale-105",
          )}
        />
      </figure>{" "}
      <Link
        href={`/pilots/${civlid}`}
        title={name}
        className={classNames(
          "z-10 w-full",
          "flex flex-col justify-end",
          "py-7 text-center",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <figcaption className={classNames()}>
          <h3 className={classNames("text-lg font-bold uppercase text-white")}>
            {name}
          </h3>
          <span
            className={classNames(
              "font-semibold uppercase text-secondary-medium",
            )}
          >
            {countryName}
          </span>
        </figcaption>
      </Link>
    </article>
  );
};

export default PilotCard;