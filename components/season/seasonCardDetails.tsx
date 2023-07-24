import cn from "classix";
import { useState } from "react";

import { ChevronIcon } from "@/components/ui/icons";
import { Season } from "@/types/project";
import { getCountryName } from "@/utils/countries";

import SeasonCardPilots from "./seasonCardPilots";

interface Props {
  season: Season;
  isExpanded: boolean;
}

const SeasonCardDetails = ({ season, isExpanded }: Props) => {
  const [pilotsExpanded, setPilotsExpanded] = useState(false);
  const [compsExpanded, setCompsExpanded] = useState(false);

  const {
    competitions,
    country,
    number_of_pilots: numberOfPilots,
    number_of_teams: numberOfTeams,
    type,
  } = season;

  const numberOfCompetitions = competitions.length;
  const noContestants = !numberOfPilots && !numberOfTeams;

  return (
    <div
      aria-hidden={!isExpanded}
      className={cn(
        "flex w-full flex-col",
        "text-sm font-bold uppercase",
        "[&_*]:overflow-hidden",
        isExpanded
          ? "[&>*]:max-h-full [&>*]:py-0.5"
          : "[&>*]:max-h-0 [&>*]:py-0",
      )}
    >
      {country && <p className="px-5">{getCountryName(country)}</p>}
      <button
        disabled={noContestants}
        className={cn("flex items-center px-5 uppercase")}
        onClick={() => setPilotsExpanded(!pilotsExpanded)}
      >
        {type === "solo" ? (
          <p>
            {numberOfPilots
              ? `${numberOfPilots} pilot${numberOfPilots > 1 ? "s" : ""}`
              : "No pilots registered yet"}
          </p>
        ) : (
          <p>
            {numberOfTeams
              ? `${numberOfTeams} team${numberOfTeams > 1 ? "s" : ""}`
              : "No teams registered yet"}
          </p>
        )}

        {!noContestants && (
          <ChevronIcon
            className={cn("h-3 fill-secondary", pilotsExpanded && "rotate-180")}
          />
        )}
      </button>

      <div className="">
        <SeasonCardPilots
          season={season}
          isExpanded={isExpanded && pilotsExpanded}
        />
      </div>

      <button
        disabled={!numberOfCompetitions}
        className={cn("flex items-center px-5 uppercase")}
        onClick={() => setCompsExpanded(!compsExpanded)}
      >
        {`${numberOfCompetitions} competition${
          numberOfCompetitions > 1 ? "s" : ""
        }`}
        {numberOfCompetitions && (
          <ChevronIcon
            className={cn("h-3 fill-secondary", compsExpanded && "rotate-180")}
          />
        )}
      </button>
    </div>
  );
};

export default SeasonCardDetails;
