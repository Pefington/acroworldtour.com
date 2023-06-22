import cn from "classnames";
import countries from "i18n-iso-countries";
import Link from "next/link";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";

import { components } from "@/types";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type Competition = components["schemas"]["CompetitionPublicExportWithResults"];
type Season = components["schemas"]["SeasonExport"];

type CompetitionResult = components["schemas"]["CompetitionPilotResultsExport"];
type SeasonResult = components["schemas"]["models__seasons__SeasonResult"];

interface Props {
  event: Competition | Season;
  limitTo?: number;
}

const BasicResultsCard = ({ event, limitTo = 5 }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const results =
    "overall_results" in event.results
      ? (event.results.overall_results as CompetitionResult[])
      : (event.results
          .filter((result) => result.type === "overall")
          .map((result) => result.results)
          .flat() as SeasonResult[]);

  results.sort((a, b) => b.score - a.score);

  const isCompetition = "overall_results" in event.results;

  const clampedResults = limitTo ? results.slice(0, limitTo) : results;

  return (
    <article
      className={cn(
        "w-full rounded pt-7",
        isHovered ? "-translate-y-1 shadow-lg" : "shadow-md",
      )}
    >
      <h3 className={cn("px-7 text-3xl font-bold uppercase")}>
        {isCompetition ? "Acro World Tour" : "Acro World Qualifier"}
      </h3>
      <h4 className={cn("px-7 font-semibold uppercase text-secondary")}>
        {isCompetition
          ? event.name
          : `Overall Standings ${event.name.split(" ").at(-1)}`}
      </h4>
      <header
        className={cn(
          "my-4 grid grid-cols-12 px-7 text-sm font-bold text-secondary",
        )}
      >
        <span className={cn("col-span-2")}>Pos.</span>
        <span className={cn("col-span-8 ml-8")}>Pilot</span>
        <span className={cn("col-span-2")}>Pts.</span>
      </header>

      <ul className={cn("col-span-full")}>
        {clampedResults.map((result, index) => {
          const { pilot, score } = result;
          const roundedScore = score.toFixed(3);
          const alpha2country = pilot?.country
            ? countries
                .alpha3ToAlpha2(pilot.country.toUpperCase())
                .toLowerCase()
            : null;

          return (
            <li
              key={pilot?.civlid}
              className={cn(
                "grid w-full grid-cols-12 px-7 py-4 text-sm font-bold odd:bg-secondary-light",
              )}
            >
              <span className={cn("col-span-2 text-secondary")}>
                {index + 1}
              </span>
              <span className={cn("col-span-8 flex gap-4")}>
                {alpha2country ? (
                  <CircleFlag countryCode={alpha2country} className="h-5" />
                ) : (
                  <div className="w-5 rounded-full bg-secondary-medium text-center text-white">
                    ?
                  </div>
                )}
                {pilot?.name}
              </span>
              <span className={cn("col-span-2")}>{roundedScore}</span>
            </li>
          );
        })}
      </ul>

      <footer
        className="grid w-full place-items-center font-bold text-accent-text hover:text-hover hover:drop-shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link
          href={
            isCompetition
              ? `/competitions/${event.code}`
              : `/seasons/${event.code}`
          }
          title={`View detailed results for ${event.name}`}
          className="w-full py-4 text-center"
        >
          View More
        </Link>
      </footer>
    </article>
  );
};

export default BasicResultsCard;
