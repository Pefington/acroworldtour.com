import { Pilot } from "@api-types";
import { getCountryName } from "@utils/countries";
import cx from "classix";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  pilot: Pilot;
  loading?: boolean;
}

const PilotCard = ({ pilot, loading }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);

  const {
    civlid,
    name,
    photo: photoLowres,
    photo_highres: photo,
    country,
  } = loading
    ? {
        civlid: 99999,
        name: "Pilot Loading",
        photo: "/img/blur.webp",
        photo_highres: "/img/blur.webp",
        country: undefined,
      }
    : pilot;

  return (
    <article
      className={cx(
        "relative flex flex-col justify-end",
        "aspect-[260/370] w-full max-w-card",
        "overflow-hidden rounded shadow-md",
        "hover:drop-shadow-lg",
        "group",
      )}
    >
      <figure
        className={cx(
          "absolute inset-0",
          "bg-gradient-to-b from-transparent to-slate-900/90",
        )}
      >
        <Image
          src={photo ?? photoLowres ?? "/img/blur.webp"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className={cx(
            "-z-10 object-cover duration-500",
            "group-hover:scale-105",
            imgLoading && "scale-110 blur-2xl",
          )}
          onLoadingComplete={() => setImgLoading(false)}
        />
      </figure>
      <Link
        href={`/pilots/${civlid}`}
        title={`${name}'s page`}
        className={cx(
          "z-10 w-full",
          "flex flex-col justify-end",
          "py-7 text-center",
          loading && "animate-pulse overflow-hidden blur-sm",
          "group/link",
        )}
      >
        <h3 className={cx("text-lg font-bold uppercase text-white")}>{name}</h3>
        <p className={cx("font-semibold uppercase text-secondary-medium")}>
          {getCountryName(country)}
        </p>
      </Link>
    </article>
  );
};

export default PilotCard;
