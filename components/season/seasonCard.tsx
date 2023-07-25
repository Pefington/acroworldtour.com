import useLocalStorage from "@state/useLocalStorage";
import { useUserContext } from "@state/userContext";
import { Flag } from "@ui/flag";
import { ChevronIcon } from "@ui/icons";
import cn from "classix";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Season } from "@/types/project";

import SeasonCardDetails from "./seasonCardDetails";

interface Props {
  season: Season;
}

const SeasonCard = ({ season }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeYear, activeSeasonCodes, setActiveSeasonCodes } =
    useUserContext();

  const [storedSeasonCodes, setStoredSeasonCodes] = useLocalStorage(
    "activeSeasonCodes",
    null,
  );

  useEffect(() => {
    if (storedSeasonCodes) {
      setActiveSeasonCodes(storedSeasonCodes);
    } else {
      setStoredSeasonCodes(activeSeasonCodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStoredSeasonCodes(activeSeasonCodes);
    setIsBlurred(
      !!activeSeasonCodes[activeYear] &&
        activeSeasonCodes[activeYear] !== season.code,
    );
    setIsExpanded(activeSeasonCodes[activeYear] === season.code);
  }, [activeSeasonCodes, activeYear, season.code, setStoredSeasonCodes]);

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
      className={cn(
        "w-full rounded-md shadow-md",
        !isExpanded && "aspect-video",
      )}
    >
      <button
        className={cn(
          "flex flex-col justify-end",
          "aspect-video w-full min-w-max",
          "overflow-hidden rounded-md bg-white",
          isBlurred && "opacity-30 blur-[1px]",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleSelect(season.code)}
        onKeyDown={({ key }) => key === "Enter" && handleSelect(season.code)}
      >
        <figure className={cn("relative flex h-full w-full overflow-hidden")}>
          {image ? (
            <Image
              src={image}
              alt={name}
              priority
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
                    "relative h-full w-full",
                    isHovered ? "scale-105" : "scale-100",
                    imgLoading && "scale-110 blur-2xl",
                  )}
                >
                  <Image
                    src={compImg || "/img/blur.webp"}
                    alt={name}
                    priority
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
        <div className={cn("flex items-center gap-2 px-4 py-2")}>
          <Flag country={country} className="-mt-0.5 h-5 w-5" />
          <h4 className={cn("font-bold uppercase", "sm:text-lg")}>
            {nameWithoutYear}
          </h4>
          <ChevronIcon
            className={cn("h-4 fill-secondary", isExpanded && "rotate-180")}
          />
        </div>
      </button>

      <SeasonCardDetails season={season} isExpanded={isExpanded} />
    </article>
  );
};

export default SeasonCard;
