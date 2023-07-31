import { ChevronIcon } from "@ui/icons";
import { getCountryName } from "@utils/countries";
import cx from "classix";
import { useState } from "react";

import SeasonCardComps from "./SeasonCardComps";
import SeasonCardPilots from "./SeasonCardPilots";

interface Props {
  season: API.Season;
  isExpanded: boolean;
}

const SeasonCardDetails = ({ season, isExpanded }: Props) => {
  const [showCat, setShowCat] = useState<"none" | "pilots" | "comps">("none");

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
      className={cx(
        "flex w-full flex-col",
        "text-sm font-bold uppercase",
        "[&_*]:overflow-hidden",
        isExpanded
          ? "pb-2 [&>*:not(div)]:py-1 [&>*]:max-h-full"
          : "[&>*]:max-h-0",
      )}
    >
      <p
        className={cx(
          "ml-5 w-max",
          "border-b border-accent-light",
          isExpanded ? "mb-2 border-opacity-100" : "mb-0 border-opacity-0",
        )}
      >
        {country ? getCountryName(country) : "International Event"}
      </p>

      <button
        disabled={noContestants}
        className={cx("flex items-center px-5 uppercase")}
        onClick={() => setShowCat(showCat === "pilots" ? "none" : "pilots")}
      >
        {type === "solo" ? (
          <p className={cx(!numberOfPilots && "text-secondary-medium")}>
            {numberOfPilots
              ? `${numberOfPilots} pilot${numberOfPilots > 1 ? "s" : ""}`
              : "No pilots registered yet"}
          </p>
        ) : (
          <p className={cx(!numberOfPilots && "text-secondary-medium")}>
            {numberOfTeams
              ? `${numberOfTeams} team${numberOfTeams > 1 ? "s" : ""}`
              : "No teams registered yet"}
          </p>
        )}

        {!noContestants && (
          <ChevronIcon
            className={cx(
              "h-3 fill-secondary",
              showCat === "pilots" && "rotate-180",
            )}
          />
        )}
      </button>

      <SeasonCardPilots
        season={season}
        isExpanded={isExpanded && showCat === "pilots"}
      />

      <button
        disabled={!numberOfCompetitions}
        className={cx("flex items-center px-5 uppercase")}
        onClick={() => setShowCat(showCat === "comps" ? "none" : "comps")}
      >
        {`${numberOfCompetitions} competition${
          numberOfCompetitions > 1 ? "s" : ""
        }`}
        {numberOfCompetitions && (
          <ChevronIcon
            className={cx(
              "h-3 fill-secondary",
              showCat === "comps" && "rotate-180",
            )}
          />
        )}
      </button>

      <SeasonCardComps
        season={season}
        isExpanded={isExpanded && showCat === "comps"}
      />
    </div>
  );
};

export default SeasonCardDetails;
