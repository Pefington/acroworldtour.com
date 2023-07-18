import cn from "classix";
import countries from "i18n-iso-countries";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";

import useLocalStorage from "@/state/useLocalStorage";
import { useUserContext } from "@/state/userContext";
import { Season } from "@/types/project";

import { ChevronIcon } from "../ui/icons";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface Props {
  season: Season;
}

const SeasonCard = ({ season }: Props) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pilotsExpanded, setPilotsExpanded] = useState(false);
  const [compsExpanded, setCompsExpanded] = useState(false);
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

  const {
    name,
    image,
    competitions,
    country,
    number_of_pilots: numberOfPilots,
    number_of_teams: numberOfTeams,
    type,
  } = season;

  const numberOfCompetitions = competitions.length;

  const alpha2country = country
    ? countries
        .getAlpha2Code(countries.getName(country, "en"), "en")
        ?.toLowerCase()
    : null;

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
          <CircleFlag
            width={20}
            height={20}
            countryCode={alpha2country || "earth"}
            className="-mt-0.5 h-5 w-5"
          />
          <h4 className={cn("font-bold uppercase", "sm:text-lg")}>
            {nameWithoutYear}
          </h4>
          <ChevronIcon
            className={cn("h-4 fill-secondary", isExpanded && "rotate-180")}
          />
        </div>
      </button>
      {
        <div
          aria-hidden={!isExpanded}
          className={cn(
            "flex w-full flex-col text-sm font-bold uppercase odd:[&>button]:bg-secondary-light [&_*]:overflow-hidden",
            isExpanded
              ? "[&>*]:max-h-full [&>*]:py-2"
              : "[&>*]:max-h-0 [&>*]:py-0",
          )}
        >
          <button
            className={cn("flex items-center px-5")}
            onClick={() => setPilotsExpanded(!pilotsExpanded)}
          >
            {type === "solo" &&
              (numberOfPilots
                ? `${numberOfPilots} pilot${numberOfPilots > 1 ? "s" : ""}`
                : "No pilots registered yet")}

            {type === "synchro" &&
              (numberOfTeams
                ? `${numberOfTeams} team${numberOfTeams > 1 ? "s" : ""}`
                : "No teams registered yet")}
            <ChevronIcon
              className={cn(
                "h-3 fill-secondary",
                pilotsExpanded && "rotate-180",
              )}
            />
          </button>

          <button
            className={cn("flex items-center px-5")}
            onClick={() => setCompsExpanded(!compsExpanded)}
          >
            {`${numberOfCompetitions} competition${
              numberOfCompetitions > 1 ? "s" : ""
            }`}
            <ChevronIcon
              className={cn(
                "h-3 fill-secondary",
                compsExpanded && "rotate-180",
              )}
            />
          </button>
        </div>
      }
    </article>
  );
};

export default SeasonCard;
