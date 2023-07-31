import { activeSeasonCodesAtom, activeYearAtom } from "@state";
import { Flag } from "@ui/Flag";
import { ChevronIcon } from "@ui/icons";
import cx from "classix";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

import SeasonCardDetails from "./SeasonCardDetails";

interface Props {
  season: API.Season;
}

const SeasonCard = ({ season }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [activeYear] = useAtom(activeYearAtom);
  const [activeSeasonCodes, setActiveSeasonCodes] = useAtom(
    activeSeasonCodesAtom,
  );

  useEffect(() => {
    setIsBlurred(
      !!activeSeasonCodes[activeYear] &&
        activeSeasonCodes[activeYear] !== season.code,
    );
    setIsExpanded(activeSeasonCodes[activeYear] === season.code);
  }, [activeSeasonCodes, activeYear, season.code]);

  const { name, image, competitions, country } = season;

  const handleSelect = (code: string) => {
    const newSeasonCodes = { ...activeSeasonCodes };

    newSeasonCodes[activeYear] === code
      ? delete newSeasonCodes[activeYear]
      : (newSeasonCodes[activeYear] = code);

    setActiveSeasonCodes(newSeasonCodes);
  };

  const nameWithoutYear = name.split(" ").slice(0, -1).join(" ");

  return (
    <article
      className={cx(
        "w-full rounded-md shadow-md",
        "group",
        !isExpanded && "aspect-video",
      )}
    >
      <button
        className={cx(
          "flex flex-col justify-end",
          "aspect-video w-full min-w-max",
          "overflow-hidden rounded-md bg-white",
          isBlurred &&
            "opacity-30 blur-[1px] group-hover:opacity-80 group-hover:blur-none",
        )}
        onClick={() => handleSelect(season.code)}
        onKeyDown={({ key }) => key === "Enter" && handleSelect(season.code)}
      >
        <figure className={cx("relative flex h-full w-full overflow-hidden")}>
          {image ? (
            <Image
              src={image}
              alt={name}
              priority
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className={cx(
                "object-cover duration-500",
                !isBlurred && !isExpanded && "group-hover:scale-105",
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
                  className={cx(
                    "relative h-full w-full",
                    !isBlurred && !isExpanded && "group-hover:scale-105",
                    imgLoading && "scale-110 blur-2xl",
                  )}
                >
                  <Image
                    src={compImg || "/img/blur.webp"}
                    alt={name}
                    priority
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 10vw"
                    className={cx("object-cover")}
                    onLoadingComplete={() => setImgLoading(false)}
                  />
                </div>
              );
            })
          )}
        </figure>
        <div className={cx("flex items-center gap-2 px-4 py-2")}>
          <Flag country={country} className="-mt-0.5 h-5 w-5" />
          <h4 className={cx("font-bold uppercase", "sm:text-lg")}>
            {nameWithoutYear}
          </h4>
          <ChevronIcon
            className={cx("h-4 fill-secondary", isExpanded && "rotate-180")}
          />
        </div>
      </button>

      <SeasonCardDetails season={season} isExpanded={isExpanded} />
    </article>
  );
};

export default SeasonCard;
